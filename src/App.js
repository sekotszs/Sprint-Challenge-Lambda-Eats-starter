import React from "react";
import Form from "./Form";
import { Route, NavLink } from "react-router-dom";
import Home from "./Home";

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <p>Build Your Pizza</p>
    
     <div>
     <Route exact path= "/"> <Home /></Route>
 <Route path= "/Form"> <Form /></Route>
     </div>
    </>
  );
};
export default App;

