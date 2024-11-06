import { ReactNode, useState } from 'react';
import { NFL_SEASONS, NFL_TEAMS } from './nflConstants';
import { NFLContext, NFLContextType } from './NFLContext';
import { NFLSeason, NFLTeam } from './nflTypes';

interface NFLContextProviderProps {
  children: ReactNode;
}

export const NFLContextProvider = ({ children }: NFLContextProviderProps) => {
  const [seasons, setSeasons] = useState<NFLSeason[]>(NFL_SEASONS);
  const [teams, setTeams] = useState<NFLTeam[]>(NFL_TEAMS);
  const [headToHeadSelected, setHeadToHeadSelected] = useState(false);

  const nflContext: NFLContextType = {
    seasons,
    setSeasons,
    teams,
    setTeams,
    headToHeadSelected,
    setHeadToHeadSelected,
  };

  return (
    <NFLContext.Provider value={nflContext}>{children}</NFLContext.Provider>
  );
};
