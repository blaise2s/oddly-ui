import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NFLGame } from './nflTypes';

export const NFLQueryKeys = {
  Games: 'Games',
} as const;

interface NflGamesPayload {
  seasons?: number[];
  teams?: string[];
  headToHead?: boolean;
}

const getNflGames = async ({ seasons, teams, headToHead }: NflGamesPayload) => {
  return axios
    .post<NFLGame[]>('http://localhost:3000/api/nfl/games', {
      ...(seasons && seasons.length > 0 && { seasons }),
      ...(teams && teams.length > 0 && { teams }),
      ...(headToHead && { headToHead }),
    })
    .then((response) => response.data);
};

export const useFetchNflGames = ({
  seasons = [new Date().getFullYear()],
  teams,
  headToHead,
}: NflGamesPayload) => {
  return useQuery({
    queryKey: [NFLQueryKeys.Games, seasons, teams, headToHead],
    queryFn: () => getNflGames({ seasons, teams, headToHead }),
    refetchOnWindowFocus: false,
  });
};
