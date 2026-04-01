import { RotateCcw, Plus, Trash, ChevronUp } from "lucide-react";
import React, { useState } from "react";
export default function Calculator() {
  const [courseList, setcourseList] = useState([]);
  const [clicked, setClicked] = useState(false);
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
    return acc + item.creditHour * item.gradePoint;
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
  return (
    <div className="center-center flex-col mt-2 md:mt-4">
      <div className="center-center gap-2">
        <h1 className="text-2xl font-semibold text-[#1e293b]">
          GPA Calculator
        </h1>
        <div>
          <button
            onClick={() => setClicked(!clicked)}
            className="px-[1px] h-8 rounded-full bg-black/20 flex items-center justify-center"
          >
            <ChevronUp
              size={16}
              className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                clicked ? "-translate-y-1 rotate-180" : "translate-y-1 rotate-0"
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className={`
  w-full h-full relative gap-4 md:gap-6 mt-4 flex justify-center items-start flex-col md:flex-row px-3 md:px-0 
  transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
  ${
    clicked
      ? "max-h-0 opacity-0 -translate-y-10 overflow-hidden"
      : "max-h-[1000px] opacity-100 translate-y-0"
  }
`}
      >
        <div className="w-full h-full bg-white rounded-xl px-6 py-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
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

          <div>
            <p className=" text-xs mt-4 text-blue-900">
              Formula= Σ (Credit Hrs × Grade Point) / Σ Credit Hrs
            </p>
          </div>
        </div>
        {/* calculated gpa and cgpa part */}
        <div className="w-auto h-fit sticky top-0 bg-[#f1f5f9] rounded-xl px-3 md:px-6 py-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.1)]">
          <div className="w-full grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-4">
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
