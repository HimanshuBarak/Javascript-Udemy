// a likes to handle the feature of the like button

export default class Likes{               
        constructor(){
            this.likes = [];
        }

        addLike(id,title,author,img){
            let like ={id,title,author,img};  // a like object is created with the following details of the recipe id,title,author
            this.likes.push(like);

            this.persistData();
            return like;   //adding the object to the likes array

            
        }

        deleteLike(id){

            // finidng the index  of the recipe to be deleted
            const index = this.likes.findIndex(el =>el.id===id); 
            
            //deleting the recipe
            this.likes.splice(index,1);

            this.persistData();

        }
       isLiked(id){  //checking if the recipe is already liked or not 
            return this.likes.findIndex(el => el.id === id) !==-1;  //returns true if it is already liked
       }

       getNumlikes(){
           return this.likes.length;       // retuns the no. of liked recipes
       }

       persistData(){                  //store data in the browser local storage
           localStorage.setItem('likes',JSON.stringify(this.likes));        //we convert all data into strings
       }

       readStorage(){
            const storage = JSON.parse(localStorage.getItem('likes'));     //converitng all string data into objects

            //Restoring in our local storage
            if(storage) this.likes = storage;
       }

};