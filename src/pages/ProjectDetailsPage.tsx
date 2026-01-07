import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types/project";
import { getProjectById } from "../sevices/projectService";

const formatDate=(date?: string | null)=> {
    if(!date) return "-";
  
    return new Date(date).toLocaleDateString("en-GB");
};


export default function ProjectDetailsPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [project, setProjects] = useState<Project | null>(null);
    const [loading, setLoading] =useState(true);
    const [error, setError] = useState<string | null>(null);
    

        useEffect(()  => {
        if (!id) return;
        const projectId = Number(id);
        if(isNaN(projectId)) {
            setError("Invalid project id");
            setLoading(false);
            return;
        }
        (async () => {
            try {
                setLoading(true);
                const data = await getProjectById(projectId);
                console.log("DETAILS DATA:", data);
                 console.log("Dates from data:", data.startDate, data.endDate)
                setProjects(data);
               
                
            }
            catch {
                setError("Failed to load project");
            }
            finally {
                setLoading(false);
            }
        })();
    
    }, [id]);
    if(loading) {
        return<p>Loading</p>;
    }
    if(error) {
        return <p style={{color: "red"}}>
            {error}
        </p>
    }
    if(!project) {
        return <p>No project found</p>
    }

    return (
        <div style={{padding:28, fontFamily: "Arial, sans-serif"}}>
            <button
                onClick= {() => navigate("/")}
                style= {{
                    marginBottom: 16,
                    padding: "8px, 12px",
                    borderRadius:10,
                    border: "1px solid #e5e7eb",
                    background: "white",
                    cursor: "pointer",
                }}
                >
                  Back 
            </button>
            <h1>Project Details</h1>
            <p><b>Project Id:</b> {id}</p>
            <p><b>Name:</b> {project?.name || "-"}</p>
            <p><b>Description:</b> {project?.description || "-"}</p>
            <p><b>Tasks:</b>{project.taskCount ?? 0}</p>
            <p><b>Created:</b>{formatDate(project.createdAt)}</p>
            <p><b>Start:</b>{formatDate (project.startDate)}</p>
            <p><b>End:</b> {formatDate(project.endDate) }</p>
        </div>
    );


}