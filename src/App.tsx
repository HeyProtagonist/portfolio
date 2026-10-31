import { SpeedInsights } from "@vercel/speed-insights/react";
import Terminal from "./components/Terminal/Terminal";
import Payload from "./assets/database/content.json";
import { Suspense, lazy, useEffect, useState } from "react";
import CopyRight from "./components/CopyRight";
import SectionHeader from "./components/SectionHeader";
import NavBar from "./components/NavBar";
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
  size: number;
}

// `size` lags behind, so a 0 may still have commits; confirm via the commits API (409 = empty repo).
// Any other failure keeps the repo rather than hiding it.
async function hasCommits(repo: GithubRepo): Promise<boolean> {
  if (repo.size > 0) return true;
  try {
    const res = await fetch(
      `https://api.github.com/repos/HeyProtagonist/${repo.name}/commits?per_page=1`,
    );
    return res.status !== 409;
  } catch {
    return true;
  }
}

const REPO_CACHE_KEY = "github-repos";
const REPO_CACHE_TTL = 60 * 60 * 1000; // 1 hour

// Storage can throw (private mode, blocked site data), so every access is guarded
function readRepoCache(): { at: number; repos: GithubRepo[] } | null {
  try {
    const raw = localStorage.getItem(REPO_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeRepoCache(repos: GithubRepo[]) {
  try {
    localStorage.setItem(
      REPO_CACHE_KEY,
      JSON.stringify({ at: Date.now(), repos }),
    );
  } catch {
    // Cache is best-effort
  }
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
    const cached = readRepoCache();
    if (cached && Date.now() - cached.at < REPO_CACHE_TTL) {
      setGithubRepos(cached.repos);
      setReposLoading(false);
      return;
    }

    fetch(
      "https://api.github.com/users/HeyProtagonist/repos?per_page=100&sort=updated",
    )
      .then((r) => {
        // 403 here is usually GitHub's 60/hour anonymous rate limit
        if (!r.ok) throw new Error(`GitHub API ${r.status}`);
        return r.json();
      })
      .then(async (data: GithubRepo[]) => {
        const candidates = data.filter(
          (r) => !r.fork && r.description && r.name !== "HeyProtagonist",
        );
        const withCommits = await Promise.all(candidates.map(hasCommits));
        const repos = candidates.filter((_, i) => withCommits[i]);
        writeRepoCache(repos);
        setGithubRepos(repos);
        setReposLoading(false);
      })
      .catch(() => {
        // A stale list beats an error message
        if (cached) {
          setGithubRepos(cached.repos);
        } else {
          setReposError(true);
        }
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
            <Suspense
              fallback={
                <div className="p-8 text-[#FF003C]">
                  Loading Certificates...
                </div>
              }
            >
              <Certs />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <div className="cp-grid-bg min-h-screen">
              <div className="w-[100vw] md:w-[1000px] m-0 p-0 md:flex md:flex-col md:justify-start md:items-center md:gap-4 md:mx-auto">
                {/* Header */}
                <NavBar
                  links={[
                    { label: "Contact", href: "#contact-me" },
                    { label: "Projects", href: "#projects" },
                    { label: "Certificates", href: "/certs" },
                    // { label: "Wedding", href: "/wedding" },
                  ]}
                  cta={{ label: "Resume", href: "/resume" }}
                />

                {/* Name */}
                <div className="px-2 py-4 md:pt-20 w-full text-6xl md:text-7xl font-medium md:font-extrabold flex items-start justify-start gap-2.5 text-cp-cdpr dark:text-cp-yellow">
                  <p className="font-mono leading-[3.3rem] md:leading-[4.4rem]">
                    {">"}
                  </p>
                  <p className="w-full overflow-hidden text-ellipsis typing-text">
                    {displayText}
                    <span className="inline-block w-4 h-10 md:w-8 md:h-16 bg-cp-cdpr dark:bg-cp-yellow ml-1 animate-blink"></span>
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
                  <SectionHeader
                    module="PROJECTS.MODULE_INDEX"
                    title="Projects"
                    meta={
                      reposLoading
                        ? "SYNCING..."
                        : reposError
                          ? "OFFLINE"
                          : `${githubRepos.length} REPOS`
                    }
                  />

                  <div className="w-full flex flex-col items-center py-8 px-2">
                    {reposLoading ? (
                      [1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-full cp-frame flex flex-col gap-4 p-4 my-3 opacity-40 animate-pulse"
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
                          className="w-full cp-frame flex flex-col justify-between items-start gap-4 p-4 my-3"
                          key={repo.id}
                        >
                          <p className="text-2xl font-bold uppercase tracking-wide text-(--cp-accent)">
                            {repo.name}
                          </p>

                          <p className="overflow-ellipsis text-lg">
                            {repo.description}
                          </p>

                          {repo.topics.length > 0 && (
                            <div className="w-full flex gap-4 flex-wrap my-4">
                              {repo.topics.map((topic) => (
                                <div
                                  className="px-2 bg-cp-yellow text-[#0d0d0d] font-semibold uppercase text-sm"
                                  key={topic}
                                >
                                  {topic}
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="w-full flex justify-end items-center gap-4">
                            <button
                              className="cp-btn"
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
                  <SectionHeader
                    module="CONTACT.MODULE_LINKS"
                    title="Contact"
                    meta={`${Payload["contact-me"].length} CHANNELS`}
                  />

                  <div className="w-full grid grid-cols-1 md:grid-cols-2 px-2 gap-4">
                    {Payload["contact-me"].map((contact, index) => {
                      return (
                        <a
                          rel="me"
                          href={contact.href}
                          className="cp-btn w-full normal-case! text-lg"
                          key={index}
                        >
                          <span>{contact.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Copyright */}
                <CopyRight />
                <SpeedInsights />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
