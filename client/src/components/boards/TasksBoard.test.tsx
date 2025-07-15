import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TasksBoard from './TasksBoard';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (fn: any) => fn({
    task: {
      statuses: [
        { id: 'cont1', title: 'To Do', color: 'blue' },
        { id: 'cont2', title: 'Done', color: 'green' }
      ],
      tasks: [
        { id: 1, title: 'Task 1', description: 'desc', createdDate: '2024-07-15', statusId: 'cont1' },
        { id: 2, title: 'Task 2', description: 'desc', createdDate: '2024-07-16', statusId: 'cont2' }
      ]
    }
  })
}));
jest.mock('../../api/taskApi', () => ({
  getAllTasks: jest.fn(() => Promise.resolve({ status: 200, data: { data: [] } })),
  updTaskStatus: jest.fn(() => Promise.resolve({ status: 200, data: { data: [] } })),
}));
jest.mock('../../api/statusApi', () => ({
  getAllStatuses: jest.fn(() => Promise.resolve({ status: 200, data: { data: [] } })),
}));

jest.mock('../tasks/TaskEditModal', () => () => <div data-testid="modal">Modal</div>);
jest.mock('./TasksContainer', () => (props: any) => (
  <div data-testid={`container-${props.id}`}>
    {props.title}
    {props.tasks.map((task: any) => (
      <div key={task.id}>{task.title}</div>
    ))}
  </div>
));
jest.mock('./TaskItem', () => (props: any) => <div>{props.task.title}</div>);

describe('TasksBoard', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders add new button', () => {
    render(<TasksBoard />);
    expect(screen.getByText(/Add new/i)).toBeInTheDocument();
  });

  it('renders all status containers and tasks', () => {
    render(<TasksBoard />);
    expect(screen.getByTestId('container-cont1')).toHaveTextContent('To Do');
    expect(screen.getByTestId('container-cont2')).toHaveTextContent('Done');
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

it('dispatches toggleModal on add new button click', () => {
  render(<TasksBoard />);
  fireEvent.click(screen.getByText(/Add new/i));
  expect(mockDispatch).toHaveBeenCalledWith({
    type: 'task/toggleModal',
    payload: { taskId: 0, showModal: true }
  });
});

  it('renders TaskEditModal', () => {
    render(<TasksBoard />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
  });