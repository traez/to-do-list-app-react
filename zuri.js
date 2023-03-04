/*
const filteredArr = arr.filter((word) => {
  // Convert the word to an array of words
  const words = word.split(" ");
*/
(function(){

  window.addEventListener("resize", () => {
    if(window.innerWidth <= 800){
      document.querySelector("menu").classList.add("hide");
      document.querySelector("details").classList.remove("hide");
    } else {
      document.querySelector("menu").classList.remove("hide");
      document.querySelector("details").classList.add("hide");
    }
})

})();