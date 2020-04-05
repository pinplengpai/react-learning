import React from 'react';

class EditFishForm extends React.Component{
    handleChange = event => {
        console.log(event.currentTarget.value);
        //update that fish
        //1.take a copy of current fish 
        const updatedFish = { 
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value   
        };
        this.props.updatedFish(this.props.index, updatedFish)
    }
    render(){
        return (
            <div className="fish-edit">
                <input name="name" type="text" placeholder="Name" onChange={this.handleChange} value={this.props.fish.name} />
                <input name="price" type="text" placeholder="Price" onChange={this.handleChange} value={this.props.fish.price}/>
                <select name="status" onChange={this.handleChange} value={this.props.fish.status}>
                    <option value="available"> Fresh!! </option>
                    <option value="unavailable"> Sold Out!! </option>
                </select>
                <textarea name="desc"  placeholder="Desc"  onChange={this.handleChange} value={this.props.fish.desc}/>
                <input name="image" type="text" placeholder="Image" onChange={this.handleChange} value={this.props.fish.image}/>
                <button onClick= {() => this.props.deleteFish(this.props.index)}> Remove Fish</button>
            </div>
        )
        ;
    }
}

export default EditFishForm;