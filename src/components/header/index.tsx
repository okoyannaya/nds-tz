import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { RoutersPath } from "@containers/router/constants";

import "./header.styles.css";

export const Header = () => {
  const isAuth = localStorage.getItem("access_token") ?? "";

  const handleLogOut =()=>{
    localStorage.setItem("access_token", "")
    toast.info("The User has successfully logged out")
  }

  return isAuth ? (
    <nav className="navbar">
      <NavLink className="link" to={RoutersPath.NdsPage}>
        All Nds
      </NavLink>
      <NavLink className="link" to={RoutersPath.CreateNds}>
        Create Nds
      </NavLink>
      <NavLink className="link" onClick={handleLogOut} to={RoutersPath.AuthPage}>
        Log out
      </NavLink>
    </nav>
  ) : null;
};
