// the models class

import axios from 'axios'; 

export default class Search{
    constructor(query){
        this.query = query;
      }
        async getresults(query){   // returns the recipe
            try{
            let res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = res.data.recipes;
           // console.log(this.result);
            }
            catch (error){
                alert(error);
            }
        };
    
}