
import { useQuery } from "@tanstack/react-query";

const useUsersData = () => {
  const { data: users = [], refetch } = useQuery(['users'], async () => {
    const res = await fetch('http://localhost:5000/users');
    return res.json();
  });

  return { users, refetch };
};

export default useUsersData;
