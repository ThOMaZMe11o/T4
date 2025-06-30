import { useState, useEffect } from 'react';
import { Cliente } from '../types';
import { useApi } from './useApi';

export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const { request, loading, error } = useApi<Cliente[]>();

  const carregarClientes = async () => {
    const data = await request('GET', '/clientes');
    if (data) {
      setClientes(data);
    }
  };

  const adicionarCliente = async (cliente: Cliente) => {
    const data = await request('POST', '/cliente', cliente);
    if (data) {
      await carregarClientes();
    }
  };

  const atualizarCliente = async (cliente: Cliente) => {
    const data = await request('PUT', `/cliente/${cliente.id}`, cliente);
    if (data) {
      await carregarClientes();
    }
  };

  const removerCliente = async (id: number) => {
    const data = await request('DELETE', `/cliente/${id}`);
    if (data) {
      await carregarClientes();
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  return {
    clientes,
    loading,
    error,
    adicionarCliente,
    atualizarCliente,
    removerCliente,
    carregarClientes,
  };
};