import React from 'react';
import Produto from '../Produto/Produto';
import Botao from '../Botao/Botao'

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

    adicionarProduto = async (evento) => {
        evento.preventDefault()

        let valorInputNome = document.querySelector('#inputNome').value;
        let  valorInputValor = document.querySelector('#inputValor').value;

        let valoresFormatados = new FormData();
        valoresFormatados.append('nome', valorInputNome);
        valoresFormatados.append('valor', valorInputValor);

        await fetch('http://localhost:8000/api/adicionar-produtos', {
            method: 'POST',
            body: valoresFormatados
        })
        .then(resposta => resposta.json());
        
        document.querySelector('#inputNome').value = ''
        document.querySelector('#inputValor').value = ''

        this.listarProdutos();

    }

    render() {
        return (
            <div className="carrinho">
                <div className="carrinho-header">
                    <form onSubmit={this.adicionarProduto}>
                        <div className="inputs">
                            <input id="inputNome" type="text" placeholder="Digite o Produto" />
                            <input id="inputValor" type="tel" placeholder="Digite o Valor" />
                        </div>
                        <div className="botoes">
                            <Botao 
                                className="adicionar" 
                                aoClicarBotao=""
                                conteudoBotao="Adicionar Produto"
                            />
                        </div>
                    </form>
                </div>    
                {this.state.produtos.map(produto => 
                    <Produto 
                        key={produto.id}
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