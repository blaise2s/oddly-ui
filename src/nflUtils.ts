import {
  DivisionSelections,
  GetPercentagePayload,
  NFL_DIVISIONS,
  NFLAdditionalFilter,
  NFLGame,
  NFLTeam,
  SelectionStats,
} from './nflTypes';

export const compileStats = (games: NFLGame[]): SelectionStats => {
  const total_games = games.length;
  let over = 0;
  let under = 0;
  let over_under_pushed = 0;
  let favorite_won = 0;
  let underdog_won = 0;
  let tie_games = 0;
  let spread_won = 0;
  let spread_lost = 0;
  let spread_pushed = 0;
  let overtime_games = 0;

  games.forEach(
    ({ over_under_res, spread_res, overtime, tie, favorite_won: fav_won }) => {
      switch (over_under_res) {
        case 'OVER':
          over += 1;
          break;
        case 'UNDER':
          under += 1;
          break;
        case 'PUSH':
          over_under_pushed += 1;
          break;
      }

      switch (spread_res) {
        case 'WIN':
          spread_won += 1;
          break;
        case 'LOSS':
          spread_lost += 1;
          break;
        case 'PUSH':
          spread_pushed += 1;
          break;
      }

      if (overtime) {
        overtime_games += 1;
      }

      if (tie) {
        tie_games += 1;
      }

      if (fav_won) {
        favorite_won += 1;
      } else if (!tie) {
        underdog_won += 1;
      }
    },
  );

  return {
    total_games,
    over,
    under,
    over_under_pushed,
    favorite_won,
    underdog_won,
    tie_games,
    spread_won,
    spread_lost,
    spread_pushed,
    overtime_games,
  };
};

export const getPercentage = ({
  stat,
  total,
  fractionalDigits,
}: GetPercentagePayload) => {
  const percentage = (stat / total) * 100;
  return fractionalDigits
    ? `${percentage.toFixed(fractionalDigits)}%`
    : percentage;
};

export const splitAndCapitalize = (toSplit: string, splitOn = '_') => {
  return toSplit
    .split(splitOn)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getSelectedTeamNames = (teams: NFLTeam[]): string[] => {
  return teams.reduce<string[]>((accumulator, team) => {
    if (team.selected) {
      accumulator.push(team.name);
    }
    return accumulator;
  }, []);
};

export const getSelectedDivisionsFromTeams = (
  teams: NFLTeam[],
): DivisionSelections => {
  let activeNfcNorthTeams = 0;
  let activeNfcEastTeams = 0;
  let activeNfcSouthTeams = 0;
  let activeNfcWestTeams = 0;
  let activeAfcNorthTeams = 0;
  let activeAfcEastTeams = 0;
  let activeAfcSouthTeams = 0;
  let activeAfcWestTeams = 0;

  teams.forEach(({ selected, division }) => {
    if (selected) {
      switch (division) {
        case NFL_DIVISIONS.NFC_NORTH:
          activeNfcNorthTeams++;
          break;
        case NFL_DIVISIONS.NFC_EAST:
          activeNfcEastTeams++;
          break;
        case NFL_DIVISIONS.NFC_SOUTH:
          activeNfcSouthTeams++;
          break;
        case NFL_DIVISIONS.NFC_WEST:
          activeNfcWestTeams++;
          break;
        case NFL_DIVISIONS.AFC_NORTH:
          activeAfcNorthTeams++;
          break;
        case NFL_DIVISIONS.AFC_EAST:
          activeAfcEastTeams++;
          break;
        case NFL_DIVISIONS.AFC_SOUTH:
          activeAfcSouthTeams++;
          break;
        case NFL_DIVISIONS.AFC_WEST:
          activeAfcWestTeams++;
          break;
      }
    }
  });

  return {
    nfcNorthSelected: activeNfcNorthTeams === 4,
    nfcEastSelected: activeNfcEastTeams === 4,
    nfcSouthSelected: activeNfcSouthTeams === 4,
    nfcWestSelected: activeNfcWestTeams === 4,
    afcNorthSelected: activeAfcNorthTeams === 4,
    afcEastSelected: activeAfcEastTeams === 4,
    afcSouthSelected: activeAfcSouthTeams === 4,
    afcWestSelected: activeAfcWestTeams === 4,
  };
};

export const getSelectedDivisionsFromFilters = (
  additionalFilters: NFLAdditionalFilter[],
): DivisionSelections => {
  // const nfcNorthFilterIndex = additionalFilters.findIndex(
  //   (filter) => filter.name === NFLAdditionalFilterNames.NFC_North,
  // );
  // const nfcNorthSelected =
  //   nfcNorthFilterIndex > -1 && additionalFilters[nfcNorthFilterIndex].selected;

  // const nfcEastFilterIndex = additionalFilters.findIndex(
  //   (filter) => filter.name === NFLAdditionalFilterNames.NFC_East,
  // );
  // const nfcEastSelected =
  //   nfcEastFilterIndex > -1 && additionalFilters[nfcEastFilterIndex].selected;

  // const nfcSouthFilterIndex = additionalFilters.findIndex(
  //   (filter) => filter.name === NFLAdditionalFilterNames.NFC_South,
  // );
  // const nfcSouthSelected =
  //   nfcSouthFilterIndex > -1 && additionalFilters[nfcSouthFilterIndex].selected;

  // const nfcWestFilterIndex = additionalFilters.findIndex(
  //   (filter) => filter.name === NFLAdditionalFilterNames.NFC_West,
  // );
  // const nfcWestSelected =
  //   nfcWestFilterIndex > -1 && additionalFilters[nfcWestFilterIndex].selected;

  let nfcNorthSelected = false;
  let nfcEastSelected = false;
  let nfcSouthSelected = false;
  let nfcWestSelected = false;
  let afcNorthSelected = false;
  let afcEastSelected = false;
  let afcSouthSelected = false;
  let afcWestSelected = false;

  additionalFilters.forEach(({ selected, division }) => {
    if (division) {
      switch (division) {
        case NFL_DIVISIONS.NFC_NORTH:
          nfcNorthSelected = selected;
          break;
        case NFL_DIVISIONS.NFC_EAST:
          nfcEastSelected = selected;
          break;
        case NFL_DIVISIONS.NFC_SOUTH:
          nfcSouthSelected = selected;
          break;
        case NFL_DIVISIONS.NFC_WEST:
          nfcWestSelected = selected;
          break;
        case NFL_DIVISIONS.AFC_NORTH:
          afcNorthSelected = selected;
          break;
        case NFL_DIVISIONS.AFC_EAST:
          afcEastSelected = selected;
          break;
        case NFL_DIVISIONS.AFC_SOUTH:
          afcSouthSelected = selected;
          break;
        case NFL_DIVISIONS.AFC_WEST:
          afcWestSelected = selected;
          break;
      }
    }
  });

  return {
    nfcNorthSelected,
    nfcEastSelected,
    nfcSouthSelected,
    nfcWestSelected,
    afcNorthSelected,
    afcEastSelected,
    afcSouthSelected,
    afcWestSelected,
  };
};

export const findChangingDivision = (
  prev: DivisionSelections,
  current: DivisionSelections,
): keyof DivisionSelections | null => {
  for (const key in prev) {
    if (
      prev[key as keyof DivisionSelections] !==
      current[key as keyof DivisionSelections]
    ) {
      return key as keyof DivisionSelections;
    }
  }
  return null;
};
