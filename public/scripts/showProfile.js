const userId = window.location.pathname.split('/')[2]

// ================ Trip form front-end ================  //
let validation = true

const formValidation = () => {
    if ($('#name').val() === "") {validation = false}
    if ($('#destination').val() === "") {validation = false} 
    if ($('#date_start').val() === "") {validation = false}
    if ($('#date_end').val() === "") {validation = false}
}

$('#form').on('submit', function (event) {
  event.preventDefault()
  formValidation()

  if (validation) {
      $.ajax({
          method: "POST",
          url: `/api/v1/trip/create`,
          data: { 
              "name": $('#name').val(),
              "destination": $('#destination').val(),
              "start": $('#date_start').val(),
              "end": $('#date_end').val(),
          },
          success: onSuccessTrip,
          error: (err) => console.log(err)
      })
      $('input').val('')
  } else {
      return validation = true
  }
  window.location = `/profile/${userId}`
})

const onSuccessTrip = (data)=> {
  console.log(data)
}

// ================ Append Trip Created By User ================  //

const getTrip = () => {
  fetch(`/api/v1/trip/${userId}`, {
      method: 'GET',
    })
  .then(dataStream => dataStream.json())
  .then(res => {
      onSuccessGetTrip(res.data)
  })
  .catch(err => console.log(err));
}

const onSuccessGetTrip = (data) => {
  data.forEach(function(element) {
      const members = element.friends.map(friend => {
          return `${friend.name}`
      });

      const tripTemplete = `
      <div class="trip-section margin-b">
          <div class="flex">
              <div class="bg-white col">
                  Name : <span class='blue'>${element.name}</span><br>
                  Destination : <span class='red'>${element.destination}</span><br>
                  ${ `On Trip : <span class='green'>${members.join(', ')}</span>`}
              </div>
              <div class="bg-white basic">
                  <span id=${element._id} class='view-update dark-blue'>View & Update</span>
                  <span class='red center'>${new Date(element.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(element.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
          </div>
      </div>
  `
  if (element.user == userId){
  $('.show-trip').append(tripTemplete)
  } else  if (element.user !== userId) {
      $('.trip-from-friend').append(tripTemplete)
  }
  })
}

getTrip()

// ================ Append Trip Created By Member ================  //

const getMemberWithTrip = () => {
  fetch(`/api/v1/trip/member/${userId}`, {
      credentials: 'include',
      method: 'GET',
  })
  .then(dataStream => dataStream.json())
  .then(res => {
      onSuccessGetTrip(res.data)
  })
  .catch(err => console.log(err))
}

getMemberWithTrip()

// Append Profile information 

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

// =========== Drop down function ** when ** the page load ========== //

$('main').on('click', '.dropdown-btn', function (event) {
  event.target.classList.toggle("active")
   dropdownContainer = event.target.nextElementSibling;
  if (dropdownContainer.style.display === "block") {
  dropdownContainer.style.display = "none"
  } else {
  dropdownContainer.style.display = "block"
  }
})


$('main').on('click', '.view-update', function (event) {
  const tripId = $(event.target).attr('id') 
  window.location = `/views/trip/${tripId}`
})

$('#logout').on('click', (event) => {
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



