import axios from 'axios';


//gets the info about the recipe based on the recipe id
export default class Recipe {
    constructor (id){
        this.id=id;
    }

    async getrecipe(){
        try{
          const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }
        catch(error){
            alert('Something went wrong. :(')
        }

    }

  

    
    calctime(){

        //assumig for every 3 ingredients 30 mins are taken
        const num =Math.ceil((this.ingredients.length/3));
         this.time = num*30;
       
    }
    calcservings(){
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'pound'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'lb', 'lb'];
        const units = [...unitsShort,'kg','g']
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            
            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            
            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
            
            let objIng;
            if(unitIndex > -1) {
                //There is a unit (eg: 2 tbsp)
                    //eg 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") = 4.5
                    //eg 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex); //arrays everything until the unit
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                };
                
                objIng = {
                    count, //no need to specify "count = count" as we already have a variable with that name
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
                
            } else if (parseInt(arrIng[0], 10)) { //if the 1st element of the array can be converted to a number
                //there is NO unit, but the 1st element is a number (eg: 1 packet yeast)
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                //There is NO unit and NO number (eg: salt)
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            
            return objIng; //need to return something in the map method
        });
        this.ingredients = newIngredients;
    }

    updateServings(type){
       
        //Servings
        const newServings = type ==='dec'?this.servings-1:this.servings+1;
        

        // updating the new ingredients
        this.ingredients.forEach(el =>{
            el.count*=(newServings/this.servings);   // THE INGREDIENT COUNT CHANGES W.R.T TO SERVING/PEOPLE
        })
        this.servings = newServings;   


    }
    
}