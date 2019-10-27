
const form = document.querySelector('form');

// If form is not falsey, listen for form submit event
form && form.addEventListener('submit', (event) => {
  let formIsValid = true;
  const userData = {};
  event.preventDefault();
  $('.alert').remove();
  
  
  // Add Alert Message
  [...form.elements].forEach(input => {
    if (input.id === 'password2' && input.value === '') {
      formIsValid = false;
      input.classList.add('input-error');
      input.insertAdjacentHTML('afterend', `
        <div class='alert ${input.id}-message'>
          Please confirm your password
        </div>
    `);
    
    } else if (input.type !== 'submit' && input.value === '') {
      formIsValid = false;
      input.classList.add('input-error');
      input.insertAdjacentHTML('afterend', `
        <div class='alert ${input.id}-message'>
          Please enter your ${input.id}
        </div>
    `);
    
    } else if (input.type === 'password' && input.value.length < 4) {
      formIsValid = false;
      input.classList.add('input-error');
      input.insertAdjacentHTML('afterend', `
        <div class='alert ${input.id}-message'>
          Password must be at least 4 characters
        </div>
    `);
    }

    if (input.type !== 'submit' && formIsValid) {
      userData[input.name] = input.value;
    }
  });

  // Handle Signup Form
  if (form.id === 'signup' && formIsValid) {
    fetch('/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(dataStream => dataStream.json())
      .then(res => {
        console.log(res)
        if (res.status === 201) return window.location = `/`;
      })
      .catch(err => console.log(err));
  }

  // Handle Login
  if (form.id === 'login' && formIsValid) {
    fetch('/api/v1/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(dataStream => dataStream.json())
      .then(res => {
        if (res.status === 201) return window.location = `/profile/${res.data.id}`;
      })
      .catch(err => console.log(err));
  }

})