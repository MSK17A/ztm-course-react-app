const fs = require("fs");

/* Just a side note.
Function readFile will give params to the callback function which in this case 'printBuffer'. and then
you just do what you want to do with these params inside the function */

function printBuffer(err, buf) {
    console.log("String 1: " + buf.toString("utf8")); // utf8 is a type of encoding that is a standard on the web.
}
fs.readFile('file.txt', printBuffer);

const file = fs.readFileSync("./file.txt");
console.log("String 2: " + file.toString());

/* Now what happend above? when I run the code above, "string 1" comes after "string 2", this is because 'readFIle'
is and asyncronous function (that is why it has a callback function) which will not be invoked immediatly when you call it.
It will wait until it finishes reading the file and while it is waiting, you go and keep running the code below,
and then it will give data (error, buffer), these data will be passed to a callback function later, think of the
asynchronous function as a function that runs in the background.

That is why you see "String 2" printed before "String 1". */
