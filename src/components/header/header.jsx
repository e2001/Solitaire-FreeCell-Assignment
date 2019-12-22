import React from 'react'
import {Link} from 'react-router-dom'
import './header.scss'
import {connect} from 'react-redux'

import {endGameDo, startNewGameRequested, goToWelcomeScreen} from "../../redux/game/game.actions"
import {createStructuredSelector} from "reselect"
import {selectGameState} from "../../redux/game/game.selectors"
import {GameStateEnum} from "../../redux/game/game.reducer"


const Header = ({startNewGameRequested, endGame, gameState}) => {

  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <img src='../king.png' className='logo'/>
      </Link>
      {gameState === GameStateEnum.PLAYING && (<div>
        <button onClick={startNewGameRequested}>Start Over</button>
        <button onClick={endGame}>End Game</button>
      </div>)}
    </div>)

}


const mapDispatchToProps = dispatch => ({
  startNewGameRequested: () => dispatch(startNewGameRequested()),
  endGame: () => dispatch(endGameDo())
})
const mapStateToProps = createStructuredSelector({
  gameState: selectGameState
})


export default connect(mapStateToProps, mapDispatchToProps)(Header)
