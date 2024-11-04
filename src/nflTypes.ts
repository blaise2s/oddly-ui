type Location = 'FAVORITE' | 'UNDERDOG' | 'NEUTRAL';
type SpreadResult = 'WIN' | 'LOSS' | 'PUSH';
type OverUnderResult = 'OVER' | 'UNDER' | 'PUSH';

export interface NFLGame {
  id: number;
  season: string;
  day_of_week: string;
  game_date: string;
  time_eastern: string;
  postseason: boolean;
  game_loc: Location;
  favorite: string;
  current_favorite: string;
  favorite_seed?: string;
  underdog: string;
  current_underdog: string;
  underdog_seed?: string;
  score_favorite: string;
  score_underdog: string;
  favorite_won: boolean;
  tie: boolean;
  spread: string;
  spread_res: SpreadResult;
  over_under: string;
  over_under_res: OverUnderResult;
  overtime: boolean;
  notes?: string;
}

export interface NFLTeam {
  name: string;
  image?: string;
}
