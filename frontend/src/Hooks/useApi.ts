import { useState, useCallback } from 'react';
import apiClient from '../apiCliente';
import { ApiResponse } from '../types';

export const useApi = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.request<ApiResponse<T>>({
        method,
        url,
        data,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Erro na API');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};