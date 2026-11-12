import type { DevStats, DevArchetype, RarityTier, TopLanguage } from './types';

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Java: '#b07219',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Solidity: '#AA6746',
  Lua: '#000080',
  Vue: '#41b883',
  Zig: '#ec915c',
  Elixir: '#6e4a7e',
};

export function getLanguageColor(lang: string): string {
  return LANGUAGE_COLORS[lang] || '#00f2fe';
}

export function calculateArchetype(
  topLanguages: TopLanguage[],
  streakDays: number,
  nightOwlPercentage: number,
  prMergeRate: number,
  totalStars: number,
  totalCommits: number
): { archetype: DevArchetype; title: string; description: string } {
  // 1. Systems Paladin: Rust / C / C++ dominant (> 40%)
  const systemsPercentage = topLanguages
    .filter(l => ['Rust', 'C', 'C++'].includes(l.name))
    .reduce((sum, l) => sum + l.percentage, 0);

  if (systemsPercentage >= 35) {
    return {
      archetype: 'Systems Paladin',
      title: 'The Low-Level Bastion',
      description: 'Master of raw pointers, memory safety, and silicon optimization. Forges indestructible distributed systems.'
    };
  }

  // 2. Iron Monolith: Consecutive commit streak > 60 days
  if (streakDays >= 60) {
    return {
      archetype: 'Iron Monolith',
      title: 'The Relentless Engine',
      description: 'An unstoppable juggernaut of continuous shipping. Nothing breaks the unbreakable streak.'
    };
  }

  // 3. Open Source Titan: > 1,000 stars or massive followers
  if (totalStars >= 1000) {
    return {
      archetype: 'Open Source Titan',
      title: 'The Constellation Weaver',
      description: 'Bends the digital firmament to their will. Thousands build upon their open foundational works.'
    };
  }

  // 4. Midnight Sorcerer: > 45% commits pushed at night (10PM - 4AM)
  if (nightOwlPercentage >= 45) {
    return {
      archetype: 'Midnight Sorcerer',
      title: 'The Nocturnal Alchemist',
      description: 'Draws eldritch power from pitch-black terminal sessions while the daylight world sleeps.'
    };
  }

  // 5. The Code Arbiter: PR merge acceptance rate > 80%
  if (prMergeRate >= 80 && totalCommits > 50) {
    return {
      archetype: 'The Code Arbiter',
      title: 'The Gatekeeper of Truth',
      description: 'Bringer of pristine code reviews, zero-compromise CI pipelines, and harmonized pull requests.'
    };
  }

  // 6. Polyglot Alchemist: 4+ languages each with > 12% presence
  const diverseLangs = topLanguages.filter(l => l.percentage >= 12);
  if (diverseLangs.length >= 4) {
    return {
      archetype: 'Polyglot Alchemist',
      title: 'The Multiverse Conduit',
      description: 'Transmutes seamlessly between paradigms, compilers, and virtual machines without breaking syntax.'
    };
  }

  // 7. Fullstack Alchemist: Default web / dynamic developer
  return {
    archetype: 'Fullstack Alchemist',
    title: 'The Omnipresent Architect',
    description: 'Weaves interface illusions into distributed backbones. Omnipotent across frontend, API, and cloud.'
  };
}

export function calculateRarity(
  totalCommits: number,
  totalStars: number,
  totalPRs: number,
  followers: number
): { rarity: RarityTier; percentile: string } {
  const powerScore = (totalCommits * 1.2) + (totalStars * 15) + (totalPRs * 8) + (followers * 5);

  if (powerScore >= 6000 || totalStars >= 2000 || totalCommits >= 3500) {
    return { rarity: 'Mythic', percentile: 'Top 0.5% Developer' };
  }
  if (powerScore >= 2500 || totalStars >= 500 || totalCommits >= 1800) {
    return { rarity: 'Legendary', percentile: 'Top 5% Developer' };
  }
  if (powerScore >= 1000 || totalStars >= 100 || totalCommits >= 800) {
    return { rarity: 'Epic', percentile: 'Top 15% Developer' };
  }
  if (powerScore >= 400 || totalStars >= 20 || totalCommits >= 300) {
    return { rarity: 'Rare', percentile: 'Top 35% Developer' };
  }
  return { rarity: 'Standard', percentile: 'Verified Contributor' };
}

