import {configureStore} from "@reduxjs/toolkit";
import propertySlice from "./Property/property-slice";
import propertyDetailsSlice from "./PropertyDetails.js/propertyDetails-slice";
import userSlice from "./User/user-slice";
import paymentSlice from "./Payment/Payment-slice";
const store = configureStore({
    reducer:{
        properties:propertySlice.reducer,
        propertydetails:propertyDetailsSlice.reducer,
        user:userSlice.reducer,
        payment: paymentSlice.reducer,
    },
});
export default store;