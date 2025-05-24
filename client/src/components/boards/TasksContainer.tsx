import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskItem } from './TaskItem';
import { Task, TaskStatus } from './TasksBoard';

interface TasksContainerProps {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}

export const TasksContainer = ({ id, title, color, tasks }: TasksContainerProps) => {
  const { setNodeRef } = useDroppable({
    id,
    data: { type: 'container' },
  });

  return (
    <div 
      ref={setNodeRef}
      className="tasks-container"
      style={{ backgroundColor: color }}
    >
      <h3 className="container-title">
        {title} <span className="task-count">({tasks.length})</span>
      </h3>
      
      <SortableContext 
        items={tasks.map(task => task.id)} 
        strategy={verticalListSortingStrategy}
      >
        <div className="tasks-list">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};