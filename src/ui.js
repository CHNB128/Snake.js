function UI() {
  this.element = document.createElement('div')
  this.element.id = 'ui'

  this.mainText = null
  this.initMainText()

  this.scoreBlock = null
  this.scoreTitle = null
  this.score = null
  this.initScoreBlock()

  this.deadScreen = null
  this.initDeadScreen()

  this.hide()
  document.body.appendChild(this.element)
}
UI.prototype.initMainText = function() {
  this.mainText = document.createElement('div')
  this.mainText.id = 'main-text'
  this.mainText.innerText = 'Snake.js'

  this.element.appendChild(this.mainText)
}
UI.prototype.initScoreBlock = function() {
  this.scoreBlock = document.createElement('div')
  this.scoreBlock.id = 'score-block'

  this.scoreTitle = document.createElement('div')
  this.scoreTitle.innerText = 'score: '
  this.scoreBlock.appendChild(this.scoreTitle)

  this.score = document.createElement('div')
  this.score.id = 'score'
  this.scoreBlock.appendChild(this.score)

  this.element.appendChild(this.scoreBlock)
}
UI.prototype.initDeadScreen = function() {
  this.deadScreen = document.createElement('div')
  this.deadScreen.id = 'dead-screen'
  this.deadScreen.innerHTML = 'DEAD'
  this.deadScreen.onclick = function() {
    game.start()
    ui.hideDeadScreen()
  }
  this.element.appendChild(this.deadScreen)
}
UI.prototype.showDeadScreen = function() {
  this.deadScreen.style.display = 'block'
}
UI.prototype.hideDeadScreen = function() {
  this.deadScreen.style.display = 'none'
}
UI.prototype.show = function() {
  this.element.style.display = 'block'
}
UI.prototype.hide = function() {
  this.element.style.display = 'none'
}

export default UI
