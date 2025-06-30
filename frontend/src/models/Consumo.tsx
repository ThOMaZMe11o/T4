import Produto from "./Produto";
import Servico from "./Servico";

type Item = Produto | Servico;

export default class Consumo {
  public item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  getDescricao(): string {
    return this.item.nome + " - R$" + this.item.valor.toFixed(2);
  }
}
