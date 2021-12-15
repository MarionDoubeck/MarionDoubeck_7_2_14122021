const search_bar=document.getElementById('search_bar');
const search_bar_ingredients=document.getElementById('search_bar_ingredients');
const search_bar_appliance=document.getElementById('search_bar_appliance');
const search_bar_ustensils=document.getElementById('search_bar_ustensils');
const chevrons=document.querySelectorAll('.fa-chevron-up');
let list_of_tags=init_list_of_tags(recipies);
let list_of_displayed_tags=[];
let ingredients_list=[];
let appliance_list=[];
let ustensils_list=[];
display_recipies(recipies,recipies);
//////////////////////////////////////////////////
search_bar.addEventListener('input',(e)=>{
  let sorted_recipies_list=recipies;
  if(e.target.value.length>=3){
    sorted_recipies_list=filter_recipies(sorted_recipies_list,list_of_displayed_tags);
  }else{
    return
  }
})
//////////////////////////////////////////////////
search_bar_ingredients.addEventListener('input',(e)=>{
  console.log("j'ai tappé dans ingredients "+e.target.value);
  filter_advanced_search_fields_from_advanced_search_bar('ingredients',list_of_tags,recipies);
})
search_bar_appliance.addEventListener('input',()=>{
  filter_advanced_search_fields_from_advanced_search_bar('appliance',list_of_tags,recipies);
})
search_bar_ustensils.addEventListener('input',()=>{
  filter_advanced_search_fields_from_advanced_search_bar('ustensils',list_of_tags,recipies);
})
////////////////////////////////////////////////////
chevrons.forEach(chevron => {
  chevron.addEventListener('click',(e)=>{
    if(e.target.classList=='fas fa-chevron-up closed'){
      e.target.classList.remove('closed');
      e.target.classList.add('opened');
      e.target.parentNode.classList.add('opened');
    }else if(e.target.classList=='fas fa-chevron-up opened'){
      e.target.classList.remove('opened');
      e.target.classList.add('closed');
      e.target.parentNode.classList.remove('opened');
    }else{
      console.log("error in chevrons");
    }
  })
});
////////////////////////////////////////////////////
erasers=document.querySelectorAll(".erase");
erasers.forEach(eraser=>{
  eraser.addEventListener('click',(e)=>erase(e));
})

document.getElementById('erase_search_bar').addEventListener('click',()=>erase_search_bar(recipies));

