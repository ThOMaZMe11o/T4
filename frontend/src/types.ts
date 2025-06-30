export interface Cliente {
  id?: number;
  nome: string;
  nomeSocial: string;
  email: string;
  endereco: Endereco;
  telefones: Telefone[];
  pets: Pet[];
  produtosConsumidos: Produto[];
  servicosConsumidos: Servico[];
}

export interface Pet {
  id?: number;
  nome: string;
  raca: string;
  genero: string;
  tipo: string;
}

export interface Endereco {
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
}

export interface Telefone {
  ddd: string;
  numero: string;
}

export interface Produto {
  id?: number;
  nome: string;
  preco: number;
}

export interface Servico {
  id?: number;
  nome: string;
  preco: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}