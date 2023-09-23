import * as model from './model.js';
import recipeView from './view/recipeView.js';

const recipeContainer = document.querySelector('.recipe');
import 'core-js/stable'
import 'regenerator-runtime/runtime'




const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};



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
    alert(error.message)
  }

}

controlRecipe()




const eventTypes = ["hashchange", "load"];

eventTypes.forEach(eventType => {
  window.addEventListener(eventType, controlRecipe);
});
