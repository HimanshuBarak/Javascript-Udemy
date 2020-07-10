import {elements} from './base';



//to display a item in the shopping list
export const displayitem = item =>{
     const markup =`
       
     <li class="shopping__item"data-itemid=${item.id}>
     <div class="shopping__count">
         <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
         <p>${item.unit}</p>
     </div>
     <p class="shopping__description">${item.ingredient}</p>
     <button class="shopping__delete btn-tiny">
         <svg>
             <use href="img/icons.svg#icon-circle-with-cross"></use>
         </svg>
     </button>
 </li>
           
     
     
     
     `; 

   elements.shoppinglist.insertAdjacentHTML("beforeend",markup);

};


//to delete item from the shopping list

export const deleteitem = id =>{
      
     const item = document.querySelector(`[data-itemid="${id}"]`);       // [] css selector
     if(item) 
     item.parentElement.removeChild(item);

};