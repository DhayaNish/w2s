import React from "react";
import "./header.css";
import { FaUserCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const Header = ({title}) => {
  let history = useHistory();

  const logout=()=>{
    localStorage.clear()
     history.push('/')
  }

  return (
    <nav class="navbar navbar-light bg-light shadow-sm">
      <div class="container ">
        <a class="navbar-brand">{title}</a>
        <form class="d-flex ml-3">
          <div class="btn-group dropstart">
              <FaUserCircle className="user-icon" data-bs-toggle="dropdown" aria-expanded="false" />
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#" onClick={()=>history.push('/Profile')}>
                  Profile
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#"  onClick={()=>logout()}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Header;
