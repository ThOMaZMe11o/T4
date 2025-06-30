export default class Servico {
  public nome: string;
  public descricao: string;
  public valor: number;

  constructor(nome: string, descricao: string, valor: number) {
    this.nome = nome;
    this.descricao = descricao;
    this.valor = valor;
  }
}
