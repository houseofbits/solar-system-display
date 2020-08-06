import React from 'react';
import GuiStyle from '../resources/gui.module.css';

export default
class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {

        let detailsClass = GuiStyle.detailsFrame;
        if(this.props.selectedDetail !== null){
            detailsClass += ' ' + GuiStyle.detailsFrameVisible;
        }

        return <div className={detailsClass}>
            
        </div>;
    }
}