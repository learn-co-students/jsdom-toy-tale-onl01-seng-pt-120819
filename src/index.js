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
        toyCollectionDiv.appendChild(div)
        toyCollectionDiv.appendChild(likeButton)
      })
    })

    function fetchPostRequest(event) {
      console.log(event)
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: event.name.value,
          image: event.image.value,
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
        div.innerHTML = `<h2>${object.name}</h2>`
        div.innerHTML = `<img src="${object.image}" class="toy-avatar">`
        div.innerHTML = `<p>Likes: ${object.likes}</p>`
        const likeButton = document.createElement("button")
        likeButton.class = "like-btn"
        likeButton.innerHTML = "Like"
        toyCollectionDiv.appendChild(div)
        toyCollectionDiv.appendChild(likeButton)
      })
    }

});
