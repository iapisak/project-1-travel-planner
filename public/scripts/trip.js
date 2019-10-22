
const userId = window.location.pathname.split('/')[2];

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
            },
            success: onSuccess,
            error: onError
        })
        $('input').val('')
        return window.location = `/profile`
    } else {
        return validation = true
    }
    
})

const onSuccess = (data)=> {
    console.log(data)
}

const onError = (response) => {
    console.log(response);
}
