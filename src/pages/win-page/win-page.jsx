import React from 'react';
import {connect} from "react-redux"
import {goToWelcomeScreen, startNewGameRequested} from "../../redux/game/game.actions"
import './win-page.scss';

const GameWinPage = ({goToWelcomeScreen,startNewGameRequested}) => (
  <div className='game-win-page'>
    <div>Nice Gob , you have Won</div>
    <div>
      <button onClick={goToWelcomeScreen}>Go to Home Screen</button>
      <button onClick={startNewGameRequested}>Start a new Game</button>
    </div>
  </div>
);


const mapDispatchToProps = dispatch => ({
  goToWelcomeScreen: () => dispatch(goToWelcomeScreen()),
  startNewGameRequested:()=>dispatch(startNewGameRequested())
})


export default connect(null, mapDispatchToProps)(GameWinPage)

