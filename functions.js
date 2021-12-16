function init_list_of_tags(list_of_recipies){
  console.log('dans init_list_of_tags');
  let list_of_tags=[];
  for(const recipe of list_of_recipies){
    for(const item of recipe.ingredients){
      list_of_tags.push(new Tag(item.ingredient.toLowerCase(),'ingredients'));
    }
    list_of_tags.push(new Tag(recipe.appliance.toLowerCase(),'appliance'));
    for(const ustensil of recipe.ustensils){
      list_of_tags.push(new Tag(ustensil.toLowerCase(),'ustensils'));
    }
  }
  list_of_tags=remove_duplicates_in_array_of_tags(list_of_tags);
  return list_of_tags;
}
////////////////////////////////////////////////////////////////////////////////////
function filter_recipies(recipies){
  console.log('dans filter_recipies');
  //build list of displayed tags:
  let list_of_displayed_tags=[];
  let list=document.querySelectorAll(".aTag");
  list.forEach(displayed_tag => {
    let aTag=new Tag(displayed_tag.innerText,displayed_tag.classList[1]);
    list_of_displayed_tags.push(aTag);
  });
  let newList=recipies;
  //filter recipies by displayed tags :
  if(list_of_displayed_tags.length>0){
    newList=recipies.filter(recipe=>{
      return list_of_displayed_tags.some(tag=>recipe_has_tag(recipe,tag));
    });
  }
  //filter par la barre de recherche
  const research=document.getElementById('search_bar').value;
  if (research.length==0){
    display_recipies(newList,recipies);
  return;
  }else{
    newList2=newList.filter(recipe=>is_string_in_recipe(research,recipe));
    display_recipies(newList2,recipies);
  }
}
////////////////////////////////////////////////////////////////////////////////////
function filter_advanced_search_fields(sorted_recipies_list,recipies){
  console.log('dans filter_advanced_search_fields');
  //trier les menus avancés en ne gardant que ce qu'il y a dans la liste de recettes :
  let list_of_advanced_tags=init_list_of_tags(sorted_recipies_list);
  let ingredients=[];
  let appliance=[];
  let ustensils=[];
  for(tag of list_of_advanced_tags){
    switch(tag.type){
      case 'ingredients':
        ingredients.push(tag);
        break
      case 'appliance' :
        appliance.push(tag);
        break
      case 'ustensils' :
        ustensils.push(tag);
        break
    }
  }
  display_clickable_advanced_field('ingredients',ingredients,recipies);
  display_clickable_advanced_field('appliance',appliance,recipies);
  display_clickable_advanced_field('ustensils',ustensils,recipies);
}
////////////////////////////////////////////////////////////////////////////////////
function filter_advanced_search_fields_from_advanced_search_bar(type,list_of_tags,recipies){
  console.log('dans filter(and display)advanced search fields from advanced search bar');
  research=document.getElementById('search_bar_'+type).value.toLowerCase();
  if(research.length==0){
    filter_recipies(recipies);
  }else{
    list_of_the_field=string_in_arrayOfTags(type,research,list_of_tags);
  }
  display_clickable_advanced_field(type,list_of_the_field,recipies)
}
////////////////////////////////////////////////////////////////////////////////////
function display_no_result(){
  console.log('dans display_no_result');
  document.getElementById("recipies_container").innerHTML="Aucune recette ne correspond à votre critère... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.";
  
}
////////////////////////////////////////////////////////////////////////////////////
function display_recipies(sorted_recipies_list,recipies){
  console.log('dans display_recipies');
  const recipiesContainer=document.getElementById("recipies_container");
  recipiesContainer.innerHTML="";
  if(sorted_recipies_list.length==0){
    display_no_result();
  }else{
    let recipeCardHtml="";
    for(const recipe of sorted_recipies_list){ 
      const recipeModel=recipe_factory(recipe,recipeCardHtml,recipies);
      recipeCardHtml=recipeModel.getRecipeCardDOM();
    }
    recipiesContainer.innerHTML=recipeCardHtml;
  }
  filter_advanced_search_fields(sorted_recipies_list,recipies);
  document.querySelectorAll('.a_recipe').forEach(element => {
    element.addEventListener('click',(e)=>open_modal(e,recipies))
  });
}
////////////////////////////////////////////////////////////////////////////////////
function display_clickable_advanced_field(type,list_of_the_field,recipies){
  console.log('dans display_clickable_advanced_field');
  let list_of_displayed_tags=[];
  let list=document.querySelectorAll(".aTag");
  list.forEach(displayed_tag => {
    let aTag=new Tag(displayed_tag.textContent,displayed_tag.classList[1]);
    list_of_displayed_tags.push(aTag);
  });
  document.getElementById(type+'_list').innerHTML="";
  if(list_of_displayed_tags.length>0){
    list_of_the_field=array1_not_in_array2(list_of_the_field,list_of_displayed_tags);
  }
  for(let i=0;i<list_of_the_field.length;i++){
    const tag=list_of_the_field[i];
    const newItem=document.createElement("div");
    newItem.className="tags_in_menu";
    newItem.textContent=capitalizeFirstLetter(tag.name);
    document.getElementById(type+'_list').appendChild(newItem); 
    newItem.addEventListener('click',()=>display_tags(tag,recipies));
  };
}
////////////////////////////////////////////////////////////////////////////////////
function display_tags(newTag,recipies){
  console.log('dans display_tags, j\'ajoute :'+newTag.name);
  let list_of_displayed_tags=[];
  let list=document.querySelectorAll(".aTag");
  list.forEach(displayed_tag => {
    let aTag=new Tag(displayed_tag.textContent,displayed_tag.classList[1]);
    list_of_displayed_tags.push(aTag);
  });
  list_of_displayed_tags.push(newTag);
  list_of_displayed_tags=remove_duplicates_in_array_of_tags(list_of_displayed_tags);
  tagCardHtml='';
  for (let i=0; i<list_of_displayed_tags.length;i++){
    tagCardHtml+=`<span class="aTag ${list_of_displayed_tags[i].type}">${capitalizeFirstLetter(list_of_displayed_tags[i].name)}<i class="fas fa-times close_tag"></i></span>`
  }
  document.getElementById('tags').innerHTML=tagCardHtml;
  document.querySelectorAll('.close_tag').forEach(element => {
    element.addEventListener('click',(e)=>{
      remove_tag(e,recipies);
    })
  });
  filter_recipies(recipies)
}
////////////////////////////////////////////////////////////////////////////////////
function remove_tag(e,recipies){
  e.target.parentNode.remove();
  filter_recipies(recipies)
}
////////////////////////////////////////////////////////////////////////////////////
function erase(e){
  document.getElementById("search_bar_"+e.target.parentNode.id).value="";
}
////////////////////////////////////////////////////////////////////////////////////
function erase_search_bar(recipies){
  document.getElementById("search_bar").value="";
  filter_recipies(recipies)
}
////////////////////////////////////////////////////////////////////////////////////
function open_modal(e,recipies){
  let recipe_id=e.target.closest(".a_recipe").id.split("_")[1];
  document.getElementById('chosen_recipe').classList.remove("hidden");
  if(recipe_id!=0){
    let recipe={};
    for(const element of recipies){
      if (element.id==recipe_id){
        recipe=element;
        break
      }
    }
    let list_of_ingredients=[];
    for(const item of recipe.ingredients){
      list_of_ingredients.push('</br>'+item.ingredient);
    }
    document.querySelector('.recipe_content').innerHTML=`
    <div id="recipe_info">
      <div>Pour ${recipe.servings} personne(s)<br></div>
      <div>Temps de préparation : ${recipe.time} minutes<br></div>
      <div>Ingredients : ${list_of_ingredients}<br></div>
      <div>Appareil : ${recipe.appliance}<br></div>
      <div>Ustensiles : ${recipe.ustensils}<br></div>
    </div>
    <div id="modal_right">
      <div id="modal_name">${recipe.name}</div>
      <div id="modal_description">${recipe.description}</div>
    </div>
    `;
  }
  document.getElementById('close_button').addEventListener("click",()=>{
    document.getElementById('chosen_recipe').classList.add("hidden");
  })
}
////////////////////////////////////////////////////////////////////////////////////
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}