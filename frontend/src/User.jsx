import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://student-data-qr-backend.vercel.app/api/users"
        );

        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else if (Array.isArray(res.data.users)) {
          setUsers(res.data.users);
        }
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <h1 className="text-2xl font-bold text-blue-400 mb-8">
        Registered Students
      </h1>

      {users.length === 0 ? (
        <p className="text-slate-400">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => {
            const firstLetter = u.name?.charAt(0).toUpperCase();

            return (
              <div
                key={u._id}
                className="relative bg-slate-900/80 border border-slate-700/60 rounded-2xl p-5 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:border-blue-500/40 transition"
              >
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xl font-bold text-white">
                    {firstLetter}
                  </div>

                  <div>
                    <p className="text-lg font-semibold">{u.name}</p>
                    <p className="text-sm text-slate-400">
                      Registered Student
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-slate-400">Mobile:</span>{" "}
                    <span className="font-medium">{u.mobile}</span>
                  </p>
                  <p>
                    <span className="text-slate-400">Course:</span>{" "}
                    <span className="font-medium">{u.university}</span>
                  </p>
                </div>

                {/* Accent line */}
                <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-blue-500 to-cyan-400 opacity-80" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
