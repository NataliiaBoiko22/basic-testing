import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const providedUrlMock = '/posts/1';
const baseUrlMock = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValueOnce({ data: 'resolved value' }),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(axiosClient);

    await throttledGetDataFromApi(providedUrlMock);

    jest.runAllTimers();

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: baseUrlMock,
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValueOnce({ data: 'resolved value' }),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(axiosClient);

    await throttledGetDataFromApi(providedUrlMock);

    await Promise.resolve();

    jest.runAllTimers();

    expect(axiosClient.get).toHaveBeenCalledWith(providedUrlMock);
  });

  test('should return response data', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValueOnce({ data: 'other resolved value' }),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(axiosClient);

    const result = await throttledGetDataFromApi(providedUrlMock);

    expect(result).toEqual('other resolved value');
  });
});
