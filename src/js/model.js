import { async } from 'regenerator-runtime'


export const state = {
    recipe: {}
}


export const loadRecipe = async function (id) {
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
        const data = await res.json()

        if (!res.ok) {
            throw new Error('Something went wrong!');
        }

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
        alert(error)
    }


}