import React from "react";
import { useState, useEffect, useRef } from "react";
import { SideNav } from "./";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const Dashboard = () => {
  const [taskGroups, setTaskGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentWindow, setCurrentWindow] = useState("dashboard");

  const groupInput = useRef();
  const taskInput = useRef();

  return (
    <div className="w-full h-full relative lg:px-siteXLg px-siteXSm lg:pl-[4.7rem] pl-[4rem]">
      <SideNav></SideNav>
      {currentWindow === "dashboard" ? (
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="mt-5 text-2xl font-bold">Dashboard</h1>
          <div className="flex justify-center items-center relative mt-7">
            <input
              className="min-w-[25rem] py-2 pl-5 bg-neutral-200 rounded-full outline-none"
              type="text"
              placeholder="Create a New Group"
              ref={groupInput}
            ></input>
            <button
              className="w-10 aspect-square absolute right-0 bg-neutral-300 rounded-full"
              onClick={() => {
                const input = groupInput.current.value;
                groupInput.current.value = "";
                setTaskGroups((prevGroups) => [
                  ...prevGroups,
                  { name: input, color: "red", tasks: [] },
                ]);
              }}
            >
              +
            </button>
          </div>
          <div className="flex flex-col items-center w-full mt-[5rem]">
            {taskGroups.map((group, index) => (
              <div
                className={`flex justify-between items-center w-full max-w-[35rem] py-2 px-5 bg-${
                  index % 2 === 0 ? "neutral-200" : "neutral-300"
                }
                } cursor-pointer`}
                key={index}
              >
                <p
                  className="text-lg font-mono"
                  onClick={() => {
                    setCurrentGroup(index);
                    setCurrentWindow("taskView");
                    console.log(index);
                  }}
                >
                  {group.name}
                </p>
                <div className="flex gap-5">
                  <div
                    className="w-5 aspect-square"
                    style={{ backgroundColor: group.color }}
                  ></div>
                  <IoClose
                    className="cursor-pointer"
                    onClick={() => {
                      setTaskGroups((prevGroups) =>
                        prevGroups.filter((_, i) => i !== index)
                      );
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {currentWindow === "taskView" ? (
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-end relative w-full py-5">
            <IoClose
              className="absolute cursor-pointer"
              fontSize={"1.5rem"}
              onClick={() => {
                setCurrentWindow("dashboard");
              }}
            ></IoClose>
          </div>
          <h1 className="mt-5 text-2xl font-bold">
            {taskGroups[currentGroup].name}
          </h1>
          <div className="flex justify-center items-center relative mt-7">
            <input
              className="min-w-[25rem] py-2 pl-5 bg-neutral-200 rounded-full outline-none"
              type="text"
              placeholder="Create a New Task"
              ref={taskInput}
            ></input>

            <button
              className="w-10 aspect-square absolute right-0 bg-neutral-300 rounded-full"
              onClick={() => {
                const input = taskInput.current.value;
                taskInput.current.value = "";
                setTaskGroups((prevTaskGroups) =>
                  prevTaskGroups.map((group, index) =>
                    index === currentGroup
                      ? {
                          ...group,
                          tasks: [
                            ...group.tasks,
                            { name: input, priority: "Urgent" },
                          ],
                        }
                      : group
                  )
                );
              }}
            >
              +
            </button>
          </div>
          <div className="flex flex-col items-center w-full mt-[5rem]">
            {taskGroups[currentGroup].tasks.map((task, index) => (
              <div
                className={`flex justify-between items-center w-full max-w-[35rem] py-2 px-5 bg-${
                  index % 2 === 0 ? "neutral-200" : "neutral-300"
                }
            } cursor-pointer`}
                key={index}
              >
                <p className="font-mono">{task.name}</p>
                <div className="flex items-center gap-5">
                  <p className="font-mono">Priority: {task.priority}</p>
                  <IoClose
                    className="cursor-pointer"
                    fontSize={"1.3rem"}
                    onClick={() => {
                      setTaskGroups((prevGroups) =>
                        prevGroups.map((group, idx) =>
                          idx === currentGroup
                            ? {
                                ...group,
                                tasks: group.tasks.filter(
                                  (_, i) => i !== index
                                ),
                              }
                            : group
                        )
                      );
                    }}
                  ></IoClose>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
