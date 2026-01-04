import { api } from "./api";
import type { Project } from "../types/project";

type PagedResponce<T> = {
    items: T[];
    page: number;
    pageSize:number;
    totalCount: number;
}

export type CreateProjectRequest = {
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
};

export type UpdateProjectRequest = {
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
};

export async function getProjects(): Promise<Project[]> {
    const res = await api.get<PagedResponce<Project>>("/Project");
    return res.data.items;
}

export async function getProjectById(id: number): Promise<Project> {
    const res = await api.get<Project>('Project/${id}');
    return res.data;
}

export async function createProject(data: CreateProjectRequest): Promise<Project> {
    const res = await api.post<Project>("Project", data);
    return res.data;
}

export async function updateProject(id: number, data: UpdateProjectRequest) :Promise<void> {
    await api.put('Project/${id}', data);
}

export async function deliteProject(id: number): Promise<void> {
    await api.delete('Project/${id}');
}
    
    
