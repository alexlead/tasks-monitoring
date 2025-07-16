import request from 'supertest';
import express from 'express';
import statusRoutes from './statusRoutes';
import StatusController from "../controllers/StatusController.js";

jest.mock('../controllers/StatusController');

const app = express();
app.use(express.json());
app.use('/statuses', statusRoutes);

describe('statusRoutes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /statuses/', () => {
    it('should call StatusController.getActiveStatuses', async () => {
      StatusController.getActiveStatuses.mockImplementation((req, res) => res.sendStatus(200));

      await request(app).get('/statuses/');

      expect(StatusController.getActiveStatuses).toHaveBeenCalledTimes(1);
    });
  });
  });