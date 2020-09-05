import React from 'react';
import GuiStyle from '../resources/css/gui.module.css';
import Button from './Button'
import Details from './Details'
import Language from './Language'
import DeveloperTools from './DeveloperTools'
import TextLV from '../resources/text/text-lv.json';
import TextEN from '../resources/text/text-en.json';
import TextRU from '../resources/text/text-ru.json';

export default
class GuiOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDetail:null,
            language:'lv'
        };
        this.props.ssModel.guiSelectDetailCallback = (selectedPlanet) => {
            this.selectDetail(selectedPlanet);          
        }
    }
    buttonClick = (name) => {
        if(this.state.selectedDetail == name){
            this.selectDetail('all');
        }else{
            this.selectDetail(name);
        }
    }
    selectDetail = (name) => {
        if(name == 'all')name = null;
        this.setState({selectedDetail: name});
        this.props.ssModel.action(name);
    };
    selectLanguage = (name) => {
        this.props.ssModel.userInputActivated();
        this.setState({language: name});
    }
    getAllText = () =>{
        let text = null;
        if(this.state.language == 'lv')text = TextLV;
        else if(this.state.language == 'en')text = TextEN;
        else if(this.state.language == 'ru')text = TextRU;

        if(text)return text.planets;
        return TextLV.planets;
    }
    getPlanetText = () => {        
        let text = null;
        if(this.state.language == 'lv')text = TextLV;
        else if(this.state.language == 'en')text = TextEN;
        else if(this.state.language == 'ru')text = TextRU;

        if(text 
            && typeof this.state.selectedDetail != 'undefined' 
            && typeof text.planets[this.state.selectedDetail] != 'undefined'){
                return text.planets[this.state.selectedDetail];
        }
        return TextLV.planets.earth;
    }
    getCommonText = () => {        
        let text = null;
        if(this.state.language == 'lv')text = TextLV;
        else if(this.state.language == 'en')text = TextEN;
        else if(this.state.language == 'ru')text = TextRU;

        if(text)return text.common;
        return TextLV.common;
    }    
    getPlanetTitle = (name) => {
        let planetText = this.getAllText();
        if(typeof planetText[name] != 'undefined'){
            return planetText[name].title;
        }
        if(!name){
            let commonText = this.getCommonText();
            return commonText.all;
        }
        return '';
    }  
    render() {
        
        return <div className={GuiStyle.frame} fps={this.props.ssModel.fps}>
            <DeveloperTools ssModel={this.props.ssModel}/>
            <Language language={this.state.language} clickHandler={this.selectLanguage}/>
            <Details language={this.state.language} selectedDetail={this.state.selectedDetail} commonText={this.getCommonText()} planetText={this.getPlanetText()}/>
            <div className={GuiStyle.buttonsFrame}>
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.buttonClick} title={this.getPlanetTitle('sun')} name="sun"/>  
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.buttonClick} title={this.getPlanetTitle('mercury')} name="mercury"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.buttonClick} title={this.getPlanetTitle('venus')} name="venus"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.buttonClick} title={this.getPlanetTitle('earth')} name="earth"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.buttonClick} title={this.getPlanetTitle('mars')} name="mars"/>                                        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.buttonClick} title={this.getPlanetTitle('jupiter')} name="jupiter"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.buttonClick} title={this.getPlanetTitle('saturn')} name="saturn"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.buttonClick} title={this.getPlanetTitle('uranus')} name="uranus"/>        
                <Button selectedDetail={this.state.selectedDetail} clickHandler={this.buttonClick} title={this.getPlanetTitle('neptune')} name="neptune"/>                                                      
            </div>
        </div>;
    }
}
