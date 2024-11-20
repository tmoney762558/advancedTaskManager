import React from "react";
import profilePicture from "../assets/profilePicture.jpg";

const SideNav = () => {
  return (
    <nav className="absolute left-0 w-[3rem] h-screen bg-neutral-200 z-[2]">
      <ul className="flex flex-col items-center gap-5 py-7">
        <li>
          <img className="w-9 rounded-full cursor-pointer" src={profilePicture}></img>
        </li>
        <li>
          <ul className="flex flex-col gap-4">
            {/* taskGroups.map((group) => (
              <span className="w-5 aspect-square bg-[{group.color}] rounded-md"></span>
              )) */}
            <span className="w-5 aspect-square bg-blue-800 rounded-md"></span>
            <span className="w-5 aspect-square bg-yellow-500 rounded-md"></span>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
