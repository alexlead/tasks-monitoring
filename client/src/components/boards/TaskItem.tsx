import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../store/slices/taskSlice';
import { TTaskItem } from '../../models/taskModels';

interface ITaskItemProps {
  task: TTaskItem;
  style?: React.CSSProperties;
}

const TaskItem: React.FunctionComponent<ITaskItemProps> = memo(({ task, style }) => {

  const dispatch = useDispatch();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging

  } = useSortable({ id: task.id || 0 });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    ...style
  };

  const showModal = () => {
    dispatch(toggleModal({ taskId: task.id || 0, showModal: true }))
  }

  return (
    <div
      ref={setNodeRef}
      className={`task-item ${isDragging ? 'dragging' : ''}`}
      style={itemStyle}
      {...attributes}
      {...listeners}
      onClick={showModal}
    >
      <div className="task-title">{task.title}</div>
      <div className="task-footer">
        <span className="task-id">ID: {task.id}</span>
        <span className="task-status">{task.createdDate}</span>
      </div>
    </div>
  );
});

export default TaskItem;