import { NFL_DIVISIONS, NFLTeam } from './nflTypes';

export const getSelectedDivisions = (teams: NFLTeam[]) => {
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
