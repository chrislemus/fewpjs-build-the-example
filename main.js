// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('#modal')
  // const mediaPosts = document.querySelectorAll('.media-post')
  const PostsLikeBtns = document.querySelectorAll('.like')


  function updateHeart(heartParentNode) {
    const likeHeart = heartParentNode.querySelector('.like-glyph')
    const hasLike = likeHeart.classList.contains('activated-heart')
    if (hasLike) {
      likeHeart.classList.remove('activated-heart')
    } else {
      likeHeart.classList.add('activated-heart')
    }
    likeHeart.innerHTML = hasLike ? EMPTY_HEART : FULL_HEART
  }

  
  PostsLikeBtns.forEach(likeBtn => {

    // likeBtn.classList.add('activated-heart')


    likeBtn.addEventListener('click', e => {
      const postId = e.target.closest('.media-post').id
      const config = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({postId})
      }
      mimicServerCall()
      .then(res => updateHeart(likeBtn))
      .catch(err => {
        modal.classList.remove('hidden')
        modal.querySelector('#modal-message').innerHTML = err
        setTimeout(() => {
          modal.classList.add('hidden')
        }, 5000)
      })
    })
  })
  
})



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
