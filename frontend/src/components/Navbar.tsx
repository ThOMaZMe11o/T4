/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react'; // É uma boa prática importar o React

// Renomeei o tipo para 'Props' (maiúsculo) por convenção.
// Também adicionei tipos mais específicos para a função `seletorView`.
type Props = {
    tema: string,
    botoes: string[],
    seletorView: (valor: string, e: React.MouseEvent<HTMLAnchorElement>) => void
}

// 1. Convertemos a classe para uma função que recebe as props desestruturadas.
const Navbar: React.FC<Props> = ({ tema, botoes, seletorView }) => {

    // 2. A função `gerarListaBotoes` não é mais necessária.
    // Podemos fazer o map diretamente no JSX, o que é mais comum e limpo.

    // 3. O constructor e o `bind` são totalmente removidos.

    // 4. O `render` também é removido. A função retorna o JSX diretamente.
    return (
        <>
            <nav
                className="navbar navbar-expand-lg navbar-dark p-0"
                style={{ backgroundColor: '#007bff', marginBottom: 10 }}
            >
                <div className="container-fluid">
                    <a className="d-flex align-items-center w-75" href="#">
                        <img
                            src="./PetLovers.png"
                            alt="Logo PetLovers"
                            width="100%"
                            height="auto"
                            className=""
                        />
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* 5. A lógica de gerar os botões é colocada aqui.
                            - Removemos `this.props`.
                            - O `map` já lida com o caso de um array vazio (não renderiza nada).
                         */}
                        <ul className="navbar-nav ms-auto">
                            {botoes.map(valor => (
                                <li key={valor} className="nav-item">
                                    <a className="nav-link" href="#" onClick={(e) => seletorView(valor, e)}>
                                        {valor}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;