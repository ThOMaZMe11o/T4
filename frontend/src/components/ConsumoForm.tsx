import React, { useState } from "react";
import Cliente from "../models/Cliente";
import Produto from "../models/Produto";
import Servico from "../models/Servico";
import Consumo from "../models/Consumo";

// Props não mudam
type Props = {
  clientes: Cliente[];
  produtos: Produto[];
  servicos: Servico[];
  onRegistrarConsumo: (cpf: string, consumo: Consumo) => void;
};

// Convertendo para componente de função
const ConsumoForm: React.FC<Props> = ({ clientes, produtos, servicos, onRegistrarConsumo }) => {
  // 1. O estado da classe é dividido em múltiplos `useState`
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [itemSelecionado, setItemSelecionado] = useState("");
  const [tipoItem, setTipoItem] = useState<"produto" | "servico">("produto");

  // O método `handleRegistrar` vira uma função
  const handleRegistrar = () => {
    // Acessamos as variáveis de estado e props diretamente
    if (!clienteSelecionado || !itemSelecionado) {
      alert("Selecione um cliente e um item!");
      return;
    }

    const item =
      tipoItem === "produto"
        ? produtos.find(p => p.nome === itemSelecionado)
        : servicos.find(s => s.nome === itemSelecionado);

    if (!item) {
      alert("Item não encontrado!");
      return;
    }

    const consumo = new Consumo(item);
    onRegistrarConsumo(clienteSelecionado, consumo);

    // 2. O `setState` é substituído pela função de atualização específica
    setItemSelecionado(""); // Limpa apenas o item selecionado
  };

  // 3. Lógica que estava no `render` pode ser mantida aqui
  const itens = tipoItem === "produto" ? produtos : servicos;

  // O JSX é retornado diretamente
  return (
    <div className="container mt-4">
      <h3>Registrar Consumo</h3>

      <div className="mb-3">
        <label className="form-label">Selecionar Cliente</label>
        <select
          className="form-select"
          value={clienteSelecionado}
          // Usamos a função `setClienteSelecionado` no `onChange`
          onChange={e => setClienteSelecionado(e.target.value)}
        >
          <option value="">-- Selecione --</option>
          {clientes.map((c, i) => (
            <option key={i} value={c.cpf}>
              {c.nome} ({c.cpf})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo de Item</label>
        <select
          className="form-select"
          value={tipoItem}
          // 4. Quando o `setState` atualizava múltiplos valores, agora chamamos
          // as múltiplas funções de atualização.
          onChange={e => {
            setTipoItem(e.target.value as "produto" | "servico");
            setItemSelecionado(""); // Resetamos o item selecionado ao trocar o tipo
          }}
        >
          <option value="produto">Produto</option>
          <option value="servico">Serviço</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Selecionar Item</label>
        <select
          className="form-select"
          value={itemSelecionado}
          onChange={e => setItemSelecionado(e.target.value)}
        >
          <option value="">-- Selecione --</option>
          {/* A variável `itens` funciona da mesma forma */}
          {itens.map((item, i) => (
            <option key={i} value={item.nome}>
              {item.nome} - R$ {item.valor.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary mb-4" onClick={handleRegistrar}>
        Registrar Consumo
      </button>

      <h5>Consumos Registrados</h5>
      {/* A lógica de listagem não muda, apenas removemos o `this.props` */}
      {clientes.map((cliente, i) => (
        <div key={i} className="mb-3">
          <strong>
            {cliente.nome} ({cliente.cpf})
          </strong>
          {cliente.consumos.length > 0 ? (
            <ul className="list-group mt-1">
              {cliente.consumos.map((consumo, j) => (
                <li key={j} className="list-group-item">
                  {consumo.item.nome} - R$ {consumo.item.valor.toFixed(2)} (
                  {consumo.item instanceof Produto ? "Produto" : "Serviço"})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Nenhum consumo registrado.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ConsumoForm;