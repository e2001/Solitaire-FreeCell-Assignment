import React from 'react';
import {connect} from "react-redux"
import {startNewGameRequested} from "../../redux/game/game.actions"

import './homepage.scss';

const HomePage = ({startNewGameRequested}) => (
  <div className='homepage'>
    <div>Welcome to the FreeCell Game</div>
    <div>
      <button onClick={startNewGameRequested}>Start Game</button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startNewGameRequested: () => dispatch(startNewGameRequested()),
})

export default connect(null,mapDispatchToProps)(HomePage);
