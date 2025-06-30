import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ClienteForm from "./components/ClienteForm";
import ProdutoForm from "./components/ProdutoForm";
import ServicoForm from "./components/ServicoForm";
import ConsumoForm from "./components/ConsumoForm";
import PetForm from "./components/PetForm";
import Cliente from "./models/Cliente";
import Produto from "./models/Produto";
import Servico from "./models/Servico";
import Consumo from "./models/Consumo";
import Pet from "./models/Pet";

// O componente agora é uma função
function App() {
    // 1. O state da classe foi dividido em múltiplos `useState`.
    // Cada `useState` controla uma parte do estado da aplicação.
    const [tela, setTela] = useState("Clientes");
    const [clientes, setClientes] = useState<Cliente[]>([
        // Os dados iniciais são mantidos
        new Cliente("Maria Silva", "123.456.789-00", ["11 98765-4321"]),
        new Cliente("João Souza", "987.654.321-00", ["21 99999-8888", "21 98888-7777"]),
        new Cliente("Ana Lima", "111.222.333-44", ["31 91234-5678"]),
    ]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);

    // 2. Todos os métodos da classe viram funções dentro do componente.
    // Usamos as funções `set...` do `useState` para atualizar o estado.

    const selecionarView = (novaTela: string, evento: React.MouseEvent) => {
        evento.preventDefault();
        setTela(novaTela);
    };

    // --- Lógica para Clientes ---
    const handleCadastrarCliente = (cliente: Cliente) => {
        setClientes(prevClientes => [...prevClientes, cliente]);
    };
    const handleEditarCliente = (index: number, novoCliente: Cliente) => {
        setClientes(prevClientes => {
            const clientesAtualizados = [...prevClientes];
            clientesAtualizados[index] = novoCliente;
            return clientesAtualizados;
        });
    };
    const handleExcluirCliente = (index: number) => {
        setClientes(prevClientes => prevClientes.filter((_, i) => i !== index));
    };

    // --- Lógica para Produtos ---
    const handleCadastrarProduto = (produto: Produto) => {
        setProdutos(prevProdutos => [...prevProdutos, produto]);
    };
    const handleEditarProduto = (index: number, novoProduto: Produto) => {
        setProdutos(prevProdutos => {
            const produtosAtualizados = [...prevProdutos];
            produtosAtualizados[index] = novoProduto;
            return produtosAtualizados;
        });
    };
    const handleExcluirProduto = (index: number) => {
        setProdutos(prevProdutos => prevProdutos.filter((_, i) => i !== index));
    };

    // --- Lógica para Serviços ---
    const handleCadastrarServico = (servico: Servico) => {
        setServicos(prevServicos => [...prevServicos, servico]);
    };
    const handleEditarServico = (index: number, novoServico: Servico) => {
        setServicos(prevServicos => {
            const servicosAtualizados = [...prevServicos];
            servicosAtualizados[index] = novoServico;
            return servicosAtualizados;
        });
    };
    const handleExcluirServico = (index: number) => {
        setServicos(prevServicos => prevServicos.filter((_, i) => i !== index));
    };

    // --- Lógica para Pets ---
    const handleCadastrarPet = (pet: Pet) => {
        setPets(prevPets => [...prevPets, pet]);
    };
    const handleEditarPet = (index: number, novoPet: Pet) => {
        setPets(prevPets => {
            const petsAtualizados = [...prevPets];
            petsAtualizados[index] = novoPet;
            return petsAtualizados;
        });
    };
    const handleExcluirPet = (index: number) => {
        setPets(prevPets => prevPets.filter((_, i) => i !== index));
    };
    
    // --- Lógica para Consumo ---
    const handleRegistrarConsumo = (cpf: string, consumo: Consumo) => {
        setClientes(prevClientes =>
            prevClientes.map(c => {
                if (c.cpf === cpf) {
                    // Criamos uma nova instância para garantir a imutabilidade
                    const novoCliente = new Cliente(c.nome, c.cpf, [...c.telefones]);
                    novoCliente.pets = [...c.pets]; // Copiamos pets e consumos
                    novoCliente.consumos = [...c.consumos, consumo]; 
                    return novoCliente;
                }
                return c;
            })
        );
    };


    // 3. A lógica de renderização é a mesma, mas sem `this` e `this.state`.
    // As funções de manipulação são passadas como props para os formulários.
    let conteudo;
    switch (tela) {
        case "Clientes":
            conteudo = (
                <ClienteForm
                    clientes={clientes}
                    onCadastrar={handleCadastrarCliente}
                    onEditar={handleEditarCliente}
                    onExcluir={handleExcluirCliente}
                />
            );
            break;
        case "Produtos":
            conteudo = (
                <ProdutoForm
                    produtos={produtos}
                    onCadastrar={handleCadastrarProduto}
                    onEditar={handleEditarProduto}
                    onExcluir={handleExcluirProduto}
                />
            );
            break;
        case "Serviços":
            conteudo = (
                <ServicoForm
                    servicos={servicos}
                    onCadastrar={handleCadastrarServico}
                    onEditar={handleEditarServico}
                    onExcluir={handleExcluirServico}
                />
            );
            break;
        case "Pets":
            conteudo = (
                <PetForm
                    pets={pets}
                    clientes={clientes}
                    onCadastrar={handleCadastrarPet}
                    onEditar={handleEditarPet}
                    onExcluir={handleExcluirPet}
                />
            );
            break;
        case "Consumos":
            conteudo = (
                <ConsumoForm
                    clientes={clientes}
                    produtos={produtos}
                    servicos={servicos}
                    onRegistrarConsumo={handleRegistrarConsumo}
                />
            );
            break;
        default:
            conteudo = <div>Página não encontrada</div>;
    }

    return (
        <>
            <Navbar
                seletorView={selecionarView}
                tema="#e3f2fd"
                botoes={["Clientes", "Produtos", "Serviços", "Pets", "Consumos"]}
            />
            <div className="container-fluid">
                {conteudo}
            </div>
        </>
    );
}

export default App;