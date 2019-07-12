import React from 'react';
import Produto from '../Produto/Produto';

import './Carrinho.css'

class Carrinho extends React.Component {
    state = {
        produtos: []
    }

    componentDidMount = () => {
        this.listarProdutos()
    }

    listarProdutos = async () => {
        await fetch('http://localhost:8000/api/listar-produtos')
        .then(reposta => reposta.json())
        .then(dados => this.setState({ produtos: dados }))
    }

    render() {
        return (
            <div className="carrinho">
                <div className="carrinho-header">
                    <form onSubmit="">
                        <div className="inputs">
                            <input id="inputNome" type="text" placeholder="Digite o Produto" />
                            <input id="inputValor" type="tel" placeholder="Digite o Valor" />
                        </div>
                        <div className="botoes">
                        </div>
                    </form>
                </div>    
                {this.state.produtos.map(produto => 
                    <Produto 
                        nome={produto.nome}
                        valor={produto.valor}
                        quantidade={produto.quantidade}
                    />
                )}
            </div>
        );
    }
}

export default Carrinho;