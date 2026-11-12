export type DevArchetype =
  | 'Systems Paladin'
  | 'Polyglot Alchemist'
  | 'Midnight Sorcerer'
  | 'The Code Arbiter'
  | 'Iron Monolith'
  | 'Fullstack Alchemist'
  | 'Bug Hunter'
  | 'Open Source Titan';

export type RarityTier = 'Mythic' | 'Legendary' | 'Epic' | 'Rare' | 'Standard';

export type CardTheme = 
  | 'cyberpunk' 
  | 'gold' 
  | 'obsidian' 
  | 'tokyo' 
  | 'retro90s';

export interface TopLanguage {
  name: string;
  percentage: number;
  color?: string;
}

export interface PinnedRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
}

export interface DevStats {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  company?: string;
  location?: string;
  blog?: string;
  twitterUsername?: string;
  createdAt: string;
  totalCommits: number;
  totalPRs: number;
  totalStars: number;
  totalForks: number;
  totalIssues: number;
  followers: number;
  following: number;
  publicRepos: number;
  streakDays: number;
  nightOwlPercentage: number;
  prMergeRate: number;
  topLanguages: TopLanguage[];
  pinnedRepos: PinnedRepo[];
  archetype: DevArchetype;
  archetypeTitle: string;
  archetypeDescription: string;
  rarity: RarityTier;
  rarityPercentile: string;
  ultimateSkill: string;
  rpgStats: {
    atk: number;  // Commit Velocity (0 - 99)
    def: number;  // Code Stability & Issue Hygiene (0 - 99)
    mana: number; // Language Diversity (0 - 99)
    luck: number; // Stargazer Pull & Community (0 - 99)
    overall: number; // Overall power level (0 - 99)
  };
}

export interface CardCustomization {
  theme: CardTheme;
  showBio: boolean;
  showLanguages: boolean;
  showUltimate: boolean;
  showStats: boolean;
  foilIntensity: number; // 0 to 1
  holoEffect: boolean;
}
