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
          "https://student-data-qr-backend.vercel.app/users"
        );

        console.log("API response:", res.data);

        // Handle both cases safely
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else if (Array.isArray(res.data.users)) {
          setUsers(res.data.users);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
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
      <h1 className="text-2xl font-bold text-blue-400 mb-6">
        Registered Students
      </h1>

      {users.length === 0 ? (
        <p className="text-slate-400">No users found.</p>
      ) : (
        <div className="grid gap-4">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-slate-900 border border-slate-700 rounded-xl p-4"
            >
              <p><b>Name:</b> {u.name}</p>
              <p><b>Mobile:</b> {u.mobile}</p>
              <p><b>Course:</b> {u.university}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
