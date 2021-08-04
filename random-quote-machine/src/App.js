import './App.css';
import {useState, useEffect} from 'react';


function App() {
    const [quotes , setQuotes] = useState([]); // state to handle the quotes
    const APIURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

    //API CALL
    useEffect(() => {
        fetch(APIURL)
        .then(res=> {
            return res.json();
        })
        .then(data=>{
            setQuotes(data.quotes);
            getRandomQuotes()
           
        })

    },[quotes.length]);

    // Get random quotes from the api
    const getRandomQuotes = ()=>{
    if (quotes.length!==0){
        const randomIndex = Math.floor(Math.random()*quotes.length);
        return quotes[randomIndex];
    }
    }
 


    return (
    <div id="wrapper">
        <div id="quote-box">
        { quotes.length !==0 &&
            <div className="quote-text" style={{opacity: '1'}}>
               <i className="fa fa-quote-left"> </i><span id="text">{getRandomQuotes().quote}</span>
            </div>}
           {quotes.length !==0 && <div className="quote-author" style={{opacity: '1'}}>- <span id="author">{getRandomQuotes().author}</span></div>}
            <div className="buttons">
                <a className="button" id="tweet-quote" title="Tweet this quote!" target="_top" href="https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=%22I%E2%80%99ve%20learned%20that%20people%20will%20forget%20what%20you%20said%2C%20people%20will%20forget%20what%20you%20did%2C%20but%20people%20will%20never%20forget%20how%20you%20made%20them%20feel.%22%20Maya%20Angelou" style={{backgroundColor: "rgb(9, 242, 250)"}}>
                    <i className="fa fa-twitter"></i><span>Tweet</span>
                </a>
                <button className="button" id="new-quote" style={{backgroundColor: "rgb(9, 242, 250)"}}>New quote</button>
            </div>
        </div>
     
    </div>
        
            
        );
   
    }

    export default App;