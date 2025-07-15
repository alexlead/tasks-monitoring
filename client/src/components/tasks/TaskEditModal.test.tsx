import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskEditModal from './TaskEditModal';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => ({
    taskEdit: { taskId: 1, showModal: true },
    tasks: [
      { id: 1, title: 'Task 1', description: 'desc', createdDate: '2024-07-15', statusId: 'todo' }
    ]
  }),
}));


jest.mock('../../api/taskApi', () => ({
  addNewTask: jest.fn(() => Promise.resolve({ status: 200, data: { data: { id: 2, title: 'New', description: 'New desc', createdDate: new Date().toISOString(), statusId: 1 } } })),
  deleteTask: jest.fn(() => Promise.resolve({ status: 200 })),
  updTask: jest.fn(() => Promise.resolve({ status: 200 })),
}));

describe('TaskEditModal', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders modal in edit mode with task data', () => {
    render(<TaskEditModal />);
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('desc')).toBeInTheDocument();
    expect(screen.getByText(/Task ID: 1/)).toBeInTheDocument();
  });

  it('calls dispatch(toggleModal) on cancel', () => {
    render(<TaskEditModal />);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('calls dispatch(updateTasks) on save', async () => {
    render(<TaskEditModal />);
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Updated Title' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Updated Desc' } });
    fireEvent.click(screen.getByText(/Save/i));
    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });

  it('calls dispatch(updateTasks) on delete', async () => {
    render(<TaskEditModal />);
    fireEvent.click(screen.getByText(/Delete/i));
    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
  });