const emojis = {
  '-': ' ',
  'O': '🌴',
  'X': '💣',
  'I': '🪺',
  'PLAYER': '🦜',
  'COLLISION': '🔥',
  'EXPLOSION': '💥',
  'BURNT-CHICKEN': '🍗',
  'GAME_OVER': '👎',
  'WIN': '🏆',
  'HEART': '💜',
  'TIGER': '🐅',
};

// '': None of the relevant elements
// index: bombs 
// []

const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
`);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
maps.push(`
  OXXXXX---I
  -XXXXX-XXX
  -XXXXX-XXX
  -----X-XXX
  -XXX-X----
  -XXX-X-XXX
  -XXX---XXX
  ---XXXXXXX
  XX-XXXXXXX
  XXXXXXXXXX
`);
maps.push(`
  ---XXXXX-O
  -X-XXX---X
  -X-XXX-XXX
  -X-----XXX
  -XXXXX---X
  -XXXXXXXXX
  -XXXXXXXXX
  -----XXXXX
  XXXX-IXXXX
  XXXXXXXXXX
`);