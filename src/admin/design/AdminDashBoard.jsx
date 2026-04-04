import React, { useState, useEffect } from "react";
import "./adminDashStyle.css";

export default function AdminDashBoard() {
  // State Management
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [activeTab, setActiveTab] = useState("subjects");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSubject, setEditingSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({
    show: false,
    text: "",
    isError: false,
  });

  // Batch subject form state
  const [batchSubjects, setBatchSubjects] = useState([
    { id: Date.now(), name: "", code: "", credit: "" },
  ]);
  const [selectedSemester, setSelectedSemester] = useState("");

  // Semester form state
  const [newSemester, setNewSemester] = useState({
    name: "",
    year: new Date().getFullYear(),
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSemesters = localStorage.getItem("semesters");
    const savedSubjects = localStorage.getItem("subjects");

    if (savedSemesters) setSemesters(JSON.parse(savedSemesters));
    if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("semesters", JSON.stringify(semesters));
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [semesters, subjects]);

  // Show temporary message
  const showMessage = (text, isError = false) => {
    setMessage({ show: true, text, isError });
    setTimeout(
      () => setMessage({ show: false, text: "", isError: false }),
      3000,
    );
  };

  // Semester Management
  const addSemester = () => {
    if (!newSemester.name.trim()) {
      showMessage("Please enter semester name", true);
      return;
    }

    const semester = {
      id: Date.now(),
      name: newSemester.name,
      year: newSemester.year,
      createdAt: new Date().toISOString(),
    };

    setSemesters([...semesters, semester]);
    setNewSemester({ name: "", year: new Date().getFullYear() });
    showMessage(`✅ Semester "${semester.name}" added successfully!`);
  };

  const deleteSemester = (id) => {
    const hasSubjects = subjects.some((s) => s.semesterId === id);
    if (hasSubjects) {
      showMessage("⚠️ Cannot delete semester with existing subjects!", true);
      return;
    }

    if (window.confirm("Are you sure you want to delete this semester?")) {
      setSemesters(semesters.filter((s) => s.id !== id));
      showMessage("🗑️ Semester deleted successfully!");
    }
  };

  // Batch Subject Management
  const addBatchSubjectRow = () => {
    setBatchSubjects([
      ...batchSubjects,
      { id: Date.now(), name: "", code: "", credit: "" },
    ]);
  };

  const removeBatchSubjectRow = (id) => {
    if (batchSubjects.length === 1) {
      setBatchSubjects([{ id: Date.now(), name: "", code: "", credit: "" }]);
    } else {
      setBatchSubjects(batchSubjects.filter((row) => row.id !== id));
    }
  };

  const updateBatchSubject = (id, field, value) => {
    setBatchSubjects(
      batchSubjects.map((row) =>
        row.id === id ? { ...row, [field]: value } : row,
      ),
    );
  };

  const addBatchSubjects = () => {
    if (!selectedSemester) {
      showMessage("Please select a semester!", true);
      return;
    }

    const validSubjects = batchSubjects.filter(
      (row) =>
        row.name.trim() &&
        row.code.trim() &&
        row.credit &&
        parseFloat(row.credit) > 0,
    );

    if (validSubjects.length === 0) {
      showMessage("Please add at least one valid subject!", true);
      return;
    }

    const newSubjects = validSubjects.map((row) => ({
      id: Date.now() + Math.random(),
      semesterId: parseInt(selectedSemester),
      name: row.name.trim(),
      code: row.code.trim().toUpperCase(),
      credit: parseFloat(row.credit),
      createdAt: new Date().toISOString(),
    }));

    setSubjects([...subjects, ...newSubjects]);
    setBatchSubjects([{ id: Date.now(), name: "", code: "", credit: "" }]);
    setSelectedSemester("");
    showMessage(`✅ Successfully added ${newSubjects.length} subject(s)!`);
  };

  // Subject CRUD Operations
  const deleteSubject = (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      setSubjects(subjects.filter((s) => s.id !== id));
      showMessage("🗑️ Subject deleted successfully!");
    }
  };

  const editSubject = (subject) => {
    setEditingSubject(subject);
    setShowModal(true);
  };

  const updateSubject = () => {
    if (
      !editingSubject.name.trim() ||
      !editingSubject.code.trim() ||
      editingSubject.credit <= 0
    ) {
      showMessage("Please fill all fields correctly", true);
      return;
    }

    setSubjects(
      subjects.map((s) =>
        s.id === editingSubject.id
          ? { ...editingSubject, code: editingSubject.code.toUpperCase() }
          : s,
      ),
    );
    setShowModal(false);
    setEditingSubject(null);
    showMessage("✅ Subject updated successfully!");
  };

  // Helper Functions
  const getSemesterName = (semesterId) => {
    const semester = semesters.find((s) => s.id === semesterId);
    return semester ? `${semester.name} (${semester.year})` : "Unknown";
  };

  const getSemesterStats = () => {
    const stats = semesters.map((semester) => {
      const semesterSubjects = subjects.filter(
        (s) => s.semesterId === semester.id,
      );
      const totalCredits = semesterSubjects.reduce(
        (sum, s) => sum + s.credit,
        0,
      );
      return {
        ...semester,
        subjectCount: semesterSubjects.length,
        totalCredits,
      };
    });
    return stats;
  };

  const getOverallStats = () => {
    const totalSubjects = subjects.length;
    const totalSemesters = semesters.length;
    const totalCredits = subjects.reduce((sum, s) => sum + s.credit, 0);
    const avgCredits =
      totalSemesters > 0 ? (totalCredits / totalSemesters).toFixed(1) : 0;
    return { totalSubjects, totalSemesters, totalCredits, avgCredits };
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Components
  const StatsCard = ({ icon, title, value }) => (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  const SubjectsTab = () => (
    <>
      {/* Batch Add Form */}
      <div className="form-section">
        <div className="section-title">
          <span>➕</span> Batch Add Subjects
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Select Semester *</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="">Select Semester</option>
              {semesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                  {semester.name} ({semester.year})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>&nbsp;</label>
            <button className="btn-add-row" onClick={addBatchSubjectRow}>
              + Add Another Subject
            </button>
          </div>
        </div>

        <div className="batch-table-container">
          <table className="batch-table">
            <thead>
              <tr>
                <th width="30%">Subject Name</th>
                <th width="30%">Subject Code</th>
                <th width="25%">Credit Hours</th>
                <th width="15%">Action</th>
              </tr>
            </thead>
            <tbody>
              {batchSubjects.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g., Mathematics"
                      value={row.name}
                      onChange={(e) =>
                        updateBatchSubject(row.id, "name", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="e.g., MATH101"
                      value={row.code}
                      onChange={(e) =>
                        updateBatchSubject(row.id, "code", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      placeholder="3"
                      value={row.credit}
                      onChange={(e) =>
                        updateBatchSubject(row.id, "credit", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn-remove-row"
                      onClick={() => removeBatchSubjectRow(row.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="btn-submit" onClick={addBatchSubjects}>
          📚 Add All Subjects →
        </button>
      </div>

      {/* Subjects List */}
      <div className="data-section">
        <div className="table-header">
          <div className="section-title" style={{ border: "none", padding: 0 }}>
            <span>📚</span> Subject List
          </div>
          <input
            type="text"
            className="search-box"
            placeholder="🔍 Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Credit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No subjects found.
                  </td>
                </tr>
              ) : (
                filteredSubjects.map((subject) => (
                  <tr key={subject.id}>
                    <td>{getSemesterName(subject.semesterId)}</td>
                    <td>
                      <strong>{subject.code}</strong>
                    </td>
                    <td>{subject.name}</td>
                    <td>{subject.credit}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon btn-edit"
                          onClick={() => editSubject(subject)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => deleteSubject(subject.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const SemestersTab = () => (
    <>
      <div className="form-section">
        <div className="section-title">
          <span>➕</span> Add New Semester
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Semester Name *</label>
            <input
              type="text"
              placeholder="e.g., Fall 2024, Spring 2025"
              value={newSemester.name}
              onChange={(e) =>
                setNewSemester({ ...newSemester, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Year *</label>
            <input
              type="number"
              value={newSemester.year}
              onChange={(e) =>
                setNewSemester({
                  ...newSemester,
                  year: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="form-group">
            <label>&nbsp;</label>
            <button className="btn-submit" onClick={addSemester}>
              Add Semester
            </button>
          </div>
        </div>
      </div>

      <div className="data-section">
        <div className="table-header">
          <div className="section-title" style={{ border: "none", padding: 0 }}>
            <span>🗓️</span> Semester List
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Semester Name</th>
                <th>Year</th>
                <th>Total Subjects</th>
                <th>Total Credits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {semesters.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No semesters added yet.
                  </td>
                </tr>
              ) : (
                getSemesterStats().map((semester) => (
                  <tr key={semester.id}>
                    <td>
                      <strong>{semester.name}</strong>
                    </td>
                    <td>{semester.year}</td>
                    <td>{semester.subjectCount}</td>
                    <td>{semester.totalCredits}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => deleteSemester(semester.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const StatisticsTab = () => {
    const stats = getOverallStats();
    const semesterStats = getSemesterStats();

    return (
      <>
        <div className="stats-grid">
          <StatsCard
            icon="📚"
            title="Total Subjects"
            value={stats.totalSubjects}
          />
          <StatsCard
            icon="🗓️"
            title="Total Semesters"
            value={stats.totalSemesters}
          />
          <StatsCard
            icon="📊"
            title="Total Credits"
            value={stats.totalCredits}
          />
          <StatsCard
            icon="⭐"
            title="Avg Credits/Semester"
            value={stats.avgCredits}
          />
        </div>

        <div className="data-section">
          <div className="section-title">
            <span>📊</span> Semester-wise Subject Distribution
          </div>
          {semesters.length === 0 ? (
            <div className="empty-state">No semesters added yet.</div>
          ) : (
            semesterStats.map((semester) => {
              const semesterSubjects = subjects.filter(
                (s) => s.semesterId === semester.id,
              );
              return (
                <div key={semester.id} className="semester-group">
                  <div className="semester-title">
                    <span>
                      📖 {semester.name} ({semester.year})
                    </span>
                    <span className="badge">
                      {semester.subjectCount} Subjects | {semester.totalCredits}{" "}
                      Credits
                    </span>
                  </div>
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Subject Name</th>
                        <th>Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semesterSubjects.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="empty-state">
                            No subjects in this semester
                          </td>
                        </tr>
                      ) : (
                        semesterSubjects.map((subject) => (
                          <tr key={subject.id}>
                            <td>{subject.code}</td>
                            <td>{subject.name}</td>
                            <td>{subject.credit}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              );
            })
          )}
        </div>
      </>
    );
  };
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          📚 <span>Admin Panel</span>
        </div>
        <div
          className={`nav-item ${activeTab === "subjects" ? "active" : ""}`}
          onClick={() => setActiveTab("subjects")}
        >
          📖 <span>Subjects</span>
        </div>
        <div
          className={`nav-item ${activeTab === "semesters" ? "active" : ""}`}
          onClick={() => setActiveTab("semesters")}
        >
          🗓️ <span>Semesters</span>
        </div>
        <div
          className={`nav-item ${activeTab === "statistics" ? "active" : ""}`}
          onClick={() => setActiveTab("statistics")}
        >
          📊 <span>Statistics</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-bar">
          <div className="page-title">
            {activeTab === "subjects" && "Subject Management"}
            {activeTab === "semesters" && "Semester Management"}
            {activeTab === "statistics" && "Statistics Dashboard"}
          </div>
          <div className="admin-badge">👑 Admin Dashboard</div>
        </div>

        {message.show && (
          <div
            className={`success-message ${message.isError ? "error" : ""}`}
            style={{ display: "block" }}
          >
            {message.text}
          </div>
        )}

        {activeTab === "subjects" && <SubjectsTab />}
        {activeTab === "semesters" && <SemestersTab />}
        {activeTab === "statistics" && <StatisticsTab />}
      </div>

      {/* Edit Modal */}
      {showModal && editingSubject && (
        <div
          className="modal"
          style={{ display: "flex" }}
          onClick={() => setShowModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>✏️ Edit Subject</h3>
            <div className="form-group" style={{ marginBottom: 15 }}>
              <label>Subject Name</label>
              <input
                type="text"
                value={editingSubject.name}
                onChange={(e) =>
                  setEditingSubject({ ...editingSubject, name: e.target.value })
                }
              />
            </div>
            <div className="form-group" style={{ marginBottom: 15 }}>
              <label>Subject Code</label>
              <input
                type="text"
                value={editingSubject.code}
                onChange={(e) =>
                  setEditingSubject({ ...editingSubject, code: e.target.value })
                }
              />
            </div>
            <div className="form-group" style={{ marginBottom: 15 }}>
              <label>Credit Hours</label>
              <input
                type="number"
                step="0.5"
                value={editingSubject.credit}
                onChange={(e) =>
                  setEditingSubject({
                    ...editingSubject,
                    credit: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="modal-buttons">
              <button
                className="btn-submit"
                onClick={() => setShowModal(false)}
                style={{ background: "#94a3b8" }}
              >
                Cancel
              </button>
              <button className="btn-submit" onClick={updateSubject}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
