import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import { useSelector } from "react-redux";

const Header = () => {
  const username = useSelector((state) => state.user.userName);
  return (
    <header className="bg-yellow-500 flex items-center justify-between  uppercase px-4 py-3 border-b border-stone-200">
      <Link to={"/"} className=" tracking-widest">
        Fast Pizza.Co
      </Link>
      <SearchOrder />
      {/* <UserName /> */}
      {!username ? "" : <div className="text-sm font-semibold">{username}</div>}
    </header>
  );
};

export default Header;
