import View from "./View";
import icons from 'url:../../img/icons.svg'

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload')
    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')
    _message="Recipe was succesfully added"

    constructor() {
        super()
        this.addHandlerShowWindow()
        this.addHandlerHideWindow()
    }

    showWindow() {
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    addHandlerShowWindow() {
        this._btnOpen.addEventListener("click", this.showWindow.bind(this))
    }

    addHandlerHideWindow() {
        this._btnClose.addEventListener("click", this.showWindow.bind(this))
        this._overlay.addEventListener("click", this.showWindow.bind(this))
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            const dataArr=[...new FormData(this)]
            const data=Object.fromEntries(dataArr)

            handler(data)
        })

    }

    _generateMarkUp() {

    }


}

export default new AddRecipeView()