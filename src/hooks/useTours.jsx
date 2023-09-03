import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useTours = () => {
  const { user } = useContext(AuthContext);

  const { data: tours, isLoading, error } = useQuery(['tours', user?.email], async () => {
    const res = await fetch('https://unipay-server-toushik018.vercel.app/tours');
    return res.json();
  });

  return { tours, isLoading, error };
};

export default useTours;
