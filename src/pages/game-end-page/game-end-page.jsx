import React from 'react';
import {connect} from "react-redux"
import {goToWelcomeScreen, startNewGameRequested} from "../../redux/game/game.actions"
import './game-end-page.scss';


const GameEndPage = ({goToWelcomeScreen,startNewGameRequested}) => (
  <div className='game-end-page'>
    <div>The Game Is Over, Thank you for playing</div>
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


export default connect(null, mapDispatchToProps)(GameEndPage)

