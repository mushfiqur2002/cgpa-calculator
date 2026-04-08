import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../../../../../firebase.config";

export default function SemesterManager() {
  const [semester, setSemester] = useState([]);
  const [formData, setFormData] = useState({
    semester_name: "",
    year: "",
  });

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // add or update
  const enterSemester = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        // update
        const updated = semester.map((item) =>
          item.id === editId
            ? { ...item, name: formData.name, year: formData.year }
            : item,
        );
        setSemester(updated);
        setEditId(null);
      } else {
        // add
        const docRef = await addDoc(collection(db, "semesters"), {
          semester_name: formData.semester_name,
          year: formData.year,
          total_credit: 0,
          total_subject: 0,
        });
        alert("success", docRef.id);
      }

      // reset form
      setFormData({ semester_name: "", year: "" });
    } catch (error) {
      alert("something is error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // edit click
  const handleEdit = (sem) => {
    setFormData({
      name: sem.name,
      year: sem.year,
    });
    setEditId(sem.id);
  };

  // delete
  const handleDelete = (id) => {
    setSemester((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "semesters"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setSemester(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="">
      <div>
        <h1 className="capitalize text-lg font-medium border-b border-gray-300 pb-3">
          Semester dashboard
        </h1>
      </div>

      {/* FORM */}
      <div className="mt-4">
        <h1 className="capitalize text-md mb-2">enter data</h1>
        <form
          onSubmit={enterSemester}
          className="flex flex-col md:flex-row gap-3 bg-blue-100 p-3 rounded-lg"
        >
          <div className="flex flex-col">
            <label for="semester_name" className="text-sm">
              Name
            </label>
            <input
              name="semester_name"
              value={formData.semester_name}
              onChange={handleChange}
              className="px-2 py-2 border border-[rgba(0,0,0,.3)] rounded-md mt-1"
              placeholder="1st semester"
            />
          </div>

          <div className="flex flex-col">
            <label for="year" className="text-sm">
              Year
            </label>
            <input
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="px-2 py-2 border border-[rgba(0,0,0,.3)] rounded-md mt-1"
              placeholder="2022"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {loading ? "saving..." : editId ? "Update" : "+ Add"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setFormData({ name: "", year: "" });
                }}
                className="bg-gray-400 text-white px-3 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div>
        <h1 className="mt-5 capitalize text-md mb-2">semester list</h1>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 whitespace-nowrap">
            <thead className="bg-gray-100 gap-2">
              <tr>
                <th className="p-2">No</th>
                <th className="p-2">Semester Name</th>
                <th className="p-2">Year</th>
                <th className="p-2">Subjects</th>
                <th className="p-2">Credits</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                "loading..."
              ) : semester.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center! py-4 text-gray-400">
                    No semesters added yet.
                  </td>
                </tr>
              ) : (
                semester.map((sem, index) => (
                  <tr key={sem.id} className="border-t">
                    <td className="p-2 text-left">{index + 1}</td>
                    <td className="p-2 text-left">{sem.semester_name}</td>
                    <td className="p-2 text-left">{sem.year}</td>
                    <td className="p-2 text-left">{sem.total_subject}</td>
                    <td className="p-2 text-left">{sem.total_credit}</td>
                    <td className="p-2 center-center">
                      <button
                        onClick={() => handleEdit(sem)}
                        className="text-blue-500 mr-2"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(sem.id)}
                        className="text-red-500"
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
