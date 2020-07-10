// Global app controller

import Search from './models/Search'
import * as SV from './views/searchView';
import List from './models/list';
import Likes from './models/likes';
import * as RV from './views/recipeView';
import * as LV from './views/listView';
import * as likesView from './views/likesview';
import {elements , renderloader,clearloader} from './views/base'
import Recipe from './models/recipe';
// Lets get cracking

// State variable for the state of our app

const state={};

window.state=state;

async function controlSearch(){
    
    // 1. get the query   
    const query = SV.getinput();

    if(query){
      
      try{
     //2. create the search state variable
     state.search = new Search(query);
     
     // Prepare the UI for getting the result
      renderloader(elements.searchresult)
      SV.clearfield();
      SV.clearresult();
     
     // Getting the result
     await state.search.getresults();
    
    //Displaying the results in the UI 
      clearloader();
      SV.renderresult(state.search.result);
      }
      catch(error){
        alert("Searched recipe not found");
      }
    }
}

elements.searchform.addEventListener('submit',e =>{
    e.preventDefault();
    controlSearch();
});



// for the page changing buttons 
elements.resultpages.addEventListener('click',e=>{
  
  const btn = e.target.closest('.btn-inline');   //  .closest() just refers the DOM to the closest class mentioned in its parameteres
  if(btn){
    SV.clearresult();

    const gotopage = parseInt(btn.dataset.goto,10)       //dataset.goto  was created in the html code by data-goto 
    SV.renderresult(state.search.result,gotopage);
  }
  
})


// for displaying the shoping list
const controllist = () =>{

  // Create a list if no list is present 
  if(!state.list) state.list = new List();
  
  // Add each ingredients to the list
    state.recipe.ingredients.forEach(el =>{
      const item = state.list.addItems(el.count ,el.unit,el.ingredient);    //storing the elements 
      LV.displayitem(item);
    }) 
     
}
//handling event of the shopping list
elements.shopping.addEventListener('click', event=>{
      const id = event.target.closest('.shopping__item').dataset.itemid;

      if(event.target.matches('.shopping__delete, .shopping__delete *')){
        //deleteing the item from the display
         LV.deleteitem(id);

        // deleting the item from the storage
         state.list.deleteItems(id);
      }else if(event.target.matches('.shopping__count-value')){
         const val = parseFloat(event.target.value,10);
         state.list.updateCount(id,val);
      }


});

const controlLike =() =>{

    //create a like object if it is not already there
     if(!state.likes){
        state.likes = new Likes();
     }
      const currentid = state.recipe.id;
     //Check if the recipe is likes or not
     if(!state.likes.isLiked(currentid)){
         // if not than add it in the likes array
        const newLike = state.likes.addLike(currentid,state.recipe.title,state.recipe.author,state.recipe.img);

        //Toggle the like button
          likesView.togglelike(true);

        //Add Like to the UI list
        likesView.renderlikes(newLike);
       
     }else{
       //if yes than remove it from the likes array
       state.likes.deleteLike(currentid);

       //Toggle the like button
       likesView.togglelike(false);

       //Remove UI from the list
       
        likesView.deletelikes(currentid);

     }
     likesView.togglemenu(state.likes.getNumlikes());
};

// Restore liked recipe when the page is reloaded

window.addEventListener('load',()=>{
   
  state.likes = new Likes();

  state.likes.readStorage();

  //Restore likes
  likesView.togglemenu(state.likes.getNumlikes());


  state.likes.likes.forEach(like => likesView.renderlikes(like));
})

// Testing 
state.likes = new Likes();
likesView.togglemenu(state.likes.getNumlikes());


async function controlrecipe(){

    //get the ID
        //without using replace we will get #23456
        //but with it we can get 23456
        //we AREEXTRACTING TEH HASH FROM THE URL AND THAN REPLACING IT
    const ID = window.location.hash.replace('#','');   
   
    
    if(ID)
    {

      //highlight the selector
       SV.highlightSelected(ID)
       
      //Prepare the UI
        renderloader(elements.recipe);
     try{
      //create the recipe object
      state.recipe = new Recipe(ID);
     
      //call the recipe and parse ingredients
      await state.recipe.getrecipe();

      state.recipe.parseIngredients();

      //calculate ingredients and servings
      state.recipe.calctime();
      state.recipe.calcservings();
      
      //display the recipe
        clearloader();
        RV.clearRecipe();
        RV.renderRecipe(state.recipe,state.likes.isLiked(ID));
     }
     catch(error){
       console.log(error)
       alert('could not load the specific recipe');
     }

    } 
    
    
}



window.addEventListener('hashchange',controlrecipe);
window.addEventListener('load',controlrecipe);    //whenever the page is loaded the load event is called

//['hashchange','load'].forEach(event =>window.addEventListener(event,controlrecipe));


//window.addEventListener('load',controlSearch);

//Handling all the events inside the recipe

window.addEventListener('click',e =>{
    if(e.target.matches('.btn-decrease ,.btn-decrease *'))  // the asterisk helps to match with the child elements of the class provided
     {
           // Decrese button is clicked
           if(state.recipe.servings >1)
           state.recipe.updateServings('dec');
           RV.updateServingsIngredients(state.recipe);
     }
     if(e.target.matches('.btn-increase ,.btn-increase *')){   
       // Increase button is pressed
       state.recipe.updateServings('inc');
       RV.updateServingsIngredients(state.recipe);
     }else if(e.target.matches('.recipe__btn--add,.recipe__btn--add *')){   //we need to handle this here coz its inside the recipe element 
        controllist();
     }else if(e.target.matches('.recipe__love ,.recipe__love *')){
         controlLike();  
     }
     
  });