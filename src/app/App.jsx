import { RotateCcw, Plus, Trash } from "lucide-react";
import React, { useState } from "react";

export default function App() {
  const [courseList, setcourseList] = useState([]);
  const createCourse = () => {
    setcourseList((prev) => [
      ...prev,
      {
        id: Date.now(),
        creditHour: 0,
        gradePoint: 0,
      },
    ]);
  };
  let totalCourse = courseList.length;
  let totalCredits = courseList.reduce((acc, item) => {
    return acc + item.creditHour;
  }, 0);
  let totalGradePoints = courseList.reduce((acc, item) => {
    return acc + item.gradePoint;
  }, 0);
  let gpa = totalCredits === 0 ? 0 : totalGradePoints / totalCredits;

  const handleChange = (index, field, value) => {
    setcourseList((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [field]: value,
          };
        } else {
          return item;
        }
      }),
    );
  };

  const deleteCourse = (index) => {
    setcourseList((prev) => prev.filter((_, i) => i !== index));
  };

  const resetCourseList = () => {
    setcourseList([]);
  };

  console.log(courseList);

  return (
    <div className="w-full flex-col center-center px-4 my-8">
      <h1 className="text-2xl font-semibold text-[#1e293b]">CGPA Calculator</h1>
      <div className="w-full h-full relative start-center gap-6 mt-6">
        <div className="min-w-[300px] w-[700px] h-full bg-white rounded-xl px-6 py-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
          {/* header part */}
          <div className="w-full center-between">
            <p className="text-lg font-semibold text-[#1e293b] capitalize">
              Course List
            </p>
            <p className="text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-medium">
              {totalCourse} course{totalCourse > 1 ? "s" : ""}
            </p>
          </div>

          {/* course list part */}
          <div className="w-full h-full start-between flex-col mt-2">
            <div className="w-full">
              {courseList.length > 0 ? (
                <div>
                  {/* Header */}
                  <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-3 text-sm font-semibold text-gray-400 mb-3 px-1">
                    <p className="pl-3 pr-2">#</p>
                    <p>Credit Hours</p>
                    <p>GPA</p>
                    <p></p>
                  </div>

                  {/* List */}
                  <ul className="flex flex-col bg-[#f1f5f9] gap-2 px-2 py-4 rounded-lg">
                    {courseList.map((item, index) => (
                      <li
                        key={item.id}
                        className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-3 px-2 pb-2"
                      >
                        {/* Index */}
                        <div className="flex justify-center">
                          <p className="text-gray-500">{index + 1}</p>
                        </div>

                        {/* Credit Hours */}
                        <input
                          type="number"
                          placeholder="e.g. 3"
                          onChange={(e) => {
                            handleChange(
                              index,
                              "creditHour",
                              Number(e.target.value),
                            );
                          }}
                          className="w-full text-sm border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />

                        {/* GPA */}
                        <input
                          type="number"
                          step="0.01"
                          placeholder="e.g. 3.75"
                          onChange={(e) => {
                            handleChange(
                              index,
                              "gradePoint",
                              Number(e.target.value),
                            );
                          }}
                          className="w-full text-sm border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteCourse(index)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition"
                        >
                          <Trash size={12} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <p className="text-xl capitalize">
                    no courses added now. add a course to get started.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={createCourse}
                className="btn bg-blue-600 text-white hover:bg-blue-500 transition shadow-sm"
              >
                <Plus size={14} /> Add Course
              </button>

              <button
                onClick={resetCourseList}
                className="btn bg-gray-700 text-white hover:bg-gray-600 transition shadow-sm"
              >
                <RotateCcw size={14} />
                Reset All
              </button>
            </div>
          </div>
        </div>
        {/* calculated gpa and cgpa part */}
        <div className="w-auto h-fit sticky top-0 bg-[#f1f5f9] rounded-xl px-6 py-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
          <div className="w-full grid grid-cols-1 gap-4">
            <div className="center-center flex-col bg-white  px-6 py-4 rounded-lg border border-blue-100">
              <p className="text-xs text-black font-thin">Total Credits</p>
              <p className="text-4xl font-bold text-black/80">{totalCredits}</p>
            </div>

            <div className="center-center flex-col bg-white px-6 py-4 rounded-lg border border-red-100">
              <p className="text-xs text-black font-thin">Total Grade Points</p>
              <p className="text-4xl font-bold text-black/80">
                {totalGradePoints.toFixed(2)}
              </p>
            </div>

            <div className="center-center flex-col bg-white px-6 py-4 rounded-lg border border-green-100">
              <p className="text-xs text-black font-thin">GPA</p>
              <p
                className={`text-4xl font-bold ${
                  gpa >= 3
                    ? "text-green-600"
                    : gpa >= 2.5
                      ? "text-blue-600"
                      : "text-red-600"
                }`}
              >
                {isNaN(gpa) || !isFinite(gpa) ? "0.00" : gpa.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
