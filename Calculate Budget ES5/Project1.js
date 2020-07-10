// the entire code is divided into 3 modules which makes our code more readable as well as managable






var budgetcontroller=(function(){   // module 1 concerns with calaculation of budget storing the input

      var Expense =function(id,description,value){            //object to store an expense entity
          this.id=id,
          this.description=description,
          this.value=value;
          this.percentage=-1;
      };
      var Income =function(id,description,value){           //object to store an income entity
        this.id=id,
        this.description=description,
        this.value=value;
        
    };
      //calculating the expense percentage 
    Expense.prototype.calpercentage=function(totalinc){
          
        if(totalinc>0)
        {
          this.percentage = Math.round((this.value/totalinc)*100);
         
        }
        else{
            this.percentage=-1;
           
        }
       
    }
    Expense.prototype.getpercentage = function(){
        
         return this.percentage;
    }
    var calculatetotal = function(type){     
         var sum=0;
           
           data.allItems[type].forEach(function(curr){
                sum+=curr.value;
           });
           data.allTotal[type]=sum;
    }

    var data={                                 //our data structure to store all the data
        allItems:{
            inc:[],
            exp:[],
        },
        allTotal:{
            inc:0,
            exp:0
        },
        budget:0,
        percentage:-1
    }

    return{
        addItem:function(type,desc,val){          //this function adds data in our data structure
          var ID ,newItem;
            if(data.allItems[type].length!==0)     //only if array is noempty than assign the id + 1 of the last element s id
              {                                     // assume id r liker [1,2,3,4,5] after deletion of some records [1,3,5] than new ID = 5+1
                ID=data.allItems[type][data.allItems[type].length-1].id+1;
              }
            else                                   //notice how helpful it was to have arrray names same as type
              ID = 0;                           

            if(type==='inc')             // if + make a new object of income type
             {
              newItem = new Income(ID,desc,val);
             } 
             else if(type==='exp')      // if - make a new object of expense type
             {
              newItem = new Expense(ID,desc,val);
             }
            data.allItems[type].push(newItem);     // add the new object to the respective array

            return newItem
        },
        calculatebudget:function(){
              //calculate the total expenses and income
           calculatetotal('exp');
           calculatetotal('inc');

          // calculate the budget
           data.budget = data.allTotal['inc'] - data.allTotal['exp'];
         
          // calculate the income
           if(data.allTotal.inc>0)
            {
              data.percentage = Math.round((data.allTotal.exp/data.allTotal.inc)*100);
              
            } 
            else
              data.percentage=-1 
        },

        getbudget : function(){
            return{
                budget:data.budget,
                totalinc:data.allTotal.inc,
                totalexp:data.allTotal.exp,
                percentage:data.percentage
            }     

        },
        getData : function()
        {
            return data;
        },
        // function to delete item from data structure
        deleteItem : function(type,ID){
            
            // as we can delete any item in bw the id s are not preesent uniformly e.g=[1,3,4,6] thus we first need to find the index of the id
             ids=data.allItems[type].map(function(current){
                 return current.id;
             })
             index = ids.indexOf(ID);
             if(index !== -1){
                 data.allItems[type].splice(index,1);  //delete one item starting from index
             }
        },
          // to calaculate the percentage
        calculatepercentage: function(){
            
                 data.allItems.exp.forEach(function(cur){
                     cur.calpercentage(data.allTotal.inc);
                 });
              
        },
        getpercent : function(){
           
             var allperc =data.allItems.exp.map(function(curr){
                 return curr.getpercentage();
                  
             });
             
             return allperc;
             
        }
    }
})();








