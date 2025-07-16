import TaskService from '../services/TaskService.js';
import TaskRepository from '../repositories/TaskRepository.js';
import Task from '../domain/Task.js';

jest.mock('../repositories/TaskRepository.js');

describe('TaskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllActiveTasks', () => {
    it('should return list of active tasks', async () => {
      const mockTasks = [{ id: 1, title: 'Task 1' }];
      TaskRepository.getStatusesByActivity.mockResolvedValueOnce(mockTasks);

      const result = await TaskService.getAllActiveTasks();

      expect(TaskRepository.getStatusesByActivity).toHaveBeenCalledWith(false);
      expect(result).toEqual(mockTasks);
    });
  });

  describe('createNewTask', () => {
    it('should create a new task and return it', async () => {
      TaskRepository.createNewTask.mockResolvedValueOnce(1);

      const result = await TaskService.createNewTask('Test Title', 'Test Description');

      expect(TaskRepository.createNewTask).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Task);
      expect(result.id).toBe(1);
      expect(result.title).toBe('Test Title');
      expect(result.description).toBe('Test Description');
      expect(result.statusId).toBe(1);
      expect(result.statusDelete).toBe(false);
    });
  });

  describe('updateTask', () => {
    it('should update task and return task ID', async () => {
      TaskRepository.updateTask.mockResolvedValueOnce(1);

      const result = await TaskService.updateTask(1, 'Updated Title', 'Updated Description');

      expect(TaskRepository.updateTask).toHaveBeenCalled();
      expect(result).toBe(1);
    });
  });

  describe('updateTaskStatus', () => {
    it('should update task status and return task ID', async () => {
      TaskRepository.updateTaskStatusId.mockResolvedValueOnce(1);

      const result = await TaskService.updateTaskStatus(1, 2);

      expect(TaskRepository.updateTaskStatusId).toHaveBeenCalledWith(1, 2);
      expect(result).toBe(1);
    });
  });

  describe('deleteTaskByStatus', () => {
    it('should toggle task activation and return task ID', async () => {
      TaskRepository.toggleTaskActivationStatus.mockResolvedValueOnce(1);

      const result = await TaskService.deleteTaskByStatus(1);

      expect(TaskRepository.toggleTaskActivationStatus).toHaveBeenCalledWith(1, true);
      expect(result).toBe(1);
    });
  });
});
