const tripId = window.location.pathname.split('/')[3]

const viewTrip = () => {
    fetch(`/api/v1/views/trip/${tripId}`, {
        method: 'GET',
      })
    .then(dataStream => dataStream.json())
    .then(res => {
        onSuccessViewTrip(res)
    })
    .catch(err => console.log(err));
}

const onSuccessViewTrip = (trip) => {
    
    const members = []
    trip.data.friends.forEach(function(element) {
        members.push(element.name)
        })

    const userMenuTemplete = `
        <div class='flex f-j-end'>
            <div class="trip-update">Update</div>
            <div class="trip-delete">Delete</div>
        </div>
    `
    const currentUserTemplete = `
        <div class='flex f-j-end'>
            <div class='remove-self-trip'>Leave this trip</div>
        </div>
    `
    
    const tripTemplete = `
        ${ trip.data.user == trip.current_user ? `${userMenuTemplete}` : `${currentUserTemplete}` }
        <div class="trip_detail">
            <div>
                Name : ${trip.data.name}<br>
                Destination : ${trip.data.destination}<br>
                On Trip : ${members.join(', ')}</br>
            </div>
            <div class="flex">
                <div class="col">Date : ${new Date(trip.data.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(trip.data.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <div class="col flex f-j-end">
                    <div>Trip Created By : ${trip.data.userName}</div>
                </div>
            </div>
        </div>
    `

    $('.trip-info').append(tripTemplete)

    trip.data.activities.forEach((element, index) => {
        const activity_template = `
            <div class='activity-container'>
                <p>
                    <span class="dark-blue">${index+1}.</span>
                    <span class="green">${element.ativityName}</span>
                    <span class="dark-blue">: </span><span class="dark-blue">${element.detail}</span>
                    <span id="${element.ativityName}" class="remove-activity">Remove</span>
                </p> 
                
            </div>
        `
        $('.activity_information').append(activity_template)
    })
}

viewTrip()

$('.add_trip').on('click', function (event) {
    $('#activity-form').toggle()
})


// Activaties Form //
let validation = true

const formValidation = () => {
    if ($('#activity').val() === "") {validation = false}
    if ($('#detail_activity').val() === "") {validation = false}
}

$('#activity-form').on('submit', function (event) {
  event.preventDefault()
  formValidation()
  if (validation) {
      $.ajax({
          method: "POST",
          url: `/api/v1/trip/${tripId}/create/activity`,
          data: { 
              "ativityName": $('#activity').val(),
              "detail": $('#detail_activity').val(),
          },
          success: onSuccessActivity,
          error: (err) => console.log(err)
      })
      $('input').val('')
      $('#activity-form').toggle()
  } else {
      return validation = true
  }
  $('.activity_information').toggle()
  window.location = `/views/trip/${tripId}`
})

const onSuccessActivity = (data)=> {
  console.log('Your activity addded')
}

// Delete Activity
$('main').on('click', '.remove-activity', function(event) {
    const activityId = $(event.target).attr('id')
    fetch(`/api/v1/trip/activity/${activityId}/destroy/${tripId}`, {
        method: 'DELETE',
    })
    .then(stream => stream.json())
    .then(res => {
        window.location = `/views/trip/${tripId}`
    })
    .catch(err => console.log(err))

})

// ================ Call Data to The Form Before Update  ================  //

$('main').on('click', '.trip-update', function () {
    $('.update-trip-info').toggle()
    $('.update-trip-info').empty()
    
    fetch(`/api/v1/views/trip/${tripId}`, {
        method: 'GET',
    })
    .then(stream => stream.json())
    .then(res => {
        onSuccessPullTrip(res.data)
    })
    .catch(err => console.log(err))
})

const onSuccessPullTrip = (data) => {
    const tripUpdateTemplete = `
        <form class="update-form">
            <div class="col flex-col margin-t-5">
                <label for="update_name">Trip Name</label>
                <input type="text" class="col" id="update_name" name="name" value="${data.name}">
            </div>
            <div class="col flex-col margin-t-5">
                <label for="update_destination">Destination</label>
                <input type="text" class="col" id="update_destination" name="destination" value="${data.destination}">
            </div>
            <div class='col flex'>
                <div class="col flex-col margin-t-5">
                    <label for="update_date_start">Start</label>
                    <input type="text" class="col" id="update_date_start" name="date_start" value="${new Date(data.start).toLocaleDateString()}">
                </div>
                <div class="col flex-col margin-t-5">
                    <label for="update_date_end">End</label>
                    <input type="text" class="col" id="update_date_end" name="date_end" value="${new Date(data.end).toLocaleDateString()}">
                </div>
            </div>
            <button class='form-update-save' type="submit">Save</button>
        </form>
    `
    $('.update-trip-info').append(tripUpdateTemplete)
}

// ================ Update After User Edit The Form  ================  //

$("main").on('submit', ".update-form", function (event) {
    event.preventDefault()
    formValidation()

    const updateData = {
        name: $('#update_name').val(),
        destination: $('#update_destination').val(),
        start: $('#update_date_start').val(),
        end: $('#update_date_end').val(),
    }

    fetch(`/api/v1/update/trip/${tripId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData),
    })
    .then(stream => stream.json())
    .then(res => {
        window.location = `/views/trip/${res.data._id}`
    })
    .catch(err => console.log(err))
    
})

$('main').on('click', '.remove-self-trip', function (event) {
    fetch(`/api/v1/trip/member/destroy/${tripId}`, {
        method: 'DELETE',
    })
    .then(stream => stream.json())
    .then(res => {
        window.location = `/profile/${res.current_user}`
    })
    .catch(err => console.log(err))
})


// ================ Delete Trip ================  //

$("main").on('click', '.trip-delete', function (event) {
    fetch(`/api/v1/delete/trip/${tripId}`, {
        method: 'DELETE',
    })
    .then(stream => stream.json())
    .then(res => {
        window.location = `/profile/${res.data.user}`
    })
    .catch(err => console.log(err))
})

// ================ Back to Profile Page ================  //
$("#profile").on('click', function () {
    fetch(`/api/v1/views/trip/${tripId}`, {
        method: 'GET',
    })
        .then(dataStream => dataStream.json())
        .then(res => {
        window.location = `/profile/${res.current_user}`
        })
        .catch(err => console.log(err))
})

// ================ Log out ================  //
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