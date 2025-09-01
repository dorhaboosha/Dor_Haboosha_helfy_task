
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Task } from '../types/Task';
import TaskItem from './TaskItem';

interface Props {
  tasks: Task[];
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  speedPxPerSec?: number; // scroll speed
  gapPx?: number;         // gap between cards
}

const TaskList = ({tasks, onToggle, onEdit, onDelete, speedPxPerSec = 60, gapPx = 16}: Props) => {
  
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHover, setHover] = useState(false);

  const loopData = useMemo(() => {
    if (tasks.length === 0) return [];
    const times = tasks.length < 6 ? 3 : 2;
    return Array.from({ length: times }, () => tasks).flat();
  }, [tasks]);

  if (tasks.length === 0) {
    return (
      <div className="carousel-empty">
        <p>No tasks yet. Create your first task to get started.</p>
      </div>
    );
  }

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let offset = 0;

    const el = trackRef.current;
    if (!el) return;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!isHover) {
        offset += speedPxPerSec * dt;
        const totalWidth = el.scrollWidth / 2;
        if (totalWidth > 0) offset = offset % totalWidth;
        el.style.transform = `translateX(${-offset}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isHover, speedPxPerSec, loopData.length]);

  return (
    <div className="carousel" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      <div className="carousel-viewport">
        <div ref={trackRef} className="carousel-track" style={{ columnGap: `${gapPx}px` }} aria-label="Endless task carousel" >
          {/* First pass */}
          {tasks.map(t => (
            <div key={`a-${t.id}`} className="carousel-cell">
              <TaskItem task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ))}
          {/* Second pass (duplicate) */}
          {tasks.map(t => (
            <div key={`b-${t.id}`} className="carousel-cell">
              <TaskItem task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList
