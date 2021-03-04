/* eslint-disable no-unused-vars */
const tools = require('./tools.js');

// return functionName();

// Examples
function removeExample() {
    const items = ['one', 'two', 'three', 1, 2, 3];

    tools.remove(['two', 2], items);

    console.log(items);
}

function randomExample() {
    const randomInt = tools.random(10);

    const items = ['one', 'two', 'three'];
    const randomItem = tools.random(items);

    console.log(randomInt);
    console.log(randomItem);
}

async function delayExample() {
    console.log('some text');

    await tools.delay(5000);

    console.log('some other text after 5 secs');
}