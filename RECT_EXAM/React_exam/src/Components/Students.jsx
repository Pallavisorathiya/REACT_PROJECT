
import { useEffect, useMemo, useState } from "react";

const FallbackAvatar = ({ text = "?" }) => (
  <div
    className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white"
    style={{ width: 120, height: 120, margin: "0 auto", fontSize: 36, fontWeight: 700 }}
  >
    {text}
  </div>
);

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:3000/students");
        const data = await res.json();
        setStudents(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error fetching students:", e);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const rows = useMemo(
    () =>
      students.map((s) => ({
        ...s,
        name: s.name ?? s.fullName ?? "",        
        mobile: s.mobile ?? s.phone ?? "",       
        photo: s.photo ?? s.image ?? "",          
      })),
    [students]
  );

  if (loading) return <div className="p-4">Loading students...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">All Students</h2>

      {rows.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="row">
          {rows.map((stu) => (
            <div className="col-md-4 mb-3" key={stu.id}>
              <div className="card h-100 shadow-sm text-center">
                {/* Photo / Avatar */}
                <div className="p-3">
                  {stu.photo ? (
                    <img
                      src={stu.photo}
                      alt={stu.name || "Student"}
                      className="rounded-circle"
                      style={{
                        width: 120,
                        height: 120,
                        objectFit: "cover",
                        border: "3px solid #22c55e",
                      }}
                      onError={(e) => {
                        // if image url breaks, show a tiny placeholder
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://via.placeholder.com/120?text=Student";
                      }}
                    />
                  ) : (
                    <FallbackAvatar text={stu.name ? stu.name.charAt(0).toUpperCase() : "?"} />
                  )}
                </div>

                <div className="card-body">
                  <h5 className="card-title mb-3">{stu.name || "Unnamed"}</h5>

                  {stu.age && <p className="mb-1"><b>Age:</b> {stu.age}</p>}
                  {stu.course && <p className="mb-1"><b>Course:</b> {stu.course}</p>}
                  {stu.email && <p className="mb-1"><b>Email:</b> {stu.email}</p>}
                  {stu.mobile && <p className="mb-1"><b>Mobile:</b> {stu.mobile}</p>}
                  {stu.gender && <p className="mb-0"><b>Gender:</b> {stu.gender}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;
