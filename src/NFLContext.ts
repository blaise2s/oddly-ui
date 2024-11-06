import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { NFLSeason, NFLTeam } from './nflTypes';

export interface NFLContextType {
  seasons: NFLSeason[];
  setSeasons: Dispatch<SetStateAction<NFLSeason[]>>;
  teams: NFLTeam[];
  setTeams: Dispatch<SetStateAction<NFLTeam[]>>;
  headToHeadSelected: boolean;
  setHeadToHeadSelected: Dispatch<SetStateAction<boolean>>;
}

export const NFLContext = createContext<NFLContextType | undefined>(undefined);

export const useNFLContext = () => {
  const context = useContext(NFLContext);
  if (!context) {
    throw new Error(
      'useNFLContext must be used within an <NFLContextProvider />',
    );
  }
  return context;
};