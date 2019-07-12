import React from 'react';
import './Produto.css'


class Produto extends React.Component {
    render() {
        return (
            <div className="produto">
                <span><b>{this.props.nome}</b></span>
                <span>R$ {this.props.valor}</span>
                <span>{this.props.quantidade}</span>
            </div>
        );
    }
}

export default Produto;