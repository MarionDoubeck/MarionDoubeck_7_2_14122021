function recipe_factory(recipe,recipeCardHtml){
  const {name,ingredients,time}=recipe;
  function getRecipeCardDOM(){
    recipeCardHtml+=`
    <a href=# onclick='open_modal( "${name}" )' class="a_recipe">
      <div class="recipe_pic"></div>
      <div class="recipe_top">
        <span class="recipe_name">${name}</span>
        <span class="recipe_time"><i class="far fa-clock"></i> ${time} min</span>
      </div>
      <div class="recipe_bottom">
        <div class="recipe_ingredients">
    `
    for(const ingredient of ingredients){
      recipeCardHtml+=`<span class="bold">${ingredient.ingredient}</span>`
      if (ingredient.quantity){
        recipeCardHtml+=`<span class="bold">:</span> ${ingredient.quantity}`
      };
      if (ingredient.unit){
        recipeCardHtml+=`${ingredient.unit}`
      };
      recipeCardHtml+=`<br>`
    }


    recipeCardHtml+=`
          </div>
        <div class="recipe_description">${recipe.description}</div>
      </div>
    </a>
    `
    return recipeCardHtml;
  }
  return {getRecipeCardDOM}
}


