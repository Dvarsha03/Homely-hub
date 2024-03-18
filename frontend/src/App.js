import "./App.css";
//Importing necessary components amd functions from the react-router-dom library for routing.
import {
createBrowserRouter,
createRoutesFromElements,
Route,
RouterProvider,
} from "react-router-dom";
import Main from "./Components/Home/Main";
import PropertyList from "./Components/Home/PropertyList";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";
import Login from "./Components/User/Login";
import { Flip,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { currentUser } from "./Store/User/user-action";
import { userActions } from "./Store/User/user-slice";
import Signup from "./Components/User/Signup";
import Profile from "./Components/User/Profile";
import EditProfile from "./Components/User/EditProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import Payment from "./Components/Payment/Payment";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
function App() {
       const stripePromise = loadStripe(
              "pk_test_51OspNLSCykwA3KNHeAgxLLoO31pazUgoMYP31Lk20D4641jOWwiGYVvkyo03MHd4hi1MtbpJ5y9O5ICHs55jABFi00Nawm7rcs"
              );
       const dispatch = useDispatch();
       const {errors} =useSelector((state)=> state.user);
       useEffect(()=>{
              if(errors){
                     dispatch(userActions.clearError());
              }
              dispatch(currentUser());
       },[errors,dispatch]);
//mananges the routing configuration for the application.
const router = createBrowserRouter(
// creates routes from the elements passed to it.
createRoutesFromElements(
//defines a Route component that matches all paths "/" and renders the Main component.
//exact properties ensure that the route matches exactly what u gave in path
<Route path="/" element={<Main />} id="main" exact>
<Route id="home" index element={<PropertyList />} exact />
<Route 
element={<PropertyDetails/>}
       id="PropertyDetails" 
       path="propertylist/:id" 
       exact
       />
       <Route id="login" path="login" element={<Login/>}/>
       <Route id="signup" path="signup" element={<Signup/>}/>
       <Route id="profile" path="profile" element={<Profile/>}/>
       <Route id="editprofile" path="editprofile" element={<EditProfile/>}/>
       <Route 
       id="updatepassword"
        path="user/updatepassword"
       element={<UpdatePassword/>}/>
       <Route
        id="forgotpassword"
       path="user/forgotpassword"
       element={<ForgotPassword/>}/>
       <Route
        id="resetpassword"
       path="user/resetPassword/:token"
       element={<ResetPassword/>}/>
       <Route 
       id="payment"
       path="payment/:propertyId"
       element={
              <Elements stripe={stripePromise}>
                <Payment/>
              </Elements>
       }/>   
</Route>
)
);
return (
<div className="App">
{/* This ensures that the rounting functionallity is available throughout the application */}
<RouterProvider router={router} />
<ToastContainer
position="bottom-center"
autoClose={3000}
draggable={true}
transition={Flip}/>
</div>
);
}
export default App;