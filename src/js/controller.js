import * as model from './model.js';
import recipeView from './view/recipeView.js';

const recipeContainer = document.querySelector('.recipe');
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';

//from parcel
// if (module.hot) {
//   module.hot.accept()
// }



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
const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner()
    const query = searchView.getQuery()
    if (!query)
      return


    await model.loadSearchResults(query)

    resultsView.render(model.getSearchResultsPage())

    paginationView.render(model.state.search)


  } catch (error) {
    console.log(error)
  }

}
const controlPagination = async (goto) => {


  resultsView.render(model.getSearchResultsPage(goto))

  paginationView.render(model.state.search)

}




//publisher subsiber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerPagination(controlPagination)
}


init()



