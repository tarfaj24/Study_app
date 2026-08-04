function hide_feedbacks(feedbacks){
  feedbacks.forEach(element => {
      element.hidden = true;
    });
}

async function fetch_username_status(username){
  if (username){
    try{
      const response = await fetch('/register?username=' + username);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result.username_status

    } catch (error){
      // window.location.replace('/server_error')
      console.error(error)
    }
  }
}

async function validate_username(username, feedbacks){
  
  username_in_db = await fetch_username_status(username.value);

  hide_feedbacks(feedbacks);
  document.querySelector('.username_container').classList.add('was-validated');

  valid_db_status = false;
  valid_len = false;
  
  if (username_in_db){
    username.setCustomValidity('Invalid field.');
    document.querySelector('[data-feedback="username-in-db"]').hidden = false;
  }
  else{
    valid_db_status = true;
  }

  if (username.value.length < 4){
    username.setCustomValidity('Invalid field.');
    document.querySelector('[data-feedback="username-min-len"]').hidden = false;
  }
  else if(username.value.length > 50){
    username.setCustomValidity('Invalid field.');
    document.querySelector('[data-feedback="username-max-len"]').hidden = false;
  }
  else{
    valid_len = true;
  }

  if (valid_len && valid_db_status){
    username.setCustomValidity('');
  }
};

function validate_password(password, feedbacks, confirm_pass, feedbacks_confirm_pass){
  hide_feedbacks(feedbacks);
  document.querySelector('.password_container').classList.add('was-validated');
  let has_letter = false;
  let has_number = false;
  let valid_len = false;
  if (password.value.length < 8){
    password.setCustomValidity('Invalid field.');
    document.querySelector('[data-feedback="password-min-len"]').hidden = false;
  }
  else if(password.value.length > 50){
    password.setCustomValidity('Invalid field.');
    document.querySelector('[data-feedback="password-max-len"]').hidden = false;
  }
  else{
    valid_len = true;
  }
  
  if (!(/[a-zA-Z]/.test(password.value))){
    password.setCustomValidity('Invalid field.');
    document.querySelector('[data-feedback="password-alpha"]').hidden = false;
  }
  else{
    has_letter = true;
  }
  if (!(/[0-9]/.test(password.value))){
    password.setCustomValidity('Invalid field.');
    document.querySelector('[data-feedback="password-numeric"]').hidden = false;
  }
  else{
    has_number = true;
  }

  if (has_letter && has_number && valid_len){
    password.setCustomValidity('');
  }
  validate_confirm_pass(confirm_pass, password, feedbacks_confirm_pass);
};

function validate_confirm_pass(confirm_pass, password, feedbacks){
  document.querySelector('.pass_confirm_container').classList.add('was-validated');
  hide_feedbacks(feedbacks);
  console.log(confirm_pass.value,"next to:", password.value)
  if (confirm_pass.value != password.value){
    confirm_pass.setCustomValidity('Invalid field.');
    document.querySelector('[data-feedback="no-match"]').hidden = false;
    if(!(password.checkValidity())){
      document.querySelector('[data-feedback="password-invalid"]').hidden = true;
    }
  }
  else if(!(password.checkValidity())){
    document.querySelector('[data-feedback="no-match"]').hidden = true;
    confirm_pass.setCustomValidity('Invalid field.');
    document.querySelector('[data-feedback="password-invalid"]').hidden = false;
  }
  else{
    confirm_pass.setCustomValidity('');
  }
};


function main(){

  const form = document.querySelector('.needs-validation');
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const confirm_pass = document.querySelector('#pass_confirm');
  const invalid_feedback_username = document.querySelectorAll('[data-credential="username"]');
  const invalid_feedback_passsword = document.querySelectorAll('[data-credential="password"]');
  const invalid_feedback_confirm = document.querySelectorAll('[data-credential="pass_confirm"]');

  username.addEventListener('input', event => {
    validate_username(username, invalid_feedback_username);
  });

  password.addEventListener('input', event => {
    validate_password(password, invalid_feedback_passsword, confirm_pass, invalid_feedback_confirm);
  });

  confirm_pass.addEventListener('input', event => {
    validate_confirm_pass(confirm_pass, password, invalid_feedback_confirm);
  });

  
  form.addEventListener('submit', event => {
    if (!(username.checkValidity()) || !(password.checkValidity()) || !(confirm_pass.checkValidity())){
      event.stopPropagation();
      event.preventDefault();
      form.classList.add('was-validated');
      validate_username(username, invalid_feedback_username);
      validate_password(password, invalid_feedback_passsword, confirm_pass, invalid_feedback_confirm);
      validate_confirm_pass(confirm_pass, password, invalid_feedback_confirm);
    }
    
  });
}; 

document.addEventListener('DOMContentLoaded', main);