import React from 'react';
import GuiStyle from '../resources/css/gui.module.css';

export default
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isChecked:false
         };
    }
    click = () => {
        this.setState(({ isChecked }) => (
            {
              isChecked: !isChecked,
            }
        ));        
        this.props.clickHandler(this.props.name, this.state.isChecked);
    };
    render() {
        let buttonClass = GuiStyle.checkbox;        
        if(this.state.isChecked == true){
            buttonClass += ' ' + GuiStyle.checkboxActive;
        }
        return <div className={buttonClass} onClick={this.click}>{this.props.title}</div>;
    }
}