var uicontroller=(function(){           // MODULE 2 it basically has everythin to do with the UI: taking the input in and displaying it etc    

     var DOMstrings={                  // crating an object to store all the DOM css classes strings so in futuer UX can be updated easily
         dtype:'.add__type',
         ddesc:'.add__description',
         dvalue:'.add__value',
         dinput_btn:'.add__btn',
         income_class:'.income__list',
         expense_class:'.expenses__list',
         budgetlabel:'.budget__value',
         totalinc:'.budget__income--value',
         totalexp:'.budget__expenses--value',
         percent:'.budget__expenses--percentage',
         container_class:'.container',
         item_percent:'.item__percentage',
         datelabel:'.budget__title--month'
     };

     var formatnumber = function(num,type){

         var type , int ,dec,numsplit;

         num = Math.abs(num);
         num = num.toFixed(2); // fixed two decimal points

         numsplit = num.split('.');

         int = numsplit[0];
         //adding comma after 1000 =1,000
         if(int.length>3){
             int  = int.substr(0,int.length -3) + ',' + int.substr(int.length-3,3);
         }
         dec = numsplit[1];

         return (type === 'exp' ? '-' : '+') + ' ' + int +'.'+dec;

     }

    return {
        getinput : function()      // a function to get the input from the user
        {
             var inputdata={                  //creating an object to store all input values in one place and returning it so it can be used by controller module
                 type:document.querySelector(DOMstrings.dtype).value,      //is of only two types inc,exp
                 description:document.querySelector(DOMstrings.ddesc).value,
                 value:parseFloat(document.querySelector(DOMstrings.dvalue).value),
             }
             return inputdata;
        
        },
        getDOM : function(){
            return DOMstrings;
      }, 

      displayItem : function(obj,type){           //so this function basically display a new record on the screen
            
         var html,newhtml,element;
              if(type==='inc')  // we convert the html that we want to add into a string and add placeholders in it so we replace the parts easily
              {  
                  element=DOMstrings.income_class;
                  html='<div class="item clearfix" id="inc-*ID*"><div class="item__description">*DESCRIPTION*</div><div class="right clearfix"><div class="item__value">*VALUE*</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
              }  
              else if(type==='exp')   
              {   
                  element=DOMstrings.expense_class;
                  html='<div class="item clearfix" id="exp-*ID*"><div class="item__description">*DESCRIPTION*</div><div class="right clearfix"><div class="item__value">*VALUE*</div><div class="item__percentage">21</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
              }  

              newhtml = html.replace('*ID*',obj.id);
              newhtml = newhtml.replace('*DESCRIPTION*',obj.description);  //see the newhtml string contains the updated id so we makes changes to it if do it html we will also our updated id
              newhtml = newhtml.replace('*VALUE*',formatnumber(obj.value,type));
             
             document.querySelector(element).insertAdjacentHTML("beforeend",newhtml); // beforeend will basically add teh new item before at the end of the class
      },
      deleteItem:function(selectorId)
      {
          el = document.getElementById(selectorId);
          el.parentNode.removeChild(el);
      },
      
      clearfields : function()
      {   var fields,farr;
          fields=document.querySelectorAll(DOMstrings.ddesc+', '+DOMstrings.dvalue);  //returns a list
          farr =Array.prototype.slice.call(fields);              //converting the list to an array which are easier to work with

          farr.forEach(function(current,index,array) {
              current.value="";
              
              
          });
          farr[0].focus();
      },
      displaybudget : function(obj){
          var type;
          obj.budget>0?type='inc':type='exp';
          document.querySelector(DOMstrings.budgetlabel).textContent =formatnumber(obj.budget,type);
          document.querySelector(DOMstrings.totalinc).textContent =formatnumber(obj.totalinc,'inc');
          document.querySelector(DOMstrings.totalexp).textContent =formatnumber(obj.totalexp,'exp');

          if(obj.percentage>0)
          {
            document.querySelector(DOMstrings.percent).textContent =obj.percentage+'%';
          }
          else
          document.querySelector(DOMstrings.percent).textContent ='--'; 
        },
        displaypercent:function(percentages){

            var fields = document.querySelectorAll(DOMstrings.item_percent);

            var NodeList = function(list,callback)
            {
                for(var i=0;list.length;i++){
                    callback(list[i],i);
                }
            }

            NodeList(fields,function(current,index){
                 if(percentages[index]>0)
                 {
                 current.textContent = percentages[index]+'%';
                 }
                 else
                 {
                  current.textContent = '--';  //something is causing an unwanted error
                 }
            });


        },
        displaymonth : function(){
            var now , months , month , year;

            now = new Date();  // gets date of today

            months=["January" , "February" , "March" , "April", "May","June", "July", "August", "September", "October", "November", "December" ]
            
            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMstrings.datelabel).textContent = months[month] + ' '+ year;
        }

    }
})();





var controller=(function(bctrl,uctrl){  // forms the connection between the other 2 modules
    
    var seteventlisteners=function(){    //function for all the event listeners
        var DOM =uctrl.getDOM();          // to access to the css classes 
        document.querySelector(DOM.dinput_btn).addEventListener('click',ctrladdItem);  // calls "ctrladdItem " when tick is clicked
       
        document.addEventListener('keypress',function(event){        // calls "ctrladdItem " when enter is pressed
            if(event.keycode===13 || event.which===13)              
                ctrladdItem();
        });
        document.querySelector(DOM.container_class).addEventListener('click',ctrlDeleteItem);
    
    }
    
    var updatepercentage =function(){
         
          // calculate the percentage
         bctrl.calculatepercentage();

          //get percentages from the budgetcontroller
          var percent=bctrl.getpercent();
          

          // display it in UI
          uctrl.displaypercent(percent);
    }

    
    
     var updatebudget=function(){
         //calculate the budget
           bctrl.calculatebudget();

          //return the budget
          var budget=bctrl.getbudget() 

        //display the budget in the UI
          uctrl.displaybudget(budget);
     };
     
    var ctrladdItem=function ()
    {            // a function which is called when enter or tick is pressed
         // 1.Taking input  
       var input =uctrl.getinput();      // object to access the input data
    
       //Checking if the user has added something or not
    if(input.description !=='' && !isNaN(input.value) && input.value>0)
      {
      //2. Storing the data into our datastructure
      var newItem= bctrl.addItem(input.type,input.description,input.value)
     

      // 3. displaying the item addded in the UI
      uctrl.displayItem(newItem,input.type);
      
      // 4. Clearing the fields
      uctrl.clearfields(); 

      //returns our data structure
      bctrl.getData();

      //5. Updating the budget
      updatebudget();
      }

      //6. Updating the percentage
        updatepercentage();
   
    }
    var ctrlDeleteItem = function(event) {
        
        var itemID, splitID, type, ID;
 
       
        itemID=event.target.parentNode.parentNode.parentNode.parentNode.id;
        splitID= itemID.split('-');
        type = splitID[0];
        ID = parseInt(splitID[1]);
       

        //delete from the data structure
          bctrl.deleteItem(type,ID);

        //delete from the UI
         uctrl.deleteItem(itemID);

        // Update the budget
        updatebudget();

        //Update the percentage
        updatepercentage();
    };
 
     return{
          init : function(){
             console.log('Started ');
             uctrl.displaybudget({
                budget:0,
                totalinc:0,
                totalexp:0,
                percentage:0
            }     );
             seteventlisteners();
             uctrl.displaymonth();
         }
    }
    


})(budgetcontroller,uicontroller);


controller.init();