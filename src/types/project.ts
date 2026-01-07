export type Project = {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    taskCount: number;
    startDate: string | null;
    endDate: string | null;
};