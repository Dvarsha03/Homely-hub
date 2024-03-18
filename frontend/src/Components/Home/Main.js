//importing the raect library from the react to the js file
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
//this is an arrow function
//outlet is used to render the content of neste routes.
const Main = () => {
  return (
    <div>
      {/* Rendering the Header ,Footer Component and Outlet */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;