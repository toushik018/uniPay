import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useTourOrders = () => {
  const { user } = useContext(AuthContext);

  const { data: tourOrders, isLoading, error } = useQuery(['tourOrders', user?.email], async () => {
    const res = await fetch('https://unipay-server-toushik018.vercel.app/tourorders');
    return res.json();
  });

  return { tourOrders, isLoading, error };
};

export default useTourOrders;
