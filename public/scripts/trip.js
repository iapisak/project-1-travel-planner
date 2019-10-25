// ================ Trip form front-end ================  //
const newId = window.location.pathname.split('/')[2]

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
    if (event.target.checked) {
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
            error: (err) => console.log(err)
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

// const onError = (response) => {
//     console.log(response);
// }

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
        <div class="trip-section">
            <button class="dropdown-btn">
            <strong>${element.name}</strong><br>
                Destination : ${element.destination}<br>
                Date: ${new Date(element.start).toLocaleDateString()} - ${new Date(element.end).toLocaleDateString()}<br>
                Create by ${element.userName}
            </button>
            <div class="dropdown-container">
                <div id=${element._id}>
                    
                    ${
                        `<p>On trip: ${members.join(', ')}</p>`
                    }
                    <p>Activity : ${element.activities}</p>
                    <p>Description : ${element.description}</p>
                    <button class="delete">Delete</button>
                    <button class="update">Update</button>
                </div>
            <div class="update-section"></div>
        </div>
    `
    $('.show-trip').append(tripTemplete)
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
        onSuccessMemberTrip(res.data)
    })
    .catch(err => console.log(err))
}

const onSuccessMemberTrip = (data) => {
    console.log(data)
    data.forEach(function(element) {
        const members = element.friends.map(friend => {
            return `${friend.name}`
        });
        const tripTemplete = `
        <div class="trip-section">
            <button class="dropdown-btn">
            <strong>${element.name}</strong><br>
                Destination : ${element.destination}<br>
                Date: ${new Date(element.start).toLocaleDateString()} - ${new Date(element.end).toLocaleDateString()}<br>
                Create by ${element.userName}
            </button>
            <div class="dropdown-container">
                <div id=${element._id}>
                    
                    ${
                        `<p>On trip: ${members.join(', ')}</p>`
                    }
                    <p>Activity : ${element.activities}</p>
                    <p>Description : ${element.description}</p>
                    <button class="remove">Remove</button>
                    <button class="update">Update</button>
                </div>
            <div class="update-section"></div>
        </div>
    `
    if (data.user !== userId) {
        $('.trip-from-friend').append(tripTemplete)
    }
    
    })
    
}

getMemberWithTrip()

// ================ Delete Trip ================  //

$('.content-opactity-wrapper').on('click', '.delete', function (event) {
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

$('.content-opactity-wrapper').on('click', '.remove', function (event) {
    $(event.target).parents('.trip-section').remove()
    //let memberId = $(event.target).parent().attr('id') // Select id from <div id> that just exists
    fetch(`http://localhost:3000/api/v1/trip/member/destroy/${userId}`, {
        method: 'DELETE',
    })
    .then(stream => stream.json())
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))
})

// ================ Call Data to The Form Before Update  ================  //

$('.content-opactity-wrapper').on('click', '.update', function (event) {
    console.log(this)
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
    const memberUpdateTemplete = `
        <section id="${data._id}" class="container">
            <form class="update-form">
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
    if (data.user === userId) {
        $(newTarget).parents('.content-opactity-wrapper').children('.show-trip').children('.trip-section').children('.dropdown-container').children('.update-section').append(tripUpdateTemplete)
    } else {
        $(newTarget).parents('.content-opactity-wrapper').children('.trip-from-friend').children('.trip-section').children('.dropdown-container').children('.update-section').append(memberUpdateTemplete)
    }

}

// ================ Update After User Edit The Form  ================  //

$(".show-trip").on('submit', ".update-form", function (event) {
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


// =========== Drop down function ** when ** the page load ========== //

$('.dropdown-btn-add-trip').on('click', function (event) {
    event.target.classList.toggle("active")
     dropdownContainer = event.target.nextElementSibling;
    if (dropdownContainer.style.display === "block") {
    dropdownContainer.style.display = "none"
    } else {
    dropdownContainer.style.display = "block"
    }
})

// =========== Drop down function ** after ** the page load ========== //
$('.content-opactity-wrapper').on('click', '.dropdown-btn', function (event) {
    event.target.classList.toggle("active")
    var dropdownContainer = event.target.nextElementSibling;
    if (dropdownContainer.style.display === "block") {
    dropdownContainer.style.display = "none"
    } else {
    dropdownContainer.style.display = "block"
    }
})
