import React from 'react'
import {connect} from 'react-redux'
import {mapSuitIcon} from "../../utils/componentHelpers"
import './suitBackdrop.scss'

const SuitBackdrop = ({suite}) => {

  return (
    <div className={'card-suite'}>
      <span>{mapSuitIcon(suite)}</span>
    </div>
  )
}


export default connect(null,null)(SuitBackdrop);
