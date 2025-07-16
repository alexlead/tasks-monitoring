import TaskController from '../controllers/TaskController.js';
import TaskService from '../services/TaskService.js';

jest.mock('../services/TaskService.js');

describe('TaskController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('getActiveTasks', () => {
    it('should return active tasks with 200', async () => {
      const mockTasks = [{ id: 1, title: 'Task 1' }];
      TaskService.getAllActiveTasks.mockResolvedValueOnce(mockTasks);

      await TaskController.getActiveTasks(req, res);

      expect(TaskService.getAllActiveTasks).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: mockTasks, status: 'success' });
    });

    it('should handle errors with 400', async () => {
      TaskService.getAllActiveTasks.mockRejectedValueOnce(new Error('DB error'));

      await TaskController.getActiveTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'DB error',
        status: 'error',
      }));
    });
  });

  describe('addTask', () => {
    it('should add a new task and return 200', async () => {
      req.body = { title: 'New Task', description: 'Task Desc' };
      TaskService.createNewTask.mockResolvedValueOnce({ id: 1, ...req.body });

      await TaskController.addTask(req, res);

      expect(TaskService.createNewTask).toHaveBeenCalledWith('New Task', 'Task Desc');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'success' }));
    });
  });

  describe('updTask', () => {
    it('should update a task when id > 0', async () => {
      req.body = { id: 1, title: 'Updated Title', description: 'Updated Desc' };
      TaskService.updateTask.mockResolvedValueOnce(1);

      await TaskController.updTask(req, res);

      expect(TaskService.updateTask).toHaveBeenCalledWith(1, 'Updated Title', 'Updated Desc');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'success' }));
    });
  });

  describe('updTaskStatus', () => {
    it('should update task status when id > 0', async () => {
      req.body = { id: 1, statusId: 2 };
      TaskService.updateTaskStatus.mockResolvedValueOnce(1);

      await TaskController.updTaskStatus(req, res);

      expect(TaskService.updateTaskStatus).toHaveBeenCalledWith(1, 2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'success' }));
    });
  });

  describe('deleteTaskByStatus', () => {
    it('should delete a task when id > 0', async () => {
      req.params = { id: 1 };
      TaskService.deleteTaskByStatus.mockResolvedValueOnce(1);

      await TaskController.deleteTaskByStatus(req, res);

      expect(TaskService.deleteTaskByStatus).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'success' }));
    });
  });
});