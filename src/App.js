import React from 'react'
import Header from "./components/header/header"
import {connect} from 'react-redux'

import {createStructuredSelector} from "reselect"
import {GameStateEnum} from "./redux/game/game.reducer"
import {selectGameState} from "./redux/game/game.selectors"

import GameEndPage from "./pages/game-end-page/game-end-page"
import PlayingPage from "./pages/playing-page/playing-page"
import HomePage from "./pages/homepage/homepage"
import GameWinPage from "./pages/win-page/win-page"
import './App.scss'



const App = ({gameState}) => {

  return (
    <div className='App'>
      <Header/>
      <div className='page-container'>
        {gameState === GameStateEnum.HOME && <HomePage/>}
        {gameState === GameStateEnum.WIN && <GameWinPage/>}
        {gameState === GameStateEnum.END && <GameEndPage/>}
        {gameState === GameStateEnum.PLAYING && <PlayingPage/>}

      </div>
    </div>
  )
}


const mapStateToProps = createStructuredSelector({
  gameState: selectGameState
})


export default connect(
  mapStateToProps
)(App)
