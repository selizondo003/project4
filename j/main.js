//create new indexDB database
var db = new Dexie("QuotesDatabase");

//define the database schema(structure), which includes tables and their key indiecs
db.version(1).stores({
    txtquote: `id, quote`,
    author: `id, author`
});

//populate quotes
await db.txtquote.bulkPut([

])
//populate author
await db.txtquote.bulkPut([

])
await db
.transaction("rw", db.txtquote, db.author, async (tx) => {
    let info =[];

    //query the db and convert results into an easy to use array.
    //get all of the records in the quote table.
    info[0] = await db.txtquote.toArray();

    
}


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
