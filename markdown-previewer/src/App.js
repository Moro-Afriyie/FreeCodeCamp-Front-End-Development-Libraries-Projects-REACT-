import './App.scss';
import marked from 'marked';
import {useState} from 'react';


const text = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
- list 1.
- list 2.
- list 3.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K)
`;
function App() {
  const [markdown, setMarkdown] = useState(text)
  
  const handleChange = (e)=>{
    setMarkdown(e.target.value);
  }
  return (
    <main className="container">
       <h1 className="title">Markdown Previewer</h1>
    <section className="App">
      <div className="editor-container">
       <div className="editor-header">

        <h3 className="heading"><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Editor</h3>
       </div>
      <textarea id="editor" type="text" value={markdown} onChange={handleChange}>

      </textarea>
    
    </div>
     <div className="preview-container">
      <div className="preview-header">
        <h3 className="heading"><i className="fa fa-refresh" aria-hidden="true"></i>Previewer</h3>
       </div>
      <div id="preview" dangerouslySetInnerHTML={{
          __html: marked(markdown,{breaks: true})}}>
      </div>
    </div>
    </section>
    </main>  
      
  );
}


export default App;
