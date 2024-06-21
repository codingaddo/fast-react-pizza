import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

const Header = () => {
  return (
    <header className="bg-yellow-500 flex items-center justify-between  uppercase px-4 py-3 border-b border-stone-200">
      <Link to={"/"} className=" tracking-widest">
        Fast Pizza.Co
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
};

export default Header;
