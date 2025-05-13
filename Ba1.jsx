import React, { useState, useEffect } from "react";
import "./Bai1.css";

export default function Bai1() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");
  const [filter, setFilter] = useState("Tất cả");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") {
      alert("Tên công việc không được để trống.");
      return;
    }
    setTasks([...tasks, { id: tasks.length + 1, text: newTask, completed: false }]);
    setNewTask("");
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id, text) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  const handleSaveEdit = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: editingTaskText } : task));
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "Đã hoàn thành") return task.completed;
    if (filter === "Chưa hoàn thành") return !task.completed;
    return true;
  });

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={handleAddTask}>
                    <div className="form-outline">
                      <input 
                        placeholder="Nhập tên công việc"
                        type="text"
                        id="form2"
                        className="form-control"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                      />
                      <button type="submit" className="btn btn-info ms-2">Thêm</button>
                    </div>
                    
                  </form>

                  <div className="d-flex mb-3">
                    <button className="btn btn-secondary mx-1" onClick={() => setFilter("Tất cả")}>Tất cả</button>
                    <button className="btn btn-success mx-1" onClick={() => setFilter("Đã hoàn thành")}>Đã hoàn thành</button>
                    <button className="btn btn-warning1 mx-1" onClick={() => setFilter("Chưa hoàn thành")}>Chưa hoàn thành</button>
                  </div>

                  <ul className="list-group mb-0">
                    {filteredTasks.map(task => (
                      <li
                        key={task.id}
                        className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                        style={{ backgroundColor: "#f4f6f7" }}
                      >
                        <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task.id)} />
                        {editingTaskId === task.id ? (
                          <>
                            <input
                              type="text"
                              value={editingTaskText}
                              onChange={(e) => setEditingTaskText(e.target.value)}
                            />
                            <button className="btn btn-success btn-sm ms-2" onClick={() => handleSaveEdit(task.id)}>Lưu</button>
                          </>
                        ) : (
                          <>
                            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.text}</span>
                            <button className="btn btn-warning btn-sm ms-2" onClick={() => handleEditTask(task.id, task.text)}>Sửa</button>
                          </>
                        )}
                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteTask(task.id)}>Xóa</button>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
