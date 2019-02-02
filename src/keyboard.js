function keyboard(value) {
  let key = {}
  key.value = value
  key.isDown = false
  key.press = undefined
  key.release = undefined
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (!key.isDown && key.press) key.press()
      key.isDown = true
      event.preventDefault()
    }
  }
  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release()
      key.isDown = false
      event.preventDefault()
    }
  }
  //Attach event listeners
  const downListener = key.downHandler.bind(key)
  const upListener = key.upHandler.bind(key)

  window.addEventListener('keydown', downListener, false)
  window.addEventListener('keyup', upListener, false)
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener)
    window.removeEventListener('keyup', upListener)
  }

  return key
}

export default keyboard
