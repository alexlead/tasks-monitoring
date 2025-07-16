import request from 'supertest';
import express from 'express';
import TaskRoutes from './TaskRoutes';
import TaskController from '../controllers/TaskController';

jest.mock('../controllers/TaskController');

const app = express();
app.use(express.json());
app.use('/tasks', TaskRoutes);

describe('TaskRoutes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /tasks/', () => {
    it('should call TaskController.getActiveTasks', async () => {
      TaskController.getActiveTasks.mockImplementation((req, res) => res.sendStatus(200));

      await request(app).get('/tasks/');

      expect(TaskController.getActiveTasks).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /tasks/', () => {
    it('should call TaskController.addTask', async () => {
      TaskController.addTask.mockImplementation((req, res) => res.sendStatus(201));

      await request(app)
        .post('/tasks/')
        .send({ title: 'Test task' });

      expect(TaskController.addTask).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /tasks/status/', () => {
    it('should call TaskController.updTaskStatus', async () => {
      TaskController.updTaskStatus.mockImplementation((req, res) => res.sendStatus(200));

      await request(app)
        .put('/tasks/status/')
        .send({ id: 1, status: 'completed' });

      expect(TaskController.updTaskStatus).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /tasks/', () => {
    it('should call TaskController.updTask', async () => {
      TaskController.updTask.mockImplementation((req, res) => res.sendStatus(200));

      await request(app)
        .put('/tasks/')
        .send({ id: 1, title: 'Updated task' });
      expect(TaskController.updTask).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should call TaskController.deleteTaskByStatus с правильным ID', async () => {

      TaskController.deleteTaskByStatus.mockImplementation((req, res) => res.sendStatus(204));

      const taskId = 123;
      await request(app).delete(`/tasks/${taskId}`);

      expect(TaskController.deleteTaskByStatus).toHaveBeenCalledTimes(1);
      
      expect(TaskController.deleteTaskByStatus.mock.calls[0][0].params.id).toBe(taskId.toString());
    });
  });
});