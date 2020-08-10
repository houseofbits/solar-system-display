import React from 'react';
import GuiStyle from '../resources/css/gui.module.css';
import Button from './Button'
import Details from './Details'
import Language from './Language'

export default
class GuiOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDetail:null,
            language:'lv'
        };
    }
    selectDetail = (name) => {
        this.props.ssModel.action();
        if(name == 'all')name = null;
        this.setState({selectedDetail: name});
    };
    selectLanguage = (name) => {
        this.setState({language: name});
    }
    render() {

        return <div className={GuiStyle.frame}>
            <Language language={this.state.language} clickHandler={this.selectLanguage}/>
            <Details language={this.state.language} selectedDetail={this.state.selectedDetail} />
            <div className={GuiStyle.buttonsFrame}>
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.selectDetail} name="sun"/>  
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.selectDetail} name="mercury"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.selectDetail} name="venus"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.selectDetail} name="earth"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.selectDetail} name="mars"/>                                        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.selectDetail} name="jupiter"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.selectDetail} name="saturn"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.selectDetail} name="uranus"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.selectDetail} name="neptune"/>  
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.selectDetail} name="all"/>                                                        
            </div>
        </div>;
    }
}
