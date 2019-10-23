// ================ Find Friends ================  //
const onSuccessGetFriend = (friends) => {
    console.log(friends)
}


$('#friends').on('click', function () {
    console.log('Hello')
    fetch(`http://localhost:3000/api/v1/friends`, {
        method: 'GET',
    })
    .then(stream => stream.json())
    .then(res => {
        onSuccessGetFriend(res.data)
    })
    .catch(err => console.log(err))
})


// ================ Trip form front-end ================  //
let validation = true

const formValidation = () => {
    if ($('#name').val() === "") {validation = false}
    if ($('#destination').val() === "") {validation = false} 
    if ($('#date_start').val() === "") {validation = false}
    if ($('#date_end').val() === "") {validation = false}
    if ($('#activity').val() === "") {validation = false}
}

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
    console.log(event.target)
    $(this).parent().remove()
    let tripId = $(event.target).parent().attr('id') // Select id from <div id> that just exists
    console.log(tripId)
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
    // console.log(Date(data[0].start))
    data.forEach(function(element) {
        const tripTemplete = `
        <div class="trip-section">
            <button class="dropdown-btn">
                <p><h3>${element.name}</h3></p>
                <p>Destination : ${element.destination} | ${new Date(element.start).toLocaleDateString()}</p>
            </button>
            <div class="dropdown-container">
                <div id=${element._id}>
                    <p>Activity : ${element.activities}</p>
                    <button class="delete">Delete</button>
                    <button class="update">Update</button>
                </div>
            </div>
        </div>
    `
    $('.show-trip').append(tripTemplete)
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

// ================ Pull Data Before Update  ================  //
const onSuccessPullTrip = (data) => {
    // console.log(data)
    const tripUpdateTemplete = `
    <main>
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
              <input type="text" class="form-control" id="update_date_start" name="date_start" value="${data.start}">
          </div>
            <div class="form-group">
                <label for="date_end">Date End</label>
                <input type="text" class="form-control" id="update_date_end" name="date_end" value="${data.end}">
            </div>
            <div class="form-group">
                <label for="activity">Activity</label>
                <input type="text" class="form-control" id="update_activity" name="activity" value="${data.activities}">
            </div>
            <input type="submit" value="Save"/>
        </form> 
      </section>
      </main>
    `
    $('.show-trip').append(tripUpdateTemplete)
}

$('.show-trip').on('click', '.update', function () {
    let tripId = $(event.target).parent().attr('id') // Select id from <div id> that just exists
    // console.log(tripId)
    fetch(`http://localhost:3000/api/v1/${tripId}`, {
        method: 'GET',
    })
    .then(stream => stream.json())
    .then(res => {
        onSuccessPullTrip(res.data)
    })
    .catch(err => console.log(err))
})

// ================ Update  ================  //
$(".show-trip").on('submit', ".update-form", function (event) {
    let newId = window.location.pathname.split('/')[2]
    // console.log('Hello')
    event.preventDefault()
    formValidation()
    let tripId = $(event.target).parent().attr('id')
    // console.log(tripId)
    // console.log('UPDATE FORM DATA --> ', $('.update-form').serialize())
    const updateData = {
        name: $('#update_name').val(),
        destination: $('#update_destination').val(),
        start: $('#update_date_start').val(),
        end: $('#update_date_end').val(),
        activities: $('#update_activity').val(),
    }
    console.log(updateData);
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