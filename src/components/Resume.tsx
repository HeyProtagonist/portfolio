import { useEffect, useMemo, useState } from "react";
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
  usePDF,
} from "@react-pdf/renderer";

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
  aiEngineering?: string[];
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

const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 32,
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: "#000000",
    lineHeight: 1.45,
  },
  header: {
    textAlign: "center",
    marginBottom: 14,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 1.1,
    marginBottom: 1,
  },
  title: {
    fontSize: 12.5,
    lineHeight: 1.3,
    marginBottom: 3,
  },
  location: {
    fontSize: 11,
    lineHeight: 1.35,
    color: "#4b5563",
    marginBottom: 4,
  },
  contactRow: {
    fontSize: 10.5,
    lineHeight: 1.4,
    color: "#4b5563",
  },
  link: {
    color: "#000000",
    textDecoration: "underline",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 3,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  paragraph: {
    fontSize: 10.5,
    lineHeight: 1.45,
  },
  jobBlock: {
    marginBottom: 7,
    paddingBottom: 1,
  },
  heading3: {
    fontSize: 11.5,
    fontWeight: "bold",
    lineHeight: 1.25,
  },
  muted: {
    color: "#4b5563",
    marginBottom: 3,
    lineHeight: 1.35,
  },
  projectBlock: {
    marginTop: 3,
    marginBottom: 3,
  },
  projectName: {
    fontSize: 10.5,
    fontWeight: "bold",
    lineHeight: 1.3,
    marginBottom: 1,
  },
  bulletItem: {
    fontSize: 10.25,
    lineHeight: 1.4,
    marginBottom: 2.5,
    paddingLeft: 10,
  },
});

