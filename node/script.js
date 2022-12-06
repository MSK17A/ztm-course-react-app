const a = 4;
const b = 5;

function fun(){
    console.log(a+b)
}
setTimeout(fun, 5000);

setTimeout(()=>{console.log(a+b)}, 5000);