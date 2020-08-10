import React from 'react';
import Style from '../resources/css/detail.module.css';
import TextLV from '../resources/text/text-lv.json';
import TextEN from '../resources/text/text-en.json';
import TextRU from '../resources/text/text-ru.json';

export default
class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    getPlanetText = () => {
        
        let text = null;
        if(this.props.language == 'lv')text = TextLV;
        else if(this.props.language == 'en')text = TextEN;
        else if(this.props.language == 'ru')text = TextRU;

        if(text 
            && typeof this.props.selectedDetail != 'undefined' 
            && typeof text.planets[this.props.selectedDetail] != 'undefined'){
                return text.planets[this.props.selectedDetail];
        }
        return TextLV.planets.earth;
    }
    getCommonText = () => {
        
        let text = null;
        if(this.props.language == 'lv')text = TextLV;
        else if(this.props.language == 'en')text = TextEN;
        else if(this.props.language == 'ru')text = TextRU;

        if(text)return text.common;
        return TextLV.common;
    }    
    render() {

        let planetText = this.getPlanetText();
        let commonText = this.getCommonText();

        let detailsClass = Style.detailsFrame;
        if(this.props.selectedDetail !== null){
            detailsClass += ' ' + Style.detailsFrameVisible;
        }

        return <div className={detailsClass}>
            <div className={Style.detailsTitle}><span>{planetText.title}</span></div>
            <div className={Style.detailsDescription}><span>{planetText.description}</span></div>
            <ul className={Style.detailsList}>
                <li><span>{commonText.distance}</span>: <span>{planetText.distance}</span></li>
                <li><span>{commonText.period}</span>: <span>{planetText.period}</span></li>
                <li><span>{commonText.radius}</span>: <span>{planetText.radius}</span></li>
                <li><span>{commonText.mass}</span>: <span>{planetText.mass}</span></li>  
                <li><span>{commonText.density}</span>: <span>{planetText.density}</span></li>  
                <li><span>{commonText.satelites}</span>: <span>{planetText.satelites}</span></li>                
                <li><span>{commonText.rings}</span>: <span>{planetText.rings}</span></li>  
            </ul>
        </div>;
    }
}