export function calculateRpgStats(
  totalCommits: number,
  totalPRs: number,
  totalIssues: number,
  totalStars: number,
  followers: number,
  topLanguages: TopLanguage[],
  prMergeRate: number
): DevStats['rpgStats'] {
  // ATK (Commit Velocity): 0 - 99
  // Based on annual commit cadence and PR throughput
  const atkRaw = Math.floor(
    (Math.log10(Math.max(1, totalCommits)) * 24) + 
    (Math.min(50, totalPRs) * 0.45)
  );
  const atk = Math.min(99, Math.max(15, atkRaw));

  // DEF (Code Stability & PR Hygiene): 0 - 99
  // High PR merge rate, issue handling, and steady output
  const defRaw = Math.floor(
    (prMergeRate * 0.6) + 
    (Math.min(30, totalIssues) * 0.7) + 
    15
  );
  const def = Math.min(99, Math.max(20, defRaw));

  // MANA (Language Diversity & Ecosystem Breadth): 0 - 99
  const langCount = topLanguages.length;
  const entropy = topLanguages.reduce((acc, l) => acc + (l.percentage > 10 ? 1 : 0.5), 0);
  const manaRaw = Math.floor((langCount * 12) + (entropy * 8) + 15);
  const mana = Math.min(99, Math.max(15, manaRaw));

  // LUCK (Stargazer Pull & Social Aura): 0 - 99
  const luckRaw = Math.floor(
    (Math.log10(Math.max(1, totalStars)) * 22) + 
    (Math.log10(Math.max(1, followers)) * 12) + 
    10
  );
  const luck = Math.min(99, Math.max(10, luckRaw));

  // Overall Power Rating
  const overall = Math.floor((atk * 0.3) + (def * 0.25) + (mana * 0.2) + (luck * 0.25));

  return { atk, def, mana, luck, overall };
}

export function generateUltimateSkill(
  archetype: DevArchetype,
  topRepoName?: string,
  topLanguage?: string
): string {
  const repoSlug = topRepoName ? topRepoName.toUpperCase().replace(/[^A-Z0-9]/g, ' ') : 'KERNEL';
  const lang = (topLanguage || 'BYTE').toUpperCase();

  switch (archetype) {
    case 'Systems Paladin':
      return `ZERO-COST ABSTRACTION: ${repoSlug}`;
    case 'Midnight Sorcerer':
      return `VOID COMMIT OVERDRIVE: ${lang} DAEMON`;
    case 'Iron Monolith':
      return `UNBROKEN PROTOCOL: CHRONO-LOCK`;
    case 'Open Source Titan':
      return `SUPERNOVA REPOSITORY: ${repoSlug}`;
    case 'The Code Arbiter':
      return `PRISTINE MERGE: ZERO CONFLICT MATRIX`;
    case 'Polyglot Alchemist':
      return `CROSS-COMPILER TRANSMUTATION`;
    case 'Bug Hunter':
      return `SPECTRAL HEURISTIC PURGE`;
    default:
      return `FULLSTACK SYNAPSE OVERLOAD: ${repoSlug}`;
  }
}

export function enrichDevStats(raw: Partial<DevStats> & { username: string }): DevStats {
  const totalCommits = raw.totalCommits || 120;
  const totalPRs = raw.totalPRs || 14;
  const totalStars = raw.totalStars || 25;
  const totalForks = raw.totalForks || 5;
  const totalIssues = raw.totalIssues || 8;
  const followers = raw.followers || 12;
  const following = raw.following || 10;
  const publicRepos = raw.publicRepos || 15;
  const streakDays = raw.streakDays || 12;
  const nightOwlPercentage = raw.nightOwlPercentage ?? 38;
  const prMergeRate = raw.prMergeRate ?? 82;
  const topLanguages = raw.topLanguages && raw.topLanguages.length > 0 
    ? raw.topLanguages 
    : [
        { name: 'TypeScript', percentage: 55, color: '#3178c6' },
        { name: 'Rust', percentage: 25, color: '#dea584' },
        { name: 'Python', percentage: 20, color: '#3572A5' }
      ];

  const archetypeInfo = calculateArchetype(
    topLanguages,
    streakDays,
    nightOwlPercentage,
    prMergeRate,
    totalStars,
    totalCommits
  );

  const rarityInfo = calculateRarity(
    totalCommits,
    totalStars,
    totalPRs,
    followers
  );

  const rpgStats = calculateRpgStats(
    totalCommits,
    totalPRs,
    totalIssues,
    totalStars,
    followers,
    topLanguages,
    prMergeRate
  );

  const topRepo = raw.pinnedRepos?.[0]?.name;
  const topLang = topLanguages[0]?.name;
  const ultimateSkill = raw.ultimateSkill || generateUltimateSkill(archetypeInfo.archetype, topRepo, topLang);

  return {
    username: raw.username,
    name: raw.name || raw.username,
    avatarUrl: raw.avatarUrl || `https://avatars.githubusercontent.com/${raw.username}`,
    bio: raw.bio || 'Code crafter, digital architect, continuous learner.',
    company: raw.company,
    location: raw.location,
    blog: raw.blog,
    twitterUsername: raw.twitterUsername,
    createdAt: raw.createdAt || new Date().toISOString(),
    totalCommits,
    totalPRs,
    totalStars,
    totalForks,
    totalIssues,
    followers,
    following,
    publicRepos,
    streakDays,
    nightOwlPercentage,
    prMergeRate,
    topLanguages,
    pinnedRepos: raw.pinnedRepos || [],
    archetype: archetypeInfo.archetype,
    archetypeTitle: archetypeInfo.title,
    archetypeDescription: archetypeInfo.description,
    rarity: rarityInfo.rarity,
    rarityPercentile: rarityInfo.percentile,
    ultimateSkill,
    rpgStats,
  };
}
