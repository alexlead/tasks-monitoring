import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTask, toggleModal } from '../../store/slices/taskSlice';
import { addNewTask, updTask } from '../../api/taskApi';


interface ITaskEditModalProps {
}

const TaskEditModal: React.FunctionComponent<ITaskEditModalProps> = () => {

    const dispatch = useDispatch();
    const { taskEdit } = useSelector(selectTask)
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [ buttonsDisabled, setButtonDisabled ] = useState<boolean>(false);

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }
    const hideModal = () => {
        dispatch(toggleModal({ taskId: 0, showModal: false }))
    }

    const saveNewTask = async () => {
        
        try {
            const res = await addNewTask({ title, description })
            if (res.status === 200) {
                console.log(res.data)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setButtonDisabled( false );
            hideModal();
        }

    }

    const updateTask = async () => {
        const id  = taskEdit.taskId;
        try {

            const res = await updTask({ id, title, description })
            if (res.status === 200) {
                console.log(res.data)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setButtonDisabled( false );
            hideModal();
        }

    }

    const saveForm = () => {

        setButtonDisabled( true );
        
        if (taskEdit.taskId > 0) {
            updateTask();
        } else {
            saveNewTask();
        }
    }
    useEffect( () => {

        return ( () => {
            setTitle("");
            setDescription("");
        });
    },[])
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
                                <input type="text" className="form-control" placeholder="" value={title} onChange={changeTitle} />
                                <label className="form-label">Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea className="form-control" rows={5} style={{ height: "150px", resize: "none" }} value={description} onChange={changeDescription} />
                                <label className="form-label">Description</label>
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
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" disabled={buttonsDisabled}><i className="bi bi-trash"></i> Delete</button>
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