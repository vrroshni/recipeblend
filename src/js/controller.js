import * as model from './model.js';
import recipeView from './view/recipeView.js';
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';





const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1)
    if (!id) {
      return
    }
    recipeView.renderSpinner()
    resultsView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)
    await model.loadRecipe(id)
    recipeView.render(model.state.recipe)
  } catch (error) {
    console.log(error)
    recipeView.renderError()
  }
}


const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner()
    const query = searchView.getQuery()
    if (!query) {
      return
    }
    
    await model.loadSearchResults(query)
    resultsView.render(model.getSearchResultsPage())
    paginationView.render(model.state.search)
  } catch (error) {
    console.log(error,"search error")
    resultsView.renderError()
  }
}


const controlPagination = async (goto) => {
  resultsView.render(model.getSearchResultsPage(goto))
  paginationView.render(model.state.search)
}


const controlServings = (newServings) => {
  //update recipe servings
  model.updateServings(newServings)
  //update recipe view
  recipeView.update(model.state.recipe)
}

const controlAddBookMark = () => {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  } else {
    model.removeBookmark(model.state.recipe.id)
  }
  //update recipe servings
  recipeView.update(model.state.recipe)
  bookmarksView.render(model.state.bookmarks)
}

const controlBookMarks = () => {
  bookmarksView.render(model.state.bookmarks)
}
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};


//publisher subsiber pattern
const init = function () {

  recipeView.addHandlerRender(controlRecipe)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookMark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerPagination(controlPagination)
  bookmarksView.addHandlerRender(controlBookMarks)
  addRecipeView.addHandlerUpload(controlAddRecipe)

}


init()



