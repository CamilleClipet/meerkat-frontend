import { useMutation } from '@tanstack/react-query';
import {User} from "@/app/hooks/useUsersQuery";
import {useRouter} from "next/navigation";

type CreateUserInput = {
  firstName: string;
  lastName: string;
  zipCode: number;
  instruments: string[];
  genres: string[];
};

export function useCreateUserMutation() {
  const router = useRouter();
  return useMutation<User, Error, CreateUserInput>({
    mutationFn: async ({ firstName, lastName, zipCode, instruments, genres }) => {
      const response = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          zipCode,
          instruments,
          genres,
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating user');
      }

      return response.json();
    },
    onSuccess: () => {
      setTimeout(() => router.push('/users'),1000);
    }
  });
}
