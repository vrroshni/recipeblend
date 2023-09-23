import { async } from 'regenerator-runtime'
import { API_URL } from './config'
import { getJson } from './helpers'


export const state = {
    recipe: {},
    search: {
        query: '',
        results: []
    }
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
        console.log(state.search.results)
    } catch (error) {
        throw error
    }


}

