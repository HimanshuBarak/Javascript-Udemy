import uniqid from 'uniqid'

// To add items to a shopping list
export default class List {

    constructor(){
        this.items = [];                 // the array in which we will be storing the items/ingredients of our shopping list.
    }
 

    // for adding a ingredient in the shopping list
    addItems(count,unit,ingredient){
         const item ={
             id:uniqid(),               //this provides us with a unique id
             count,
             unit,
             ingredient
         }
         this.items.push(item);
         return item;
    }
    // for deleting a item from our shopping list
    deleteItems(id){
        const index = this.items.findIndex(el =>el.id===id)    // findIndex returns the index which satisfies the condition
        /* diff btw slice() and slice ,
         eg [2,3,4] =>
         splice(1,1) : deletes one item starting from index 1 ;
          spice(1,1) => return nothin strats on 1 and end on it (as end index is not included in spice 
         */ 
        this.items.splice(index,1);
    }
    updateCount(id,newCount){
        this.items.find(el => el.id ===id).count ===newCount;   //find returns the element instead of the Id which satisfies teh condition

    }
}