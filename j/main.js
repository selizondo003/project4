//pulling in a random inspirational quote 
const inspirationalQuote = ()  => {
    fetch("https://api.quotable.io/random")
        .then(response => {
            return response.json();
        })
        .then(response => {
            document.getElementById("quote").innerHTML = response.content; 
            document.getElementById("author").innerHTML = "- " + response.author;
        })
      .catch(function(err) {
            console.log("Error", err);
        });
    }
    inspirationalQuote();


//pulling in a random dog image or video
const randomImg =() =>{
    fetch("https://random.dog/woof.json")
        .then(data => {
            return data.json();
        })
        .then(data => {
            const imgElement = document.getElementById("imgElement")
            imgElement.src=data.url;
        })
        .catch(function(err) {
            console.log("Error", err);
        });
};
randomImg();
