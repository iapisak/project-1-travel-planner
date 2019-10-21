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

const handleSuccess = (user) => {
  document.querySelector('.container').insertAdjacentHTML('beforeend', `
    <div>
      <h4><strong>Name:</strong> ${user.name}</h4>
      <p><strong>Email</strong>: ${user.email}</p>
    </div>
  `);
}


const getProfile = () => {
  fetch(`/api/v1/profiles/${userId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(dataStream => dataStream.json())
    .then(res => {
      console.log(res);
      handleSuccess(res.data);
    })
    .catch(err => console.log(err));
}

getProfile();