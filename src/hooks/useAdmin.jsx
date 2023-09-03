import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";


const useAdmin = () => {
  const { user } = useAuth();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      const response = await fetch(`https://unipay-server-toushik018.vercel.app/users/admin/${user?.email}`);
      const data = await response.json();
      console.log(data);
      return data.admin;
    },
  });
  return [isAdmin];
};

export default useAdmin;
