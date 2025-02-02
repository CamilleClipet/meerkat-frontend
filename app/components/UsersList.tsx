'use client'; // This marks this file as a Client Component

import { useUsersQuery, User } from "@/app/hooks/useUsersQuery";

export default function UsersList() {
  const { data, isLoading, error } = useUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>An error has occurred: {error.message}</div>;

  if (!data || data.length === 0) {
    return <div>No users found :(</div>;
  }

  return (
    <div>
      {data.map((user: User) => (
        <div key={`${user.firstName}-${user.lastName}`}>
          {user.firstName} {user.lastName}
        </div>
      ))}
    </div>
  );
}
