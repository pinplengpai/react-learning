import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";

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

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu"> 
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order />
                <Inventory addFish={this.addFish} 
                loadSampleFishes={this.loadSampleFishes } 
                />
            </div>
        );
    }

}

export default App;

//how does anything get into the component? it's prop!