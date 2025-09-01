
import type { Task } from '../types/Task';

const BASE = import.meta.env.VITE_API_BASE;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
  return res.status === 204 ? (undefined as T) : res.json();
}

export const api = {
  getTasks: () => request<Task[]>('/tasks'),

  createTask: (data: Pick<Task,'title'|'description'|'priority'>) =>
    request<Task>('/tasks', { method: 'POST', body: JSON.stringify(data) }),

  updateTask: (id:number, data: Partial<Omit<Task,'id'>>) =>
    request<Task>(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteTask: (id:number) =>
    request<void>(`/tasks/${id}`, { method: 'DELETE' }),
  
  toggleTask: (id:number) =>
    request<Task>(`/tasks/${id}/toggle`, { method: 'PATCH' }),
};