import React from 'react';
import "./Square.css";

const button = {
    height: '100px',
    width: '100px',
    color: 'white',
    backgroundColor: 'black',
    margin: '10px',
    size: '100px',
}

class Square extends React.Component {

    render() {
        return (
            <div>
                <button className="myButton" id={this.props.id} style={button} onClick={this.props.onClick}>{this.props.value}</button>
            </div>
        )
    }
}

export default Square;