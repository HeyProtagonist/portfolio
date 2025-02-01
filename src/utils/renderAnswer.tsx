export default function renderAnswer(answer: any) {
  let result: JSX.Element | string = "";

  if (typeof answer === "string") {
    result = `"${answer}"`;
  } else if (Array.isArray(answer)) {
    result = `[${answer.map(($) => `"${$}"`).join(", ")}]`;
  } else {
    if (typeof answer === "object" && "name" in answer && "href" in answer) {
      result = (
        <a href={answer.href as string} className="!text-[#00F0FF]">
          "{(answer as { name: string; href: string }).name}"
        </a>
      );
    } else if ("file-path" in answer && "file-name" in answer) {
      result = (
        <a
          href={answer["file-path"]}
          className="text-[#00F0FF] underline"
          download={answer["file-name"]}
        >
          "{answer["file-name"]}"
        </a>
      );
    }
  }

  return result;
}
