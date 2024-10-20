console.log("Hello world!");
const elem = document.getElementById("my-div");
elem.innerHTML = "<h1>Hello DOM</h1>";

const formInput = '<img src="x" onerror="alert(\'your page has been hacked\');">';
elem.innerHTML = formInput;