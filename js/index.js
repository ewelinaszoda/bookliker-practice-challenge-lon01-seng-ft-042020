const url = 'http://localhost:3000/books/';
const currentlyUser = { id: 1, username: 'pouros' };
// ----------------------------------------
// Get all books
// ----------------------------------------

function getAllBooks() {
  return fetch(url)
    .then((response) => response.json())
    .then(function renderBooks(booksArray) {
      showAllBooks(booksArray);
    })
    .catch(function handleError(error) {
      console.error(error);
    });
}

// ------------------------------------------
// Show all books
// ------------------------------------------

function showAllBooks(booksArray) {
  booksArray.forEach(function (book) {
    showOneBook(book);
  });
}
const divShowAllPanel = document.querySelector('#show-panel');
function showOneBook(book) {
  const ulList = document.querySelector('#list');

  const liList = document.createElement('li');
  liList.innerText = book.title;
  // console.log(liList);

  ulList.append(liList);

  liList.addEventListener('click', function () {
    madeDivForBook(book);
  });
}

function madeDivForBook(book) {
  const divShowAllPanel = document.querySelector('#show-panel');

  const div = document.createElement('div');
  div.className = 'show-one-book-details';

  const h1 = document.createElement('h1');
  h1.innerText = book.title;

  const img = document.createElement('img');
  img.src = book.img_url;

  const p = document.createElement('p');
  p.innerText = book.description;

  const likeButton = document.createElement('button');
  likeButton.innerText = 'Like the book';

  likeButton.addEventListener('click', function (event) {
    // debugger
    console.log(event);
    patchUsersLikedBook(book, currentlyUser).then(
      (event.target.nextElementSiblings.innerText +=
        '${currentlyUser.username}')
    );
    // patchUsersLikedBook(book, currentlyUser).then(event.target.nextElementSiblings.innerText+= currentlyUser.username)
  });

  div.append(h1, img, p, likeButton);

  const ulUsers = document.createElement('ul');

  book.users.forEach(function (user) {
    const li = document.createElement('li');
    li.innerText = user.username;

    ulUsers.append(li);
  });

  div.append(ulUsers);
  divShowAllPanel.append(div);
  // reset() - for forms
  // remove() - for HTML

  //QUESTION NR 1 HOW TO DO IT???????
  // .then(divShowAllPanel.remove())

  // ------------------------------------------
  // Patch User
  // ------------------------------------------

  // QUESTION NR2 HOW TO FIX patch ?????????
  // the book is not updating?????????????
  // patch has two parameters ??????????
  // can be add just once ?????????
  // if (!book.users.include(currentlyUser))
  // book.users.push(currentlyUser);
  // else(book.user.push(null))

  function patchUsersLikedBook(book, currentlyUser) {
    book.users.push(currentlyUser);
    return fetch(url + book.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        users: book.users,
      }),
    }).then((response) => response.json());
  }
}
//----------------------------------------
// Invoke master function
// ---------------------------------------

getAllBooks();
