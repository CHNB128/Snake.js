import './index.css'

function Loader() {
  let loader = document.createElement('div')
  loader = document.body.appendChild(loader)
  loader.id = 'loader'

  this.element = loader
  this.hide()
}
Loader.prototype.show = function() {
  this.element.classList.remove('hide')
}

Loader.prototype.hide = function() {
  this.element.classList.add('hide')
}

export default Loader
