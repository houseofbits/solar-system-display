import React from 'react';
import GuiStyle from '../resources/gui.module.css';

export default
class GuiOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };

        //props.ssModel.action();

    }
    render() {
        return <div className={GuiStyle.frame}></div>;
    }
}
