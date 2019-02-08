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
UI.prototype.showDeadScreen = function() {
  this.deadScreen.style.display = 'block'
  document.onkeypress = function(e) {
    game.start()
    ui.hideDeadScreen()
    document.onkeypress = null
  }
  hammer.on('tap', () => {
    game.start()
    ui.hideDeadScreen()
    hammer.off('tap')
  })
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
