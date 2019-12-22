import React from 'react'
import './stack.scss'
import {connect} from 'react-redux'
import {cardToFreeStackRequested, moveCardToStackRequested} from "../../redux/game/game.actions"

import {selectStack} from "../../redux/game/game.selectors"
import Card from "../card/card"
import SuitBackdrop from "../suitBackdrop/suitBackdrop"
import {DropTarget} from 'react-dnd'
import {PropTypes} from 'prop-types'
import {compose} from 'redux'


const Stack = ({connectDropTarget, isDragging, stack, stackId, onCardClick, onDragEvent}) => {

  //console.log('stack', stack)

  const handleDrop = (card,targetStackId,originIndex,targetLimitSuite) => {
    onDragEvent({
      sourceCard:card,
      sourceStackId:stackId,
      originIndex,
      targetStackId,
      targetLimitSuite
    })
  }

  return connectDropTarget(
    <div className='stack-container'>
      {(stack.limitSuite && stack.cards.length === 0) && <SuitBackdrop suite={stack.limitSuite}/>}
      {stack.cards.map((card, index, array) =>
        <div key={card.rank + card.suite} className='card-wrapper' style={{top: (stack.cascades) ? index * 27 : 0}}>
          <Card card={card}
                 canDrag={array.length - 1 === index}
                 index={index}
                 onDrop={(card,targetStackId,originIndex,targetLimitSuite) => handleDrop(card,targetStackId,originIndex,targetLimitSuite)}
                 onClick={(card) => {
                   onCardClick(card, stackId, index)
                 }}/>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    stack: selectStack(state, props.stackId)
  }
}
const mapDispatchToProps = dispatch => ({
  onCardClick: (card, stackId, index) => {
    dispatch(cardToFreeStackRequested(card, stackId, index))
  },
  onDragEvent: dragData => dispatch(moveCardToStackRequested(dragData))

})


Stack.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  highlighted: PropTypes.bool.isRequired
}

const target = {
  drop(props) {
    const {stackId,limitSuite} = props
    //props that idntify the target stack
    return ({
      stackId,
      limitSuite
    })
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  highlighted: monitor.canDrop()
})


export default compose(
  DropTarget('ITEM', target, collect),
  connect(mapStateToProps, mapDispatchToProps)
)(Stack)
