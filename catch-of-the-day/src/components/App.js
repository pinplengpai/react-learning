import React from "react";
import PropTypes from 'prop-types';
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";


class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };

    componentDidMount(){
        const { params } = this.props.match;
        //first restate the localstorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef){
            this.setState({order: JSON.parse(localStorageRef)}) // to make it as an object from string.
        }
        console.log(localStorageRef);
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes' 
        });
    }

    componentDidUpdate(){
        console.log(this.state.order);
        localStorage.setItem(
            this.props.match.params.storeId, 
            JSON.stringify(this.state.order)
        );        
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }


    addFish = (fish) => {
        //1.take a copy of the existing state
        const  fishes = {...this.state.fishes };
        //2.add a new fish to that fishes variable 
        fishes[`fish${Date.now()}`] = fish;
        //3.set the new fishes object to state
        this.setState({ fishes  }); //in es6 it's the same thing.  
        //my understanding : 
        //1.copy the fish state so that we don't overwrite the existing one and it won't change the value in the future
        //2.make it new by putting time stamp
        //3.set the new state and push it in the object  
        // ** and after put the info in we need to set the form too
        //this.state.fishes.push(fish);
        //this.state.fishes.fish1 = fish; it's ususally write in javascript
    }; 

    updatedFish = (key, updatedFish) => {
        //1.Take a copy of current state
        const fishes = {...this.state.fishes };
        //2.update that state
        fishes[key] = updatedFish;
        //3.set that to state
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        //1.take a copy of state
        const fishes = { ...this.state.fishes };
        //2. update the state
        fishes[key] = null;
        //3. update state
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({ fishes : sampleFishes })
    };

    addToOrder = (key) => {
        //1.take the copy state
        const order = { ...this.state.order };
        //2.either add to the order or update the number in order
        order[key] = order[key] + 1 || 1;
        //3.call setState to update the our object
        this.setState({ order });
    };

    removeFromOrder = key => {
        //1.take the copy state
        const order = { ...this.state.order };
        //2.remove item from orders 
        delete order[key];
        //3.call setState to update the our object
        this.setState({ order });
    }
    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu"> 
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(
                        key => <Fish 
                                key={key} 
                                index = {key}
                                details={this.state.fishes[key]} 
                                addToOrder={this.addToOrder}
                                />)}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                    removeFromOrder={this.removeFromOrder}
                />
                {/* {...this.state} spread everything into order*/} 
                <Inventory 
                    addFish={this.addFish} 
                    updatedFish ={this.updatedFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes} 
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId} // params.storeId comes from react router
                />
            </div>
        );
    }

}

export default App;

//how does anything get into the component? it's prop!