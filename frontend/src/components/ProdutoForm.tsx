import React, { useState } from "react";
import Produto from "../models/Produto";

type Props = {
  produtos: Produto[];
  onCadastrar: (produto: Produto) => void;
  onEditar: (index: number, produto: Produto) => void;
  onExcluir: (index: number) => void;
};

// Convertendo para um componente de função
const ProdutoForm: React.FC<Props> = ({ produtos, onCadastrar, onEditar, onExcluir }) => {
  // 1. Separamos o state em múltiplos `useState`
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);

  // 2. Convertemos os métodos da classe para funções locais
  const handleCadastrarOuEditar = () => {
    // Acessamos o estado e as props diretamente
    if (!nome || !descricao || !valor) {
      alert("Preencha todos os campos!");
      return;
    }

    const produto = new Produto(nome, descricao, parseFloat(valor));

    if (editandoIndex !== null) {
      onEditar(editandoIndex, produto);
    } else {
      onCadastrar(produto);
    }

    // 3. Limpamos o formulário chamando cada função de atualização de estado
    setNome("");
    setDescricao("");
    setValor("");
    setEditandoIndex(null);
  };

  const handleEditarClick = (index: number) => {
    const produto = produtos[index];
    // Populamos o formulário usando as funções de atualização
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setValor(produto.valor.toString()); // Convertemos o número para string para o input
    setEditandoIndex(index);
  };

  // 4. Retornamos o JSX diretamente, sem o método `render`
  return (
    <div className="container mt-4">
      <h3>{editandoIndex !== null ? "Editar Produto" : "Cadastrar Produto"}</h3>

      <input
        className="form-control mb-2"
        placeholder="Nome"
        value={nome}
        // 5. Atualizamos os `onChange` para usar as funções do `useState`
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

      <h5>Produtos Cadastrados:</h5>
      {produtos.length === 0 ? (
        <div className="alert alert-info">Nenhum produto cadastrado.</div>
      ) : null}
      <ul className="list-group">
        {produtos.map((p, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{p.nome}</strong> - {p.descricao} - R${p.valor.toFixed(2)}
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

export default ProdutoForm;