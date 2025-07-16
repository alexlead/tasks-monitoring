import StatusService from './StatusService';
import StatusRepository from '../repositories/StatusRepository';

jest.mock('../repositories/StatusRepository');

describe('StatusService', () => {
  describe('getAllActiveStatuses', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a list of active statuses on successful request', async () => {
      const mockStatuses = [
        { id: 1, name: 'Active', isActive: true },
        { id: 2, name: 'Pending', isActive: true }
      ];
      
      StatusRepository.getActiveStatuses.mockResolvedValue(mockStatuses);

      const result = await StatusService.getAllActiveStatuses();

      expect(StatusRepository.getActiveStatuses).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStatuses);
    });

    it('should handle the error and return it', async () => {
      const mockError = new Error('Database error');
      
      StatusRepository.getActiveStatuses.mockRejectedValue(mockError);

      const result = await StatusService.getAllActiveStatuses();

      expect(StatusRepository.getActiveStatuses).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockError);

    });
  });
});