import React, { useState } from "react";
import Cliente from "../models/Cliente";

// O tipo das Props permanece o mesmo
type Props = {
  clientes: Cliente[];
  onCadastrar: (cliente: Cliente) => void;
  onEditar: (index: number, cliente: Cliente) => void;
  onExcluir: (index: number) => void;
};

// Convertemos a classe para uma função que recebe as props desestruturadas
const ClienteForm: React.FC<Props> = ({ clientes, onCadastrar, onEditar, onExcluir }) => {
  // 1. Substituímos o `this.state` por múltiplos `useState`
  // Cada um controla uma parte do estado do formulário
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefones, setTelefones] = useState("");
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);

  // 2. Convertemos os métodos da classe para funções dentro do componente
  const handleCadastrarOuEditar = () => {
    // Usamos diretamente as variáveis de estado, sem `this.state`
    if (!nome || !cpf || !telefones) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoCliente = new Cliente(
      nome,
      cpf,
      telefones.split(",").map(t => t.trim())
    );

    if (editandoIndex !== null) {
      // As funções das props são chamadas diretamente, sem `this.props`
      onEditar(editandoIndex, novoCliente);
    } else {
      onCadastrar(novoCliente);
    }

    // 3. Para limpar o formulário, chamamos as funções de atualização de cada estado
    setNome("");
    setCpf("");
    setTelefones("");
    setEditandoIndex(null);
  };

  const handleEditarClick = (index: number) => {
    // Acessamos `clientes` diretamente das props
    const cliente = clientes[index];

    // Preenchemos o formulário usando as funções de atualização de estado
    setNome(cliente.nome);
    setCpf(cliente.cpf);
    setTelefones(cliente.telefones.join(", "));
    setEditandoIndex(index);
  };

  // 4. O `render()` é removido. O JSX é retornado diretamente pela função.
  return (
    <div className="container mt-4">
      <h3>{editandoIndex !== null ? "Editar Cliente" : "Cadastrar Cliente"}</h3>

      <input
        className="form-control mb-2"
        placeholder="Nome"
        value={nome}
        // 5. O `onChange` agora chama a função de atualização do estado específico
        onChange={e => setNome(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="CPF"
        value={cpf}
        onChange={e => setCpf(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Telefones (separados por vírgula)"
        value={telefones}
        onChange={e => setTelefones(e.target.value)}
      />

      <button className="btn btn-primary mb-3 px-5" onClick={handleCadastrarOuEditar}>
        {editandoIndex !== null ? "Salvar Alterações" : "Cadastrar"}
      </button>

      <h5>Clientes Cadastrados:</h5>
      {clientes.length === 0 ? (
        <div className="alert alert-info">Nenhum cliente cadastrado.</div>
      ) : null}
      <ul className="list-group">
        {clientes.map((c, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{c.nome}</strong> | CPF: {c.cpf} | Telefones: {c.telefones.join(", ")}
            </div>
            <div>
              {/* 6. Os eventos de clique chamam as novas funções diretamente */}
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
}

export default ClienteForm;