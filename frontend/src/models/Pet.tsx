// models/Pet.ts
export default class Pet {
  nome: string;
  tipo: string;
  raca: string;
  donoCpf: string; // ou donoNome, mas CPF é melhor como identificador

  constructor(nome: string, tipo: string, raca: string, donoCpf: string) {
    this.nome = nome;
    this.tipo = tipo;
    this.raca = raca;
    this.donoCpf = donoCpf;
  }
}
