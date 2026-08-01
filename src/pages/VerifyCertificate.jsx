import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Search,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Copy,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { toast } from "react-toastify";
import { getCertificateByCode } from "../services/firebase";
import Logo from "../components/Logo";

const VerifyCertificate = () => {
  const { code: urlCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract code from URL path or query params (?code=XXX or ?id=XXX)
  const queryParams = new URLSearchParams(location.search);
  const activeCode = urlCode || queryParams.get("code") || queryParams.get("id") || "";

  const [inputCode, setInputCode] = useState(activeCode);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    if (activeCode) {
      const clean = decodeURIComponent(activeCode).trim();
      setInputCode(clean);
      handleSearch(clean);
    }
  }, [activeCode, location.search]);

  const handleSearch = async (codeToSearch) => {
    const searchVal = codeToSearch || inputCode;
    if (!searchVal || !searchVal.trim()) {
      toast.error("Please enter a valid certificate code.");
      return;
    }
    setLoading(true);
    setSearched(true);
    setCertificate(null);
    try {
      const data = await getCertificateByCode(searchVal.trim());
      setCertificate(data);
      if (!data) toast.warning("No matching certificate found.");
      else toast.success("Certificate retrieved successfully!");
    } catch (err) {
      toast.error("Failed to fetch certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      navigate(`/verify-certificate/${encodeURIComponent(inputCode.trim().toUpperCase())}`);
    }
  };

  const handleCopyLink = () => {
    const targetCode = (certificate?.certificateCode || inputCode || "").trim();
    if (!targetCode) return;
    const url = `${window.location.origin}/verify-certificate/${encodeURIComponent(targetCode)}`;
    navigator.clipboard.writeText(url);
    toast.info("Verification link copied to clipboard!");
  };

  /* ── Helpers ── */
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* ── Search Section ── */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-300 text-red-700 text-sm font-semibold mb-5">
          <ShieldCheck className="w-4 h-4" />
          Official Credential Verification
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Verify Internship Certificate
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Enter the Certificate Code printed on the internship certificate to validate its authenticity.
        </p>

        <form onSubmit={handleFormSubmit} className="mt-7">
          <div className="relative flex items-center max-w-xl mx-auto">
            <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="e.g. KALPAK-INT-2024-001"
              className="w-full pl-12 pr-36 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all uppercase tracking-wider text-sm font-medium shadow-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition-all text-sm disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Validate"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 p-12 text-center shadow">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Checking certificate database…</p>
        </div>
      )}

      {/* ── Certificate Card ── */}
      {!loading && searched && certificate && (
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Status + Copy bar ABOVE the card */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                certificate.status === "Valid"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {certificate.status === "Valid" ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <XCircle className="w-3.5 h-3.5" />
              )}
              {certificate.status || "Valid"}
            </span>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Verification Link
            </button>
          </div>

          {/*
           * ─────────────────────────────────────────────────────────
           *  CERTIFICATE CARD — mirrors the physical certificate
           * ─────────────────────────────────────────────────────────
           */}
          <div
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
          >
            {/* ── RED HEADER BANNER ── */}
            <div className="flex items-center bg-red-600 px-6 py-4 gap-4">
              {/* White square icon holder */}
              <div className="bg-white rounded-sm flex items-center justify-center p-2 flex-shrink-0" style={{ width: 52, height: 52 }}>
                <Logo size="small" />
              </div>
              <span
                className="text-white font-black tracking-wide leading-none"
                style={{ fontSize: "1.75rem", letterSpacing: "0.04em" }}
              >
                KALPAK INSULATION
              </span>
            </div>

            {/* ── WHITE BODY ── */}
            <div className="px-10 pt-10 pb-6">
              {/* Title */}
              <h2
                className="font-black text-gray-900 leading-tight mb-6"
                style={{ fontSize: "2rem", letterSpacing: "0.02em" }}
              >
                CERTIFICATE OF INTERNSHIP
              </h2>

              {/* Date */}
              <div className="text-right text-sm font-bold text-gray-800 mb-10">
                Date&nbsp;:&nbsp;{formatDate(certificate.issueDate)}
              </div>

              {/* Body Paragraphs */}
              <div
                className="text-gray-800 leading-relaxed space-y-5"
                style={{ fontSize: "0.95rem" }}
              >
                {/* Para 1 – certification statement */}
                <p>
                  This is to certify that{" "}
                  <strong>{certificate.internName}</strong>
                  {certificate.studentDetails
                    ? `, ${certificate.studentDetails},`
                    : ""}{" "}
                  has successfully completed his/her{" "}
                  <strong>{certificate.domain || "Internship"}</strong> at{" "}
                  <strong>Kalpak Insulation</strong> from{" "}
                  {formatDate(certificate.startDate) || certificate.startDate} to{" "}
                  {formatDate(certificate.endDate) || certificate.endDate}.
                </p>

                {/* Para 2 – remarks / responsibilities */}
                {certificate.remarks ? (
                  <p>{certificate.remarks}</p>
                ) : (
                  <p>
                    During the internship, he/she was entrusted with the
                    responsibility of designing, developing, and deploying the
                    company&apos;s official project deliverables. The work included
                    creating responsive components, implementing modern interfaces,
                    optimizing performance, testing and debugging functionalities,
                    and ensuring compatibility across multiple platforms.
                  </p>
                )}

                {/* Para 3 – appreciation */}
                <p>
                  Throughout the internship,{" "}
                  {certificate.internName
                    ? certificate.internName.split(" ").slice(0, 2).join(" ")
                    : "the intern"}{" "}
                  demonstrated excellent technical aptitude, professionalism,
                  dedication, and a strong willingness to learn. He/She completed
                  all assigned responsibilities with sincerity and maintained a
                  high standard of work throughout the internship period.
                  <br />
                  We appreciate his/her valuable contribution to our organization
                  and wish him/her every success in future academic and
                  professional endeavors.
                </p>
              </div>

              {/* Sign-off — signature withheld online */}
              <div className="mt-10">
                <p className="text-gray-700 text-sm mb-8">Sincerely,</p>
                {/* ↑ blank space where physical signature would be */}
                <p className="font-extrabold text-red-600 text-base">
                  Mr. Sudhir Sawant
                </p>
                <p className="text-gray-700 text-sm">Proprietor</p>
              </div>
            </div>

            {/* ── FOOTER CONTACT STRIP ── */}
            <div className="bg-gray-50 border-t border-gray-200 px-10 py-4">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  +91 95944 09122
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-red-600" />
                  kalpakinsulation@gmail.com
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  403, Malhar Palace No.1, Manpada Rd, Dombivli
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Not Found ── */}
      {!loading && searched && !certificate && (
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-red-200 p-10 text-center shadow">
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate Not Found</h3>
          <p className="text-gray-500 text-sm mb-6">
            No active record found for code{" "}
            <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
              {inputCode}
            </span>
            .
          </p>
          <ul className="text-left text-xs text-gray-500 space-y-1 list-disc pl-5 max-w-sm mx-auto">
            <li>Check for typos in the certificate code.</li>
            <li>
              Ensure hyphens are included — e.g.{" "}
              <span className="font-mono">KALPAK-INT-2024-001</span>
            </li>
            <li>
              Contact us at{" "}
              <a
                href="mailto:kalpakinsulation@gmail.com"
                className="text-red-600 underline"
              >
                kalpakinsulation@gmail.com
              </a>{" "}
              if you believe this is an error.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
