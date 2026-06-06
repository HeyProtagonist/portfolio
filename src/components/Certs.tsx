import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, ExternalLink, Copy, Check, Search, ArrowLeft, X, Eye, HelpCircle } from "lucide-react";
import Payload from "../assets/database/content.json";

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

  // Set page title for SEO and user navigation
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Certificates & Credentials | Anguram Shanmugam";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const certificates: Certificate[] = Payload.resume?.ceritificates || [];

  // Helper to determine tags dynamically based on certificate title
  const getTagsForCertificate = (title: string): string[] => {
    const lowerTitle = title.toLowerCase();
    const tags: string[] = [];

    if (lowerTitle.includes("node.js") || lowerTitle.includes("express") || lowerTitle.includes("mongodb")) {
      tags.push("Node.js", "Express", "Backend");
    }
    if (lowerTitle.includes("typescript")) {
      tags.push("TypeScript", "JavaScript", "Frontend");
    }
    if (lowerTitle.includes("vim")) {
      tags.push("Vim", "Productivity", "Developer Tools");
    }
    if (lowerTitle.includes("bash") || lowerTitle.includes("shell") || lowerTitle.includes("linux")) {
      tags.push("Bash", "Linux", "Systems");
    }

    // Default tag if none matched
    if (tags.length === 0) {
      tags.push("Software Engineering");
    }

    return tags;
  };

  // Extract all unique tags
  const allTags = ["All", ...Array.from(new Set(certificates.flatMap(cert => getTagsForCertificate(cert.title))))];

  // Filter certificates based on search query and tag selection
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cert.certId.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTag === "All") {
      return matchesSearch;
    }
    
    const certTags = getTagsForCertificate(cert.title);
    return matchesSearch && certTags.includes(selectedTag);
  });

  const handleCopyId = (certId: string) => {
    navigator.clipboard.writeText(certId).then(() => {
      setCopiedId(certId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f9fc] via-[#f1f5f9] to-[#e2e8f0] dark:from-[#011627] dark:via-[#051f38] dark:to-[#010b14] text-[#011627] dark:text-[#f6f9fc] font-sans transition-colors duration-300">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/40 dark:bg-[#011627]/40 border-b border-black/5 dark:border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 group text-[#ff003c] dark:text-[#00f0ff] font-semibold text-lg"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/resume" 
              className="px-4 py-1.5 rounded-lg border border-[#011627]/10 dark:border-white/10 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              Resume
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Hero Header */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff003c]/10 dark:bg-[#00f0ff]/10 text-[#ff003c] dark:text-[#00f0ff] text-sm font-bold tracking-wider uppercase mb-4 animate-pulse">
            <Award className="w-4 h-4" />
            <span>Professional Credentials</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ff003c] via-[#80529d] to-[#39c4b6] dark:from-[#ffea00] dark:via-[#00f0ff] dark:to-[#39c4b6]">
            Certificates & Certifications
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-[#011627]/75 dark:text-[#f6f9fc]/75">
            A showcase of courses, specializations, and professional training completed to stay ahead in web engineering, systems automation, and tool proficiency.
          </p>

          <div className="w-24 h-1.5 bg-gradient-to-r from-[#ff003c] to-[#39c4b6] mx-auto mt-6 rounded-full" />
        </section>

        {/* Filter & Search Bar Section */}
        <section className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/30 dark:bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-black/5 dark:border-white/5">
          {/* Search input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#011627]/50 dark:text-[#f6f9fc]/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[#ff003c] dark:focus:ring-[#00f0ff] transition-all"
            />
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end overflow-x-auto no-scrollbar">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedTag === tag
                    ? "bg-[#ff003c] text-[#f6f9fc] dark:bg-[#00f0ff] dark:text-[#011627] shadow-lg shadow-[#ff003c]/20 dark:shadow-[#00f0ff]/20 scale-105"
                    : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Grid Section */}
        <section>
          {filteredCertificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCertificates.map((cert) => {
                const tags = getTagsForCertificate(cert.title);
                return (
                  <article 
                    key={cert.certId}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-[#08203e]/20 backdrop-blur-md hover:bg-white/80 dark:hover:bg-[#08203e]/40 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-[#011627]/10 dark:hover:shadow-[#00f0ff]/5"
                  >
                    {/* Certificate Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black/10 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
                      {cert.certImageUrl ? (
                        <img 
                          src={cert.certImageUrl} 
                          alt={cert.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-black/40 dark:text-white/40">
                          <HelpCircle className="w-12 h-12" />
                        </div>
                      )}
                      
                      {/* Hover Overlay with View Icon */}
                      <div 
                        onClick={() => setLightboxCert(cert)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                      >
                        <button className="flex items-center gap-2 bg-[#ff003c] dark:bg-[#00f0ff] text-[#f6f9fc] dark:text-[#011627] font-bold px-4 py-2 rounded-xl text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg cursor-pointer">
                          <Eye className="w-4 h-4" />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="px-2.5 py-0.5 text-[10px] font-bold tracking-wide rounded bg-black/5 dark:bg-white/10 text-black/70 dark:text-[#f6f9fc]/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold tracking-tight mb-2 line-clamp-2 leading-snug group-hover:text-[#ff003c] dark:group-hover:text-[#00f0ff] transition-colors duration-300">
                          {cert.title}
                        </h3>
                      </div>

                      <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
                        {/* Credential ID with Copy Action */}
                        <div className="flex items-center justify-between bg-black/5 dark:bg-black/30 rounded-lg p-2 text-xs mb-4">
                          <span className="font-mono text-black/60 dark:text-white/50 select-all truncate max-w-[80%]">
                            ID: {cert.certId}
                          </span>
                          <button
                            onClick={() => handleCopyId(cert.certId)}
                            className="text-[#ff003c] dark:text-[#00f0ff] hover:opacity-80 transition-opacity cursor-pointer p-1"
                            title="Copy Certificate ID"
                          >
                            {copiedId === cert.certId ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Verification Link */}
                        <a 
                          href={cert.certUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-[#011627] text-[#f6f9fc] dark:bg-[#f6f9fc]/10 dark:text-[#f6f9fc] hover:bg-[#ff003c] dark:hover:bg-[#00f0ff] dark:hover:text-[#011627] transition-all duration-300 shadow-md group-hover:shadow-lg"
                        >
                          <span>Verify Credential</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/10 dark:bg-white/5 rounded-3xl p-8 border border-black/5 dark:border-white/5">
              <Award className="w-16 h-16 text-black/30 dark:text-white/30 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No certificates found</h3>
              <p className="text-black/60 dark:text-white/60">
                We couldn't find any certificates matching "{searchQuery}" under category "{selectedTag}".
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedTag("All"); }}
                className="mt-4 px-5 py-2 rounded-xl bg-[#ff003c] dark:bg-[#00f0ff] text-white dark:text-[#011627] font-bold text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Lightbox Modal overlay */}
      {lightboxCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          onClick={() => setLightboxCert(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#011627] dark:bg-[#051f38] rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <Award className="w-6 h-6 text-[#ffea00] dark:text-[#00f0ff]" />
                <h2 className="text-lg sm:text-xl font-bold truncate max-w-xs sm:max-w-md md:max-w-xl">{lightboxCert.title}</h2>
              </div>
              <button 
                onClick={() => setLightboxCert(null)}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Body: Large Image */}
            <div className="relative aspect-video w-full bg-black/90 flex items-center justify-center">
              <img 
                src={lightboxCert.certImageUrl} 
                alt={lightboxCert.title} 
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 bg-black/35 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between border-t border-white/10">
              <div className="text-white/60 text-xs sm:text-sm">
                <p className="font-mono">Credential ID: {lightboxCert.certId}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleCopyId(lightboxCert.certId)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 cursor-pointer transition-colors"
                >
                  {copiedId === lightboxCert.certId ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
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
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#ff003c] hover:bg-[#ff003c]/90 dark:bg-[#00f0ff] dark:hover:bg-[#00f0ff]/90 text-white dark:text-[#011627] flex items-center gap-2 transition-colors"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certs;
