import View from "./View";
import icons from 'url:../../img/icons.svg'
import previewView from "./previewView";


class BookMarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list')
  _errorMessage="No bookmarks yet. Find a nice recipe and bookmark it :)"
  _message=""
  _generateMarkUp() {
    return this._data.map(result=>previewView.render(result,false)).join("")
  }

  addHandlerRender(handler){
    window.addEventListener('load',handler)
  }

}

export default new BookMarksView()