import './App.css';
import {useState, useEffect} from 'react';


function App() {
    const [quotes , setQuotes] = useState([]); // state to handle the quotes
    const [randomQuote, setRandomQuote] = useState([]); // state to get random quotes
    //let color = Math.floor(Math.random() * colors.length);
    const [colour, setColor] = useState('');
    const colors = ['#16a085','#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964','#342224', '#472E32', '#BDBB99', '#77B1A9','#73A857'];
    const twitterLink =  'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
    encodeURIComponent('"' + randomQuote.quote + '" ' + randomQuote.author);

    const APIURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

    //API CALL
    useEffect(() => {
        async  function fetchData(){
            const result = await fetch(APIURL);
            const data = await result.json();
            setQuotes(data.quotes);
            const randomIndex = Math.floor(Math.random()*data.quotes.length);
            setRandomQuote(data.quotes[randomIndex]);
            let color = Math.floor(Math.random() * colors.length);
            setColor(colors[color]);
            console.log('color: ', colour)
        }
        fetchData();
    },[]);
   

    // Get random quotes from the api
    const handleRandomQuotes = ()=>{
    if (quotes.length!==0){
        const randomIndex = Math.floor(Math.random()*quotes.length);
        setRandomQuote(quotes[randomIndex]);
    }
    }
    
    return (
    <div id="wrapper">
        { <div id="quote-box">
        { quotes.length !==0 &&
            <div className="quote-text" style={{opacity: '1'}}>
               <i className="fa fa-quote-left"> </i><span id="text">{randomQuote.quote}</span>
            </div>}
           {quotes.length !==0 && <div className="quote-author" style={{opacity: '1'}}>- <span id="author">{randomQuote.author}</span></div>}
            <div className="buttons">
                <a className="button" id="tweet-quote" title="Tweet this quote!" target="_top" href={twitterLink} style={{backgroundColor: "rgb(9, 242, 250)"}}>
                    <i className="fa fa-twitter"></i><span>Tweet</span>
                </a>
                <button className="button" id="new-quote" style={{backgroundColor: "rgb(9, 242, 250)"}} onClick={handleRandomQuotes}>New quote</button>
            </div>
        </div>}
     
    </div>    
        );
   
    }

    export default App;