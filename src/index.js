let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", (event) => {
        event.preventDefault()
        // console.log(event.target.name.value)
        fetchPostRequest(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyCollectionDiv = document.querySelector("#toy-collection")

  function createButton() {
    const likeButton = document.createElement("button")
    likeButton.class = "like-btn"
    likeButton.innerHTML = "Like"
    likeButton.addEventListener("click", function(event) {
      fetch("http://localhost:3000/toys")
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        updateLikes(json, event)
      })
    })
  }


  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
      object.forEach(element => {
        const div = document.createElement("div")
        div.class = "card"
        div.innerHTML += `<h2>${element.name}</h2>`
        div.innerHTML += `<img src="${element.image}" class="toy-avatar">`
        div.innerHTML += `<p>Likes: ${element.likes}</p>`
        const likeButton = document.createElement("button")
        likeButton.class = "like-btn"
        likeButton.innerHTML = "Like"

        likeButton.setAttribute('id', element.id)
        likeButton.addEventListener('click', (e) => {
          console.log(e.target.dataset);
          updateLikes(e)
        })
        // const likeButton = createButton()
        toyCollectionDiv.appendChild(div)
        // toyCollectionDiv.appendChild(likeButton)
        div.appendChild(likeButton)
      })
    })

    function fetchPostRequest(toy_data) {
      console.log(toy_data)
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toy_data.name.value,
          image: toy_data.image.value,
          likes: 0 
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        console.log(object.name)
        const toyCollectionDiv = document.querySelector("#toy-collection")
        const div = document.createElement("div")
        div.class = "card"
        div.innerHTML += `<h2>${object.name}</h2>`
        div.innerHTML += `<img src="${object.image}" class="toy-avatar">`
        div.innerHTML += `<p>Likes: ${object.likes}</p>`
        const likeButton = document.createElement("button")
        likeButton.class = "like-btn"
        likeButton.innerHTML = "Like"

        likeButton.setAttribute('id', object.id)
        likeButton.addEventListener('click', (e) => {
          console.log(e.target.dataset);
          updateLikes(e)
        })
        // const likeButton = createButton()
        toyCollectionDiv.appendChild(div)
        // toyCollectionDiv.appendChild(likeButton)
        div.appendChild(likeButton)
      })
    }

    function updateLikes(e) {
      // console.log(event.target)
      // find the toy, figure out name of the toy from the event data
      e.preventDefault()
      // let more = parseInt(e.target.previousElementSibling.innerText) + 1
      let more = parseInt(e.target.previousElementSibling.innerText) + 1
      
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "likes": more
          })
      })
        .then(res => res.json())
        .then((like_obj => {
          e.target.previousElementSibling.innerText = `Likes: ${more}`;
        }))  
    }


});
