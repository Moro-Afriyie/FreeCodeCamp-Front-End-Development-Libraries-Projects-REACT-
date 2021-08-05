import './App.scss';
import marked from 'marked';

//Allows line breaks
marked.setOptions({
  breaks: true,
  // highlight: function (code) {
  //   return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  // }
});

function App() {
  
  const text = '## Marked in the browser\n\nRendered by **marked**.';
  return (
    <main className="App">
      <div class="editor-container">
       <div class="editor-header">
        <h3>Editor</h3>
       </div>
      <textarea id="editor" type="text" value="moro">

      </textarea>
    
    </div>
      <div id="preview" dangerouslySetInnerHTML={{
          __html: marked(text)}}>
      </div>
    </main>
  );
}

export default App;
