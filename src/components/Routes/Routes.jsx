import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration ";
import Tour from "../pages/Tour/PayFees";
import ToursPage from "../pages/Tour/TourPage";
import AddTour from "../pages/AddTour/AddTour";
import TourDetailsPage from "../pages/TourDetails/Tourdetails";
import ClubPage from "../pages/Club/ClubPage";
import AddClub from "../pages/AddClub/AddClub";



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
          path: '/club',
          element: <ClubPage></ClubPage>

        },
        {
          path: '/addclub',
          element: <AddClub></AddClub>

        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Registration></Registration>
        },
        {
          path:'tours',
          element: <ToursPage></ToursPage>
        },
        {
          path: '/addtour',
          element: <AddTour></AddTour>
        },
        {
          path: '/tours/:id',
          element: <TourDetailsPage />,
          loader: ({ params }) => fetch(`http://localhost:5000/tours/${params.id}`)
        }
        
      ]
    }
   
    
  ]);

  export default router;