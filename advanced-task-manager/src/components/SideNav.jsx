import React from "react";
import { useState } from "react";
import profilePicture from "../assets/profilePicture.jpg";

const SideNav = ({ taskGroups, handleSetCurrentGroup }) => {
  const [sideNavOpened, setSideNavOpened] = useState(false);

  return (
    <nav
      className="lg:block hidden absolute left-0 min-w-[3rem] h-screen bg-neutral-200 z-[2]"
      onMouseEnter={() => {
        setSideNavOpened(true);
      }}
      onMouseLeave={() => {
        setSideNavOpened(false);
      }}
    >
      <ul className="flex flex-col items-center gap-5 py-7">
        <li>
          <img
            className="w-9 rounded-full cursor-pointer"
            src={profilePicture}
          ></img>
        </li>
        <li>
          <ul className="flex flex-col items-start mt-5 px-2 gap-4">
            {taskGroups.map((group, index) => (
              <div className="flex gap-3" key={index}>
                <span
                  className={`w-5 h-5 aspect-square rounded-md cursor-pointer`}
                  style={{ backgroundColor: `${group.color}` }}
                  onClick={() => {
                    handleSetCurrentGroup(index);
                  }}
                ></span>
                {sideNavOpened ? (
                  <p
                    className="max-w-[15rem] pr-[5rem] overflow-hidden whitespace-nowrap text-ellipsis font-mono cursor-pointer"
                    onClick={() => {
                      handleSetCurrentGroup(index);
                    }}
                  >
                    {group.name}
                  </p>
                ) : null}
              </div>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
