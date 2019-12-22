import React, { Component } from 'react';

import './playing-page.scss';
import Stack from '../../components/stack/stack'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {SUIT} from "../../data/game.data"

class PlayingPage extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className='playing-page-container'>
        <div className='playing-page'>
          <div className="upperboard">
            <div className="free-cell-container">
              <Stack stackId='free1'></Stack>
              <Stack stackId='free2'></Stack>
              <Stack stackId='free3'></Stack>
              <Stack stackId='free4'></Stack>
            </div>
            <div className="mid-cell">
              <div>Solitaire</div>
              <div>FreeCell</div>
            </div>
            <div className="foundation-container">
              <Stack stackId='f1' limitSuite={SUIT.hearts}></Stack>
              <Stack stackId='f2' limitSuite={SUIT.clubs}></Stack>
              <Stack stackId='f3' limitSuite={SUIT.spade}></Stack>
              <Stack stackId='f4' limitSuite={SUIT.diamonds}></Stack>
            </div>

          </div>
          <div className="lowerboard">
            <Stack stackId='t1'></Stack>
            <Stack stackId='t2'></Stack>
            <Stack stackId='t3'></Stack>
            <Stack stackId='t4'></Stack>
            <Stack stackId='t5'></Stack>
            <Stack stackId='t6'></Stack>
            <Stack stackId='t7'></Stack>
            <Stack stackId='t8'></Stack>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(PlayingPage);

