import { Column } from './globalTypes';
import {
  NFLAdditionalFilter,
  NFLAdditionalFilterNames,
  NFLSeason,
  NFLTab,
  NFLTabIds,
  NFLTeam,
  NFL_DIVISIONS,
} from './nflTypes';

export const GamesTableColumns: Column[] = [
  { name: 'Season' },
  { name: 'Date' },
  { name: 'DoW' },
  { name: 'Time ET' },
  { name: 'Favorite', align: 'center' },
  { name: 'Score Favorite', align: 'center' },
  { name: 'Score Underdog', align: 'center' },
  { name: 'Underdog', align: 'center' },
  { name: 'Location' },
  { name: 'Spread' },
  { name: 'Spread Result' },
  { name: 'OU' },
  { name: 'OU Result' },
  { name: 'Overtime' },
  { name: 'Postseason' },
  { name: 'Favorite Seed' },
  { name: 'Underdog Seed' },
  { name: 'Notes' },
];

export const NFC_NORTH_TEAMS: [NFLTeam, NFLTeam, NFLTeam, NFLTeam] = [
  {
    selected: false,
    name: 'Chicago Bears',
    image: '/nflTeams/chicago_bears.png',
    division: NFL_DIVISIONS.NFC_NORTH,
  },
  {
    selected: false,
    name: 'Detroit Lions',
    image: '/nflTeams/detroit_lions.png',
    division: NFL_DIVISIONS.NFC_NORTH,
  },
  {
    selected: true,
    name: 'Green Bay Packers',
    image: '/nflTeams/green_bay_packers.png',
    division: NFL_DIVISIONS.NFC_NORTH,
  },
  {
    selected: false,
    name: 'Minnesota Vikings',
    image: '/nflTeams/minnesota_vikings.png',
    division: NFL_DIVISIONS.NFC_NORTH,
  },
];
export const NFC_EAST_TEAMS: [NFLTeam, NFLTeam, NFLTeam, NFLTeam] = [
  {
    selected: false,
    name: 'Dallas Cowboys',
    image: '/nflTeams/dallas_cowboys.png',
    division: NFL_DIVISIONS.NFC_EAST,
  },
  {
    selected: false,
    name: 'New York Giants',
    image: '/nflTeams/new_york_giants.png',
    division: NFL_DIVISIONS.NFC_EAST,
  },

  {
    selected: false,
    name: 'Philadelphia Eagles',
    image: '/nflTeams/philadelphia_eagles.png',
    division: NFL_DIVISIONS.NFC_EAST,
  },
  {
    selected: false,
    name: 'Washington Commanders',
    image: '/nflTeams/washington_commanders.png',
    division: NFL_DIVISIONS.NFC_EAST,
  },
];
export const NFC_SOUTH_TEAMS: [NFLTeam, NFLTeam, NFLTeam, NFLTeam] = [
  {
    selected: false,
    name: 'Atlanta Falcons',
    image: '/nflTeams/atlanta_falcons.png',
    division: NFL_DIVISIONS.NFC_SOUTH,
  },
  {
    selected: false,
    name: 'Carolina Panthers',
    image: '/nflTeams/carolina_panthers.png',
    division: NFL_DIVISIONS.NFC_SOUTH,
  },
  {
    selected: false,
    name: 'New Orleans Saints',
    image: '/nflTeams/new_orleans_saints.png',
    division: NFL_DIVISIONS.NFC_SOUTH,
  },
  {
    selected: false,
    name: 'Tampa Bay Buccaneers',
    image: '/nflTeams/tampa_bay_buccaneers.png',
    division: NFL_DIVISIONS.NFC_SOUTH,
  },
];
export const NFC_WEST_TEAMS: [NFLTeam, NFLTeam, NFLTeam, NFLTeam] = [
  {
    selected: false,
    name: 'Arizona Cardinals',
    image: '/nflTeams/arizona_cardinals.png',
    division: NFL_DIVISIONS.NFC_WEST,
  },
  {
    selected: false,
    name: 'Los Angeles Rams',
    image: '/nflTeams/los_angeles_rams.png',
    division: NFL_DIVISIONS.NFC_WEST,
  },
  {
    selected: false,
    name: 'San Francisco 49ers',
    image: '/nflTeams/san_francisco_49ers.png',
    division: NFL_DIVISIONS.NFC_WEST,
  },
  {
    selected: false,
    name: 'Seattle Seahawks',
    image: '/nflTeams/seattle_seahawks.png',
    division: NFL_DIVISIONS.NFC_WEST,
  },
];
export const AFC_NORTH_TEAMS: [NFLTeam, NFLTeam, NFLTeam, NFLTeam] = [
  {
    selected: false,
    name: 'Baltimore Ravens',
    image: '/nflTeams/baltimore_ravens.png',
    division: NFL_DIVISIONS.AFC_NORTH,
  },
  {
    selected: false,
    name: 'Cincinnati Bengals',
    image: '/nflTeams/cincinnati_bengals.png',
    division: NFL_DIVISIONS.AFC_NORTH,
  },
  {
    selected: false,
    name: 'Cleveland Browns',
    image: '/nflTeams/cleveland_browns.png',
    division: NFL_DIVISIONS.AFC_NORTH,
  },
  {
    selected: false,
    name: 'Pittsburgh Steelers',
    image: '/nflTeams/pittsburgh_steelers.png',
    division: NFL_DIVISIONS.AFC_NORTH,
  },
];
export const AFC_EAST_TEAMS: [NFLTeam, NFLTeam, NFLTeam, NFLTeam] = [
  {
    selected: false,
    name: 'Buffalo Bills',
    image: '/nflTeams/buffalo_bills.png',
    division: NFL_DIVISIONS.AFC_EAST,
  },
  {
    selected: false,
    name: 'Miami Dolphins',
    image: '/nflTeams/miami_dolphins.png',
    division: NFL_DIVISIONS.AFC_EAST,
  },
  {
    selected: false,
    name: 'New England Patriots',
    image: '/nflTeams/new_england_patriots.png',
    division: NFL_DIVISIONS.AFC_EAST,
  },
  {
    selected: false,
    name: 'New York Jets',
    image: '/nflTeams/new_york_jets.png',
    division: NFL_DIVISIONS.AFC_EAST,
  },
];
export const AFC_SOUTH_TEAMS: [NFLTeam, NFLTeam, NFLTeam, NFLTeam] = [
  {
    selected: false,
    name: 'Houston Texans',
    image: '/nflTeams/houston_texans.png',
    division: NFL_DIVISIONS.AFC_SOUTH,
  },
  {
    selected: false,
    name: 'Indianapolis Colts',
    image: '/nflTeams/indianapolis_colts.png',
    division: NFL_DIVISIONS.AFC_SOUTH,
  },
  {
    selected: false,
    name: 'Jacksonville Jaguars',
    image: '/nflTeams/jacksonville_jaguars.png',
    division: NFL_DIVISIONS.AFC_SOUTH,
  },
  {
    selected: false,
    name: 'Tennessee Titans',
    image: '/nflTeams/tennessee_titans.png',
    division: NFL_DIVISIONS.AFC_SOUTH,
  },
];
export const AFC_WEST_TEAMS: [NFLTeam, NFLTeam, NFLTeam, NFLTeam] = [
  {
    selected: false,
    name: 'Denver Broncos',
    image: '/nflTeams/denver_broncos.png',
    division: NFL_DIVISIONS.AFC_WEST,
  },
  {
    selected: false,
    name: 'Kansas City Chiefs',
    image: '/nflTeams/kansas_city_chiefs.png',
    division: NFL_DIVISIONS.AFC_WEST,
  },
  {
    selected: false,
    name: 'Las Vegas Raiders',
    image: '/nflTeams/las_vegas_raiders.png',
    division: NFL_DIVISIONS.AFC_WEST,
  },
  {
    selected: false,
    name: 'Los Angeles Chargers',
    image: '/nflTeams/los_angeles_chargers.png',
    division: NFL_DIVISIONS.AFC_WEST,
  },
];

