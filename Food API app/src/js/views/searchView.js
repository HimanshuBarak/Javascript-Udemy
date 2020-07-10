
import {elements} from './base';

// getting the input of the user
export const getinput = ()=> elements.searchfield.value;  //getting input from the searchfield

//clearing the searchfield 
export const clearfield =()=>{
    elements.searchfield.value='';

}

//once the result is dispalyed for the next result ot be displayed it needs to be cleared
export const clearresult =()=>{
    elements.resultlist.innerHTML='';
    elements.resultpages.innerHTML='';
}

//function to display  the title in one line 
 export const limittitle=(title,limit=17)=>{           // 17 is the no.. of characters that could fit in one line of our window
        let newtitle = [];
        
        if(title.length > limit)
        {
        title.split(' ').reduce((acc,cur) =>{    //reduce returns a single value for the whole array
            if(acc+cur.length<=limit){
                newtitle.push(cur);
            }
             return acc+ cur.length;
        },0)
       
        return `${newtitle.join(' ')}...`;
       }
    return title;
}

// for displaying a single recipe
function displayrecipe(recipe){             
    let markup =
            `
    
               <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src=${recipe.image_url}>
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limittitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
            `
            elements.resultlist.insertAdjacentHTML('beforeend',markup);
};


// for creating the button also type can be prev or next
const createButton = (page,type)=>
        `<button class="btn-inline results__btn--${type}" data-goto=${type ==='prev'?page-1:page+1}>   
        <span>Page ${type ==='prev'?page-1:page+1}</span>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
              
          </svg>
         
      </button>`                                             // data-goto used in the above page
      
//highlightin the recipe after it is clicked

export const highlightSelected =(id)=>{

     const resArr =  Array.from(document.querySelectorAll('.results__link'));

     resArr.forEach(el=>{
         el.classList.remove('results__link--active');         //removing all the other recipes that are highlighted
     })
       document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

// for crreating the buttons
const renderbuttons = (page,numResults,resPerpage)=>{
       const pages = Math.ceil(numResults/resPerpage);  //calculating the total no. of pages
       let button;
       if(page===1 && pages>1){
           // Add a button next button
            button = createButton(page,'next');
       }else if(page<pages){
           // Add a next and preivous button 
           button =`${button = createButton(page,'prev')}      ${button = createButton(page,'next')};`

       }else if(page===pages && pages >1){
           //Add a prev button
           button = createButton(page,'prev');
       }

      elements.resultpages.insertAdjacentHTML("afterbegin",button);
}

//function to display limited no. of recipe in a page 
export let renderresult = (recipes,page=1,resPerpage=10) =>{
    //rendering the no. of  result in the  current page
    let start = (page-1)*resPerpage ;
    let end  =  page*resPerpage;
    recipes.slice(start,end).forEach(displayrecipe);  //slice helps in extracting a part of the array
   
    //calling the renderbuttons
    renderbuttons(page,recipes.length,resPerpage)
};

