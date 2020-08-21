import React from 'react';
import Style from '../resources/css/buttons.module.css';

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

        let buttonClass = Style.buttonOuter;
        let buttonInnerClass = Style.buttonInner + ' ' + Style[this.props.name];
        let buttonTextClass = Style.buttonTextGradient;
        if(this.props.selectedDetail == this.props.name || (this.props.name == 'all' && this.props.selectedDetail == null)){
            buttonClass += ' ' + Style.selectedButton;
            buttonTextClass = Style.buttonTextGradientSelected;
        }

        return <div className={buttonClass} onClick={this.click}>
                <div className={buttonInnerClass}></div>
                <span className={buttonTextClass}>{this.props.title}</span>
            </div>;
    }
}