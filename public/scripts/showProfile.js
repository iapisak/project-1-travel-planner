const logout = $('#logout');

logout.on('click', (event) => {
  event.preventDefault();
  fetch('/api/v1/logout', {
    method: 'DELETE',
  })
    .then(dataStream => dataStream.json())
    .then(res => {
      if (res.status === 200) {
        window.location = '/';
      }
    })
})

const userId = window.location.pathname.split('/')[2]

const getProfile = () => {
  fetch(`/api/v1/profiles/${userId}`, {
    method: 'GET',
  })
    .then(dataStream => dataStream.json())
    .then(res => {
      onSuccess(res.data)
    })
    .catch(err => console.log(err));
}

const onSuccess = (user) => {
  const template =`
      <div>Name : ${user.name} ${user.lastName}</div>
      <div>Email : ${user.email}</div>
      <div>Member Since : ${new Date(user.signupDate).toLocaleDateString()}</div>
  `
  $('.user-data').append(template)
}

getProfile()



