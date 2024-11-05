import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NFLGame } from './nflTypes';

export const NFLQueryKeys = {
  Games: 'Games',
} as const;

interface NflGamesPayload {
  seasons?: number[];
  teams?: string[];
}

const getNflGames = async ({ seasons, teams }: NflGamesPayload) => {
  return axios
    .post<NFLGame[]>('http://localhost:3000/api/nfl/games', {
      ...(seasons && seasons.length > 0 && { seasons }),
      ...(teams && teams.length > 0 && { teams }),
    })
    .then((response) => response.data);
};

export const useFetchNflGames = ({
  seasons = [new Date().getFullYear()],
  teams,
}: NflGamesPayload) => {
  return useQuery({
    queryKey: [NFLQueryKeys.Games, seasons, teams],
    queryFn: () => getNflGames({ seasons, teams }),
    refetchOnWindowFocus: false,
  });
};
