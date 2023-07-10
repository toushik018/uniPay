import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useTours = () => {
   const {user} = useContext(AuthContext);

   const {} = useQuery( {
    queryKey: ['tours', user?.email],
    queryFn: async () => {
        const res = await fetch('http://localhost:5000/tours')
    }
   })
};

export default useTours;