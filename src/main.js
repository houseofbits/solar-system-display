import GuiOverlay from './gui/GuiOverlay';
import React from 'react';
import ReactDOM from 'react-dom';
import SolarSystemModel from './models/SolarSystemModel.js';

let solarSystemModel = new SolarSystemModel(document.getElementById('renderCanvas'));

ReactDOM.render(<GuiOverlay ssModel={solarSystemModel}/>, document.getElementById('gui'));

