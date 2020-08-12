import React from 'react';
import GuiStyle from '../resources/css/gui.module.css';

export default
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    click = () => {
        this.props.clickHandler(this.props.name);
    };
    render() {

        let buttonClass = GuiStyle.button;
        
        if(this.props.selectedDetail == this.props.name || (this.props.name == 'all' && this.props.selectedDetail == null)){
            buttonClass += ' ' + GuiStyle.selectedButton;
        }

        return <div className={buttonClass} onClick={this.click}>{this.props.title}</div>;
    }
}