import { fetchSuperheroes } from './superheroes';

global.fetch = jest.fn();

describe('fetchSuperheroes', () => {
  it('should fetch superheroes successfully', async () => {
    const mockSuperheroes = [{ id: '1', nickname: 'Superman' }];
    const mockResponse = { superheroes: mockSuperheroes, totalPages: 1 };

    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await fetchSuperheroes();

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/superheroes?page=1&limit=5');
    expect(result).toEqual(mockResponse);
  });

  it('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch error'));

    await expect(fetchSuperheroes()).rejects.toThrow('Fetch error');
  });
});
