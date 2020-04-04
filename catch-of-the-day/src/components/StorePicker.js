import React, { Fragment } from 'react'; //make ingredient
import { getFunName } from '../helpers';

class StorePicker extends React.Component { //import the sausages 
    render() { 
        console.log('this');
        return (
            <Fragment>
                <form className="store-selector">
                    <h2>Please enter a store</h2>
                    <button class="button"> Click me!</button>
                    <input 
                    type="text" 
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