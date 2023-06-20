import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration ";
import Tour from "../pages/Tour/PayFees";
import ToursPage from "../pages/Tour/TourPage";


  const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/payfee',
          element: <Tour></Tour>
        },
        {
          path: '/tours',
          element: <ToursPage></ToursPage>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Registration></Registration>
        }
      ]
    }
   
    
  ]);

  export default router;