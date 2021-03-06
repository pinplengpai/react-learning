import React, { Fragment } from 'react'; //make ingredient
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component { //import the sausages 
    static propTypes = {
        history: PropTypes.object
    };

    myInput = React.createRef();

    goToStore = event => {
        //1.stop the form from submitting
        event.preventDefault(); 
        //2.get the text from the input.
        const storeName = this.myInput.current.value; //it will show the instance of each component
        //3.Change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`);
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

//state = an object that holds a data that itself need as well as some children may need or a single source of truth
// it will update the data /value across the page
 