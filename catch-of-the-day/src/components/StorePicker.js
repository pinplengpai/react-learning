import React, { Fragment } from 'react'; //make ingredient

class StorePicker extends React.Component { //import the sausages 
    render() { 
        return (
            <Fragment>
                <p>Fish!</p>
                <form className="store-selector">
                    <h2>Please enter a store</h2>
                    <input type="text" required placeholder="Store Name" />
                    <button type="submit">visit store --></button>
                </form>
            </Fragment>
        )
    }
}

export default StorePicker;