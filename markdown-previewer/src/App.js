import './App.css';
import marked from 'marked';

//Allows line breaks
marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

function App() {
  
  const text = '## Marked in the browser\n\nRendered by **marked**.';
  return (
    <div className="App" dangerouslySetInnerHTML={{
        __html: marked(text))>
    </div>
  );
}

export default App;
