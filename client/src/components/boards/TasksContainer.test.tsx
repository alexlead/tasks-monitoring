import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TasksContainer from './TasksContainer';

jest.mock('./TaskItem', () => (props: any) => <div data-testid="task-item">{props.task.title}</div>);

const tasks = [
  { id: 1, title: 'Task 1', description: 'desc 1', createdDate: '2024-07-15', statusId: 'todo' },
  { id: 2, title: 'Task 2', description: 'desc 2', createdDate: '2024-07-16', statusId: 'todo' }
];

describe('TasksContainer', () => {
  it('renders container title and task count', () => {
    render(<TasksContainer id="todo" title="To Do" color="blue" tasks={tasks} />);
    expect(screen.getByText(/To Do/)).toBeInTheDocument();
    expect(screen.getByText('(2)')).toBeInTheDocument();
  });

  it('renders all tasks', () => {
    render(<TasksContainer id="todo" title="To Do" color="blue" tasks={tasks} />);
    expect(screen.getAllByTestId('task-item')).toHaveLength(2);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
  
  it('applies background color', () => {
      render(<TasksContainer id="todo" title="To Do" color="red" tasks={tasks} />);
      expect(screen.getByText(/To Do/).closest('.tasks-container')).toHaveStyle('background-color: rgb(255, 0, 0)');
    });
    });