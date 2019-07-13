import React from 'react';
import IconeAumentar from '@material-ui/icons/AddShoppingCart';
import IconeDiminuir from '@material-ui/icons/RemoveShoppingCart';

import './Produto.css'


class Produto extends React.Component {
    render() {
        return (
            <div className="produto">
                <span><b>{this.props.nome}</b></span>
                <span>R$ {this.props.valor}</span>
                <span>{this.props.quantidade}</span>

                <span 
                    className="aumentar" 
                    title="Aumentar quantidade" 
                    onClick={this.props.cliqueAumentar}
                >
                    <IconeAumentar />
                </span>

                <span 
                    className="diminuir" 
                    title="Diminuir quantidade" 
                    onClick={this.props.cliqueDiminuir}
                >
                    <IconeDiminuir />
                </span>
            </div>
        );
    }
}

export default Produto;