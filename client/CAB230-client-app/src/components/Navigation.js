import React from "react";
import { Link } from "react-router-dom";


function Navigation(props) {

  // Pass callback for logging out (resetting token)
  const setToken = props.setToken
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/VolcanoData">Volcano list</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/Register">Register</Link>
        </li>
        <li>
         
        <Link to="/Logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navigation