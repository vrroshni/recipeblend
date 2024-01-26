import { async } from 'regenerator-runtime'
import { API_URL, KEY, RESULT_PER_PAGE } from './config'
import { AJAX, getJson, sendJSON } from './helpers'


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

const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        imageUrl: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key }),
    };
};
export const loadRecipe = async function (id) {
    try {

        const data = await AJAX(`${API_URL}${id}?key=${KEY}`)
        console.log(data, data.data, "load recipe")

        state.recipe = createRecipeObject(data)

        if (state.bookmarks?.some(bookmark => bookmark.id === state.recipe.id))
            state.recipe.bookmarked = true
        else
            state.recipe.bookmarked = false


    } catch (error) {
        console.log(error,"load eerrrr")
        throw error
    }


}
export const loadSearchResults = async function (query) {
    try {
        console.log("Search is happeningggggggggg")

        state.search.query = query
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)

        const { recipes } = data.data

        console.log(recipes,"recipes")

        state.search.results = recipes.map((recipe) => {
            return {
                publisher: recipe.publisher,
                id: recipe.id,
                imageUrl: recipe.image_url,
                title: recipe.title,
                ...(recipe.key && { key: recipe.key }),
            }
        })

        state.search.page = 1
    } catch (error) {
console.log(error)
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

const addBookmarkLocalstorage = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
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

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
            .map(ing => {
                const ingArr = ing[1].split(',').map(el => el.trim());
                // const ingArr = ing[1].replaceAll(' ', '').split(',');
                if (ingArr.length !== 3)
                    throw new Error(
                        'Wrong ingredient fromat! Please use the correct format :)'
                    );

                const [quantity, unit, description] = ingArr;

                return { quantity: quantity ? +quantity : null, unit, description };
            });


        const recipe = {
            title: newRecipe.title,
            publisher: newRecipe.publisher,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        }
        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)
        state.recipe = createRecipeObject(data)
        addBookmark(state.recipe)
    } catch (error) {
        throw error
    }
    console.log(newRecipe)



}

const init = function () {
    const bookmarks = localStorage.getItem('bookmarks')
    if (bookmarks) {
        state.bookmarks = JSON.parse(bookmarks)
    }
}

init()
