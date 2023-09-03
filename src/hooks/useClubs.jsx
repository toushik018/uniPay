import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useClubs = () => {
  const { user } = useContext(AuthContext);

  const { data: clubs, isLoading, error } = useQuery(['clubs', user?.email], async () => {
    const res = await fetch('https://unipay-server-toushik018.vercel.app/clubs');
    return res.json();
  });

  return { clubs, isLoading, error };
};

export default useClubs;
