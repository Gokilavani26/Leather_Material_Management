import { useContext } from "react";
import { authContext } from "./hooks/authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import ProductPage from "./pages/ProductPage";
import SupplierPage from "./pages/SupplierPage";
import EditSupplier from "./pages/EditSupplier";
import EditFinish from "./pages/EditFinish";
import EditRaw from "./pages/EditRaw";
import OrderPage from "./pages/OrderPage";
import BillingPage from "./pages/BillingPage";
import PaymentPage from "./pages/PaymentPage";
import ReportPage from "./pages/ReportPage";
import ForecastPage from "./components/ForecastPage";
import SuccessPage from './components/SuccessPage';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe publishable key
const stripePromise = loadStripe("pk_test_51NxiJlSIDBjc3MxT8rVMzlzCqxPwL6Mfz3YPIDcrzzSYijju4yTG7gFPMg2E171fpl61tqqpqYVHjoKYpxFrJa2s00G8KYBY22"); // Replace with your actual Stripe publishable key


function App() {
  const { user } = useContext(authContext);
  // const isAdmin = user && user.role === "admin";

  return (
    <>
    
      <Navbar />
      <Routes>

        <Route
          path="/*"
          element={user ? <ProductPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/*"
          element={user ? <ProductPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />

       {/* {isAdmin && ( */}
          <>

             <Route
          path="/supplier"
          element={user ? <SupplierPage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/payment"
          element={user ? <Elements stripe={stripePromise}> <PaymentPage /> </Elements>: <Navigate to={"/login"} />}
        />

    
        <Route
          path="/edit/supplier"
          element={user ? <EditSupplier /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/forecasts"
          element={user ? <ForecastPage /> : <Navigate to={"/login"} />}
        />

      <Route
          path="/report"
          element={user ? <ReportPage /> : <Navigate to={"/login"} />}
        />

         <Route
          path="/billing"
          element={user ? <BillingPage /> : <Navigate to={"/login"} />}
        />

          </>
        {/* )}  */}


      
        <Route
          path="/edit/finish"
          element={user ? <EditFinish /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/edit/raw"
          element={user ? <EditRaw /> : <Navigate to={"/login"} />}
        />
        
        <Route
          path="/orders"
          element={user ? <OrderPage /> : <Navigate to={"/login"} />}
        />

      <Route
          path="/success"
          element={user ? <SuccessPage /> : <Navigate to={"/login"} />}
        />
        
        
      </Routes>
    </>
  );
}

export default App;
