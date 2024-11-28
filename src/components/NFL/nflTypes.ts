import {
  AdditionalFilter,
  Selectable,
  Sort,
} from '../../definitions/globalTypes';

type Location = 'FAVORITE' | 'UNDERDOG' | 'NEUTRAL';
export type SpreadResult = 'WIN' | 'LOSS' | 'PUSH';
export type OverUnderResult = 'OVER' | 'UNDER' | 'PUSH';

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

export interface SelectionStats {
  total_games: number;
  over: number;
  under: number;
  over_under_pushed: number;
  favorite_won: number;
  underdog_won: number;
  tie_games: number;
  spread_won: number;
  spread_lost: number;
  spread_pushed: number;
  overtime_games: number;
}

export const NFL_DIVISIONS = {
  NFC_NORTH: 'NFC North',
  NFC_EAST: 'NFC East',
  NFC_SOUTH: 'NFC South',
  NFC_WEST: 'NFC West',
  AFC_NORTH: 'AFC North',
  AFC_EAST: 'AFC East',
  AFC_SOUTH: 'AFC South',
  AFC_WEST: 'AFC West',
} as const;
export type NFL_DIVISION = (typeof NFL_DIVISIONS)[keyof typeof NFL_DIVISIONS];

export interface NFLTeam extends Selectable {
  name: string;
  image: string;
  division: NFL_DIVISION;
}

export interface NFLSeason extends Selectable {
  year: number;
}

export const NFLAdditionalFilterNames = {
  HeadToHead: 'Head to Head',
  NFC_North: NFL_DIVISIONS.NFC_NORTH,
  NFC_East: NFL_DIVISIONS.NFC_EAST,
  NFC_South: NFL_DIVISIONS.NFC_SOUTH,
  NFC_West: NFL_DIVISIONS.NFC_WEST,
  AFC_North: NFL_DIVISIONS.AFC_NORTH,
  AFC_East: NFL_DIVISIONS.AFC_EAST,
  AFC_South: NFL_DIVISIONS.AFC_SOUTH,
  AFC_West: NFL_DIVISIONS.AFC_WEST,
} as const;
export type NFLAdditionalFilterName =
  (typeof NFLAdditionalFilterNames)[keyof typeof NFLAdditionalFilterNames];

export interface NFLAdditionalFilter extends AdditionalFilter {
  name: NFLAdditionalFilterName;
  division?: NFL_DIVISION;
}

export const NFLTabIds = {
  Games: 'games',
  Stats: 'stats',
} as const;
export type NFLTabId = (typeof NFLTabIds)[keyof typeof NFLTabIds];

export interface NFLTab {
  tabId: NFLTabId;
  label: string;
}

export interface GetPercentagePayload {
  stat: number;
  total: number;
  fractionalDigits?: number;
}

export interface DivisionSelections {
  nfcNorthSelected: boolean;
  nfcEastSelected: boolean;
  nfcSouthSelected: boolean;
  nfcWestSelected: boolean;
  afcNorthSelected: boolean;
  afcEastSelected: boolean;
  afcSouthSelected: boolean;
  afcWestSelected: boolean;
}

export const NFLGameColumnIds = {
  Season: 'season',
  Date: 'date',
  DayOfWeek: 'dayOfWeek',
  Favorite: 'favorite',
  ScoreFavorite: 'scoreFavorite',
  ScoreUnderdog: 'scoreUnderdog',
  Underdog: 'underdog',
  Location: 'location',
  Spread: 'spread',
  SpreadResult: 'spreadResult',
  Overtime: 'overtime',
  Postseason: 'postseason',
  FavoriteSeed: 'favoriteSeed',
  UnderdogSeed: 'underdogSeed',
  TimeEastern: 'timeEastern',
  OverUnder: 'overUnder',
  OverUnderResult: 'overUnderResult',
  Notes: 'notes',
} as const;
export type NFLGameColumnId =
  (typeof NFLGameColumnIds)[keyof typeof NFLGameColumnIds];

export type GameOrderMap = Map<
  NFLGameColumnId,
  { sort: Sort; priority: number }
>;
