const api = "https://dummyjson.com/products";

const request = new XMLHttpRequest();
request.open("GET", api);
request.send();

request.addEventListener("load", function () {
  const { products } = JSON.parse(this.responseText);
});