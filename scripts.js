const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const quoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQoutes = [];

// local storage global
let quote = {};
let favoriteQuote = [];


// loader function
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function loaderComplete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// show new quote function
function newQuote() {
    loading();
    
    // pick random qoute from api
    const quote = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
    
    if(!quote.author){
        authorText.textContent = "Unknown";
    }
    else{
        authorText.textContent = quote.author;
    }
    
    // check char length to determine styling
    if(quote.text.length > 75){
        quoteText.classList.add('long-quote-text');
    }
    else{
        quoteText.classList.remove('long-quote-text');
    }
    
    // set quote, hide loader
    quoteText.textContent = quote.text;
    
    loaderComplete();
    
}


//  get quotes from api
async function getQuotes(){
    loading();
    const url = "https://type.fit/api/quotes";

    try{
        const res = await fetch(url);
        apiQoutes = await res.json();
       newQuote();
    }
     catch(error){
        // catch error here
        console.log(error)

    }
}



// tweet qoute
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, '_blank');
}


// event listners
twitterBtn.addEventListener('click', tweetQuote);
quoteBtn.addEventListener('click', newQuote);



// on load get api
getQuotes();