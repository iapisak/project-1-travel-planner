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
                "activities": addActivities,
                // "activities": $('#activity').val(),
                // "description": $('#description').val(),
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

        const appendActivities = element.activities.map(activity => {
            return `${activity.name}`
        })

        const tripTemplete = `
        <div class="trip-section">
            <button class="dropdown-btn">
            <strong>Name : ${element.name}</strong><br>
                To : ${element.destination}<br>
                ${new Date(element.start).toLocaleDateString()} - ${new Date(element.end).toLocaleDateString()}
            </button>
            <div class="dropdown-container">
                <div id=${element._id}>
                    
                ${ 
                    `<div class="set-left">On Trip : ${members.join(', ')} </div>`
                }

                ${ 
                    `<div class="set-left">Activity : ${appendActivities.join(', ')} </div>`
                }

                    <div>Activity</div>
                    <div class="set-left">${element.activities}</div>
                    <div>Description</div>
                    <div class="set-left">${element.description}</div>
                    <div class="center">
                        <button class="delete">Delete</button>
                        <button class="update">Update</button>
                    </div>
                </div>
            <div class="update-section"></div>
        </div>
    `
        const memberTemplete = `
        <div class="trip-section">
        <button class="dropdown-btn">
        <strong>Name : ${element.name}</strong><br>
            To : ${element.destination}<br>
            ${new Date(element.start).toLocaleDateString()} - ${new Date(element.end).toLocaleDateString()}
            <div class="float-right">Create by ${element.userName}</div>
        </button>
        <div class="dropdown-container">
            <div id=${element._id}>
                
                ${
                    `<div class="set-left">On Trip ( ${members.join(', ')} )</div>`
                }
                <div>Activity</div>
                <div class="set-left">${element.activities}</div>
                <div>Description</div>
                <div class="set-left">${element.description}</div>
                <div class="center">
                    <button class="remove">Leave</button>
                    <button class="update">Update</button>
                </div>
            </div>
        <div class="update-section"></div>
    </div>
        `
    if (element.user == userId){
    $('.show-trip').append(tripTemplete)
    } else  if (element.user !== userId) {
        $('.trip-from-friend').append(memberTemplete)
    }
    })
}

getTrip()

$('.cancel').on('click', function () {
    window.location = `/profile/${newId}`
})

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

// ================ Call Data to The Form Before Update  ================  //

$('.content-opactity-wrapper').on('click', '.update', function (event) {
    $(event.target).parent().parent().toggle()
    $('.update-section').children().remove()
    const newTarget = event.target
    let tripId = $(event.target).parent().parent().attr('id') // Select id from <div id> that just exists
    // console.log($(event.target).parent().parent())
    // console.log(tripId)
    fetch(`/api/v1/${tripId}`, {
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
        <section id="${data._id}">
            <form class="update-form">
                <div class="col flex-col margin-t-5">
                    <label for="name">Trip Name</label>
                    <input type="text" class="col" id="update_name" name="name" value="${data.name}">
                </div>
                <div class="col flex-col margin-t-5">
                    <label for="destination">Destination</label>
                    <input type="text" class="col" id="update_destination" name="destination" value="${data.destination}">
                </div>
                <div class="col flex-col margin-t-5">
                    <label for="date_start">Date Start</label>
                    <input type="text" class="col" id="update_date_start" name="date_start" value="${new Date(data.start).toLocaleDateString()}">
                </div>
                <div class="col flex-col margin-t-5">
                    <label for="date_end">Date End</label>
                    <input type="text" class="col" id="update_date_end" name="date_end" value="${new Date(data.end).toLocaleDateString()}">
                </div>
                <div class="col flex-col margin-t-5">
                    <label for="activity">Activity</label>
                    <input type="text" class="col" id="update_activity" name="activity" value="${data.activities}">
                </div>
                <div class="col flex-col margin-t-5">
                    <label for="description">Description</label>
                    <input type="text" class="col" id="update_description" name="description" value="${data.description}">
                </div>
                <input type="submit" value="Save"/>
            </form> 
        </section>
    `
    const memberUpdateTemplete = `
    <section id="${data._id}">
    <form class="update-form">
        <div class="col flex-col margin-t-5">
            <label for="activity">Activity</label>
            <input type="text" class="col" id="update_activity" name="activity" value="${data.activities}">
        </div>
        <div class="col flex-col margin-t-5">
            <label for="description">Description</label>
            <input type="text" class="col" id="update_description" name="description" value="${data.description}">
        </div>
        <input type="submit" value="Save"/>
    </form> 
</section>
    
    `
    if (data.user == userId) {
        $(newTarget).parent().parent().parent().parent().children('.dropdown-container').children('.update-section').append(tripUpdateTemplete);
    } else {
        $(newTarget).parent().parent().parent().parent().children('.dropdown-container').children('.update-section').append(memberUpdateTemplete);
    }
        
}

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


// =========== Drop down function ** when ** the page load ========== //

$('.dropdown-btn-add-myTrip').on('click', function (event) {
    event.target.classList.toggle("active")
     dropdownContainer = event.target.nextElementSibling;
    if (dropdownContainer.style.display === "block") {
    dropdownContainer.style.display = "none"
    } else {
    dropdownContainer.style.display = "block"
    }
})

$('.dropdown-btn-add-friends').on('mouseover', function (event) {
    event.target.classList.toggle("active")
    dropdownContainer = event.target.nextElementSibling

    if (dropdownContainer.style.display === "block") { dropdownContainer.style.display = "none" } 
        else { dropdownContainer.style.display = "block" }
})

$('.dropdown-btn-add-trip').on('mouseover', function (event) {
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
