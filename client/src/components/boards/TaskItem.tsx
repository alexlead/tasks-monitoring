import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from './TasksBoard';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../store/slices/taskSlice';

interface ITaskItemProps {
  task: Task;
  style?: React.CSSProperties;
}

const TaskItem: React.FunctionComponent<ITaskItemProps>  = memo (({ task, style }) => {

  const dispatch = useDispatch();
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

        const showModal = () => {
            dispatch( toggleModal( {taskId: +task.id, showModal: true} ) )
        }
  
  return (
    <div
      ref={setNodeRef}
      className={`task-item ${isDragging ? 'dragging' : ''}`}
      style={itemStyle}
      {...attributes}
      {...listeners}
      onDoubleClick={showModal}
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
} ) ;

export default TaskItem;