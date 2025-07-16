import StatusController from '../controllers/StatusController.js';
import StatusService from '../services/StatusService.js';

jest.mock('../services/StatusService.js');

describe('StatusController', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('getActiveStatuses', () => {
    it('should return status list with 200', async () => {
      const mockStatuses = [{ id: 1, name: 'Active' }];
      StatusService.getAllActiveStatuses.mockResolvedValueOnce(mockStatuses);

      await StatusController.getActiveStatuses(req, res);

      expect(StatusService.getAllActiveStatuses).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: mockStatuses, status: 'success' });
    });

    it('should handle errors with 400', async () => {
      StatusService.getAllActiveStatuses.mockRejectedValueOnce(new Error('DB Error'));

      await StatusController.getActiveStatuses(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'DB Error',
        status: 'error',
      }));
    });
  });
});
