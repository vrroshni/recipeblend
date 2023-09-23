import * as model from './model.js';
import recipeView from './view/recipeView.js';

const recipeContainer = document.querySelector('.recipe');
import 'core-js/stable'
import 'regenerator-runtime/runtime'






// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////




const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1)
    if (!id) {
      return
    }
    recipeView.renderSpinner(recipeContainer)
    await model.loadRecipe(id)
    recipeView.render(model.state.recipe)
  } catch (error) {
    recipeView.renderError()
  }

}


//publisher subsiber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipe)
}



init()

