


// ARROW FUNCTION 




/*

let getAge =a => a*a;
name='himanshu';

function calculate(){
    name='sid';
   alert(this.name + 'can you are ')
}
calculate();





//////////////////////

//   DESTRUCTURING

let [a,b,c] = [12,'hello',16.78]

console.log(`${a} ${b} ${c}`);



// Using objects

let john={
    firstname:'john',
    lastname:'sweet'
};

let {firstname:a,lastname:b} = john;

console.log(`${a} ${b}`);



//////////////////

//NEW METHODS IN  ARRAY


boxes = document.querySelectorAll('.box');

Array.from(boxes).forEach(x => x.style.backgroundColor='dodgerblue');


for(cur of boxes){
    if(cur.className.includes('blue')){
        continue;
    }
    cur.textContent = 'damm nigga';
};




x=[12,13,19,7,17]

console.log(x.findIndex(cur => cur>=18));




x=[3,4,5,6]
y=[7,6,5,4]
let add =(s,...a)=> console.log(`${s} ${a}`);


add('kellhayden',...x);



///////////////////////

DEFAULT PARAMETERS

function PERSON(fname,lname='barak',age='18'){
    this.fname=fname,
    this.lname=lname,
    this.age=age

}

let JOHN=new PERSON('HIMANSHU');

*/

// MAP

let ques = new Map();

ques.set('question','Is javascript a exciting language');
ques.set(1,'yes');
ques.set(2,'no');
ques.set(3,'maybe');
ques.set(4,'fuck off');
ques.set('correct',3);
ques.set(true,'the answer is correct');
ques.set(false,'the answer is wrong');

// console.log(ques.get('question'));
/*
for(let [el,value] of ques.entries()){
      console.log(` ${el} ===> ${value}`);
}

ques.delete(4)
if(ques.has(4)){
    console.log(ques.get(4));

}
else
   console.log('close')



for(let [el,value] of ques.entries()){
    if(typeof(el)==='number')
    console.log(` ${el} ===> ${value}`);
}

ans=parseInt(prompt('answer here'));

console.log(ques.get(ans===ques.get('correct')))


////////////////

//   CLASSES


class People{
   
    constructor(name,year,times){
        this.name = name;
        this.year = year;
        this.times = times;
        this.x=30; 
    }
    
    calculateage(){
        console.log(2020-this.year);
    }
   
    getx(){
        return this.x;
    }    
    
}

John =new People('JOHN',20,4);
console.log(John.name);

class athlete extends People{   //inheritance bitch
    constructor(name,year,times,medals){
        super(name,year,times);
        this.medals=medals;
    }

    calmedal(){
        this.medal++;
        console.log(this.medals)
    }
}

const sid=new athlete('sidarth',1984,4,11);
sid.calculateage();
sid.calmedal();



  CODING CHALLENGE
*/

class element{
    constructor(name,buildyear){
        this.name = name;
        this.buildyear = buildyear;
    }
}


class Park extends element{
    constructor(name,buildyear,trees,area)
    {
      super(name,buildyear);
      this.trees = trees;
      this.area  = area;
    }

    treedensity(){
        let density =this.trees/this.area;
        console.log(`The ${this.name} has a  tree density of ${density} per square km`)
    }
    calculateage(){
        return this.age=2020-this.buildyear;
    }
}

let park1 =new Park('Shilton Park',1995,2000,1000);
let park2 =new Park('Gir Park',2004,800,1000);
let park3 =new Park('National Park',2000,1000,1000);

parks=[park1,park2,park3]

parks.forEach(el=> el.treedensity());

function averageage(){
    let agesum=0;
    parks.forEach(ele => {
          agesum+=ele.calculateage()
    });
    avg=agesum/3;
    console.log(`The avarage age of our parks is ${avg} years`);
}
function parkreport(){
    parks.forEach(el=>{
        if(el.trees>1000)
        {
            console.log(`${el.name} has ${el.trees} trees.`);
        }
    })
}
averageage();
parkreport();