import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTask, toggleModal } from '../../store/slices/taskSlice';


interface ITaskEditModalProps {
}

const TaskEditModal: React.FunctionComponent<ITaskEditModalProps> = () => {

    const dispatch = useDispatch();
    const { taskEdit } = useSelector(selectTask)

    const hideModal = () => {
        dispatch(toggleModal({ taskId: 0, showModal: false }))
    }

    return (
        <>
            <div className={`modal modal-dialog-centered modal-dialog-scrollable`} tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ display: taskEdit.showModal ? 'block' : 'none' }} >
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
                                <input type="text" className="form-control" placeholder="" />
                                <label className="form-label">Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea className="form-control" rows={5} style={{ height: "150px", resize: "none" }} />
                                <label className="form-label">Description</label>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <div>
                                <button type="button" className="btn btn-success me-2"><i className="bi bi-floppy"></i> Save</button>
                                <button type="button" className="btn btn-warning me-2" onClick={hideModal}><i className="bi bi-sign-turn-slight-right"></i> Cancel</button>
                            </div>
                            {
                                taskEdit.taskId > 0 &&
                                <div>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal"><i className="bi bi-trash"></i> Delete</button>
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