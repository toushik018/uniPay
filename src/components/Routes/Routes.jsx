import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration ";
import Tour from "../pages/Tour/TourCheckout";
import ToursPage from "../pages/Tour/TourPage";
import AddTour from "../pages/AddTour/AddTour";
import TourDetailsPage from "../pages/TourDetails/Tourdetails";
import ClubPage from "../pages/Club/ClubPage";
import AddClub from "../pages/AddClub/AddClub";
import AllStudents from "../pages/AllStudents/AllStudents";
import ClubCheckout from "../pages/Club/ClubCheckout";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed/PaymentFailed";
import PaymentHistory from "../pages/PaymentHistory/PaymentHistory";
import TourCheckout from "../pages/Tour/TourCheckout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";



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
          path: '/clubs',
          element: <ClubPage></ClubPage>

        },
        {
          path: '/addclub',
          element: <AdminRoute><AddClub></AddClub></AdminRoute>

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
          element: <AdminRoute><AddTour></AddTour></AdminRoute>
        },
        {
          path: '/tours/:id',
          element: <TourDetailsPage />,
          loader: ({ params }) => fetch(`http://localhost:5000/tours/${params.id}`)
        }, 
        {
          path: 'students',
          element: <AdminRoute><AllStudents></AllStudents></AdminRoute>
        },

        {
          path: '/checkout/:id',
          element:<PrivateRoute><ClubCheckout /></PrivateRoute>,
          loader: ({ params }) => fetch(`http://localhost:5000/clubs/${params.id}`)
        },
        {
          path: '/tours-checkout/:id',
          element: <PrivateRoute><TourCheckout></TourCheckout></PrivateRoute>,
          loader: ({ params }) => fetch(`http://localhost:5000/tours/${params.id}`)
        }, 
        
        {
          path: 'payment/success/:tranId',
          element: <PaymentSuccess></PaymentSuccess>
        },
        {
          path: 'payment/fail/:tranId',
          element: <PaymentFailed></PaymentFailed>
        },
        {
          path: '/transaction-history',
          element: <AdminRoute><PaymentHistory></PaymentHistory></AdminRoute>
        }
        
      ]
    }
   
    
  ]);

  export default router;