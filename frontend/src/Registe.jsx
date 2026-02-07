import { useState } from "react";
import axios from "axios";

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
        {
          name,
          mobile,
          university
        }
      );

      alert("Form submitted successfully");
      setName("");
      setMobile("");
      setUniversity("");
    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Student Registration
        </h2>

        <input
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="University Name"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        />

        <button
          onClick={submitForm}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
