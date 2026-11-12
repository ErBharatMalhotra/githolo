import type { DevStats, TopLanguage, PinnedRepo } from './engine/types';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const GITHUB_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      login
      name
      avatarUrl
      bio
      company
      location
      websiteUrl
      twitterUsername
      createdAt
      followers { totalCount }
      following { totalCount }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          name
          description
          stargazerCount
          forkCount
          primaryLanguage { name color }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node { name color }
            }
          }
          issues(states: [OPEN, CLOSED]) { totalCount }
          pullRequests { totalCount }
          pullRequests(states: MERGED) { totalCount }
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            stargazerCount
            forkCount
            primaryLanguage { name }
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

interface GitHubRawResponse {
  data: {
    user: any;
  };
  errors?: Array<{ message: string }>;
}

function computeTopLanguages(repos: any[]): TopLanguage[] {
  const langMap: Record<string, { size: number; color: string }> = {};

  repos.forEach((repo) => {
    repo.languages?.edges?.forEach((edge: any) => {
      const name = edge.node.name;
      const color = edge.node.color || '#aaa';
      if (!langMap[name]) langMap[name] = { size: 0, color };
      langMap[name].size += edge.size;
    });
  });

  const total = Object.values(langMap).reduce((s, v) => s + v.size, 0);
  if (total === 0) return [];

  return Object.entries(langMap)
    .map(([name, { size, color }]) => ({
      name,
      percentage: Math.round((size / total) * 1000) / 10,
      color,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 6);
}

function computeStreak(weeks: any[]): number {
  const days = weeks
    .flatMap((w: any) => w.contributionDays)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Check for a streak including the most recent day or the day before
  let maxStreak = 0;
  let currentStreak = 0;

  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].contributionCount > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else if (currentStreak > 0) {
      break;
    }
  }

  // Also compute the all-time max
  let runStreak = 0;
  for (const day of days) {
    if (day.contributionCount > 0) {
      runStreak++;
      maxStreak = Math.max(maxStreak, runStreak);
    } else {
      runStreak = 0;
    }
  }

  return maxStreak;
}

function computeNightOwlPercentage(weeks: any[]): number {
  // We can only estimate from contribution data; 
  // GitHub's API doesn't give commit times in the calendar.
  // Use a heuristic based on weekend activity as a proxy.
  const days = weeks.flatMap((w: any) => w.contributionDays);
  const weekendDays = days.filter((d: any) => d.weekday === 0 || d.weekday === 6);
  const weekendContributions = weekendDays.reduce((s: number, d: any) => s + d.contributionCount, 0);
  const totalContributions = days.reduce((s: number, d: any) => s + d.contributionCount, 0);

  if (totalContributions === 0) return 0;
  // Night-owl proxy: weight weekend activity + assume ~30% night activity
  return Math.min(90, Math.round((weekendContributions / totalContributions) * 100 + 15));
}

export async function fetchDevData(username: string, token?: string): Promise<Partial<DevStats>> {
  const authToken = token || process.env.GITHUB_TOKEN || '';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: GITHUB_QUERY, variables: { login: username } }),
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
  }

  const json: GitHubRawResponse = await response.json();

  if (json.errors) {
    throw new Error(`GitHub GraphQL error: ${json.errors.map(e => e.message).join(', ')}`);
  }

  const user = json.data.user;
  if (!user) {
    throw new Error(`User "${username}" not found on GitHub.`);
  }

  const repos = user.repositories.nodes || [];
  const contributions = user.contributionsCollection;
  const calendar = contributions.contributionCalendar;

  // Compute total stars and forks
  const totalStars = repos.reduce((s: number, r: any) => s + (r.stargazerCount || 0), 0);
  const totalForks = repos.reduce((s: number, r: any) => s + (r.forkCount || 0), 0);

  // PR merge rate
  const totalPRsAll = repos.reduce((s: number, r: any) => s + (r.pullRequests?.totalCount || 0), 0);
  const mergedPRs = contributions.totalPullRequestContributions || 0;
  const prMergeRate = totalPRsAll > 0 ? Math.round((mergedPRs / totalPRsAll) * 100) : 75;

  // Pinned repos
  const pinnedRepos: PinnedRepo[] = (user.pinnedItems?.nodes || []).map((r: any) => ({
    name: r.name || '',
    description: r.description || '',
    stars: r.stargazerCount || 0,
    forks: r.forkCount || 0,
    language: r.primaryLanguage?.name || 'Unknown',
  }));

  return {
    username: user.login,
    name: user.name || user.login,
    avatarUrl: user.avatarUrl,
    bio: user.bio || '',
    company: user.company || undefined,
    location: user.location || undefined,
    blog: user.websiteUrl || undefined,
    twitterUsername: user.twitterUsername || undefined,
    createdAt: user.createdAt,
    totalCommits: calendar.totalContributions || 0,
    totalPRs: contributions.totalPullRequestContributions || 0,
    totalStars,
    totalForks,
    totalIssues: contributions.totalIssueContributions || 0,
    followers: user.followers.totalCount || 0,
    following: user.following.totalCount || 0,
    publicRepos: user.repositories.totalCount || 0,
    streakDays: computeStreak(calendar.weeks),
    nightOwlPercentage: computeNightOwlPercentage(calendar.weeks),
    prMergeRate: Math.min(100, prMergeRate),
    topLanguages: computeTopLanguages(repos),
    pinnedRepos,
  };
}
