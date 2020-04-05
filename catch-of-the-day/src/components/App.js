import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

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
                <Order fishes={this.state.fishes} order={this.state.order}/> {/* {...this.state} spread everything into order*/} 
                <Inventory 
                addFish={this.addFish} 
                loadSampleFishes={this.loadSampleFishes } 
                />
            </div>
        );
    }

}

export default App;

//how does anything get into the component? it's prop!