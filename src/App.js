import React, { useState } from 'react';
import parse from 'html-react-parser';
import './App.css';
import Highlightable from 'highlightable';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';


function App() {
  const [ranges1, setRanges1] = useState([])
  const [ranges2, setRanges2] = useState([])

  const [textHTML, setTextHTML] = useState('<h1>Lorem Ipsum</h1><h4 class="ql-align-center"><em>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</em></h4><h5 class="ql-align-center">"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</h5><p><br></p>')
  const [text, setText]= useState('Lorem Ipsum "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."')

const onTextHighlighted1 = (range) => {
  setRanges1([])
    console.log("range:", range)
        let newArr = []
        newArr[0] = range
        setRanges1(newArr)
    window.getSelection().removeAllRanges();
}
const onTextHighlighted2 = (range) => {
  setRanges2([])
    console.log("range:", range)
        let newArr = []
        newArr[0] = range
        setRanges2(newArr)
    window.getSelection().removeAllRanges();
}
const onCommentClick = () => {
  console.log("comment button clicked")
}
const tooltipRenderer= (lettersNode, range, rangeIndex, onMouseOverHighlightedWord) => {
  return (<Tooltip title="Add comment" key={`${range.data.id}-${rangeIndex}`} onVisibleChange={onMouseOverHighlightedWord.bind(this, range)}
                      placement="top"
                      overlay={<div>
                        <button onClick={onCommentClick}
                        type="button" className="btn btn-dark">Add comment</button>
                        <style jsx>{`
                        button {
                            color: '#fbfbfb'
                          },`}</style>
                        </div>}
                      defaultVisible={true}
                      rangeRenderer={customRenderer}
                      animation="zoom">
      <span>{lettersNode}</span>
  </Tooltip>);
}

const customRenderer = (currentRenderedNodes, currentRenderedRange, currentRenderedIndex, onMouseOverHighlightedWord) => {
return tooltipRenderer(currentRenderedNodes, currentRenderedRange, currentRenderedIndex, onMouseOverHighlightedWord);
}

  return (  
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://github.com/ydeshayes/react-highlight"
          target="_blank"
          rel="noopener noreferrer"
        >
          React highlight text
        </a>
      </header>
      <div>
      <Highlightable ranges={ranges1}
                 enabled={true}
                 style={{textAlign: 'left'}}
                 onTextHighlighted={onTextHighlighted1}
                 id={'1'}
                 highlightStyle={{
                   backgroundColor: '#ffcc80'
                 }}
                 text={parse(textHTML)}
                 rangeRenderer={customRenderer}

          />
          <br/> <br/><br/> <br/>
          <Highlightable ranges={ranges2}
                 enabled={true}
                 style={{textAlign: 'left'}}
                 onTextHighlighted={onTextHighlighted2}
                 id={'2'}
                 highlightStyle={{
                   backgroundColor: '#ffcc80'
                 }}
                 text={text}
                 rangeRenderer={customRenderer}

          />
      </div>
    </div>
    
  );
}

export default App;
