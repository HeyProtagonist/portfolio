import { SpeedInsights } from "@vercel/speed-insights/react";
import Terminal from "./components/Terminal/Terminal";
import Payload from "./assets/database/content.json";
import { Suspense, lazy, useEffect, useState } from "react";
import CopyRight from "./components/CopyRight";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Resume = lazy(() => import("./components/Resume"));
const WeddingCounter = lazy(
  () => import("./components/WeddingCounter/WeddingCounter"),
);
const Certs = lazy(() => import("./components/Certs"));

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
  private: boolean;
  topics: string[];
  updated_at: string;
}

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

  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.github.com/users/HeyProtagonist/repos?per_page=100&sort=updated",
    )
      .then((r) => r.json())
      .then((data: GithubRepo[]) => {
        const filtered = data.filter(
          (r) => !r.fork && r.description && r.name !== "HeyProtagonist",
        );
        setGithubRepos(filtered);
        setReposLoading(false);
      })
      .catch(() => {
        setReposError(true);
        setReposLoading(false);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/resume"
          element={
            <Suspense fallback={<div className="p-8">Loading...</div>}>
              <Resume resume={Payload.resume} />
            </Suspense>
          }
        />
        <Route
          path="/wedding"
          element={
            <Suspense fallback={<div className="p-8">Loading...</div>}>
              <WeddingCounter />
            </Suspense>
          }
        />
        <Route
          path="/certs"
          element={
            <Suspense fallback={<div className="p-8 text-[#FF003C]">Loading Certificates...</div>}>
              <Certs />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <div className="w-[100vw] md:w-[1000px] m-0 p-0 md:flex md:flex-col md:justify-start md:items-center md:gap-4 md:mx-auto">
              {/* Header */}
              <div className="w-full p-8 h-[8vh] font-semibold flex justify-end items-center gap-10 md:text-xl text-[#FF003C]">
                <a href="#contact-me">
                  <p>Contact</p>
                </a>
                <a href="#projects">
                  <p>Projects</p>
                </a>
                <a href="/certs">
                  <p>Certificates</p>
                </a>
                {/* <a href="/wedding">
                  <p>Wedding</p>
                </a> */}
                <a href="/resume">
                  <p>Resume</p>
                </a>
              </div>

              {/* Name */}
              <div className="px-2 py-4 md:pt-20 w-full text-6xl md:text-7xl font-medium md:font-extrabold flex items-start justify-start gap-2.5">
                <p className="font-mono leading-[3.3rem] md:leading-[4.4rem]">
                  {">"}
                </p>
                <p className="w-full overflow-hidden text-ellipsis typing-text">
                  {displayText}
                  <span className="inline-block w-4 h-10 md:w-8 md:h-16 bg-[#272932] dark:bg-[#D1C5C0] ml-1 animate-blink"></span>
                </p>
              </div>

              {/* Quick Note */}
              <div className="px-2 py-4 w-full flex flex-col justify-start items-start md:text-2xl gap-2">
                <p>{Payload["quickNote"]}</p>
              </div>

              {/* Go to Projects */}
              <div className="px-2 py-4 w-full flex justify-start items-center md:text-2xl">
                <p>
                  Check out my{" "}
                  <span>
                    <a
                      className="text-[#FF003C] font-semibold"
                      href="#projects"
                    >
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
                  {reposLoading ? (
                    [1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-[90%] md:w-[60%] rounded-xl flex flex-col gap-4 p-4 m-4 outline-2 opacity-40 animate-pulse"
                      >
                        <div className="h-7 rounded w-1/2 bg-current opacity-10" />
                        <div className="h-4 rounded w-full bg-current opacity-10" />
                        <div className="h-4 rounded w-3/4 bg-current opacity-10" />
                      </div>
                    ))
                  ) : reposError ? (
                    <div className="text-center py-8">
                      <p className="text-lg mb-4 opacity-70">
                        Couldn't load repos.
                      </p>
                      <a
                        href="https://github.com/HeyProtagonist"
                        className="text-[#FF003C] font-semibold underline"
                      >
                        View GitHub profile
                      </a>
                    </div>
                  ) : (
                    githubRepos.map((repo) => (
                      <div
                        className="w-[90%] md:w-[60%] rounded-xl flex flex-col justify-between items-start gap-4 p-4 m-4 outline-2"
                        key={repo.id}
                      >
                        <p className="text-2xl font-black">{repo.name}</p>

                        <p className="overflow-ellipsis text-lg">
                          {repo.description}
                        </p>

                        {repo.topics.length > 0 && (
                          <div className="w-full flex gap-4 flex-wrap my-4">
                            {repo.topics.map((topic) => (
                              <div
                                className="px-2 outline-2 outline-[#80529d] text-[#80529d] dark:outline-[#39c4b6] dark:text-[#39c4b6] font-semibold rounded-lg"
                                key={topic}
                              >
                                {topic}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="w-full flex justify-baseline items-center gap-4">
                          <button
                            onClick={() =>
                              (window.location.href = repo.html_url)
                            }
                          >
                            <span>View Source</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
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
              <SpeedInsights />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
