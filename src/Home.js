import React from "react";
import { Route, NavLink } from "react-router-dom";



function Home(){



    return(
        <nav>
    
      <div>
        <NavLink to='/'>Home Page</NavLink>
        <NavLink to='/Form'>Order</NavLink>
      </div>
      </nav>
    )
}

export default Home
