
import { useEffect, useMemo, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter, { type TaskFilterValue } from './components/TaskFilter';
import Spinner from './components/Spinner';
import ErrorBanner from './components/ErrorBanner';

import type { Task, Priority } from './types/Task';
import { api } from './services/api';

function toTaskWithDate(t: any): Task {
  return { ...t, createdAt: new Date(t.createdAt) } as Task;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskFilterValue>('all');
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getTasks();
      setTasks(res.map(toTaskWithDate));
    } 

    catch (e: any) {
      setError(e?.message || 'Failed to load tasks');
    } 

    finally {
      setLoading(false);
    }
  }

  const visibleTasks = useMemo(() => {
    switch (filter) {
      case 'completed': return tasks.filter(t => t.completed);
      case 'pending': return tasks.filter(t => !t.completed);
      default: return tasks;
    }
  }, [tasks, filter]);

  async function handleCreate(data: { title: string; description: string; priority: Priority }) {
    try {
      setError(null);
      const created = await api.createTask(data);
      setTasks(prev => [toTaskWithDate(created), ...prev]);
      setCreateOpen(false);
    } 
    catch (e: any) {
      setError(e?.message || 'Failed to create task');
    }
  }

  async function handleUpdate(id: number, data: { title: string; description: string; priority: Priority }) {
    try {
      setError(null);
      const updated = await api.updateTask(id, data);
      setTasks(prev => prev.map(t => (t.id === id ? toTaskWithDate(updated) : t)));
      setEditing(null);
    } 
    catch (e: any) {
      setError(e?.message || 'Failed to update task');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this task?')) return;
    try {
      setError(null);
      await api.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } 
    catch (e: any) {
      setError(e?.message || 'Failed to delete task');
    }
  }

  async function handleToggle(id: number) {
    try {
      setError(null);
      const updated = await api.toggleTask(id);
      setTasks(prev => prev.map(t => (t.id === id ? toTaskWithDate(updated) : t)));
    } 
    catch (e: any) {
      setError(e?.message || 'Failed to toggle task');
    }
  }

  return (
    <main className="app-shell" style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.75rem', marginBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>Task Manager</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <TaskFilter value={filter} onChange={setFilter} />
          <button type="button" className="btn primary" onClick={() => setCreateOpen(v => !v)}>
            {isCreateOpen ? 'Close' : 'Add Task'}
          </button>
        </div>
      </header>

      {error && <ErrorBanner message={error} onRetry={fetchTasks} />}

      {isCreateOpen && (
        <section style={{ marginBottom: '1rem' }}>
          <TaskForm mode="create" onSubmit={handleCreate} onCancel={() => setCreateOpen(false)} />
        </section>
      )}

      {editing && (
        <section style={{ marginBottom: '1rem' }}>
          <TaskForm mode="edit" initial={{
              title: editing.title,
              description: editing.description,
              priority: editing.priority,
            }} onSubmit={(data) => handleUpdate(editing.id, data)} onCancel={() => setEditing(null)}
          />
        </section>
      )}

      {loading ? (
        <Spinner message="Loading tasks..." />
      ) : (
        <TaskList tasks={visibleTasks} onToggle={handleToggle} onEdit={setEditing} onDelete={handleDelete} speedPxPerSec={60} gapPx={16}
        />
      )}
    </main>
  );
};

export default App;
