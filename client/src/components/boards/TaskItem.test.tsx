import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskItem from './TaskItem';

jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: '',
    isDragging: false,
  }),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));
jest.mock('../../store/slices/taskSlice', () => ({
  toggleModal: jest.fn((payload) => ({ type: 'toggleModal', payload })),
}));

const task = {
  id: 1,
  title: 'Test Task',
  description: 'Test description',
  createdDate: '2024-07-15',
  statusId: 'todo',
};

describe('TaskItem', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders task title, id and createdDate', () => {
    render(<TaskItem task={task} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText(/ID: 1/)).toBeInTheDocument();
    expect(screen.getByText('2024-07-15')).toBeInTheDocument();
  });

  it('calls dispatch(toggleModal) on click', () => {
    render(<TaskItem task={task} />);
    fireEvent.click(screen.getByText('Test Task'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'toggleModal',
      payload: { taskId: 1, showModal: true },
    });
  });

  it('applies custom style', () => {
    render(<TaskItem task={task} style={{ background: 'red' }} />);
    expect(screen.getByText('Test Task').closest('.task-item')).toHaveStyle('background: red');
  });

  it('adds dragging class when isDragging is true', () => {
    jest.mock('@dnd-kit/sortable', () => ({
      useSortable: () => ({
        attributes: {},
        listeners: {},
        setNodeRef: jest.fn(),
        transform: null,
        transition: '',
        isDragging: true,
      }),
    }));

    jest.resetModules();
    const TaskItemWithDrag = require('./TaskItem').default;
    render(<TaskItemWithDrag task={task} />);
    expect(screen.getByText('Test Task').closest('.task-item')).toHaveClass('dragging');
  });
  });