function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function randomChar(min, max) {
  return String.fromCharCode(randomInteger(min, max))
}

function randomString(length) {
  return Array
    .from({length}, _ => randomChar(97, 122))
    .join('')
}

export {randomInteger, randomChar, randomString}
