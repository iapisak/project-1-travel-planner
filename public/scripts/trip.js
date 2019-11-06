const tripId = window.location.pathname.split('/')[3]

$('profile').on('click', function (event) {
    const tripId = $(event.target).attr('id') 
    window.location = `/views/trip/${tripId}`
})

const viewTrip = () => {
    fetch(`/api/v1/views/trip/${tripId}`, {
        method: 'GET',
      })
    .then(dataStream => dataStream.json())
    .then(res => {
        onSuccessViewTrip(res.data)
    })
    .catch(err => console.log(err));
}

const onSuccessViewTrip = (trip) => {
    const template =`
        <div>Trip Created By : ${trip.userName}</div>
    `
    // trip.friends.forEach(function(element) {
    //     const members = element.name.map(friend => {
    //         return `${friend.name}`
    //     })
    //     console.log(members)
    // })
    
    const tripTemplete = `
        <div class="trip_detail">
            <div>
                Name : ${trip.name}<br>
                Destination : ${trip.destination}<br>
                On Trip : ${trip.friends}</br>
            </div>
            <div class="flex">
                <div class="col">Date : ${new Date(trip.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(trip.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <div class="col flex f-j-end">
                    <div>Trip Created By : ${trip.userName}</div>
                </div>
            </div>
        </div>
    `
    
    $('.user-data').append(template)
    $('.trip-info').append(tripTemplete)

    trip.activities.forEach((element, index) => {
        const activity_template = `
            <p><span class="dark-blue">${index+1}.</span> <span class="green">${element.ativityName}</span> <span class="dark-blue">:</span> <span class="dark-blue">${element.detail}</span></p>
        `
        $('.activity_information').append(activity_template)
    })
}

viewTrip()

$('.add_trip').on('click', function (event) {
    $('#activity-form').toggle()
    $('.activity_information').toggle()
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
})

const onSuccessActivity = (data)=> {
  console.log('Your activity addded')
}










// ================ Call Data to The Form Before Update  ================  //

