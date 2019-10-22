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
                // "user": req.session.currentUser,
            },
            success: onSuccessTrip,
            error: onError
        })
        $('input').val('')
    } else {
        return validation = true
    }
})

const onSuccessTrip = (data)=> {
    console.log(data)
}

const onError = (response) => {
    console.log(response);
}


// ================ Show Trip ================  //

const onSuccessGetTrip = (data) => {
    // console.log(data)
    data.forEach(function(element) {
        const tripTemplete = `
        <div>
            <p>Name : ${element.name}</p>
            <p>Destination : ${element.destination}</p>
        </div>
    `
    $('.show-trip').append(tripTemplete)
    })
    
}

const getTrip = () => {
    fetch(`/api/v1/trip`, {
        method: 'GET',
      })
        .then(dataStream => dataStream.json())
        .then(res => {
           onSuccessGetTrip(res.data)
        })
        .catch(err => console.log(err));
}

getTrip()
