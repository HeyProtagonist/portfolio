import { useRef } from "react";
// @ts-ignore
import html2pdf from "html2pdf.js";

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

  const handleDownload = async () => {
    console.log("Download process started");
    const element = document.getElementById("resume-content");
    
    if (!element) {
      console.error("Target element #resume-content not found");
      alert("Error: Resume content not found. Please try again.");
      return;
    }

    try {
      console.log("Configuring html2pdf options...");
      const opt = {
        margin: 10,
        filename: "resume-anguram.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          logging: true,
          letterRendering: true
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      console.log("Starting PDF generation...");
      // html2pdf can be a function or have a default property depending on the environment
      const exporter = typeof html2pdf === 'function' ? html2pdf : (html2pdf as any).default;
      
      if (typeof exporter !== 'function') {
        console.error("html2pdf is not a function:", exporter);
        throw new Error("PDF library failed to load correctly.");
      }

      await exporter().from(element).set(opt).save();
      console.log("PDF generation call completed");
    } catch (error) {
      console.error("Detailed PDF Generation Error:", error);
      alert("Failed to generate PDF. Check console for details.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white text-gray-800 font-sans">
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
          }
          
          #resume-content {
            font-family: Arial, sans-serif !important;
            line-height: 1.6;
            color: #000;
          }

          #resume-content h1 {
            font-size: 24pt;
            margin-bottom: 8px;
          }

          #resume-content h2 {
            font-size: 18pt;
            border-bottom: 2px solid #ccc;
            padding-bottom: 4px;
            margin-top: 20px;
            margin-bottom: 12px;
            font-weight: bold;
          }

          #resume-content h3 {
            font-size: 14pt;
            font-weight: bold;
          }

          #resume-content p, #resume-content li {
            font-size: 11pt;
          }

          #resume-content ul {
            padding-left: 20px;
            list-style-type: disc;
          }
        `}
      </style>

      {/* Download Button */}
      <div className="mb-4 text-right no-print">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Download as PDF
        </button>
      </div>

      {/* Resume Content */}
      <div ref={contentRef} id="resume-content" className="bg-white">
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
