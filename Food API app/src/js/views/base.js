
// all the DOM elements are stored here which makes it easy updating in future and shortens our code
export const elements ={
     searchform :document.querySelector('.search'),
     searchfield : document.querySelector('.search__field'),
     resultlist : document.querySelector('.results__list'),
     searchresult : document.querySelector('.results'),
     resultpages : document.querySelector('.results__pages'),
     recipe: document.querySelector('.recipe'),
     shoppinglist : document.querySelector('.shopping__list'),
     shopping : document.querySelector('.shopping__list'),
     likesMenu :document.querySelector('.likes__field'),
     likeslist : document.querySelector('.likes__list')

};

export const elementsStrings ={
        loader:'loader'
}


//to display the loader
export const renderloader = parent =>{
     const loader =`
      <div class="${elementsStrings.loader}">
          <svg>
              <use href="img/icons.svg#icon-cw"></use>          
          </svg>

      </div>
     
     ` 
     parent.insertAdjacentHTML("afterbegin",loader);        
};

//to remove the loader 
export const clearloader =()=>{
    const loader = document.querySelector(`.${elementsStrings.loader}`);
    
    if(loader)
    loader.parentElement.removeChild(loader);
}

