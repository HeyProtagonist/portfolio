import { useEffect, useState } from "react";
import "./WeddingCounter.css";

const TARGET_DATE = new Date("2026-03-05T10:04:00");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function WeddingCounter({ bgImage }: { bgImage?: string }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());
  const [isZeroDay, setIsZeroDay] = useState(
    () => Date.now() >= TARGET_DATE.getTime(),
  );
  const [revealTyping, setRevealTyping] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalOpenedAt, setModalOpenedAt] = useState<number | null>(null);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwStatus, setPwStatus] = useState("");
  const [showSuccessGif, setShowSuccessGif] = useState(false);
  const BASE64_MATCH = "dGhhbmdha3VuanU="; // expected base64 of the correct password

  function toBase64(str: string) {
    try {
      // browser
      return btoa(str);
    } catch (e) {
      try {
        // Node fallback
        // @ts-ignore
        return Buffer.from(str, "utf8").toString("base64");
      } catch (e2) {
        return "";
      }
    }
  }

  function handlePwSubmit() {
    console.log("handlePwSubmit called", { pwInput });
    if (pwInput.trim().length === 0) {
      setPwError("Please enter the password");
      return;
    }
    setPwError("");
    setPwStatus("Verifying...");
    const encoded = toBase64(pwInput);
    console.log("encoded", encoded, "expected", BASE64_MATCH);
    if (encoded === BASE64_MATCH) {
      setPwError("");
      setPwStatus("Verification succeeded");
      // Ensure initial gif is visible for a short minimum before showing success GIF
      const now = Date.now();
      const openedAt = modalOpenedAt ?? now;
      const elapsed = now - openedAt;
      const minInitialMs = 600; // minimum time initial gif should be visible
      const successDuration = 1500; // time to show success GIF
      const delayBeforeSuccess = Math.max(0, minInitialMs - elapsed);

      setTimeout(() => {
        setShowSuccessGif(true);
        setTimeout(() => {
          setShowSuccessGif(false);
          setShowModal(false);
          setRevealTyping(true);
          setPwStatus("");
          setModalOpenedAt(null);
        }, successDuration);
      }, delayBeforeSuccess);
    } else {
      setPwError("Incorrect password");
      setPwStatus("");
    }
  }

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(getTimeLeft());
      if (Date.now() >= TARGET_DATE.getTime()) {
        setIsZeroDay(true);
      }
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (isZeroDay) {
      // small delay before starting the typewriter reveal
      const tm = setTimeout(() => setRevealTyping(true), 600);
      return () => clearTimeout(tm);
    }
  }, [isZeroDay]);

  return (
    <div
      className={`wedding-page ${bgImage ? "with-bg" : ""}`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      <div className="wedding-hero overlay">
        <h1 className="wedding-title-script">Anguram K S 💍 Varshini S</h1>
        <div className="subtitle-row">
          <div className="subtitle-line">MARCH 05, 2026</div>
          <span className="sub-icon">♡</span>
          <div className="subtitle-line">10:02 AM</div>
        </div>

        <div className="countdown boxed">
          {[
            { label: "Days", value: pad(timeLeft.days) },
            { label: "Hours", value: pad(timeLeft.hours) },
            { label: "Minutes", value: pad(timeLeft.minutes) },
            { label: "Seconds", value: pad(timeLeft.seconds) },
          ].map((item, i) => (
            <div
              className="countdown-item-box"
              key={item.label}
              style={{ animationDelay: `${i * 140}ms` }}
            >
              <div className={`countdown-number ${isZeroDay ? "muted" : ""}`}>
                {item.value}
              </div>
              <div className="countdown-label">{item.label}</div>
            </div>
          ))}
        </div>

        {/* <div className="notes">
          <p className="small">Bride : Varshini S</p>
          <p className="small">Groom : Anguram K S</p>
        </div> */}

        <div className="reveal-control">
          <button
            className="reveal-button"
            onClick={() => {
              console.log("Opening reveal modal");
              setShowModal(true);
              setPwError("");
              setPwInput("");
            }}
            title={isZeroDay ? "Reveal message" : "Enter password to reveal"}
          >
            Reveal Message
          </button>
        </div>

        {/* Modal for GIF + password prompt */}
        {showModal ? (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-card">
              {showSuccessGif ? (
                <img
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJ2ZWZ0Nzd0MmVpcnR3bmF5cHd5Y3NmZ2F1N2RrZmNjZ2Z2emNodyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ruEAG8ORj3c0JhPoOw/giphy.gif"
                  alt="success gif"
                  className="modal-success-gif"
                />
              ) : (
                <>
                  <img
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExam9sNmlvMmt6ZnY3d3QyYXRudDd2ZGIxOWY4YmRvaXk4ZHU2eG85ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oCKJM5v5DjCrprMrkr/giphy.gif"
                    alt="celebration gif"
                    className="modal-gif"
                  />

                  <h3 style={{color: '#fff', margin: 0}}>Reveal message</h3>
                  <label className="modal-label" htmlFor="reveal-pw">
                    Enter password to reveal message
                  </label>
                  <input
                    id="reveal-pw"
                    className="modal-input"
                    type="password"
                    value={pwInput}
                    autoFocus
                    onChange={(e) => setPwInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handlePwSubmit();
                      }
                    }}
                    aria-label="Reveal password"
                  />
                  {pwError ? <div className="modal-error">{pwError}</div> : null}
                  {pwStatus ? <div className="modal-status">{pwStatus}</div> : null}

                  <div className="modal-buttons">
                    <button className="reveal-button" onClick={() => handlePwSubmit()}>
                      Submit
                    </button>
                    <button
                      className="reveal-button"
                      onClick={() => {
                        setShowModal(false);
                        setPwError("");
                        setPwInput("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null}

        {revealTyping ? (
          <div className="reveal">
            <TypewriterReveal
              text={`"From now on it's not about me or you. It's all about us. You're my everything and without you I'm nothing."`}
              start={revealTyping}
            />
            <p className="reveal-sub">Wedding : March 05 2026, 10:04 AM</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}



function getTimeLeft() {
  const now = Date.now();
  const distance = Math.max(0, TARGET_DATE.getTime() - now);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function TypewriterReveal({ text, start }: { text: string; start: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      setDisplayed(text.slice(0, idx));
      if (idx >= text.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [start, text]);

  return <p className="reveal-text">{displayed}</p>;
}
