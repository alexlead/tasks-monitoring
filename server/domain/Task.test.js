import Task from './Task.js';

describe('Task class', () => {
  const taskData = {
    id: 1,
    title: 'Test Task',
    description: 'Test description',
    createdDate: '2024-07-15',
    statusId: 'todo',
    statusDelete: false,
  };

  it('should create Task instance with correct properties', () => {
    const task = new Task(taskData);
    expect(task.getId()).toBe(1);
    expect(task.getTitle()).toBe('Test Task');
    expect(task.getDescription()).toBe('Test description');
    expect(task.getCreatedDate()).toBe('2024-07-15');
    expect(task.getStatusId()).toBe('todo');
    expect(task.getStatusDelete()).toBe(false);
  });

  it('should set and get id', () => {
    const task = new Task(taskData);
    task.setId(2);
    expect(task.getId()).toBe(2);
  });

  it('should set and get title', () => {
    const task = new Task(taskData);
    task.setTitle('Updated Task');
    expect(task.getTitle()).toBe('Updated Task');
  });

  it('should set and get description', () => {
    const task = new Task(taskData);
    task.setDescription('Updated description');
    expect(task.getDescription()).toBe('Updated description');
  });

  it('should set and get createdDate', () => {
    const task = new Task(taskData);
    task.setCreatedDate('2024-07-16');
    expect(task.getCreatedDate()).toBe('2024-07-16');
  });

  it('should set and get statusId', () => {
    const task = new Task(taskData);
    task.setStatusId('done');
    expect(task.getStatusId()).toBe('done');
  });

  it('should set and get statusDelete', () => {
    const task = new Task(taskData);
    task.setStatusDelete(true);
    expect(task.getStatusDelete()).toBe(true);
  });
});