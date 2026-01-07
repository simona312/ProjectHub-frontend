import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../sevices/projectService";
import type { Project } from "../types/project";
import {Folder, Inbox,  CheckSquare, CalendarCheck, Flag, } from "lucide-react";


function formatDate(date?: string | null) {
  if (!date) return "—";
  // ако е ISO string, земи YYYY-MM-DD
  return new Date(date).toLocaleDateString();
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProjects();
        setProjects(data ?? []);
      } catch (e) {
        setError("Ne uspea da gi zemam projektite (API error).");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // --- styles  ---
  const pageStyle: React.CSSProperties = {
    padding: 28,
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    marginBottom: 18,
    fontSize: 44,
    fontWeight: 800,
    letterSpacing: -0.5,
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
    maxWidth: 980,
  };

  const cardBase: React.CSSProperties = {
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 14,
    background: "white",
    cursor: "pointer",
    transition: "box-shadow 0.2s ease, transform 0.2s ease",
  };

  const cardHeader: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 8,
  };

  const nameStyle: React.CSSProperties = {
    margin: 0,
    fontSize: 20,
    fontWeight: 900,
    lineHeight: 1.2,
    marginBottom: 2
  };

  const idBadge: React.CSSProperties = {
    fontSize: 12,
    opacity: 0.75,
    border: "1px solid #e5e7eb",
    padding: "4px 8px",
    borderRadius: 999,
    background: "#f9fafb",
  };

  const descStyle: React.CSSProperties = {
    margin: 0,
    marginBottom: 10,
    opacity: 0.75,
    fontSize: 13,
    lineHeight: 1.4,
  };

  const badgesRow: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  };

  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    color : "#374151",
    lineHeight: 1,
    transition:"background 0.15s ease, transform 0.15s ease",
    cursor: "default"

  };

  const emptyWrap: React.CSSProperties = {
    border: "1px dashed #d1d5db",
    background: "#fafafa",
    borderRadius: 14,
    padding: 18,
    maxWidth: 520,
  };

  const btnStyle: React.CSSProperties = {
    marginTop: 12,
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "white",
    cursor: "pointer",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  };

  // --- UI states ---
  if (loading) {
    return (
      <div style={pageStyle}>
        <h1 style={titleStyle}>Projects</h1>
        <p style={{ opacity: 0.7 }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageStyle}>
        <h1 style={titleStyle}>Projects</h1>
        <p style={{ color: "#b91c1c" }}>{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div style={pageStyle}>
        <h1 style={titleStyle}>Projects</h1>

        <div style={emptyWrap}>
          <h2 style={{ margin: 0, marginBottom: 6, display: "flex", alignItems: "centar", gap: 8 }}>
            <Inbox size= {18} style = {{opacity: 0.8}}/>
            No projects yet</h2>
          <p style={{ margin: 0, opacity: 0.75 }}>
            Create your first project in Swagger / API, then refresh.
          </p>

          <button
            style={btnStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-1px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 8px 18px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "none";
            }}
            onClick={() => window.location.reload()}
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    );
  }

  // --- normal view ---
  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Projects</h1>

      <div style={gridStyle}>
        {projects.map((p) => {
          const name =
            !p.name || p.name.trim() === "" || p.name === "string"
              ? "Untitled project"
              : p.name;

          const desc =
            !p.description || p.description.trim() === "" || p.description === "string"
              ? "No description"
              : p.description;

          const isHovered = hoveredId === p.id;

          return (
            <div
              key={p.id}
             
              onClick={() => navigate(`/projects/${p.id}`)}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                ...cardBase,
                boxShadow: isHovered
                  ? "0 10px 24px rgba(0,0,0,0.10)"
                  : "0 2px 6px rgba(0,0,0,0.05)",
                transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                borderColor: isHovered ? "#c7d2fe" : "#e5e7eb"
              }}
            >
              <div style={cardHeader}>
                <div>
                  <h3 style={nameStyle}>{name}</h3>
                </div>
                <span style={idBadge}>#{p.id}</span>
              </div>

              <p style={descStyle}>{desc}</p>

              <div style={badgesRow}>
                <span 
                style={{
                  ...badgeStyle,
                  background: hoveredBadge === 'tasks-${p.id}' ? "#eef2ff" : badgeStyle.background,
                  transform: hoveredBadge === 'tasks-${p.id}' ? "translateY(-1px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHoveredBadge('tasks-${p.id')}
                onMouseLeave={() => setHoveredBadge(null)}>
                  <CheckSquare size ={14} style={{opacity: 0.8}}/>
                  Tasks: {p.taskCount ?? 0}
                </span>
                <span style= {{...badgeStyle,
                background:hoveredBadge === 'start-${p.id}' ? "#ecfeff" : badgeStyle.background,
                transform: hoveredBadge === 'start-${p.id}' ? "translateY(-1px)" : "translateY(0)",
                }}
                onMouseEnter={()=> setHoveredBadge('start-${p.id')}
                onMouseLeave={()=> setHoveredBadge(null)}
                >
                  <CalendarCheck size={14} style={{opacity:0.8}}/>
                  Start: {formatDate(p.startDate)}

                </span>
                <span style={{ ...badgeStyle,
                background:hoveredBadge === 'end-${p.id}' ? "#ecfeff" : badgeStyle.background,
                transform: hoveredBadge === 'end-${p.id}' ? "translateY(-1px)" : "translateY(0)",
                }}
                onMouseEnter={()=> setHoveredBadge('end-${p.id')}
                onMouseLeave={()=> setHoveredBadge(null)}
                >
                  <Flag size={14} style={{opacity: 0.8}}/>
                  End: {formatDate(p.endDate)}
                </span>
              </div>

              <div style={{ marginTop: 10, opacity: 0.7, fontSize: 12,
                display: "flex", alignItems: "center", gap: 6
               }}>
                <Folder size= {14} />
                <span>Click to open details</span>
              
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}