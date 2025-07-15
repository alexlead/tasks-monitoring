import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTask, toggleModal, updateTasks } from '../../store/slices/taskSlice';
import { addNewTask, deleteTask, updTask } from '../../api/taskApi';


interface ITaskEditModalProps {
}

const TaskEditModal: React.FunctionComponent<ITaskEditModalProps> = () => {

    const dispatch = useDispatch();
    const { taskEdit, tasks } = useSelector(selectTask)
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [buttonsDisabled, setButtonDisabled] = useState<boolean>(false);

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }
    const hideModal = () => {
        dispatch(toggleModal({ taskId: 0, showModal: false }))
    }

    const deleteCurrentTask = async () => {
        setButtonDisabled(true);
        try {
            const res = await deleteTask(taskEdit.taskId);
            if (res.status === 200) {
                dispatch(updateTasks([...tasks.filter(item => item.id !== taskEdit.taskId)]))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setButtonDisabled(false);
            hideModal();
        }
    }

    const saveNewTask = async () => {

        try {
            const res = await addNewTask({ title, description })
            if (res.status === 200) {
                const receivedObj = { ...res.data.data }
                let item = { id: receivedObj.id, title: receivedObj.title, description: receivedObj.description, createdDate: (new Date(receivedObj.createdDate)).toLocaleDateString(), statusId: `cont${receivedObj.statusId}` };
                dispatch(updateTasks([...tasks, item]))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setButtonDisabled(false);
            hideModal();
        }
    }

    const updateTask = async () => {
        const id = taskEdit.taskId;
        try {

            const res = await updTask({ id, title, description })
            if (res.status === 200) {
                let item = { ...tasks.filter(item => item.id === taskEdit.taskId)[0] }
                item.title = title;
                item.description = description;
                dispatch(updateTasks([...tasks.filter(item => item.id !== taskEdit.taskId), item]))
            }

        } catch (error) {
            console.log(error)
        } finally {
            setButtonDisabled(false);
            hideModal();
        }

    }

    const saveForm = () => {

        setButtonDisabled(true);

        if (taskEdit.taskId > 0) {
            updateTask();
        } else {
            saveNewTask();
        }
    }
    useEffect(() => {

        return (() => {
            setTitle("");
            setDescription("");
        });
    }, [])

    useEffect(() => {
        if (taskEdit.taskId > 0) {
            const currentTask = tasks.filter(task => task.id === taskEdit.taskId)[0];
            setTitle(currentTask.title);
            setDescription(currentTask.description);
        } else {
            setTitle("");
            setDescription("");

        }
    }, [taskEdit])
    return (
        <>
            <div className={`modal modal-dialog-centered modal-dialog-scrollable`} tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: taskEdit.showModal ? 'block' : 'none', height: "100vh", background: "rgba(0, 0, 0, 0.5)" }} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {
                                taskEdit.taskId > 0 ?
                                    <h5 className="modal-title">Edit Task</h5>
                                    :
                                    <h5 className="modal-title">Add Task</h5>

                            }
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideModal}></button>
                        </div>
                        <div className="modal-body">
                            {
                                taskEdit.taskId > 0 &&
                                <div className="task ms-2 mb-3">
                                    <span className="task-id">Task ID: {taskEdit.taskId}</span>
                                </div>
                            }

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" placeholder="" value={title} onChange={changeTitle} id="task-title"/>
                                <label className="form-label" htmlFor="task-title">Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea className="form-control" rows={5} style={{ height: "150px", resize: "none" }} value={description} onChange={changeDescription} id="task-description" />
                                <label className="form-label" htmlFor="task-description">Description</label>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <div>
                                <button type="button" className="btn btn-success me-2" onClick={saveForm} disabled={buttonsDisabled} ><i className="bi bi-floppy"></i> Save</button>
                                <button type="button" className="btn btn-warning me-2" onClick={hideModal} disabled={buttonsDisabled}><i className="bi bi-sign-turn-slight-right"></i> Cancel</button>
                            </div>
                            {
                                taskEdit.taskId > 0 &&
                                <div>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" disabled={buttonsDisabled} onClick={deleteCurrentTask}><i className="bi bi-trash"></i> Delete</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default TaskEditModal;