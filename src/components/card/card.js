import React from 'react';
import { PropTypes } from 'prop-types';
import { DragSource } from 'react-dnd';
import {mapRankToIcon, mapSuitIcon} from "../../utils/componentHelpers"

import './card.scss'

const Card = ({ connectDragSource, card , onClick}) => (
  connectDragSource(
    <div className={'card-container ' + card.color} onClick={()=>{
      onClick(card)}}>
      <span>{mapRankToIcon(card.rank)}</span>
      <span>{mapSuitIcon(card.suite)}</span>
    </div>
  )
);

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
}

const source = {
  canDrag(props) {
    // You can disallow drag based on props
    return props.canDrag
  },
  beginDrag(props) {
    const { card ,index} = props;
    //props to id the dragged card
    return ({
      card,
      index
    });
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    const { onDrop } = props;

    //props that id the dragged card
    const { card,index:originIndex } = monitor.getItem();

    //props that id the target stack
    const { stackId:targetStackId,limitSuite:targetLimitSuite} = monitor.getDropResult();

    //Note: originStack id will be the stack component that is handling this onDrop call
    onDrop(card,targetStackId,originIndex,targetLimitSuite);
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource('ITEM', source, collect)(Card);