// ? Pull all the teams from the DB and build selectable list dynamically? Maybe not
// ? as I'd still need to map each one to an image path... and the teams won't change ofter
export const NFL_TEAMS: NFLTeam[] = [
  ...NFC_NORTH_TEAMS,
  ...NFC_EAST_TEAMS,
  ...NFC_SOUTH_TEAMS,
  ...NFC_WEST_TEAMS,
  ...AFC_NORTH_TEAMS,
  ...AFC_EAST_TEAMS,
  ...AFC_SOUTH_TEAMS,
  ...AFC_WEST_TEAMS,
];

const START_SEASON = 1979;
const END_SEASON = 2024;

// ? Pull all the seasons from the DB and build selectable list dynamically?
// ? This would be more relevant than teams as every year there would be a new season.
// ? Then again thins is also an elegant solution... and I could do it dynamically with
// ? the current year for END_SEASON when DB is updating automatically?
export const NFL_SEASONS: NFLSeason[] = Array.from(
  { length: END_SEASON - START_SEASON + 1 },
  (_, index) => {
    const year = END_SEASON - index;
    return { selected: year === END_SEASON, year };
  },
);

export const NFLTeamLogoMap = new Map<string, string>(
  NFL_TEAMS.map<[string, string]>(({ name, image }) => {
    return [name, image];
  }),
);

export const NFL_ADDITIONAL_FILTERS: NFLAdditionalFilter[] = [
  {
    selected: false,
    name: NFLAdditionalFilterNames.HeadToHead,
  },
  {
    selected: false,
    name: NFLAdditionalFilterNames.NFC_North,
    division: NFL_DIVISIONS.NFC_NORTH,
  },
  {
    selected: false,
    name: NFLAdditionalFilterNames.NFC_East,
    division: NFL_DIVISIONS.NFC_EAST,
  },
  {
    selected: false,
    name: NFLAdditionalFilterNames.NFC_South,
    division: NFL_DIVISIONS.NFC_SOUTH,
  },
  {
    selected: false,
    name: NFLAdditionalFilterNames.NFC_West,
    division: NFL_DIVISIONS.NFC_WEST,
  },
  {
    selected: false,
    name: NFLAdditionalFilterNames.AFC_North,
    division: NFL_DIVISIONS.AFC_NORTH,
  },
  {
    selected: false,
    name: NFLAdditionalFilterNames.AFC_East,
    division: NFL_DIVISIONS.AFC_EAST,
  },
  {
    selected: false,
    name: NFLAdditionalFilterNames.AFC_South,
    division: NFL_DIVISIONS.AFC_SOUTH,
  },
  {
    selected: false,
    name: NFLAdditionalFilterNames.AFC_West,
    division: NFL_DIVISIONS.AFC_WEST,
  },
];

export const NFLTabs: NFLTab[] = [
  {
    tabId: NFLTabIds.Games,
    label: 'Games',
  },
  {
    tabId: NFLTabIds.Stats,
    label: 'Stats',
  },
];
