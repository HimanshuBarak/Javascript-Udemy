
import {elements} from './base';
import {limittitle} from './searchView';


// a function to check if the recipe is liked or not and displaying the like buttton respectively
export const togglelike = isLiked =>{

    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    // chaaning the attribute href
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`); 
};


//the like menu
export const togglemenu = numlikes =>{
    elements.likesMenu.style.visibility = numlikes >0 ?'visible':'hidden';
}


//to display the recipes in the like menu
export const renderlikes = likes=>{
    const markup = `
    <li>
    <a class="likes__link" href="${likes.id}">
        <figure class="likes__fig">
            <img src="${likes.img}" alt="${likes.title}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${limittitle(likes.title)}</h4>
            <p class="likes__author">${likes.author}</p>
        </div>
    </a>
</li>
    `

    elements.likeslist.insertAdjacentHTML('beforeend',markup);
};

// deleting likes form the likes menu
export const deletelikes = id =>{

    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
}