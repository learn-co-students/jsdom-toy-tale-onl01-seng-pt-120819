let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/toys')
    .then((res) => res.json())
    .then((json) => makeCards(json));

  const addBtn = document.querySelector('#new-toy-btn');
  const toyFormContainer = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = 'block';
    } else {
      toyFormContainer.style.display = 'none';
    }
  });
});

const toyimageContainer = document.getElementById('toy-collection');

function makeCards(data) {
  data.forEach(function (item) {
    let card = document.createElement('div');
    card.classList.add('card');
    let header = document.createElement('h2');
    header.innerText = item.name;
    let image = document.createElement('img');
    image.src = item.image;
    image.classList.add('toy-avatar');
    let likes = document.createElement('p');
    likes.innerText = item.likes;
    let likeBtn = document.createElement('button');
    likeBtn.id = item.id;
    likeBtn.classList.add('likeBtn');
    likeBtn.innerText = 'Like <3';
    likeBtn.addEventListener('click', (e) => addLike(e));
    card.appendChild(header);
    card.appendChild(image);
    card.appendChild(likes);
    card.appendChild(likeBtn);
    toyimageContainer.appendChild(card);
  });
}

function addLike(e) {
  e.preventDefault();
  let extraLike = parseInt(e.target.previousElementSibling.innerText) + 1;

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      likes: extraLike,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      e.target.previousElementSibling.innerText = extraLike;
    });
}

const addToyForm = document.querySelector('.add-toy-form');

addToyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  postToy(e.target);
});

function postToy(data) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: data.name.value,
      image: data.image.value,
      likes: 0,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      makeCards(json);
    });
}
