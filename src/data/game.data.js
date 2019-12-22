export const SUIT = {
  diamonds: 'diamonds',//(♦),
  clubs: 'clubs', //(♣),
  hearts: 'hearts',  //(♥)
  spade: 'spade' //(♠)
}
export const COLOR = {
  'black':'black',
  'red':'red'
}

const createSuite = function (suite,color) {
  return [...Array(13).keys()].map(index=>{
     return {
       color:color,
       suite:suite,
       rank:index+1
     }
  })
}

const GAME_DATA = {
  cards: [
    ...createSuite(SUIT.clubs,COLOR.black),
    ...createSuite(SUIT.diamonds,COLOR.red),
    ...createSuite(SUIT.spade,COLOR.black),
    ...createSuite(SUIT.hearts,COLOR.red)
  ]
}

export default GAME_DATA;
