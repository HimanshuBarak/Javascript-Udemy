

// Function Constructors : through this we can intilise objects they are in way blueprints or in OOP terms a class
/*
var Person=function(name,age,job)
{
    this.name=name;
    this.age=age;
    this.job=job;
    
}

Person.prototype.birthday=function(){
    console.log('my birthday comes in 15 september');
};
var him=new Person('himanshu',22,'sofit ultra');
console.log(him.birthday());




/*
//  object.create :a  alternative for function contructor

var personproto={
     calculateage:function()
     {
         console.log(2016-year);
     }
}

var john=Object.create(personproto,{


name:{value:'hiihi'},
year:{value:2001}
});



// var has no block scope bro dont use this shit use let
// CALLBACK FUNCTIONS
arr=[1995,1990,1988,2001];

function calc(arr,fn)
{
    for(var i =0;i<arr.length;i++)
    {
        arr[i] = fn(arr[i]);
    }
    return arr;
}

function calage(el)
{
    return 2020-el;
}

function eligible(el)
{
    return (el>=18);
}
if(6)
{
    let j=90;
}
console.log(calc(arr,calage));
console.log(calc(arr,eligible));
console.log(j);


// function returning a function
function casie(l)
{
   if (l===1)
   {
       return function(name){
           console.log("hello "+name);
       }
   }
   else
     return function(name){
         console.log("fuck off "+name);
     }
}
let x=casie(1)('nutmeg');


//IIFE
(function(good){
  let dice = Math.random()*10;
  if(dice>=5-good)
   console.log('hell yes');
   else
   console.log('shit man');
})(2);



// the power of closures

function questions(job)
{
    return function(name){
        if(job==='developer')
         console.log(name +'tells something about inheritance');
        else if(job==='teacher')
        console.log(name + 'bitch please dont ')
        else
        console.log(name+'heya nigga') 
    }
}

questions('teacher')('simridhi');
questions('developer')('himanshu');



// call , bind and apply

let john={
    name:'himanshu',
    age:19,
    salutation:function(month ,year){
        console.log(this.name + ' has birthday in '+month+' in the year '+year);
    }
}
let steve={
    name:'steve',
    age:19
}

john.salutation.call(steve,'september','2001')
john.salutation.apply(steve,['september','2001'])
john.salutation.bind(steve,'september','2001')

let x=john.salutation.bind(steve)
x('august','2002')

*/

////// coding challenge make a quiz game
(function(){
let Questions=function(ques,answers,c_ans){
    this.ques=ques;
    this.answers=answers;
    this.c_ans=c_ans;
    this.c=0
    this.check=function (choice)
    {
        if(choice===this.c_ans)
        {
         console.log('Correct answer !!');
         this.c=0
        }
        else
         {console.log('Wrong answer :(') ;
        this.c=1}
    }
};

ques1=new Questions('What is the best language to learn ',['Python','Java','Javascript'],2);
ques2=new Questions('What is the worst language to learn ',['C','Java','C++'],0);
ques3=new Questions('What\'s my name ',['Himasnhu','Sheela','Sushant'],1);

q=[ques1,ques2,ques3]

let k=1
let score=0;

function print(obj){
     k=Math.floor(Math.random()*3);
     console.log(obj.ques);
     for(let i=0;i<3;i++)
     {
         console.log(i+'. '+ obj.answers[i]);
     }
     let choice=prompt('Choose the number of your answer type \'exit\' to end' );
     if(choice!='exit')
     { 
        choice=parseInt(choice) 
        obj.check(choice);
        if(obj.c===0)
          score++;
        console.log('Your score is '+score);  
        print(q[k]);
     }
    
}
print(q[k]);
})();
