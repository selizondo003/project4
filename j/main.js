(async function () {
    "use strict";

    let poet_list = document.querySelector(".poets");
    //let poem_list = document.querySelector(".poems");

    //create new indexDB database
    var db = new Dexie("PoetryDatabase");

    //define the database schema(structure), which includes tables and their key indiecs
    db.version(1).stores({
        poet: `++, &authorPoet`,
        //poems: `++, &titleName`
    });


    //go get author data from poets
    const poet_data = await fetch('https://poetrydb.org/authors');
    const poet = await poet_data.json();
    const poet_array = poet.authors;

    /*this will come at a later phase
    //go get poem data
    const poem_data = await fetch('https://poetrydb.org/title');
    const poem = await poem_data.json();
    const poem_array = poem.titles;
    */

    // populate the tables
    db.poet.bulkPut(poet_array);
    //db.poems.bulkPut(poem_array);

    // make a queries of the database
    const folks = await db.poet.toArray();
    //const composition = await db.poems.toArray();

    //creating dropdown of the different authors
    folks.forEach((author) => {
        const option = document.createElement("OPTION");
        option.textContent = author;
        option.value = author;
        poet_list.append(option);
    });

    /* 
    composition.forEach((title) => {
      const li = document.createElement("LI");
      li.textContent = title;
      poem_list.append(li);
    });
    */


    //listening for changes on list 
    //getting last name of the poet
    poet_list.addEventListener("change", async (e) => {
        const author = e.target.value;
        const myArray = author.split(" ");
        const lastName = myArray.pop();

        console.log(lastName);

        //getting 1st poem from API
        const poeminfo = await fetch(`https://poetrydb.org/author,poemcount/${lastName};1`);
        const currentPoem = await poeminfo.json();
        const poemText = currentPoem[0].lines.join("\n");
        const titleText = currentPoem[0].title;

        //make sure display is empty 
        let poem = document.getElementById("poem");
        poem.innerHTML = '';
        let title = document.getElementById("title");
        title.innerHTML = '';

        //render title of poem
        title.innerHTML += `<p> </p>`;
        title.append(titleText);

        //render the poem 
        poem.innerHTML += `<p>  </p>`;
        poem.append(poemText);
        console.log(poemText);




    });

}()); // end IIFE



//pulling in a random inspirational quote 
const inspirationalQuote = () => {
    fetch("https://api.quotable.io/random")
        .then(response => {
            return response.json();
        })
        .then(response => {
            document.getElementById("quote").innerHTML = response.content;
            document.getElementById("author").innerHTML = "- " + response.author;
        })
        .catch(function (err) {
            console.log("Error", err);
        });
};
inspirationalQuote();


//pulling in a random dog image or video
const randomImg = () => {
    fetch("https://random.dog/woof.json")
        .then(data => {
            return data.json();
        })
        .then(data => {
            const imgElement = document.getElementById("imgElement");
            imgElement.src = data.url;
        })
        .catch(function (err) {
            console.log("Error", err);
        });
};
randomImg();