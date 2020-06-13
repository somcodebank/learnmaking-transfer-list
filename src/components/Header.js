import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <span>
        <Link to="/">Home</Link>
      </span>
      {/* <span>
        {" |"}
        <Link to="/filter">Filter List</Link>
      </span>
      <span>
        {" |"}
        <Link to="/sort">Sort List</Link>
      </span> */}
      <span>
        {" |"}
        <Link to="/xfer">Transfer List</Link>
      </span>
    </>
  );
};

export default Header;
