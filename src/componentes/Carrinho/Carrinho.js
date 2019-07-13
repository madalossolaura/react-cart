import React from 'react';
import Produto from '../Produto/Produto';
import Botao from '../Botao/Botao';
import PopUp from '../PopUp/PopUp';

import './Carrinho.css'

class Carrinho extends React.Component {
    state = {
        produtos: [],
        valorTotal: 0
    }

    componentDidMount = () => {
        this.listarProdutos()
    }

    listarProdutos = async () => {
        await fetch('http://localhost:8000/api/listar-produtos')
        .then(reposta => reposta.json())
        .then(dados => this.setState({ produtos: dados }))

        let valorTotal = 0;

        this.state.produtos.forEach(produto => {
            valorTotal += produto.valor * produto.quantidade
        });

        this.setState({ valorTotal })
    }

    adicionarProduto = async (evento) => {
        evento.preventDefault();

        let valorInputNome = document.querySelector('#inputNome').value;
        let  valorInputValor = document.querySelector('#inputValor').value;

        let valoresFormatados = new FormData();
        valoresFormatados.append('nome', valorInputNome);
        valoresFormatados.append('valor', valorInputValor);

        await fetch('http://localhost:8000/api/adicionar-produtos', {
            method: 'POST',
            body: valoresFormatados
        })
        .then(resposta => resposta.json())
        .then(mensagem => console.log(mensagem));
        
        document.querySelector('#inputNome').value = ''
        document.querySelector('#inputValor').value = ''

        this.listarProdutos();
    }

    deletarProdutos = async () => {
        await fetch('http://localhost:8000/api/deletar-produtos', {
            method: 'DELETE'
        })
        .then(resposta => resposta.json())
        .then(mensagem => console.log(mensagem));

        this.listarProdutos();
    }

    aumentarQuantidade = async (id) => {
        await fetch(`http://localhost:8000/api/aumentar-quantidade/${id}`)
        .then(resposta => resposta.json())
        .then(mensagem => console.log(mensagem));

        this.listarProdutos();
    }

    diminuirQuantidade = async (id) => {
        await fetch(`http://localhost:8000/api/diminuir-quantidade/${id}`)
        .then(resposta => resposta.json())
        .then(mensagem => console.log(mensagem));

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
                                conteudoBotao="Adicionar Produto"
                            />
                            <PopUp 
                                valorTotal={this.state.valorTotal}
                            />
                        </div>
                    </form>
                         <Botao 
                            className="limpar"
                            conteudoBotao="Deletar Produtos"
                            aoClicarBotao={this.deletarProdutos}
                        />
                </div>    
                {this.state.produtos.map(produto => 
                    <Produto 
                        key={produto.id}
                        nome={produto.nome}
                        valor={produto.valor}
                        quantidade={produto.quantidade}
                        cliqueAumentar={() => {this.aumentarQuantidade(produto.id)}}
                        cliqueDiminuir={() => {this.diminuirQuantidade(produto.id)}}
                    />
                )}
            </div>
        );
    }
}

export default Carrinho;