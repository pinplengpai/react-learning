import React from 'react';
import PropTypes from "prop-types";
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Logic';
import base, { firebaseApp } from "../base";


class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
    };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user});
            }
        })
    }
    

    authHandler = async (authData) => {
        //1. look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context:this });
        //2. claim it if there is no owner
        if (!store.owner) {
            //save it our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        //3. set the state of the inventory component reflect the current user 
        this.setState({
            uid: authData.user.uid, //who is currently user
            owner: store.owner || authData.user.uid //who is the owner of the store
        })
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth.FacebookAuthProvider();
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler);
    };

    logout = async () => {
        console.log('Logging out');
        await firebase.auth().signOut();
        this.setState({uid:null});
    }


    render() {
        const logout = <button onClick={this.logout}>Log Out!!</button>
        //1.check if they are login ?
        if(!this.state.uid){
            return <Login authenticate={this.authenticate}/>;
        }
        //2.check if they are the owner of the store
        if(this.state.uid !== this.state.owner){
            return (
                <div>
                    <p> Sorry you are not the owner</p>
                    {logout}
                </div>
            );
        }
        //3.they must be the owner , just render the inventory
        return (
            <div className="inventory">
                <h2> Inventory </h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm 
                        key={key} 
                        index={key}
                        fish={this.props.fishes[key]} 
                        updatedFish={this.props.updatedFish}
                        deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}> 
                    Load Sample Fishes 
                </button>
            </div>
            
        );
    }
}

export default Inventory;

