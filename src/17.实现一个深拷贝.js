var name = "World!";
(function () {
  if (typeof name === "undefined") {
    console.log(name);
    var name = "Jack";
    console.log("Goodbye " + name);
  } else {
    console.log("Hello " + name);
  }
})();

var name = "World!";
(function () {
  var name = undefined;
  if (typeof name === "undefined") {
    name = "Jack";
    console.log("Goodbye " + name);
  } else {
    console.log("Hello " + name);
  }
})();
