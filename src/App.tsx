import Terminal from "./components/Terminal/Terminal";
import Payload from "./assets/database/content.json";
import { useEffect, useState } from "react";
import CopyRight from "./components/CopyRight";

function App() {
  const [displayText, setDisplayText] = useState(""); // Tracks typed text
  const [index, setIndex] = useState(0); // Tracks position of typing

  useEffect(() => {
    if (index < Payload.name.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + Payload.name[index]);
        setIndex(index + 1);
      }, 160); // Adjust typing speed here (100ms per character)
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="w-[100vw] md:w-[1000px] m-0 p-0 md:flex md:flex-col md:justify-start md:items-center md:gap-4 md:mx-auto">
      {/* Header */}
      <div className="w-full p-8 h-[8vh] font-semibold flex justify-end items-center gap-10 md:text-xl text-[#FF003C]">
        <a href="#contact-me">
          <p>Contact</p>
        </a>
        <a href="#projects">
          <p>Projects</p>
        </a>
      </div>

      {/* Name */}
      <div className="px-2 py-4 md:pt-20 w-full text-6xl md:text-7xl font-medium md:font-extrabold flex items-start justify-start gap-2.5">
        <p className="font-mono leading-[3.3rem] md:leading-[4.4rem]">{">"}</p>
        <p className="w-full overflow-hidden text-ellipsis typing-text">
          {displayText}
          <span className="inline-block w-4 h-10 md:w-8 md:h-16 bg-[#272932] dark:bg-[#D1C5C0] ml-1 animate-blink"></span>
        </p>
      </div>

      {/* Quick Note */}
      <div className="px-2 py-4 w-full flex justify-start items-center md:text-2xl">
        <p>{Payload["quickNote"]}</p>
      </div>

      {/* Go to Projects */}
      <div className="px-2 py-4 w-full flex justify-start items-center md:text-2xl">
        <p>
          Check out my{" "}
          <span>
            <a className="text-[#FF003C] font-semibold" href="#projects">
              Side Projects
            </a>
          </span>{" "}
          below.
        </p>
      </div>

      {/* Terminal */}
      <Terminal payload={Payload} />

      {/* Projects */}
      <div id="projects" className="w-full">
        <div className="w-full py-8 flex flex-col justify-center items-center gap-3">
          <p className="text-4xl font-black">Projects</p>
          <div className="w-20 h-2 bg-black" />
        </div>

        <div className="w-full flex flex-col items-center py-8 px-2">
          {Payload.projects.map((project, index) => {
            return (
              <div
                className="w-[90%] md:w-[60%] rounded-xl flex flex-col justify-between items-start gap-4 p-4 m-4 outline-2"
                key={`${project.name}-${index}`}
              >
                <p className="text-2xl font-black">{project.name}</p>

                <p className="overflow-ellipsis text-lg">
                  {project.description}
                </p>

                <div className="w-full flex gap-4 flex-wrap my-10">
                  {project.techStack.map(($) => {
                    return (
                      <div
                        className="px-2 outline-2 outline-[#80529d] text-[#80529d] dark:outline-[#39c4b6] dark:text-[#39c4b6] font-semibold rounded-lg"
                        key={Math.random().toString(36)}
                      >
                        {$}
                      </div>
                    );
                  })}
                </div>

                <div className="w-full flex justify-baseline items-center gap-4">
                  <button
                    onClick={() => (window.location.href = project.live)}
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    <span>Live Demo</span>
                  </button>

                  <button
                    onClick={() => (window.location.href = project.github)}
                  >
                    <span>View Source</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact */}
      <div className="w-full" id="contact-me">
        <div className="w-full py-8 flex flex-col justify-center items-center gap-3">
          <p className="text-4xl font-black">Contact</p>
          <div className="w-20 h-2 bg-black" />
        </div>

        <div className="w-full flex flex-col px-2 justify-center items-center gap-4">
          {Payload["contact-me"].map((contact, index) => {
            return (
              <a
                rel="me"
                href={contact.href}
                className="py-4 text-xl font-semibold underline underline-offset-4"
                key={index}
              >
                {contact.name}
              </a>
            );
          })}
        </div>
      </div>

      {/* Copyright */}
      <CopyRight />
    </div>
  );
}

export default App;
