import React from 'react';
import Checkbox from './Checkbox'
import GuiStyle from '../resources/css/gui.module.css';

export default
class DeveloperTools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    toggleHandler = (name, value) => {
        this.props.ssModel.setDeveloperOption(name, value);
    }
    render() {
        return <div className={GuiStyle.devTools}>
                <Checkbox name="planet_lo" title="Simple planet shader" clickHandler={this.toggleHandler}/>
                <Checkbox name="ateroids" title="Hide asteroids" clickHandler={this.toggleHandler}/>
                <Checkbox name="sunrays" title="Hide sun rays" clickHandler={this.toggleHandler}/>
                <Checkbox name="space" title="Hide space" clickHandler={this.toggleHandler}/>
                <Checkbox name="sun" title="Hide sun" clickHandler={this.toggleHandler}/>
            </div>;
    }
}