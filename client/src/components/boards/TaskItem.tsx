import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from './TasksBoard';

interface TaskItemProps {
  task: Task;
  style?: React.CSSProperties;
}

export const TaskItem = ({ task, style }: TaskItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    ...style,
  };

  return (
    <div
      ref={setNodeRef}
      className={`task-item ${isDragging ? 'dragging' : ''}`}
      style={itemStyle}
      {...attributes}
      {...listeners}
    >
      <div className="task-title">{task.title}</div>
      {task.description && (
        <div className="task-description">{task.description}</div>
      )}
      <div className="task-footer">
        <span className="task-id">ID: {task.id}</span>
        <span className="task-status">{task.status}</span>
      </div>
    </div>
  );
};