import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fspromises from 'fs/promises';
import { join } from 'path';
jest.mock('fs/promises');
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'file.txt';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    await readFileAsynchronously(pathToFile);
    expect(existsSyncMock).toHaveBeenCalledWith(join(__dirname, pathToFile));
    existsSyncMock.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'file.txt';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
    expect(existsSyncMock).toHaveBeenCalledWith(join(__dirname, pathToFile));
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'file.txt';
    const fileContent = 'File content';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileMock = jest
      .spyOn(fspromises, 'readFile')
      .mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
    expect(existsSyncMock).toHaveBeenCalledWith(join(__dirname, pathToFile));
    expect(readFileMock).toHaveBeenCalledWith(join(__dirname, pathToFile));
  });
});
