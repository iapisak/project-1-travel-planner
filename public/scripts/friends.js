const friends = (friends) => {
    friends.forEach(function (element) {
        const friendTemplate = `
            <div>
                <input type="checkbox" id="f-${element._id}" name="${element.name}" value="${element._id}">
                <label for="f-${element._id}">${element.name}</label>
            </div>
    `
    if (element._id !== userId) {
        $('#add-friends-section').append(friendTemplate)
    }
        
    })
}

const getFriends = () => {
    fetch('/api/v1/friends', {
        method: 'GET',
    })
    .then(stream => stream.json())
    .then(res => {
        friends(res.data)
    })
    .catch(err => console.log(err))
}

getFriends()
