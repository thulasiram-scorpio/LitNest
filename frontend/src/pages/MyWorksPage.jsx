import React, { useState } from "react";
import "./MyWorksPage.css";

function MyWorks() {

  const [activeTab, setActiveTab] = useState("create");

  const [works, setWorks] = useState([]);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Poem");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const addWork = () => {

    if(!title || !content) return;

    const newWork = {
      id: Date.now(),
      title,
      type,
      content,
      cover
    };

    setWorks([...works,newWork]);

    setTitle("");
    setContent("");
    setCover("");
  };

  const deleteWork = (id) => {
    setWorks(works.filter(work => work.id !== id));
  };

  return (

    <div className="works-container">

      <h1 className="page-title">📚 My Literary Works</h1>

      {/* Tabs */}

      <div className="tabs">

        <button
        className={activeTab==="create" ? "active" : ""}
        onClick={()=>setActiveTab("create")}
        >
        ✍ Create
        </button>

        <button
        className={activeTab==="list" ? "active" : ""}
        onClick={()=>setActiveTab("list")}
        >
        📖 My Works
        </button>

        <button
        className={activeTab==="manage" ? "active" : ""}
        onClick={()=>setActiveTab("manage")}
        >
        🗑 Manage
        </button>

      </div>

      {/* CREATE */}

      {activeTab==="create" && (

      <div className="create-card">

        <input
        placeholder="Title of your work"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />

        <select
        value={type}
        onChange={(e)=>setType(e.target.value)}
        >
          <option>Poem</option>
          <option>Story</option>
          <option>Essay</option>
          <option>Article</option>
          <option>Script</option>
          <option>Novel</option>
          <option>Quote</option>
        </select>

        <input
        placeholder="Cover Image URL (optional)"
        value={cover}
        onChange={(e)=>setCover(e.target.value)}
        />

        <textarea
        placeholder="Write your work..."
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        />

        <p className="word-count">Words: {wordCount}</p>

        <button className="publish-btn" onClick={addWork}>
        Publish
        </button>

      </div>

      )}

      {/* LIST */}

      {activeTab==="list" && (

      <div className="works-grid">

      {works.map(work => (

        <div className="work-card" key={work.id}>

          {work.cover && (
            <img src={work.cover} alt="" className="cover"/>
          )}

          <span className="type-tag">{work.type}</span>

          <h3>{work.title}</h3>

          <p className="preview">
          {work.content.slice(0,90)}...
          </p>

        </div>

      ))}

      </div>

      )}

      {/* MANAGE */}

      {activeTab==="manage" && (

      <div>

      {works.map(work => (

        <div className="manage-card" key={work.id}>

        <h3>{work.title}</h3>

        <button
        className="delete-btn"
        onClick={()=>deleteWork(work.id)}
        >
        Delete
        </button>

        </div>

      ))}

      </div>

      )}

    </div>

  );
}

export default MyWorks;