function ResumePdfDocument({ resume }: { resume: ResumeType }) {
  return (
    <Document
      title={`${resume.name} Resume`}
      author={resume.name}
      subject="Resume"
      creator="Portfolio Website"
      producer="react-pdf"
      language="en-US"
      pageLayout="oneColumn"
      pageMode="useNone"
    >
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>{resume.name}</Text>
          <Text style={pdfStyles.title}>{resume.title}</Text>
          <Text style={pdfStyles.location}>{resume.location}</Text>
          <Text style={pdfStyles.contactRow}>
            {resume.contact.email} |{" "}
            <Link src={resume.contact.website} style={pdfStyles.link}>
              {resume.contact.website}
            </Link>
          </Text>
        </View>

        <View style={pdfStyles.section} bookmark="Professional Summary">
          <Text style={pdfStyles.sectionTitle}>Professional Summary</Text>
          <Text style={pdfStyles.paragraph}>{resume.profile}</Text>
        </View>

        {resume.aiEngineering && resume.aiEngineering.length > 0 && (
          <View style={pdfStyles.section} bookmark="AI-Assisted Development">
            <Text style={pdfStyles.sectionTitle}>AI-Assisted Development</Text>
            {resume.aiEngineering.map((item, index) => (
              <Text key={index} style={pdfStyles.bulletItem}>
                • {item}
              </Text>
            ))}
          </View>
        )}

        <View style={pdfStyles.section} bookmark="Employment History">
          <Text style={pdfStyles.sectionTitle}>Employment History</Text>
          {resume.employmentHistory.map((job, index) => (
            <View key={index} style={pdfStyles.jobBlock} wrap={false}>
              <Text style={pdfStyles.heading3}>{job.title}</Text>
              <Text style={[pdfStyles.paragraph, pdfStyles.muted]}>
                {job.company}, {job.location} | {job.startDate} - {job.endDate}
              </Text>
              {job.projects?.map((project, projectIndex) => (
                <View key={projectIndex} style={pdfStyles.projectBlock}>
                  <Text style={pdfStyles.projectName}>{project.name}</Text>
                  {project.responsibilities.map((item, itemIndex) => (
                    <Text key={itemIndex} style={pdfStyles.bulletItem}>
                      • {item}
                    </Text>
                  ))}
                </View>
              ))}
              {job.responsibilities?.map((item, itemIndex) => (
                <Text key={itemIndex} style={pdfStyles.bulletItem}>
                  • {item}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View style={pdfStyles.section} bookmark="Education">
          <Text style={pdfStyles.sectionTitle}>Education</Text>
          {resume.education.map((edu, index) => (
            <View key={index} style={pdfStyles.jobBlock} wrap={false}>
              <Text style={pdfStyles.heading3}>{edu.degree}</Text>
              <Text style={[pdfStyles.paragraph, pdfStyles.muted]}>
                {edu.institution}, {edu.location} | {edu.startDate} -{" "}
                {edu.endDate}
              </Text>
            </View>
          ))}
        </View>

        <View style={pdfStyles.section} bookmark="Skills">
          <Text style={pdfStyles.sectionTitle}>Skills</Text>
          {resume.skills.map((skill, index) => (
            <Text key={index} style={pdfStyles.bulletItem}>
              • {skill}
            </Text>
          ))}
        </View>

        <View bookmark="Languages">
          <Text style={pdfStyles.sectionTitle}>Languages</Text>
          {resume.languages.map((lang, index) => (
            <Text key={index} style={pdfStyles.bulletItem}>
              • {lang.language} - {lang.proficiency}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

function Resume({ resume }: { resume: ResumeType }) {
  const [pendingDownload, setPendingDownload] = useState(false);
  const pdfDocument = useMemo(
    () => <ResumePdfDocument resume={resume} />,
    [resume],
  );
  const [pdfInstance, updatePdfInstance] = usePDF({ document: pdfDocument });

  useEffect(() => {
    if (!pendingDownload || !pdfInstance.url) {
      return;
    }

    const safeName = resume.name.replace(/\s+/g, "_");
    const link = document.createElement("a");
    link.href = pdfInstance.url;
    link.download = `${safeName}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setPendingDownload(false);
  }, [pendingDownload, pdfInstance.url, resume.name]);

  useEffect(() => {
    if (pendingDownload && pdfInstance.error) {
      alert("Failed to download PDF. Please try again.");
      setPendingDownload(false);
    }
  }, [pendingDownload, pdfInstance.error]);

  const handleDownload = () => {
    if (pdfInstance.loading || pendingDownload) {
      return;
    }

    setPendingDownload(true);
    updatePdfInstance(pdfDocument);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white font-sans" style={{ color: "#1f2937" }}>
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
            color: #000000 !important;
            background-color: #ffffff !important;
          }

          #resume-content h1 {
            font-size: 24pt;
            margin-bottom: 8px;
            color: #000000 !important;
          }

          #resume-content h2 {
            font-size: 18pt;
            border-bottom: 2px solid #cccccc !important;
            padding-bottom: 4px;
            margin-top: 20px;
            margin-bottom: 12px;
            font-weight: bold;
            color: #000000 !important;
          }

          #resume-content h3 {
            font-size: 14pt;
            font-weight: bold;
            color: #000000 !important;
          }

          #resume-content p, #resume-content li {
            font-size: 11pt;
            color: #000000 !important;
          }

          #resume-content .text-muted {
            color: #4b5563 !important;
          }

          #resume-content ul {
            padding-left: 20px;
            list-style-type: disc;
          }

          #resume-content a {
            color: #000000 !important;
            text-decoration: underline !important;
          }

        `}
      </style>

      {/* Download Button */}
      <div className="mb-4 text-right no-print">
        <button
          onClick={handleDownload}
          disabled={pdfInstance.loading || pendingDownload}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          style={{
            backgroundColor:
              pdfInstance.loading || pendingDownload ? "#9ca3af" : "#3b82f6",
            color: "#ffffff",
            border: "none",
            cursor:
              pdfInstance.loading || pendingDownload ? "not-allowed" : "pointer",
          }}
        >
          {pdfInstance.loading || pendingDownload
            ? "Preparing PDF..."
            : "Download as PDF"}
        </button>
      </div>

      {/* Resume Content */}
      <div id="resume-content" className="bg-white">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">{resume.name}</h1>
          <p className="text-lg">{resume.title}</p>
          <p className="text-sm text-muted">{resume.location}</p>
          <p className="text-sm text-muted">
            {resume.contact.email} |{" "}
            <a href={resume.contact.website}>
              {resume.contact.website}
            </a>
          </p>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 pb-1 mb-4">
            Professional Summary
          </h2>
          <p className="text-sm">{resume.profile}</p>
        </section>

        {resume.aiEngineering && resume.aiEngineering.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b-2 pb-1 mb-4">
              AI-Assisted Development
            </h2>
            <ul className="list-disc list-inside text-sm">
              {resume.aiEngineering.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 pb-1 mb-4">
            Employment History
          </h2>
          {resume.employmentHistory.map((job, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-sm text-muted">
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
          <h2 className="text-2xl font-semibold border-b-2 pb-1 mb-4">
            Education
          </h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold">{edu.degree}</h3>
              <p className="text-sm text-muted">
                {edu.institution}, {edu.location} | {edu.startDate} -{" "}
                {edu.endDate}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold border-b-2 pb-1 mb-4">
            Skills
          </h2>
          <ul className="list-disc list-inside text-sm">
            {resume.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b-2 pb-1 mb-4">
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
