import React, { useState } from "react";
import Pet from "../models/Pet";
import Cliente from "../models/Cliente";

type Props = {
  pets: Pet[];
  clientes: Cliente[];
  onCadastrar: (pet: Pet) => void;
  onEditar: (index: number, novoPet: Pet) => void;
  onExcluir: (index: number) => void;
};

// Convertemos a classe para um componente de função
const PetForm: React.FC<Props> = ({ pets, clientes, onCadastrar, onEditar, onExcluir }) => {
  // 1. O `state` é dividido em vários `useState`
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [raca, setRaca] = useState("");
  const [donoCpf, setDonoCpf] = useState("");
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);

  // Os métodos viram funções
  const handleCadastrarOuEditar = () => {
    // Usamos as variáveis de estado diretamente
    if (!nome || !tipo || !raca || !donoCpf) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoPet = new Pet(nome, tipo, raca, donoCpf);

    if (editandoIndex !== null) {
      onEditar(editandoIndex, novoPet);
    } else {
      onCadastrar(novoPet);
    }

    // Limpamos o formulário chamando as funções de atualização de cada estado
    setNome("");
    setTipo("");
    setRaca("");
    setDonoCpf("");
    setEditandoIndex(null);
  };

  const handleEditarClick = (index: number) => {
    const pet = pets[index];
    // Populamos o formulário usando as funções de atualização
    setNome(pet.nome);
    setTipo(pet.tipo);
    setRaca(pet.raca);
    setDonoCpf(pet.donoCpf);
    setEditandoIndex(index);
  };

  // O JSX é retornado diretamente, sem o método `render`
  return (
    <div className="container mt-4">
      <h3>{editandoIndex !== null ? "Editar Pet" : "Cadastrar Pet"}</h3>

      <input
        className="form-control mb-2"
        placeholder="Nome"
        value={nome}
        // Os `onChange` são atualizados para chamar as funções do `useState`
        onChange={e => setNome(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Tipo (ex: cão, gato)"
        value={tipo}
        onChange={e => setTipo(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Raça"
        value={raca}
        onChange={e => setRaca(e.target.value)}
      />
      <select
        className="form-control mb-3"
        value={donoCpf}
        onChange={e => setDonoCpf(e.target.value)}
      >
        <option value="">Selecione um cliente</option>
        {clientes.map((cliente, index) => (
          <option key={index} value={cliente.cpf}>
            {cliente.nome} - CPF: {cliente.cpf}
          </option>
        ))}
      </select>

      <button className="btn btn-primary mb-3 px-5" onClick={handleCadastrarOuEditar}>
        {editandoIndex !== null ? "Salvar Alterações" : "Cadastrar"}
      </button>

      <h5>Pets Cadastrados:</h5>
      {pets.length === 0 ? (
        <p className="alert alert-info">Nenhum pet cadastrado.</p>
      ) : (
        <ul className="list-group">
          {pets.map((pet, index) => {
            // A lógica de encontrar o dono continua a mesma
            const dono = clientes.find(c => c.cpf === pet.donoCpf);
            return (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  {pet.nome} - {pet.tipo} ({pet.raca}) | Dono: {dono ? dono.nome : "Não encontrado"}
                </span>
                <div>
                  {/* Os `onClick` chamam as novas funções diretamente */}
                  <button className="btn btn-sm btn-info me-2 w-100 mb-2" onClick={() => handleEditarClick(index)}>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-danger w-100" onClick={() => onExcluir(index)}>
                    Excluir
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PetForm;