const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('/api/v1/logout', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(dataStream => dataStream.json())
    .then(res => {
      if (res.status === 200) {
        window.location = '/';
      }
    })
})

const userId = window.location.pathname.split('/')[2];

const getTrip = () => {
  fetch(`/api/v1/profiles/${userId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(dataStream => dataStream.json())
    .then(res => {
      console.log(res)
       
    })
    .catch(err => console.log(err));
}

getTrip();