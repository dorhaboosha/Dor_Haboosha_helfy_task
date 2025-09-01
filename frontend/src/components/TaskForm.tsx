
import { useEffect, useMemo, useState } from 'react';
import type { Task, Priority } from '../types/Task';

type FormMode = 'create' | 'edit';

interface Props {
  mode: FormMode;
  initial?: Partial<Pick<Task, 'title'|'description'|'priority'>>;
  onSubmit: (data: { title: string; description: string; priority: Priority }) => void;
  onCancel?: () => void;
}

const EMPTY = { title: '', description: '', priority: 'medium' as Priority };


const TaskForm = ({ mode, initial, onSubmit, onCancel }: Props) => {
  
  const startValues = useMemo(() => ({ ...EMPTY, ...(initial ?? {}) }), [initial]);
  const [title, setTitle] = useState(startValues.title);
  const [description, setDescription] = useState(startValues.description);
  const [priority, setPriority] = useState<Priority>(startValues.priority);
  const [errors, setErrors] = useState<{title?: string}>({});

    useEffect(() => {
    setTitle(startValues.title);
    setDescription(startValues.description);
    setPriority(startValues.priority);
  }, [startValues]);

    function validate() {
    const e: typeof errors = {};
    if (!title.trim()) e.title = 'Title is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

    function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title: title.trim(), description: description.trim(), priority });
  }

return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h3 className="form-title">{mode === 'create' ? 'Add Task' : 'Edit Task'}</h3>

      <label className="field">
        <span>Title</span>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Buy milk" aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined} />
        {errors.title && <small id="title-error" className="error">{errors.title}</small>}
      </label>

      <label className="field">
        <span>Description</span>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional details…" rows={3} />
      </label>

      <label className="field">
        <span>Priority</span>
        <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <div className="form-actions">
        <button type="submit" className="btn primary">
          {mode === 'create' ? 'Create' : 'Save'}
        </button>
        {onCancel && (
          <button type="button" className="btn ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
