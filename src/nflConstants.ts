import {
  NFLAdditionalFilter,
  NFLAdditionalFilterNames,
  NFLSeason,
  NFLTab,
  NFLTeam,
  NFL_DIVISIONS,
} from './nflTypes';

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

export const NFL_SEASONS: NFLSeason[] = [
  { selected: true, year: 2024 },
  { selected: false, year: 2023 },
  { selected: false, year: 2022 },
  { selected: false, year: 2021 },
  { selected: false, year: 2020 },
  { selected: false, year: 2019 },
  { selected: false, year: 2018 },
  { selected: false, year: 2017 },
  { selected: false, year: 2016 },
  { selected: false, year: 2015 },
  { selected: false, year: 2014 },
  { selected: false, year: 2013 },
  { selected: false, year: 2012 },
  { selected: false, year: 2011 },
  { selected: false, year: 2010 },
  { selected: false, year: 2009 },
  { selected: false, year: 2008 },
  { selected: false, year: 2007 },
  { selected: false, year: 2006 },
  { selected: false, year: 2005 },
  { selected: false, year: 2004 },
  { selected: false, year: 2003 },
  { selected: false, year: 2002 },
  { selected: false, year: 2001 },
  { selected: false, year: 2000 },
  { selected: false, year: 1999 },
  { selected: false, year: 1998 },
  { selected: false, year: 1997 },
  { selected: false, year: 1996 },
  { selected: false, year: 1995 },
  { selected: false, year: 1994 },
  { selected: false, year: 1993 },
  { selected: false, year: 1992 },
  { selected: false, year: 1991 },
  { selected: false, year: 1990 },
  { selected: false, year: 1989 },
  { selected: false, year: 1988 },
  { selected: false, year: 1987 },
  { selected: false, year: 1986 },
  { selected: false, year: 1985 },
  { selected: false, year: 1984 },
  { selected: false, year: 1983 },
  { selected: false, year: 1982 },
  { selected: false, year: 1981 },
  { selected: false, year: 1980 },
  { selected: false, year: 1979 },
];

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

export const NFLTabIds = {
  Games: 'games',
  Stats: 'stats',
} as const;

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
