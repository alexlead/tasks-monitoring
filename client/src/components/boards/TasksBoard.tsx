import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { TasksContainer } from './TasksContainer';
import { TaskItem } from './TaskItem';

export type TaskStatus = 'backlog' | 'todo' | 'progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}

const containerConfig: Record<TaskStatus, { title: string; color: string }> = {
  backlog: { title: 'Backlog', color: '#e3e3e3' },
  todo: { title: 'To Do', color: '#bee3f8' },
  progress: { title: 'In Progress', color: '#fed7d7' },
  review: { title: 'Review', color: '#feebc8' },
  done: { title: 'Done', color: '#c6f6d5' },
};

export const TasksBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Design UI mockups', status: 'backlog' },
    { id: '2', title: 'Implement auth system', status: 'todo' },
    { id: '3', title: 'Database schema', status: 'progress' },
    { id: '4', title: 'API endpoints', status: 'review' },
    { id: '5', title: 'Setup CI/CD', status: 'done' },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTask(tasks.find(task => task.id === active.id) || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overStatus = over.data.current?.type === 'container' 
      ? over.id 
      : tasks.find(t => t.id === over.id)?.status;

    if (!overStatus) return;

    setTasks(tasks.map(task => 
      task.id === activeId ? { ...task, status: overStatus as TaskStatus } : task
    ));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId !== overId) {
      setTasks(items => {
        const activeIndex = items.findIndex(item => item.id === activeId);
        const overIndex = items.findIndex(item => item.id === overId);
        return arrayMove(items, activeIndex, overIndex);
      });
    }

    setActiveTask(null);
  };

  return (
    <div className="tasks-board">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {(Object.keys(containerConfig) as TaskStatus[]).map((status) => (
          <TasksContainer
            key={status}
            id={status}
            title={containerConfig[status].title}
            color={containerConfig[status].color}
            tasks={tasks.filter(task => task.status === status)}
          />
        ))}

        <DragOverlay>
          {activeTask && (
            <TaskItem 
              task={activeTask} 
              style={{
                transform: 'scale(1.05) rotate(2deg)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              }}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};