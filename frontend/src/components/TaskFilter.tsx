
import { memo } from 'react';

export type TaskFilterValue = 'all' | 'completed' | 'pending';

interface Props {
  value: TaskFilterValue;
  onChange: (value: TaskFilterValue) => void;
}

const TaskFilter = ({ value, onChange }: Props) => {
  return (
    <div className="task-filter" role="radiogroup" aria-label="Filter tasks">
      {(['all', 'completed', 'pending'] as TaskFilterValue[]).map(v => (
        <button key={v} type="button" className={`filter-btn ${value === v ? 'active' : ''}`} onClick={() => onChange(v)} aria-pressed={value === v}>
          {v === 'all' ? 'All' : v === 'completed' ? 'Completed' : 'Pending'}
        </button>
      ))}
    </div>
  );
};

export default memo(TaskFilter);
