import { async } from 'regenerator-runtime'
import { API_URL, RESULT_PER_PAGE } from './config'
import { getJson } from './helpers'


export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RESULT_PER_PAGE
    },
    bookmarks: []
}


export const loadRecipe = async function (id) {
    try {

        const data = await getJson(`${API_URL}/${id}`)
        const { recipe } = data.data

        state.recipe = {
            publisher: recipe.publisher,
            id: recipe.id,
            cookingtime: recipe.cooking_time,
            sourceUrl: recipe.source_url,
            imageUrl: recipe.image_url,
            servings: recipe.servings,
            title: recipe.title,
            ingredients: recipe.ingredients
        }

        if (state.bookmarks?.some(bookmark => bookmark.id === state.recipe.id))
            state.recipe.bookmarked = true
        else
            state.recipe.bookmarked = false


    } catch (error) {
        throw error
    }


}
export const loadSearchResults = async function (query) {
    try {
        state.search.query = query
        const data = await getJson(`${API_URL}?search=${query}`)

        const { recipes } = data.data
        state.search.results = recipes.map((recipe) => {
            return {
                publisher: recipe.publisher,
                id: recipe.id,
                imageUrl: recipe.image_url,
                title: recipe.title,
            }
        })
      
        state.search.page = 1
    } catch (error) {
        
        throw error
    }


}



export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page
    const start = (page - 1) * state.search.resultsPerPage
    const end = (page * state.search.resultsPerPage)

    return state.search.results.slice(start, end)
}

export const updateServings = function (newServings) {

    state.recipe.ingredients.forEach(ing => {

        //new qty=old qty*new servings/old servings
        ing.quantity = ing.quantity * newServings / state.recipe.servings

    })
    state.recipe.servings = newServings

}

const addBookmarkLocalstorage=function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}




export const addBookmark = function (recipe) {

    state.bookmarks.push(recipe)
    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true
    }
    addBookmarkLocalstorage()
}

export const removeBookmark = function (id) {

    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id)
    state.bookmarks.splice(index, 1)
    state.recipe.bookmarked = false

    if (id === state.recipe.id) {
        state.recipe.bookmarked = false
    }
    addBookmarkLocalstorage()

}

const init=function(){
    const bookmarks=localStorage.getItem('bookmarks')
    if (bookmarks) {
      state.bookmarks=JSON.parse(bookmarks)
    }
}

init()
