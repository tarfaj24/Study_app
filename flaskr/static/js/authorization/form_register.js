import { displayFetchError } from '../errors.js'

function hideFeedbacks(feedbacks){
  feedbacks.forEach(element => {
      element.hidden = true;
    });
}

async function fetchUsernameStatus(username){
  if (username){
    try{
      const response = await fetch('/register?username=' + username);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      return result.usernameStatus
    } catch (error){
      console.error(`Error in fetchUsernameStatus:${error.message}`);
      throw error;
    }
  }
}

async function getInvalidFeedbackUsername(username){
  
  if (username.length < 4){
    return 'username-min-len'
  }
  if(username.length > 50){
    return 'username-max-len'
  }

  const usernameExists = await fetchUsernameStatus(username);
  console.log('username exists: ',usernameExists)
  if (usernameExists){
    return 'username-in-db'
  }
  return null
}

function getInvalidFeedbacksPassword(password){
  const invalidFeedbacks = [];
  if (password.length < 8){
    invalidFeedbacks.push('password-min-len');
  }
  if(password.length > 50){
    invalidFeedbacks.push('password-max-len');
  }
  if (!(/[a-zA-Z]/.test(password))){
    invalidFeedbacks.push('password-alpha');
  }
  if (!(/[0-9]/.test(password))){
    invalidFeedbacks.push('password-numeric');
  }
  return invalidFeedbacks
}

function getInvalidFeedbacksConfirmPassword(passwordElement, confirmPassword){
  const invalidFeedbacks = [];
  const password = passwordElement.value;
  if (confirmPassword != password){
    invalidFeedbacks.push('no-match') 
  }
  if(!(passwordElement.checkValidity())){
    invalidFeedbacks.push('password-invalid');
  }
  return invalidFeedbacks;

}

function displayInvalidField(credentialElement, dataFeedback){
  credentialElement.setCustomValidity('Invalid field.');
  document.querySelector(`[data-feedback="${dataFeedback}"]`).hidden = false;
}

async function validateUsername(usernameElement, feedbacks){
  hideFeedbacks(feedbacks);
  document.querySelector('.username_container').classList.add('was-validated');
  try{
    const invalidFeedback = await getInvalidFeedbackUsername(usernameElement.value)

    if (document.querySelector('#register_fetch_error'))
    {
      document.querySelector('#register_fetch_error').remove();
    }

    if (!invalidFeedback){
      usernameElement.setCustomValidity('');
    }
    else{
      displayInvalidField(usernameElement, invalidFeedback);
    }
  } catch(error){
    console.log('fetch_error happend');
    displayFetchError('Server couldn\'t load data.', document.querySelector('.pass_confirm_container'), 'register_fetch_error');
    throw error;
  }


};

function validatePassword(passwordElement, feedbacks, confirmPassElement, feedbacksConfirmPassword){
  hideFeedbacks(feedbacks);
  document.querySelector('.password_container').classList.add('was-validated');

  const invalidFeedbacks = getInvalidFeedbacksPassword(passwordElement.value)
  if (invalidFeedbacks.length != 0){
    for (const invalidFeedback of invalidFeedbacks){
      displayInvalidField(passwordElement, invalidFeedback)
    }
  }
  else{
    console.log("is set to valid")
    passwordElement.setCustomValidity('');
  }
  validateConfirmPassword(confirmPassElement, passwordElement, feedbacksConfirmPassword);
};

function validateConfirmPassword(confirmPassElement, passwordElement, feedbacks){
  hideFeedbacks(feedbacks);
  document.querySelector('.pass_confirm_container').classList.add('was-validated');

  const invalidFeedbacks = getInvalidFeedbacksConfirmPassword(passwordElement, confirmPassElement.value)

  if (invalidFeedbacks.length != 0){
    for (const invalidFeedback of invalidFeedbacks){
      displayInvalidField(confirmPassElement, invalidFeedback)
    }
  }
  else{
    confirmPassElement.setCustomValidity('');
  }
};


function main(){

  const form = document.querySelector('.needs-validation');
  const usernameElement = document.querySelector('#username');
  const passwordElement = document.querySelector('#password');
  const confirmPasswordElement = document.querySelector('#pass_confirm');
  const invalidFeedbackUsername = document.querySelectorAll('[data-credential="username"]');
  const invalidFeedbackPasssword = document.querySelectorAll('[data-credential="password"]');
  const invalidFeedbackConfirm = document.querySelectorAll('[data-credential="pass_confirm"]');


  usernameElement.addEventListener('input', () => {
    validateUsername(usernameElement, invalidFeedbackUsername);
  });

  passwordElement.addEventListener('input', () => {
    validatePassword(passwordElement, invalidFeedbackPasssword, confirmPasswordElement, invalidFeedbackConfirm);
  });

  confirmPasswordElement.addEventListener('input', () => {
    validateConfirmPassword(confirmPasswordElement, passwordElement, invalidFeedbackConfirm);
  });

  
  form.addEventListener('submit', async(event) => {
    if (!(usernameElement.checkValidity()) || !(passwordElement.checkValidity()) || !(confirmPasswordElement.checkValidity())){
      event.stopPropagation();
      event.preventDefault();
      form.classList.add('was-validated');
      await validateUsername(usernameElement, invalidFeedbackUsername);
      validatePassword(passwordElement, invalidFeedbackPasssword, confirmPasswordElement, invalidFeedbackConfirm);
      validateConfirmPassword(confirmPasswordElement, passwordElement, invalidFeedbackConfirm);
    }
  });
}; 

document.addEventListener('DOMContentLoaded', main);