// import { addDoc, collection } from "firebase/firestore";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
// import { db } from "../../../../../firebase.config";
export default function SubjectListDash() {
  const [subjects, setSubject] = useState([]);
  const semesters = [
    { semester_name: "1st year", year: 2022 },
    { semester_name: "2nd year", year: 2023 },
    { semester_name: "3rd year", year: 2024 },
    { semester_name: "4th year", year: 2025 },
  ];
  const [formData, setFormData] = useState({
    semester_name: "",
    course_name: "",
    course_credit: "",
    course_code: "",
  });
  const [editId, setEditId] = useState(null);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // add or update
  const enterSubjectList = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // update
        const updated = subjects.map((item) =>
          item.id === editId
            ? {
                ...item,
                semester_name: formData.semester_name,
                course_name: formData.course_name,
                course_credit: formData.course_name,
                course_code: formData.course_name,
              }
            : item,
        );

        setSubject(updated);
        setEditId(null);
      } else {
        // add
        const newSemester = {
          id: Date.now(),
          semester_name: formData.semester_name,
          course_name: formData.course_name,
          course_credit: formData.course_credit,
          course_code: formData.course_code,
        };

        // await addDoc(collection(db, "semesters"), {
        //   semester_name: "",
        //   year: "",
        //   total_credit: "",
        //   total_subject: "",
        // });

        setSubject((prev) => [...prev, newSemester]);
      }
    } catch (error) {
      alert("something wrong", error.message);
    }

    // reset form
    setFormData({
      semester_name: "",
      course_name: "",
      course_credit: "",
      course_code: "",
    });
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
    setSubject((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="">
      <div>
        <h1 className="capitalize text-lg font-medium border-b border-gray-300 pb-3">
          subject dashboard
        </h1>
      </div>

      {/* FORM */}
      <div className="mt-4">
        <h1 className="capitalize text-md mb-2">enter data</h1>
        <form
          onSubmit={enterSubjectList}
          className="flex flex-col md:flex-row gap-3 bg-blue-100 p-3 rounded-lg"
        >
          <div className="flex flex-col">
            <label for="semester_name" className="capitlaize text-sm">
              Semester Name
            </label>
            <select
              name="semester_name"
              onChange={handleChange}
              className="px-2 py-2 border border-[rgba(0,0,0,.3)] rounded-md mt-1"
              placeholder="semester Name"
            >
              {/* <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option> */}
              {semesters.map((semester, index) => (
                <option key={index} value={semester.semester_name}>
                  {semester.semester_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label for="course_name" className="capitlaize text-sm">
              Name
            </label>
            <input
              type="text"
              name="course_name"
              value={formData.name}
              onChange={handleChange}
              className="px-2 py-2 border border-[rgba(0,0,0,.3)] rounded-md mt-1"
              placeholder="Course Name"
            />
          </div>

          <div className="flex flex-col">
            <label for="course_credit" className="capitalize text-sm">
              credit
            </label>
            <input
              type="number"
              name="course_credit"
              value={formData.year}
              onChange={handleChange}
              className="px-2 py-2 border border-[rgba(0,0,0,.3)] rounded-md mt-1"
              placeholder="3"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {editId ? "Update" : "+ Add"}
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
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Semester Name</th>
                <th className="p-2 text-left">Year</th>
                <th className="p-2 text-left">Subjects</th>
                <th className="p-2 text-left">Credits</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {subjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    No semesters added yet.
                  </td>
                </tr>
              ) : (
                subjects.map((sem) => (
                  <tr key={sem.id} className="border-t">
                    <td className="p-2">{sem.name}</td>
                    <td className="p-2">{sem.year}</td>
                    <td className="p-2">{sem.subjects}</td>
                    <td className="p-2">{sem.credits}</td>
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
