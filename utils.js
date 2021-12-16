function tag1_equals_tag2(tag1,tag2){
  return (tag1.type.toLowerCase()==tag2.type.toLowerCase() && tag1.name.toLowerCase()==tag2.name.toLowerCase());
}
////////////////////////////////////////////////////////////////////////////////////
function remove_duplicates_in_array_of_tags(arr){
  //make an id by concat tag's name+type, then use set properties
  let seen=new Set();
  let newArr=arr.filter(tag=>{
    const duplicate =seen.has(tag.name+tag.type);
    seen.add(tag.name+tag.type);
    return !duplicate;
  })
  return newArr;
}
////////////////////////////////////////////////////////////////////////////////////
function array1_not_in_array2(arr1,arr2){
  result=arr1.filter(el1=>{
    if(!arr2.some(el2=>tag1_equals_tag2(el2,el1))){
      return el1;
    }
  })
  return result;
}
////////////////////////////////////////////////////////////////////////////////////
function string_in_arrayOfTags(type,str,arr){
  result=arr.filter(el=>el.name.toLowerCase().includes(str.toLowerCase())&&el.type==type)
  return result;
}
////////////////////////////////////////////////////////////////////////////////////
function is_string_in_recipe(str,recipe){
  result=false;
  if(recipe.name.toLowerCase().includes(str.toLowerCase())){
    result=true;
  }else if(recipe.description.toLowerCase().includes(str.toLowerCase())){
    result=true;
  }else{
    for (const item of recipe.ingredients){
      if(item.ingredient.toLowerCase().includes(str.toLowerCase())){
        result=true;
      }
    }
  }
  return result;
}
////////////////////////////////////////////////////////////////////////////////////
function recipe_has_tag(recipe,tag){
  let result=false;
  switch(tag.type){
    case 'ingredients':
      for(const item of recipe.ingredients){
        if(item.ingredient.toLowerCase()==tag.name.toLowerCase()){
          result=true;
        }
      }
      break ;
    case 'appliance':
      if(recipe.appliance.toLowerCase()==tag.name.toLowerCase()){
        result=true;
      }
      break;
    case 'ustensils':
      for(const ustensil of recipe.ustensils){
        if(ustensil.toLowerCase()==tag.name.toLowerCase()){
          result=true;
        }
      }
      break;
  }
  return result;
}
