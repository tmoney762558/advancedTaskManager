import React from "react";
import { useState, useEffect, useRef } from "react";
import { SideNav } from "./";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

const Dashboard = () => {
  const [taskGroups, setTaskGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentWindow, setCurrentWindow] = useState("dashboard");
  const priorityValues = ["Low", "Medium", "High", "Urgent"];

  const groupInput = useRef();
  const colorInput = useRef();
  const taskInput = useRef();

  // Main Objective 11/20/24: Implement selecting colors and urgency for tasks as well as fully implement the side nav. Also add local storage.
  // Side Objectives 11/20/24:

  return (
    <div className="w-full h-full relative lg:px-siteXLg px-siteXSm lg:pl-[4.7rem] pl-[4.7rem]">
      <SideNav></SideNav>
      {currentWindow === "dashboard" ? (
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="mt-5 text-2xl font-bold">Dashboard</h1>
          <div className="flex justify-center items-center w-full mt-7">
            <input
              className="w-full max-w-[35rem] py-2 pl-5 pr-[2.5rem] bg-neutral-200 rounded-full outline-none"
              type="text"
              placeholder="Create a New Group"
              ref={groupInput}
            ></input>
            <button
              className="w-10 aspect-square ml-[-2rem] bg-neutral-300 rounded-full"
              onClick={() => {
                const input = groupInput.current.value;
                if (input === "") {
                  alert("Please enter a valid value.");
                  return;
                }
                groupInput.current.value = "";
                setTaskGroups((prevGroups) => [
                  ...prevGroups,
                  { name: input, color: "black", tasks: [] },
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
                  className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis text-lg font-mono"
                  onClick={() => {
                    setCurrentGroup(index);
                    setCurrentWindow("taskView");
                    console.log(index);
                  }}
                >
                  {group.name}
                </p>
                <div className="flex flex-1 justify-end items-center gap-5">
                  <input
                    className="w-[1.5rem] h-[1.7rem] bg-transparent"
                    type="color"
                    defaultValue={group.color}
                    onChange={(e) => {
                      group.color = e.target.value;
                    }}
                  ></input>
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
          <div className="flex justify-end w-full py-5">
            <IoClose
              className="cursor-pointer"
              fontSize={"1.5rem"}
              onClick={() => {
                setCurrentWindow("dashboard");
              }}
            ></IoClose>
          </div>
          <h1 className="mt-5 text-2xl font-bold">
            {taskGroups[currentGroup].name}
          </h1>
          <div className="flex justify-center items-center w-full mt-7">
            <input
              className="w-full max-w-[35rem] py-2 pl-5 pr-[2.5rem] bg-neutral-200 rounded-full outline-none"
              type="text"
              placeholder="Create a New Task"
              ref={taskInput}
            ></input>
            <button
              className="w-10 aspect-square ml-[-2rem] bg-neutral-300 rounded-full"
              onClick={() => {
                const input = taskInput.current.value;
                if (input === "") {
                  alert("Please enter a valid value.");
                  return;
                }
                taskInput.current.value = "";
                setTaskGroups((prevTaskGroups) =>
                  prevTaskGroups.map((group, index) =>
                    index === currentGroup
                      ? {
                          ...group,
                          tasks: [...group.tasks, { name: input, priority: 0 }],
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
                <p className="flex-1 w-full overflow-hidden whitespace-nowrap text-ellipsis font-mono">
                  {task.name}
                </p>
                <div className="flex flex-1 justify-end items-center gap-5">
                  <p className="font-mono" onClick={() => {
                    task.priority++;
                    if (task.priority === 5) {
                      task.prority === 0;
                    }
                    setTaskGroups(taskGroups);
                  }}>
                    Priority: {priorityValues[task.priority]}
                  </p>
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
