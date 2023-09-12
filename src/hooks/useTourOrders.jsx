import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useTourOrders = () => {
  const { user } = useContext(AuthContext);

  const { data: tourOrders, isLoading, error } = useQuery(['tourOrders', user?.email], async () => {
    const res = await fetch('http://localhost:5000/tourorders');
    return res.json();
  });

  return { tourOrders, isLoading, error };
};

export default useTourOrders;
