import Status from './Status.js';

describe('Status class', () => {
  const statusData = {
    id: 1,
    title: 'To Do',
    color: 'blue',
    statusDelete: false,
  };

  it('should create Status instance with correct properties', () => {
    const status = new Status(statusData);
    expect(status.getId()).toBe(1);
    expect(status.getTitle()).toBe('To Do');
    expect(status.getColor()).toBe('blue');
    expect(status.getStatusDelete()).toBe(false);
  });

  it('should set and get id', () => {
    const status = new Status(statusData);
    status.setId(2);
    expect(status.getId()).toBe(2);
  });

  it('should set and get title', () => {
    const status = new Status(statusData);
    status.setTitle('In Progress');
    expect(status.getTitle()).toBe('In Progress');
  });

  it('should set and get color', () => {
    const status = new Status(statusData);
    status.setColor('green');
    expect(status.getColor()).toBe('green');
  });

  it('should set and get statusDelete', () => {
    const status = new Status(statusData);
    status.setStatusDelete(true);
    expect(status.getStatusDelete()).toBe(true);
  });
});