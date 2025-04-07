import { calculateYearsOfExperience } from "../utils/calculateYearsOfExperience";
import Payload from "../assets/database/content.json";
import { ExternalLink } from "lucide-react";

const experience = calculateYearsOfExperience(Payload.resume.employmentHistory);
const orgNow = Payload.resume.employmentHistory.filter(
  (i) => i.endDate.toLocaleLowerCase() === "present",
)[0];

export default function renderAnswer(answer: any) {
  let result: JSX.Element | string = "";

  if (typeof answer === "string" && answer === "<overallExperience>") {
    result = `"${experience} Years"`;
  } else if (typeof answer === "string" && answer === "<orgNow>") {
    result = `"${orgNow.title}, ${orgNow.company}"`;
  } else if (typeof answer === "string") {
    result = `"${answer}"`;
  } else if (Array.isArray(answer)) {
    result = `[${answer.map(($) => `"${$}"`).join(", ")}]`;
  } else {
    if (typeof answer === "object" && "name" in answer && "href" in answer) {
      result = (
        <a
          href={answer.href as string}
          className="inline-flex items-center gap-1 !text-[#00F0FF]"
        >
          {(answer as { name: string; href: string }).name}{" "}
          <ExternalLink size={14} />
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
