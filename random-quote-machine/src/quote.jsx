const Quote = () => {
    return ( 
        <div id="wrapper">
  <div id="quote-box">
    <div class="quote-text" style="opacity: 1;">
      <i class="fa fa-quote-left"> </i><span id="text">I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.</span>
    </div>
    <div class="quote-author" style="opacity: 1;">- <span id="author">Maya Angelou</span></div>
    <div class="buttons">
      <a class="button" id="tweet-quote" title="Tweet this quote!" target="_top" href="https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=%22I%E2%80%99ve%20learned%20that%20people%20will%20forget%20what%20you%20said%2C%20people%20will%20forget%20what%20you%20did%2C%20but%20people%20will%20never%20forget%20how%20you%20made%20them%20feel.%22%20Maya%20Angelou" style="background-color: rgb(189, 187, 153);">
        <i class="fa fa-twitter"></i>
      </a>
      <a class="button" id="tumblr-quote" title="Post this quote on tumblr!" target="_blank" href="https://www.tumblr.com/widgets/share/tool?posttype=quote&amp;tags=quotes,freecodecamp&amp;caption=Maya%20Angelou&amp;content=I%E2%80%99ve%20learned%20that%20people%20will%20forget%20what%20you%20said%2C%20people%20will%20forget%20what%20you%20did%2C%20but%20people%20will%20never%20forget%20how%20you%20made%20them%20feel.&amp;canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&amp;shareSource=tumblr_share_button" style="background-color: rgb(189, 187, 153);">
        <i class="fa fa-tumblr"></i>
      </a>
      <button class="button" id="new-quote" style="background-color: rgb(189, 187, 153);">New quote</button>
    </div>
  </div>
  <div class="footer">by <a href="https://codepen.io/hezag/">hezag</a></div>
</div>
     );
}
 
export default Quote;