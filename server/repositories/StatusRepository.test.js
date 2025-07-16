import StatusRepository from './StatusRepository';
import pool from '../config/db.js';

jest.mock('../config/db.js');

describe('StatusRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createNewStatus', () => {
    it('should create a new status and return its ID', async () => {
      const mockStatus = {
        title: 'Test Status',
        color: '#ffffff',
        statusDelete: false
      };
      const mockId = 1;
      
      // Мокаем ответ базы данных
      pool.query.mockResolvedValueOnce({ rows: [{ id: mockId }] });

      const result = await StatusRepository.createNewStatus(mockStatus);

      expect(pool.query).toHaveBeenCalledWith(
        'INSERT INTO status (title, color, status_delete) VALUES ($1, $2, $3) RETURNING id;',
        [mockStatus.title, mockStatus.color, mockStatus.statusDelete]
      );
      expect(result).toBe(mockId);
    });

    it('should return null on creation failure', async () => {
      const mockStatus = {
        title: 'Test Status',
        color: '#ffffff',
        statusDelete: false
      };
      
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await StatusRepository.createNewStatus(mockStatus);

      expect(result).toBeNull();
    });
  });

  describe('getAllStatuses', () => {
    it('should return all statuses', async () => {
      const mockStatuses = [
        { id: 1, title: 'Status 1', color: '#111111', status_delete: false },
        { id: 2, title: 'Status 2', color: '#222222', status_delete: true }
      ];
      
      pool.query.mockResolvedValueOnce({ rows: mockStatuses });

      const result = await StatusRepository.getAllStatuses();

      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM status;');
      expect(result).toEqual(mockStatuses);
    });

    it('should return null if there are no statuses', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await StatusRepository.getAllStatuses();

      expect(result).toBeNull();
    });
  });

  describe('getActiveStatuses', () => {
    it('should return only active statuses', async () => {
      const mockStatuses = [
        { id: 1, title: 'Active Status', color: '#ffffff', status_delete: false }
      ];
      
      pool.query.mockResolvedValueOnce({ rows: mockStatuses });

      const result = await StatusRepository.getActiveStatuses();

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM status WHERE status_delete = FALSE;'
      );
      expect(result).toEqual(mockStatuses);
    });

    it('should return null if there are no active statuses', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await StatusRepository.getActiveStatuses();

      expect(result).toBeNull();
    });
  });

  describe('toggleActivationStatus', () => {
    it('should toggle the activity status and return the ID', async () => {
      const mockId = 1;
      const mockStatusActivity = true;
      
      pool.query.mockResolvedValueOnce({ rows: [{ id: mockId }] });

      const result = await StatusRepository.toggleActivationStatus(mockId, mockStatusActivity);

      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE status (status_delete ) VALUES ($1) WHERE id = $2 RETURNING id;',
        [mockStatusActivity, mockId]
      );
      expect(result).toBe(mockId);
    });

    it('should return null on failed update', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await StatusRepository.toggleActivationStatus(1, true);

      expect(result).toBeNull();
    });
  });

  describe('updateStatus', () => {
    it('should update the status and return the ID', async () => {
      const mockStatus = {
        id: 1,
        title: 'Updated Status',
        color: '#000000',
        statusDelete: false
      };
      
      pool.query.mockResolvedValueOnce({ rows: [{ id: mockStatus.id }] });

      const result = await StatusRepository.updateStatus(mockStatus);

      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE status (title, color, status_delete ) VALUES ($1) WHERE id = $2 RETURNING id;',
        [mockStatus.title, mockStatus.color, mockStatus.statusDelete, mockStatus.id]
      );
      expect(result).toBe(mockStatus.id);
    });

    it('should return null on failed update', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await StatusRepository.updateStatus({
        id: 1,
        title: 'Test',
        color: '#123456',
        statusDelete: false
      });

      expect(result).toBeNull();
    });
  });
});