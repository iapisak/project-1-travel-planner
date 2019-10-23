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
    // console.log(data)
    data.forEach(function(element) {
        const tripTemplete = `
        <div id=${element._id}>
            <p>Name : ${element.name}</p>
            <p>Destination : ${element.destination}</p>
            <button class="delete">Delete</button>
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
