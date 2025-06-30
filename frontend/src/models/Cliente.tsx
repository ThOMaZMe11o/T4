import Pet from "./Pet";
import Consumo from "./Consumo";

export default class Cliente {
  public nome: string;
  public cpf: string;
  public telefones: string[];
  public pets: Pet[] = [];
  public consumos: Consumo[] = [];

  constructor(nome: string, cpf: string, telefones: string[]) {
    this.nome = nome;
    this.cpf = cpf;
    this.telefones = telefones;
  }

  adicionarPet(pet: Pet) {
    this.pets.push(pet);
  }

  registrarConsumo(consumo: Consumo) {
    this.consumos.push(consumo);
  }

  getTotalConsumido(): number {
    return this.consumos.reduce((total, item) => total + item.item.valor, 0);
  }

  getQuantidadeConsumida(): number {
    return this.consumos.length;
  }
}
