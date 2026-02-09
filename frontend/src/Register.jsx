import { useState } from "react";
import axios from "axios";
import { User, Phone, GraduationCap, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [university, setUniversity] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    if (!name || !mobile || !university) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://student-data-qr-backend.vercel.app/register",
        { name, mobile, university }
      );

      alert("Registration successful");
      setName("");
      setMobile("");
      setUniversity("");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] relative flex items-center justify-center px-4">

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#020617",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(59,130,246,0.18) 0%, rgba(14,165,233,0.08) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-xl shadow-xl p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">MBBS Route</h1>
          <p className="text-slate-400 text-sm">Medical Admissions</p>
        </div>

        <h2 className="text-xl font-semibold text-white text-center mb-6">
          Student Registration
        </h2>

        {/* Name */}
        <div className="relative mb-4">
          <User className="absolute left-3 top-3.5 text-slate-400" size={20} />
          <input
            className="w-full pl-10 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Mobile */}
        <div className="relative mb-4">
          <Phone className="absolute left-3 top-3.5 text-slate-400" size={20} />
          <input
            className="w-full pl-10 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* University */}
        <div className="relative mb-6">
          <GraduationCap className="absolute left-3 top-3.5 text-slate-400" size={20} />
          <input
            className="w-full pl-10 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Interested Course"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          onClick={submitForm}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl flex justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Submit Registration"}
        </button>

        {/* Show Users */}
        <Link
          to="/users"
          className="block text-center mt-4 text-blue-400 hover:text-blue-300"
        >
          View Registered Students →
        </Link>

        <p className="text-xs text-slate-500 text-center mt-6">
          © {new Date().getFullYear()} MBBS Route
        </p>
      </div>
    </div>
  );
}
