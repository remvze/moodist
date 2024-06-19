import { describe, it, expect, vi } from 'vitest';
import { waitUntil } from '../wait';

describe('waitUntil function', () => {
  it('should resolve when the function returns true', async () => {
    const mockFunc = vi
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    await waitUntil(mockFunc, 50);
    expect(mockFunc).toHaveBeenCalledTimes(3);
  });

  it('should reject if the function throws an error', async () => {
    const mockFunc = vi
      .fn()
      .mockReturnValueOnce(false)
      .mockImplementationOnce(() => {
        throw new Error('Test error');
      });

    await expect(waitUntil(mockFunc, 50)).rejects.toThrow('Test error');
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });

  it('should repeatedly call the function at the specified interval', async () => {
    const mockFunc = vi
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    const interval = 100;
    const startTime = Date.now();

    await waitUntil(mockFunc, interval);

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    expect(elapsedTime).toBeGreaterThanOrEqual(2 * interval);
    expect(mockFunc).toHaveBeenCalledTimes(3);
  });

  it('should handle the function returning true on the first call', async () => {
    const mockFunc = vi.fn().mockReturnValueOnce(true);

    await waitUntil(mockFunc, 50);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('should handle the function never returning true (timeout simulation)', async () => {
    const mockFunc = vi.fn().mockReturnValue(false);

    // Using a very short timeout to simulate test timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Test timeout')), 300),
    );

    await expect(
      Promise.race([waitUntil(mockFunc, 50), timeoutPromise]),
    ).rejects.toThrow('Test timeout');
    expect(mockFunc).toHaveBeenCalled();
  });
});
