import {SUIT} from "../data/game.data"

export function mapRankToIcon(rank) {
  let value = parseInt(rank)
  if(isNaN(value)){
    //can throw error here
  }
  if(value===1){
    return "A"
  }
  if(value===11){
    return "J"
  }
  if(value===12){
    return  "Q"
  }
  if(value===13){
    return "K"
  }
  return value
}

export function mapSuitIcon(suite) {
  if(suite===SUIT.hearts){
    return '♥'
  }
  if(suite===SUIT.spade){
    return '♣'
  }
  if(suite===SUIT.diamonds){
    return '♦'
  }
  if(suite===SUIT.clubs){
    return '♠'
  }

}
