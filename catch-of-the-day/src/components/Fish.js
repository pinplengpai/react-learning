import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }
    render() {
        // const image = {this.props.details.image};
        // const name = {this.props.details.name};
        const { image, name, price, desc, status } = this.props.details; // it will add each variable at the end according to the es6 rule
        const isAvailable = status === 'available'
        return (
            <li className="menu-fish">
                <img src={image} alt={name} />
                <h3 className="fish-name">{name}
                    <span class="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>
                    {isAvailable ? 'Add to order': 'Sold out' }
                </button>
            </li>

            
        );
    }
}

export default Fish;

