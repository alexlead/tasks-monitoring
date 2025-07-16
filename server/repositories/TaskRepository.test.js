import TaskRepository from './TaskRepository';
import pool from '../config/db.js';

jest.mock('../config/db.js');

describe('TaskRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createNewTask', () => {
    it('should create a new task and return its ID', async () => {
      const mockTask = {
        title: 'Test Task',
        description: 'Test Description',
        createdDate: '2023-01-01',
        statusId: 1,
        statusDelete: false
      };
      const mockId = 1;
      
      pool.query.mockResolvedValueOnce({ rows: [{ id: mockId }] });

      const result = await TaskRepository.createNewTask(mockTask);

      expect(pool.query).toHaveBeenCalledWith(
        'INSERT INTO task (title, description, created_date, status_id, status_delete) VALUES ($1, $2, $3, $4, $5) RETURNING id;',
        [mockTask.title, mockTask.description, mockTask.createdDate, mockTask.statusId, mockTask.statusDelete]
      );
      expect(result).toBe(mockId);
    });

    it('should return null if task creation fails', async () => {
      const mockTask = {
        title: 'Test Task',
        description: 'Test Description',
        createdDate: '2023-01-01',
        statusId: 1,
        statusDelete: false
      };
      
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await TaskRepository.createNewTask(mockTask);

      expect(result).toBeNull();
    });
  });

  describe('getAllStatuses', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', description: 'Desc 1', status_id: 1 },
        { id: 2, title: 'Task 2', description: 'Desc 2', status_id: 2 }
      ];
      
      pool.query.mockResolvedValueOnce({ rows: mockTasks });

      const result = await TaskRepository.getAllStatuses();

      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM task;');
      expect(result).toEqual(mockTasks);
    });

    it('should return null if there are no tasks', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await TaskRepository.getAllStatuses();

      expect(result).toBeNull();
    });
  });

  describe('getStatusesByActivity', () => {
    it('should return tasks by status activity', async () => {
      const statusDelete = false;
      const mockTasks = [
        { id: 1, title: 'Active Task', status_delete: false }
      ];
      
      pool.query.mockResolvedValueOnce({ rows: mockTasks });

      const result = await TaskRepository.getStatusesByActivity(statusDelete);

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM task WHERE status_delete = $1;',
        [statusDelete]
      );
      expect(result).toEqual(mockTasks);
    });

    it('should return null if there are no tasks with the specified status', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await TaskRepository.getStatusesByActivity(true);

      expect(result).toBeNull();
    });
  });

  describe('updateTask', () => {
    it('should update the task and return its ID', async () => {
      const mockTask = {
        id: 1,
        title: 'Updated Task',
        description: 'Updated Description'
      };
      
      pool.query.mockResolvedValueOnce({ rows: [{ id: mockTask.id }] });

      const result = await TaskRepository.updateTask(mockTask);

      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE task SET title = $1,  description = $2 WHERE id = $3 RETURNING id;',
        [mockTask.title, mockTask.description, mockTask.id]
      );
      expect(result).toBe(mockTask.id);
    });

    it('should return null on failed update', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await TaskRepository.updateTask({
        id: 1,
        title: 'Test',
        description: 'Test Desc'
      });

      expect(result).toBeNull();
    });

    it('should log the task being passed', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const mockTask = {
        id: 1,
        title: 'Test',
        description: 'Test Desc'
      };
      
      pool.query.mockResolvedValueOnce({ rows: [{ id: mockTask.id }] });

      await TaskRepository.updateTask(mockTask);

      expect(consoleSpy).toHaveBeenCalledWith(mockTask);
      consoleSpy.mockRestore();
    });
  });

  describe('updateTaskStatusId', () => {
    it('should update the task status and return its ID', async () => {
      const taskId = 1;
      const statusId = 2;
      
      pool.query.mockResolvedValueOnce({ rows: [{ id: taskId }] });

      const result = await TaskRepository.updateTaskStatusId(taskId, statusId);

      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE task SET status_id = $1 WHERE id = $2 RETURNING id;',
        [statusId, taskId]
      );
      expect(result).toBe(taskId);
    });

    it('should return null on failure to update status', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await TaskRepository.updateTaskStatusId(1, 2);

      expect(result).toBeNull();
    });
  });

  describe('toggleTaskActivationStatus', () => {
    it('should switch the task activity status and return its ID', async () => {
      const taskId = 1;
      const taskDelete = true;
      
      pool.query.mockResolvedValueOnce({ rows: [{ id: taskId }] });

      const result = await TaskRepository.toggleTaskActivationStatus(taskId, taskDelete);

      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE task SET status_delete = $1 WHERE id = $2 RETURNING id;',
        [taskDelete, taskId]
      );
      expect(result).toBe(taskId);
    });

    it('should return null on failed status switch', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await TaskRepository.toggleTaskActivationStatus(1, true);

      expect(result).toBeNull();
    });
  });
});