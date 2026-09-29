import { useEffect, useMemo, useState } from "react";
import "./App.css";

const starterTasks = [
  { id: 1, text: "Map the next constellation", completed: false, tag: "Focus" },
  { id: 2, text: "Reply to mission control", completed: true, tag: "Admin" },
  { id: 3, text: "Plan tomorrow's orbit", completed: false, tag: "Planning" },
];

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("orbit-tasks"));
      return Array.isArray(savedTasks) ? savedTasks : starterTasks;
    } catch {
      return starterTasks;
    }
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [tag, setTag] = useState("Focus");
  useEffect(() => localStorage.setItem("orbit-tasks", JSON.stringify(todos)), [todos]);
  const visibleTodos = useMemo(() => todos.filter((todo) => filter === "all" || (filter === "active" ? !todo.completed : todo.completed)), [todos, filter]);
  const completed = todos.filter((todo) => todo.completed).length;
  const progress = todos.length ? Math.round((completed / todos.length) * 100) : 0;
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date()).toUpperCase();
  function addTask(event) { event.preventDefault(); const text = input.trim(); if (!text) return; setTodos((current) => [{ id: Date.now(), text, completed: false, tag }, ...current]); setInput(""); }
  function toggleTask(id) { setTodos((current) => current.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)); }
  function deleteTask(id) { setTodos((current) => current.filter((todo) => todo.id !== id)); }
  return (
    <main className="space-app">
      <div className="nebula nebula-one" /><div className="nebula nebula-two" /><div className="stars stars-a" /><div className="stars stars-b" />
      <section className="todo-shell">
        <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">◒</span> ORBIT</a><div className="date"><span>✦</span> {today}</div><button className="profile" aria-label="Open profile">NP</button></header>
        <div className="dashboard" id="top"><div className="intro"><p className="eyebrow">YOUR PERSONAL SPACE</p><h1>Today’s <em>mission.</em></h1><p className="subtitle">Small steps become giant leaps. What will you move forward today?</p></div><div className="progress-card"><div className="orbit-ring" style={{ "--progress": `${progress * 3.6}deg` }}><span>{progress}<small>%</small></span></div><div><p className="eyebrow">MISSION PROGRESS</p><strong>{completed} of {todos.length} complete</strong><p className="tiny">Keep your orbit steady.</p></div></div></div>
        <form className="task-form" onSubmit={addTask}><span className="form-spark">✦</span><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="What needs your attention?" aria-label="New task" /><select value={tag} onChange={(event) => setTag(event.target.value)} aria-label="Task category"><option>Focus</option><option>Planning</option><option>Admin</option><option>Personal</option></select><button type="submit">Add to orbit <span>↗</span></button></form>
        <div className="list-header"><div className="filters">{[["all", "All missions"], ["active", "In orbit"], ["completed", "Landed"]].map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div><p>{todos.length - completed} mission{todos.length - completed === 1 ? "" : "s"} remaining</p></div>
        <div className="task-list">{visibleTodos.length ? visibleTodos.map((todo) => <article className={`task ${todo.completed ? "is-complete" : ""}`} key={todo.id}><button className="checkbox" onClick={() => toggleTask(todo.id)} aria-label={`Mark ${todo.text} as ${todo.completed ? "active" : "complete"}`}><span>✓</span></button><div className="task-copy"><h2>{todo.text}</h2><span className={`tag tag-${todo.tag.toLowerCase()}`}>{todo.tag}</span></div><button className="delete" onClick={() => deleteTask(todo.id)} aria-label={`Delete ${todo.text}`}>×</button></article>) : <div className="empty"><span>✦</span><h2>Clear skies ahead</h2><p>No missions in this view.</p></div>}</div>
        <footer><span>✦ One task at a time.</span><span>Orbit v1.0</span></footer>
      </section>
    </main>
  );
}
