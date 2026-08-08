async function validateUser(username, password){
  try{
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username, password: password})
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result.error_message)
    if (result.user_logged_in){
      window.location.replace('/')
    }
    return result.error_message

  } catch (error){
    window.location.replace('/error/database/connection')
  }
}



function main() {
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    document.addEventListener('submit', async event => {
        event.preventDefault();
        event.stopPropagation();
        error_message = await validateUser(usernameInput.value, passwordInput.value);
        error_element = document.querySelector('#error_message');
        error_element.innerText = error_message;
        error_element.hidden = false;
        
    })
    
}

document.addEventListener('DOMContentLoaded', main);
