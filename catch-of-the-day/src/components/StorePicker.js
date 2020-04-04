import React, { Fragment } from 'react'; //make ingredient
import { getFunName } from '../helpers';

class StorePicker extends React.Component { //import the sausages 

    myInput = React.createRef();

    goToStore = event => {
        //1.stop the form from submitting
        event.preventDefault(); 
        //2.get the text from the input.
        console.log(this); //it will show the instance of each component

        //3.Change the page to /store/whatever-they-entered
    }

    render() { 
        return (
            <Fragment>
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please enter a store</h2>
                    <input 
                    type="text" 
                    ref={this.myInput}
                    required placeholder="Store Name" 
                    defaultValue={getFunName()} 
                    />
                    <button type="submit">visit store --></button>
                </form>
            </Fragment>
        )
    }
}

export default StorePicker;