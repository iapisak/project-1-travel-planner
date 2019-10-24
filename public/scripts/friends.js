const friends = (friends) => {
    friends.forEach(function (element) {
        const friendTemplate = `
            <div>
                <input type="checkbox" id="f-${element._id}" name="friend" value="${element._id}">
                <label for="f-${element._id}">${element.name}</label>
            </div>
    `
        $('#add-friends-section').append(friendTemplate)
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