$('.trip-update').on('click', function () {
    $('.update-trip-info').empty()
    $('.trip-info').toggle()
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
                <label for="name">Trip Name</label>
                <input type="text" class="col" id="name" name="name" value="${data.name}">
            </div>
            <div class="col flex-col margin-t-5">
                <label for="destination">Destination</label>
                <input type="text" class="col" id="destination" name="destination" value="${data.destination}">
            </div>
            <div class='col flex'>
                <div class="col flex-col margin-t-5">
                    <label for="date_start">Start</label>
                    <input type="text" class="col" id="date_start" name="date_start" value="${data.start}">
                </div>
                <div class="col flex-col margin-t-5">
                    <label for="date_end">End</label>
                    <input type="text" class="col" id="date_end" name="date_end" value="${data.end}">
                </div>
            </div>
            <button type="submit">Save</button>
        </form>
    `
    $('.update-trip-info').append(tripUpdateTemplete)
}






// const memberUpdateTemplete = `
// <section id="${data._id}">
// <form class="update-form">
//     <div class="col flex-col margin-t-5">
//         <label for="activity">Activity</label>
//         <input type="text" class="col" id="update_activity" name="activity" value="${data.activities}">
//     </div>
//     <div class="col flex-col margin-t-5">
//         <label for="description">Description</label>
//         <input type="text" class="col" id="update_description" name="description" value="${data.description}">
//     </div>
//     <button class="save" type="submit">Save</button>
// </form> 
// </section>
// `
// if (data.user == userId) {
//     $(newTarget).parent().parent().parent().parent().children('.dropdown-container').children('.update-section').append(tripUpdateTemplete);
// } else {
//     $(newTarget).parent().parent().parent().parent().children('.dropdown-container').children('.update-section').append(memberUpdateTemplete);
// }



const selectFriends = new Array ()
    $('#add-friends-section').on('click', 'input', function(event) {
        if (event.target.checked) {
            selectFriends.push({
                friendId: this.value,
                name: this.name,
            })
        }
})

// Adding Activities //
const addActivities = new Array ()

$("#activities-section").on('click', '#add', function(event) {
    // console.log(event.target)
    const activitiesTemplate = `
    <div>${$('#activity').val()}</div>
`
$('#show-activities-area').append(activitiesTemplate)

addActivities.push({
    name: $('#activity').val(),
})

$(event.target).parent().toggle()
})







$('.cancel').on('click', function () {
    window.location = `/profile/${newId}`
})



// ================ Update After User Edit The Form  ================  //

$(".content-opactity-wrapper").on('submit', ".update-form", function (event) {
    event.preventDefault()
    formValidation()

    let tripId = $(event.target).parent().attr('id')
    const updateData = {
        name: $('#update_name').val(),
        destination: $('#update_destination').val(),
        start: $('#update_date_start').val(),
        end: $('#update_date_end').val(),
        activities: $('#update_activity').val(),
        description: $('#update_description').val(),
    }
    fetch(`/api/v1/trip/update/${tripId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData),
    })
    .then(stream => stream.json())
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))
    window.location = `/profile/${newId}`
})

// ================ Delete Trip ================  //

$('.content-opactity-wrapper').on('click', '.delete', function (event) {

    $(event.target).parents('.trip-section').remove()
    let tripId = $(event.target).parent().parent().attr('id') // Select id from <div id> that just exists
    fetch(`/api/v1/trip/delete/${tripId}`, {
        method: 'DELETE',
    })
    .then(stream => stream.json())
    .then(res => {
        return
    })
    .catch(err => console.log(err))
})

$('.content-opactity-wrapper').on('click', '.remove', function (event) {
    $(event.target).parents('.trip-section').remove()
    let tripId = $(event.target).parent().attr('id') // Select id from <div id> that just exists
    console.log(userId)
    fetch(`/api/v1/trip/member/destroy/${tripId}`, {
        method: 'DELETE',
    })
    .then(stream => stream.json())
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))
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


// $('main').on('click', '.dropdown-btn-trip', function (event) {
//      dropdownContainer = event.target.parentElement.nextElementSibling;
//     if (dropdownContainer.style.display === "block") {
//     dropdownContainer.style.display = "none"
//     } else {
//     dropdownContainer.style.display = "block"
//     }
// })



// $('.dropdown-btn-add-friends').on('mouseover', function (event) {
//     event.target.classList.toggle("active")
//     dropdownContainer = event.target.nextElementSibling

//     if (dropdownContainer.style.display === "block") { dropdownContainer.style.display = "none" } 
//         else { dropdownContainer.style.display = "block" }
// })

// $('.dropdown-btn-add-trip').on('mouseover', function (event) {
//     event.target.classList.toggle("active")
//      dropdownContainer = event.target.nextElementSibling;
//     if (dropdownContainer.style.display === "block") {
//     dropdownContainer.style.display = "none"
//     } else {
//     dropdownContainer.style.display = "block"
//     }
// })

// =========== Drop down function ** after ** the page load ========== //
// $('.show-trip').on('click', '.dropdown-btn', function (event) {
//     console.log(event.target)
//     event.target.classList.toggle("active")
//     var dropdownContainer = event.target.nextElementSibling;
//     if (dropdownContainer.style.display === "block") {
//     dropdownContainer.style.display = "none"
//     } else {
//     dropdownContainer.style.display = "block"
//     }
// })

// $('.trip-from-friend').on('click', '.dropdown-btn', function (event) {
//     event.target.classList.toggle("active")
//     var dropdownContainer = event.target.nextElementSibling;
//     if (dropdownContainer.style.display === "block") {
//     dropdownContainer.style.display = "none"
//     } else {
//     dropdownContainer.style.display = "block"
//     }
// })

// ========== Hide =========
// $('.show-trip').on('click', '.dropdown-btn', function(event) {
//     console.log(event.target)
//     $('.friend-area').toggle()
// })

// $('.friend-area').on('click', '.dropdown-btn', function(event) {
//     console.log(event.target)
//     $('.show-trip').toggle()
// })
