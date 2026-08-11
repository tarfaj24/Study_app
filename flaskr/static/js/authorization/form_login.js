import { displayError } from '../errors.js'

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
      return null;
    }
    console.log(`returning: ${result.error_message}`);
    return result.error_message

  } catch (error){
    console.error(`Error: ${error.error_message}`)
    throw error;
  }
}



function main() {
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    document.addEventListener('submit', async(event) => {
        event.preventDefault();
        event.stopPropagation();
        try{
          console.log('trying to validate user');
          const error_message = await validateUser(usernameInput.value, passwordInput.value);
          if (error_message){
            displayError(error_message, document.querySelector('#password_form_container'),'error_message');
          }
        } catch(error){
          displayError('Server couldn\t load data.',document.querySelector('#password_form_container'),'fetch_error');
        }
    
        
        
        
    })
    
}

document.addEventListener('DOMContentLoaded', main);
