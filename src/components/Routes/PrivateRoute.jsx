
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { useContext } from 'react';


const PrivateRoute = ({ children }) => {
  const { user} = useContext(AuthContext);
  const location = useLocation();



  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;