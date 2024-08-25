export interface Todo {
    id: number;
    title: string;
    comment: string;
    createdAt: string;
    completedAt: string | null;
}