import React, { useState } from "react";
import Servico from "../models/Servico";

type Props = {
  servicos: Servico[];
  onCadastrar: (servico: Servico) => void;
  onEditar: (index: number, servico: Servico) => void;
  onExcluir: (index: number) => void;
};

// Convertendo a classe para um componente de função
const ServicoForm: React.FC<Props> = ({ servicos, onCadastrar, onEditar, onExcluir }) => {
  // 1. Dividimos o estado em `useState` individuais
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);

  // 2. Transformamos os métodos em funções locais
  const handleCadastrarOuEditar = () => {
    // Acessamos as variáveis de estado e props diretamente
    if (!nome || !descricao || !valor) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoServico = new Servico(nome, descricao, parseFloat(valor));

    if (editandoIndex !== null) {
      onEditar(editandoIndex, novoServico);
    } else {
      onCadastrar(novoServico);
    }

    // 3. Resetamos o formulário com as funções de atualização de estado
    setNome("");
    setDescricao("");
    setValor("");
    setEditandoIndex(null);
  };

  const handleEditarClick = (index: number) => {
    const servico = servicos[index];
    // Populamos o formulário para edição
    setNome(servico.nome);
    setDescricao(servico.descricao);
    setValor(servico.valor.toString());
    setEditandoIndex(index);
  };

  // 4. Retornamos o JSX diretamente
  return (
    <div className="container mt-4">
      <h3>{editandoIndex !== null ? "Editar Serviço" : "Cadastrar Serviço"}</h3>

      <input
        className="form-control mb-2"
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
      />
      <input
        type="number"
        step="0.01"
        className="form-control mb-2"
        placeholder="Valor"
        value={valor}
        onChange={e => setValor(e.target.value)}
      />

      <button className="btn btn-primary mb-3 px-5" onClick={handleCadastrarOuEditar}>
        {editandoIndex !== null ? "Salvar Alterações" : "Cadastrar"}
      </button>

      <h5>Serviços Cadastrados:</h5>
      {servicos.length === 0 ? (
        <div className="alert alert-info">Nenhum serviço cadastrado.</div>
      ) : null}
      <ul className="list-group">
        {servicos.map((s, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{s.nome}</strong> - {s.descricao} - R$ {s.valor.toFixed(2)}
            </div>
            <div>
              <button className="btn btn-sm btn-info me-2 w-100 mb-2" onClick={() => handleEditarClick(i)}>
                Editar
              </button>
              <button className="btn btn-sm btn-danger w-100" onClick={() => onExcluir(i)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicoForm;