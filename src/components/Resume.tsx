import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

type ResumeType = {
  name: string;
  title: string;
  location: string;
  contact: {
    // phone: string;
    email: string;
    website: string;
  };
  profile: string;
  employmentHistory: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    projects?: {
      name: string;
      responsibilities: string[];
    }[];
    responsibilities?: string[];
  }[];
  education: {
    institution: string;
    location: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
  skills: string[];
  languages: {
    language: string;
    proficiency: string;
  }[];
};

function Resume({ resume }: { resume: ResumeType }) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `${resume.name}`,
    onAfterPrint: () => console.log("PDF Exported successfully..."),
    onPrintError: (error) => console.error("Print error:", error),
    pageStyle: `
    @page {
      size: A4;
      margin: 15mm 10mm;
    }

    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: "Arial", sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #000;
      background: #fff;
      padding: 0;
      margin: 0;
    }

    h1,
    h2,
    h3,
    h4 {
      font-family: "Arial", sans-serif;
      font-weight: bold;
      margin-bottom: 4px;
    }

    h1 {
      font-size: 18pt;
    }

    h2 {
      font-size: 16pt;
      border-bottom: 1px solid #ccc;
      padding-bottom: 4px;
      margin-top: 24px;
    }

    h3 {
      font-size: 14pt;
    }

    h4 {
      font-size: 12pt;
    }

    p,
    li {
      font-size: 11pt;
      font-weight: normal;
      margin: 0 0 6px 0;
    }

    ul {
      padding-left: 20px;
    }

    a {
      color: inherit;
      text-decoration: underline;
    }
    `,
  });

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white text-gray-800">
      {/* Download Button */}
      <div className="mb-4 text-right">
        <button
          onClick={() => handlePrint()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download as PDF
        </button>
      </div>

      {/* Resume Content */}
      <div ref={contentRef}>
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">{resume.name}</h1>
          <p className="text-lg">{resume.title}</p>
          <p className="text-sm text-gray-600">{resume.location}</p>
          <p className="text-sm text-gray-600">
            {resume.contact.email} |{" "}
            <a
              href={resume.contact.website}
              style={{
                color: "inherit",
                textDecoration: "underline",
                textDecorationColor: "inherit",
                textDecorationThickness: "1px",
              }}
            >
              {resume.contact.website}
            </a>
          </p>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
            Profile
          </h2>
          <p className="text-sm">{resume.profile}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
            Employment History
          </h2>
          {resume.employmentHistory.map((job, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.company}, {job.location} | {job.startDate} - {job.endDate}
              </p>
              {job.projects && (
                <div className="mt-2">
                  {job.projects.map((project, idx) => (
                    <div key={idx} className="mb-2">
                      <h4 className="text-sm font-semibold">{project.name}</h4>
                      <ul className="list-disc list-inside text-sm">
                        {project.responsibilities.map((item, id) => (
                          <li key={id}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {job.responsibilities && (
                <ul className="list-disc list-inside text-sm">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
            Education
          </h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold">{edu.degree}</h3>
              <p className="text-sm text-gray-600">
                {edu.institution}, {edu.location} | {edu.startDate} -{" "}
                {edu.endDate}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
            Skills
          </h2>
          <ul className="list-disc list-inside text-sm">
            {resume.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">
            Languages
          </h2>
          <ul className="list-disc list-inside text-sm">
            {resume.languages.map((lang, index) => (
              <li key={index}>
                {lang.language} - {lang.proficiency}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Resume;
