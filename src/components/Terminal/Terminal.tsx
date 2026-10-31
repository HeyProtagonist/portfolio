import CloseIcon from "../../assets/icons/close.svg";
import MaximizeIcon from "../../assets/icons/maximize.svg";
import MinimizeIcon from "../../assets/icons/minimize.svg";
import renderAnswer from "../../utils/renderAnswer";

type Payload = {
  name: string;
  quickNote: string;
  about: {
    question: string;
    answer: string | string[] | { name: string; href: string };
  }[];
  projects: Array<{
    name: string;
    description: string;
    live: string;
    techStack: string[];
    github: string;
  }>;
  "contact-me": Array<{ name: string; href: string }>;
};

interface MyComponentProps {
  payload: Payload;
}

function Terminal({ payload }: MyComponentProps): JSX.Element {
  const firstName = payload.name.split(" ")[0].toLocaleLowerCase();

  return (
    <div className="w-full px-2 py-4">
      <div className="cp-cut-frame w-full">
        <div className="w-full h-10 flex justify-end items-center px-4 gap-4 bg-(--cp-edge)">
          {/* Masked so the icon color comes from CSS (an <img> SVG can't inherit it) */}
          {[
            { icon: MinimizeIcon, label: "_" },
            { icon: MaximizeIcon, label: "D" },
            { icon: CloseIcon, label: "X" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              role="img"
              aria-label={label}
              className="cp-term-icon w-5 h-5"
              style={{
                maskImage: `url("${icon}")`,
                WebkitMaskImage: `url("${icon}")`,
              }}
            />
          ))}
        </div>

        <div className="w-full bg-black/60 px-2 py-4 flex flex-col text-xl gap-4">
          {payload.about.map(({ question, answer }) => {
            return (
              <div
                className="w-full py-2 flex flex-col"
                key={`${question}-${Math.random().toString(36)}`}
              >
                <p className="text-cp-yellow dark:text-[#FF003C] font-semibold">
                  <span className="font-[--JetBrains] px-2">{">"}</span>
                  {firstName}.{question}
                </p>

                <p className="px-6 text-wrap text-[#00F0FF]">
                  {renderAnswer(answer)}
                </p>
              </div>
            );
          })}

          <p className="text-cp-yellow dark:text-[#FF003C] font-semibold">
            <span className="font-[--JetBrains] px-2">{">"}</span>
            <span className="inline-block w-2 h-4 bg-[#FCEE09] ml-1 animate-blink"></span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
