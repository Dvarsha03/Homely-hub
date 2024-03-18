import { createSlice } from "@reduxjs/toolkit";
const propertySlice = createSlice({
    //slice name
    name:"property",
 //intialize start for property slice
 initialState:{
    properties:[],
    totalProperties:0,
    searchParams:{},//Parameters used to search
    error:null,//Error state
    loading: false,//loading state for the property
 },
 //reduces the function to handle diff functions
 reducers:{
    getRequest(state){
        state.loading=true;
    },
        //action update properties
   
    getProperties(state,action){
       state.properties = action.payload.data;
       state.totalProperties=action.payload.all_properties;
       state.loading=false;
    },
    //Action to search parameters
    updateSearchParams : (state,action)=>{
        state.searchParams =
        Object.keys(action.payload).length ===0
        ? {}
        : {
           ...state.searchParams,
           ...action.payload,
          };
    },
    //Action to update the error state
    getErrors(state,action){
        state.error = action.payload;
    },
 },
});
export const propertyAction = propertySlice.actions;
export default propertySlice;