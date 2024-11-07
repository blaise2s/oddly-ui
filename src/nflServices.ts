import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NFLGame, NFLGameColumnId } from './nflTypes';
import { Order } from './globalTypes';

export const NFLQueryKeys = {
  Games: 'Games',
} as const;

interface NflGamesPayload {
  seasons?: number[];
  teams?: string[];
  orders?: Order<NFLGameColumnId>[];
  headToHead?: boolean;
}

const getNflGames = async ({
  seasons,
  teams,
  orders,
  headToHead,
}: NflGamesPayload) => {
  return axios
    .post<NFLGame[]>('http://localhost:3000/api/nfl/games', {
      ...(seasons && seasons.length > 0 && { seasons }),
      ...(teams && teams.length > 0 && { teams }),
      ...(orders && orders.length > 0 && { order: orders }),
      ...(headToHead && { headToHead }),
    })
    .then((response) => response.data);
};

export const useFetchNflGames = ({
  seasons = [new Date().getFullYear()],
  teams,
  orders,
  headToHead,
}: NflGamesPayload) => {
  return useQuery({
    queryKey: [NFLQueryKeys.Games, seasons, teams, orders, headToHead],
    queryFn: () => getNflGames({ seasons, teams, orders, headToHead }),
    refetchOnWindowFocus: false,
  });
};
