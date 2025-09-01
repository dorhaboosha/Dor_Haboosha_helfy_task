
import type { Task } from '../types/Task';

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem = ({ task, onToggle, onEdit, onDelete }: Props) => {
return (
    <article className={`task-item ${task.completed ? 'completed' : ''}`}>
      <header className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <span className={`badge prio-${task.priority}`}>{task.priority}</span>
      </header>

      {task.description && <p className="task-desc">{task.description}</p>}

      <footer className="task-footer">
        <time className="task-time">
          {task.createdAt.toLocaleString()}
        </time>

        <div className="task-actions">
          <button type="button" className="btn small" onClick={() => onToggle(task.id)} aria-pressed={task.completed} title="Toggle complete">
            {task.completed ? 'Mark Pending' : 'Mark Done'}
          </button>

          <button type="button" className="btn small" onClick={() => onEdit(task)} title="Edit task">
            Edit
          </button>

          <button type="button" className="btn small danger" onClick={() => onDelete(task.id)}  title="Delete task">
            Delete
          </button>
        </div>
      </footer>
    </article>
  );
};

export default TaskItem
