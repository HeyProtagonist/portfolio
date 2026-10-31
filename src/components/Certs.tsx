import { useState, useEffect } from "react";
import { ExternalLink, Copy, Check, Search, X, Eye } from "lucide-react";
import Payload from "../assets/database/content.json";
import NavBar from "./NavBar";
import SectionHeader from "./SectionHeader";
import CopyRight from "./CopyRight";

interface Certificate {
  title: string;
  certId: string;
  certUrl: string;
  certImageUrl: string;
}

function Certs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lightboxCert, setLightboxCert] = useState<Certificate | null>(null);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Certificates & Credentials | Anguram Shanmugam";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const certificates: Certificate[] = Payload.resume?.ceritificates || [];

  const getTagsForCertificate = (title: string): string[] => {
    const lowerTitle = title.toLowerCase();
    const tags: string[] = [];

    if (
      lowerTitle.includes("node.js") ||
      lowerTitle.includes("express") ||
      lowerTitle.includes("mongodb")
    ) {
      tags.push("Node.js", "Express", "Backend");
    }
    if (lowerTitle.includes("typescript")) {
      tags.push("TypeScript", "JavaScript", "Frontend");
    }
    if (lowerTitle.includes("vim")) {
      tags.push("Vim", "Productivity", "Developer Tools");
    }
    if (
      lowerTitle.includes("bash") ||
      lowerTitle.includes("shell") ||
      lowerTitle.includes("linux")
    ) {
      tags.push("Bash", "Linux", "Systems");
    }

    if (tags.length === 0) {
      tags.push("Software Engineering");
    }

    return tags;
  };

  const allTags = [
    "All",
    ...Array.from(
      new Set(
        certificates.flatMap((cert) => getTagsForCertificate(cert.title)),
      ),
    ),
  ];

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certId.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTag === "All") {
      return matchesSearch;
    }

    return (
      matchesSearch && getTagsForCertificate(cert.title).includes(selectedTag)
    );
  });

  const handleCopyId = (certId: string) => {
    navigator.clipboard.writeText(certId).then(() => {
      setCopiedId(certId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="cp-grid-bg min-h-screen">
      <div className="w-[100vw] md:w-[1000px] m-0 p-0 md:flex md:flex-col md:justify-start md:items-center md:gap-4 md:mx-auto">
        <NavBar
          links={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/#projects" },
            { label: "Contact", href: "/#contact-me" },
          ]}
          cta={{ label: "Resume", href: "/resume" }}
        />

        {/* Section header — same pattern as home page sections */}
        <div className="w-full">
          <SectionHeader
            module="CERTS.MODULE_ARCHIVE"
            title="Certificates"
            meta={`${certificates.length} CREDENTIALS`}
          />
          <p className="opacity-70 max-w-md px-2 -mt-2 mb-4">
            Courses and training across backend engineering, systems, and
            developer tooling.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="w-full px-2 mb-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search input */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
            <input
              id="cert-search"
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cp-input pl-10 pr-4 py-2"
            />
          </div>

          {/* Tag filter pills */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                id={`cert-filter-${tag.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                onClick={() => setSelectedTag(tag)}
                aria-pressed={selectedTag === tag}
                className="cp-chip"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Cards */}
        <div className="w-full px-2 py-4">
          {filteredCertificates.length > 0 ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCertificates.map((cert) => {
                const tags = getTagsForCertificate(cert.title);
                return (
                  <div
                    key={cert.certId}
                    className="cp-frame flex flex-col justify-between gap-4 p-4"
                  >
                    {/* Thumbnail with quick view overlay */}
                    <div
                      className="relative w-full aspect-video overflow-hidden cursor-pointer group"
                      onClick={() => setLightboxCert(cert)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setLightboxCert(cert);
                      }}
                      aria-label={`Quick view: ${cert.title}`}
                    >
                      <img
                        src={cert.certImageUrl}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold uppercase bg-cp-yellow text-[#0d0d0d]">
                          <Eye className="w-4 h-4" />
                          Quick View
                        </div>
                      </div>
                    </div>

                    {/* Tags — same chip style as home page project tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 bg-cp-yellow text-[#0d0d0d] font-semibold uppercase text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <p className="text-xl font-bold uppercase leading-snug text-(--cp-accent)">
                      {cert.title}
                    </p>

                    {/* Credential ID + actions */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2 opacity-50">
                        <span className="font-mono text-xs truncate">
                          ID: {cert.certId}
                        </span>
                        <button
                          onClick={() => handleCopyId(cert.certId)}
                          title="Copy Certificate ID"
                          aria-label="Copy certificate ID"
                          style={{
                            border: "none",
                            background: "transparent",
                            padding: "4px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            lineHeight: 0,
                          }}
                        >
                          {copiedId === cert.certId ? (
                            <Check
                              className="w-4 h-4"
                              style={{ color: "#22c55e" }}
                            />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <a
                        href={cert.certUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cp-btn w-full text-sm"
                      >
                        <span className="flex items-center gap-2">
                          Verify Credential
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full text-center py-16">
              <p className="text-2xl font-bold mb-2">No certificates found</p>
              <p className="opacity-60 mb-6">
                No match for &ldquo;{searchQuery}&rdquo; under &ldquo;
                {selectedTag}&rdquo;.
              </p>
              <button
                className="cp-btn"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("All");
                }}
              >
                <span>Clear Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn"
            onClick={() => setLightboxCert(null)}
          >
            <div
              className="relative max-w-4xl w-full overflow-hidden shadow-2xl animate-scaleUp border-3 border-cp-blue"
              style={{ backgroundColor: "#0d0d0d" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div
                className="p-4 flex items-center justify-between"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  color: "#f6f9fc",
                }}
              >
                <p className="font-bold text-lg truncate pr-4">
                  {lightboxCert.title}
                </p>
                <button
                  onClick={() => setLightboxCert(null)}
                  aria-label="Close"
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#f6f9fc",
                    padding: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                    lineHeight: 0,
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Certificate image */}
              <div
                className="flex items-center justify-center bg-black"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={lightboxCert.certImageUrl}
                  alt={lightboxCert.title}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              </div>

              {/* Modal footer */}
              <div
                className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              >
                <span
                  className="font-mono text-xs"
                  style={{ color: "rgba(246,249,252,0.5)" }}
                >
                  {lightboxCert.certId}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyId(lightboxCert.certId)}
                    className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-none! uppercase"
                    style={{
                      border: "2px solid rgba(246,249,252,0.3)",
                      background: "transparent",
                      color: "#f6f9fc",
                      cursor: "pointer",
                    }}
                  >
                    {copiedId === lightboxCert.certId ? (
                      <>
                        <Check
                          className="w-4 h-4"
                          style={{ color: "#22c55e" }}
                        />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>

                  <a
                    href={lightboxCert.certUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm px-3 py-1.5 font-bold uppercase"
                    style={{
                      background: "#f6f132",
                      color: "#0d0d0d",
                      textDecoration: "none",
                    }}
                  >
                    Verify
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <CopyRight />
      </div>
    </div>
  );
}

export default Certs;
