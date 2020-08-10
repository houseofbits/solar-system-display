import React from 'react';
import Style from '../resources/css/language.module.css';

export default
class Language extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    click = (lang) => {
        this.props.clickHandler(lang);
    };
    render() {
        return <div className={Style.languageFrame}>
            <div className={[Style.flag, Style.lv, (this.props.language == 'lv'?Style.active:'')].join(' ')} onClick={() => this.click('lv')}></div>
            <div className={[Style.flag, Style.en, (this.props.language == 'en'?Style.active:'')].join(' ')} onClick={() => this.click('en')}></div>
            <div className={[Style.flag, Style.ru, (this.props.language == 'ru'?Style.active:'')].join(' ')} onClick={() => this.click('ru')}></div>
        </div>;

    }
}