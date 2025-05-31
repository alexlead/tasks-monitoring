import React, { useEffect, useState } from 'react';
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
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import TasksContainer from './TasksContainer';
import TaskItem from './TaskItem';
import TaskEditModal from '../tasks/TaskEditModal';
import { selectTask, toggleModal, updateStatuses, updateTasks } from '../../store/slices/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStatuses } from '../../api/statusApi';
import { getAllTasks, updTaskStatus } from '../../api/taskApi';
import { TTaskItem } from '../../models/taskModels';

export interface ITasksBoardProps {

}



const TasksBoard: React.FunctionComponent<ITasksBoardProps> = () => {

  const dispatch = useDispatch();
  const { statuses, tasks } = useSelector(selectTask);
  const [activeTask, setActiveTask] = useState<TTaskItem | null>(null);

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
      : tasks.find(t => t.id === over.id)?.statusId;

    if (!overStatus) return;

    dispatch(updateTasks([...tasks.map(task =>
      task.id === +activeId ? { ...task, statusId: overStatus as string } : task
    )]));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const overStatus = over.data.current?.type === 'container'
      ? over.id
      : tasks.find(t => t.id === over.id)?.statusId;
    if (!overStatus) return;
    const activeId = active.id;

    updateTaskStatus(+activeId, overStatus as string);
    setActiveTask(null);
  };

  const showModal = () => {
    dispatch(toggleModal({ taskId: 0, showModal: true }))
  }

  const updateTaskStatus = async (id: number, statusId: string) => {
    try {
      const res = await updTaskStatus(id, statusId.replace("cont", ""));
      if (res.status === 200) {
        let item = { ...tasks.filter(item => item.id === id)[0] }
        item.statusId = statusId;
        dispatch(updateTasks([...tasks.filter(item => item.id !== id), item]))
      }
    } catch (error) {

    }
  }

  const getStatusContainerList = async () => {
    try {
      const res = await getAllStatuses();
      if (res.status === 200) {
        dispatch(updateStatuses([...res.data.data.map((item:any)=> ({...item, id: `cont${item.id}`}))]));
      }

    } catch (error) {
      console.error(error)
    }
  }

  const getAllTaskItems = async () => {
    try {
      const res = await getAllTasks();
      if (res.status === 200) {
        dispatch(updateTasks([...res.data.data.map((item: any) => ({ id: item.id, title: item.title, description: item.description, createdDate: (new Date(item.created_date)).toLocaleDateString(), statusId: `cont${item.status_id}` }))]));
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {

    getStatusContainerList();
    getAllTaskItems();

    return (() => {
      dispatch(toggleModal({ taskId: 0, showModal: false }))
    })
  }, []);

  return (
    <>
      <div className="task-buttons text-end">
        <button type="button" className="btn btn-light-blue" onClick={showModal}><i className="bi bi-plus-lg"></i> Add new</button>
      </div>

      <div className="tasks-board">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          
          {statuses.map((status) => (
            <TasksContainer
              key={`cont-${status.id}`}
              id={status.id}
              title={status.title}
              color={status.color}
              tasks={tasks.filter(task => task.statusId === status.id)}
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

      <TaskEditModal />
    </>
  );
};

export default TasksBoard;