import { useQuery } from '@tanstack/react-query';
import {Genre, Instrument} from "@/app/utils/types";

export type User = {
  firstName: string;
  lastName: string;
  zipcode: number;
  instruments: Instrument[];
  genres: Genre[]
};

export function useUsersQuery() {
  return useQuery<User[]>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/user');
      return response.json();
    },
  });
}
