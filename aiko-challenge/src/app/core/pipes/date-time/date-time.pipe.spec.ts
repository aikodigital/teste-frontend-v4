import { DateTime } from './date-time.pipe';

describe('DateTime', () => {
  let pipe: DateTime;

  beforeEach(() => {
    pipe = new DateTime();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return formatted date for default format', () => {
    const result = pipe.transform('2021-02-28T21:00:00.000Z');
    expect(result).toBe('28/02/2021, 18:00:00');
  });

  it('should return null for invalid date', () => {
    const result = pipe.transform('');
    expect(result).toBeNull();
  });

  it('should return formatted date with only time', () => {
    const result = pipe.transform('2021-02-28T21:00:00.000Z', 'HH:mm:ss');
    expect(result).toBe('18:00:00');
  });

  it('should handle different time zones correctly', () => {
    const result = pipe.transform(
      '2021-02-28T21:00:00.000Z',
      'dd/MM/yyyy HH:mm:ss'
    );
    expect(result).toBe('28/02/2021, 18:00:00');
  });
});
