import { NFLTeam } from './nflTypes';

export const NFL_TEAMS: NFLTeam[] = [
  { name: 'Arizona Cardinals', image: '/nflTeams/arizona_cardinals.png' },
  { name: 'Atlanta Falcons', image: '/nflTeams/atlanta_falcons.png' },
  { name: 'Baltimore Ravens', image: '/nflTeams/baltimore_ravens.png' },
  { name: 'Buffalo Bills', image: '/nflTeams/buffalo_bills.png' },
  { name: 'Carolina Panthers', image: '/nflTeams/carolina_panthers.png' },
  { name: 'Chicago Bears', image: '/nflTeams/chicago_bears.png' },
  { name: 'Cincinnati Bengals', image: '/nflTeams/cincinnati_bengals.png' },
  { name: 'Cleveland Browns', image: '/nflTeams/cleveland_browns.png' },
  { name: 'Dallas Cowboys', image: '/nflTeams/dallas_cowboys.png' },
  { name: 'Denver Broncos', image: '/nflTeams/denver_broncos.png' },
  { name: 'Detroit Lions', image: '/nflTeams/detroit_lions.png' },
  { name: 'Green Bay Packers', image: '/nflTeams/green_bay_packers.png' },
  { name: 'Houston Texans', image: '/nflTeams/houston_texans.png' },
  { name: 'Indianapolis Colts', image: '/nflTeams/indianapolis_colts.png' },
  { name: 'Jacksonville Jaguars', image: '/nflTeams/jacksonville_jaguars.png' },
  { name: 'Kansas City Chiefs', image: '/nflTeams/kansas_city_chiefs.png' },
  { name: 'Las Vegas Raiders', image: '/nflTeams/las_vegas_raiders.png' },
  { name: 'Los Angeles Chargers', image: '/nflTeams/los_angeles_chargers.png' },
  { name: 'Los Angeles Rams', image: '/nflTeams/los_angeles_rams.png' },
  { name: 'Miami Dolphins', image: '/nflTeams/miami_dolphins.png' },
  { name: 'Minnesota Vikings', image: '/nflTeams/minnesota_vikings.png' },
  { name: 'New England Patriots', image: '/nflTeams/new_england_patriots.png' },
  { name: 'New Orleans Saints', image: '/nflTeams/new_orleans_saints.png' },
  { name: 'New York Giants', image: '/nflTeams/new_york_giants.png' },
  { name: 'New York Jets', image: '/nflTeams/new_york_jets.png' },
  { name: 'Philadelphia Eagles', image: '/nflTeams/philadelphia_eagles.png' },
  { name: 'Pittsburgh Steelers', image: '/nflTeams/pittsburgh_steelers.png' },
  { name: 'San Francisco 49ers', image: '/nflTeams/san_francisco_49ers.png' },
  { name: 'Seattle Seahawks', image: '/nflTeams/seattle_seahawks.png' },
  { name: 'Tampa Bay Buccaneers', image: '/nflTeams/tampa_bay_buccaneers.png' },
  { name: 'Tennessee Titans', image: '/nflTeams/tennessee_titans.png' },
  {
    name: 'Washington Commanders',
    image: '/nflTeams/washington_commanders.png',
  },
];

// TODO: Get this from an API call by querying the DB for unique seasons?
export const NFL_SEASONS = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
  2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999,
  1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986,
  1985, 1984, 1983, 1982, 1981, 1980, 1979,
];
