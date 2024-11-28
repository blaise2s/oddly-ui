import { ReactNode, useState } from 'react';
import { NFL_SEASONS, NFL_TEAMS } from './nflConstants';
import { NFLContext, NFLContextType } from './NFLContext';
import { GameOrderMap, NFLSeason, NFLTeam } from './nflTypes';

interface NFLContextProviderProps {
  children: ReactNode;
}

export const NFLContextProvider = ({ children }: NFLContextProviderProps) => {
  const [seasons, setSeasons] = useState<NFLSeason[]>(NFL_SEASONS);
  const [teams, setTeams] = useState<NFLTeam[]>(NFL_TEAMS);
  const [headToHeadSelected, setHeadToHeadSelected] = useState(false);
  const [gameOrderMap, setGameOrderMap] = useState<GameOrderMap>(
    new Map([
      // ['favorite', { priority: 2, sort: 'asc' }],
      // ['underdog', { priority: 3, sort: 'asc' }],
      ['date', { priority: 1, sort: 'desc' }],
    ]),
  );

  const nflContext: NFLContextType = {
    seasons,
    setSeasons,
    teams,
    setTeams,
    headToHeadSelected,
    setHeadToHeadSelected,
    gameOrderMap,
    setGameOrderMap,
  };

  return (
    <NFLContext.Provider value={nflContext}>{children}</NFLContext.Provider>
  );
};
