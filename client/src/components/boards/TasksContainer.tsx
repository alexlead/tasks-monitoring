import React, { memo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from './TasksBoard';
import TaskItem from './TaskItem';

interface ITasksContainerProps {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}

const TasksContainer: React.FunctionComponent<ITasksContainerProps> = memo ( ({ id, title, color, tasks }) => {
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
      <h3 className="container-title mb-0">
        {title} <span className="task-count">({tasks.length})</span>
      </h3>
      <div className="container-body">
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
    </div>
  );
} );

export default TasksContainer;