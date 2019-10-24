// ================ Find Friends ================  //
// const onSuccessGetFriend = (friends) => {
//     console.log(friends)
// }


// $('#friends').on('click', function () {
//     console.log('Hello')
//     fetch(`http://localhost:3000/api/v1/friends`, {
//         method: 'GET',
//     })
//     .then(stream => stream.json())
//     .then(res => {
//         onSuccessGetFriend(res.data)
//     })
//     .catch(err => console.log(err))
// })


// ================ Trip form front-end ================  //
let validation = true

const formValidation = () => {
    if ($('#name').val() === "") {validation = false}
    if ($('#destination').val() === "") {validation = false} 
    if ($('#date_start').val() === "") {validation = false}
    if ($('#date_end').val() === "") {validation = false}
    if ($('#activity').val() === "") {validation = false}
    if ($('#description').val() === "") {validation = false}
}

const selectFriends = new Array ()
$('#add-friends-section').on('click', 'input', function(event) {
    // console.log(event.target)
    if (event.target.checked) {
        // console.log(this.value)
        selectFriends.push({
            friendId: this.value,
            name: this.name,
        })
    }
})

$('#form').on('submit', function (event) {
    let newId = window.location.pathname.split('/')[2]
    event.preventDefault()
    formValidation()

    if (validation) {
        $.ajax({
            method: "POST",
            url: `http://localhost:3000/api/v1/trip/create`,
            data: { 
                "name": $('#name').val(),
                "destination": $('#destination').val(),
                "start": $('#date_start').val(),
                "end": $('#date_end').val(),
                "activities": $('#activity').val(),
                "description": $('#description').val(),
                "friends": selectFriends,

            },
            success: onSuccessTrip,
            error: onError
        })
        $('input').val('')
    } else {
        return validation = true
    }
    window.location = `/profile/${newId}`
})

const onSuccessTrip = (data)=> {
    console.log(data)
}

const onError = (response) => {
    console.log(response);
}

// ================ Delete Trip ================  //
$('.show-trip').on('click', '.delete', function (event) {
    $(event.target).parents('.trip-section').remove()
    let tripId = $(event.target).parent().attr('id') // Select id from <div id> that just exists
    fetch(`http://localhost:3000/api/v1/trip/delete/${tripId}`, {
        method: 'DELETE',
    })
    .then(stream => stream.json())
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))
})

// ================ Show Trip ================  //
const onSuccessGetTrip = (data) => {
    // console.log(data)
    data.forEach(function(element) {
        const members = element.friends.map(friend => {
            return `<p>${friend.name}</p>`
        });
        const tripTemplete = `
        <div class="trip-section">
            <button class="dropdown-btn">
            <strong>${element.name}</strong><br>
                Destination : ${element.destination}<br>
                Date: ${new Date(element.start).toLocaleDateString()} - ${new Date(element.end).toLocaleDateString()}
            </button>
            <div class="dropdown-container">
                <div id=${element._id}>
                    
                    ${
                        members.join('')
                    }
                    <p>Activity : ${element.activities}</p>
                    <p>Description : ${element.description}</p>
                    <button class="delete">Delete</button>
                    <button class="update">Update</button>
                </div>
            <div class="update-section"></div>
        </div>
    `
    if (userId) {
        $('.show-trip').append(tripTemplete)
    } else {
        $('.trip-from-friend').append(tripTemplete)
    }
    
    })
}

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
getTrip()

// console.log(userId)
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

// ================ Get Data Before Update  ================  //
const onSuccessPullTrip = (data, newTarget) => {
    const tripUpdateTemplete = `
        <section id="${data._id}" class="container">
            <form class="update-form">
                <div class="form-group">
                    <label for="name">Trip Name</label>
                    <input type="text" class="form-control" id="update_name" name="name" value="${data.name}">
                </div>
                <div class="form-group">
                <label for="destination">Destination</label>
                <input type="text" class="form-control" id="update_destination" name="destination" value="${data.destination}">
            </div>
                <div class="form-group">
                <label for="date_start">Date Start</label>
                <input type="text" class="form-control" id="update_date_start" name="date_start" value="${new Date(data.start).toLocaleDateString()}">
            </div>
                <div class="form-group">
                    <label for="date_end">Date End</label>
                    <input type="text" class="form-control" id="update_date_end" name="date_end" value="${new Date(data.end).toLocaleDateString()}">
                </div>
                <div class="form-group">
                    <label for="activity">Activity</label>
                    <input type="text" class="form-control" id="update_activity" name="activity" value="${data.activities}">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" class="form-control" id="update_description" name="description" value="${data.description}">
                </div>
                <input type="submit" value="Save"/>
            </form> 
        </section>
    `
     $(newTarget).parents('.show-trip').children('.trip-section').children('.dropdown-container').children('.update-section').append(tripUpdateTemplete)
}

$('.show-trip').on('click', '.update', function (event) {
    $('.update-section').children().remove()
    const newTarget = event.target
    let tripId = $(event.target).parent().attr('id') // Select id from <div id> that just exists
    fetch(`http://localhost:3000/api/v1/${tripId}`, {
        method: 'GET',
    })
    .then(stream => stream.json())
    .then(res => {
        onSuccessPullTrip(res.data, newTarget)
    })
    .catch(err => console.log(err))
})

// ================ Update  ================  //
$(".show-trip").on('submit', ".update-form", function (event) {
    let newId = window.location.pathname.split('/')[2]
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
    fetch(`http://localhost:3000/api/v1/trip/update/${tripId}`, {
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



$('.dropdown-btn-add-trip').on('click', function (event) {
    event.target.classList.toggle("active")
     dropdownContainer = event.target.nextElementSibling;
    if (dropdownContainer.style.display === "block") {
    dropdownContainer.style.display = "none"
    } else {
    dropdownContainer.style.display = "block"
    }
})

$('.show-trip').on('click', '.dropdown-btn', function (event) {
    event.target.classList.toggle("active")
    var dropdownContainer = event.target.nextElementSibling;
    if (dropdownContainer.style.display === "block") {
    dropdownContainer.style.display = "none"
    } else {
    dropdownContainer.style.display = "block"
    }
})
