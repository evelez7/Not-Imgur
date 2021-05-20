let modal_html = document.getElementById("auth-modal");
let modal = new bootstrap.Modal(modal_html);

// checks the logged_in var passed from the route to show modal or not
function check_if_authenticated(event)
{
  console.log("check: ", logged_in);
  if (logged_in === "false")
  {
    modal.show();
    event.preventDefault();
  }
}

/**
 * Inject a comment to the form to take it along with the login request
 *
 * You are allowed to submit a comment if you decide to log in
 * The comment itself is a different form, so take the comment from that form and
 * stick it into the login form as an <input>
 */
function inject_comment(event, form_name)
{
  let form = document.getElementById(form_name + "-form");
  let new_comment = document.createElement("input");
  new_comment.setAttribute('name', "comment");
  new_comment.setAttribute('type', "text");
  new_comment.setAttribute('value', document.getElementById("comment").value);
  new_comment.style.visibility="hidden";
  form.appendChild(new_comment);

  let new_id = document.createElement("input");
  new_id.setAttribute('name', "postId");
  new_id.setAttribute('type', "text");
  new_id.setAttribute('value', post_Id);
  new_id.style.visibility="hidden";
  form.appendChild(new_id);
  return;
}

let valid_password = false;
/**
 * Client-side credential validation
 *
 * Credentials include the username and password, which should conform to certain conditions
 */
function validate_credentials()
{
  let username = document.getElementById('register-name').value;
  let password = document.getElementById('register-password').value;
  // check that passwords match
  if (document.getElementById('register-password').value == document.getElementById('register-password-confirm').value) {
    let message_span = document.getElementById("valid-password-message");

    // $('#password-matches-field').text("Passwords match ");
    // $('#password-matches-field').css("color", "green");
    message_span.style.color = "green";
    message_span.innerHTML = "Passwords match";

    // if passwords match, check that they match regex conditions
    let password_pattern = new RegExp('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[/\*-+!@#\$\^&]).*');
    if (password_pattern.test(password)) {
      // $('#password-matches-field').text("Passwords match and meet requirements");
      // $('#password-matches-field').css("color", "green");
      message_span.innerHTML = "Passwords match and meet requirements";
      valid_password = true;
    } else {
      // $('#password-matches-field').text("Password does not conform to conditions");
      // $('#password-matches-field').css("color", "red");
      message_span.style.color = "red";
      message_span.innerHTML = "Password does not conform to conditions";
      valid_password = false;
    }
  } else {
    valid_password = false;

    // $('#password-matches-field').text("Passwords not matching");
    // $('#password-matches-field').css("color", "red");
    document.getElementById('valid-password-message').style.color = 'red';
    document.getElementById('valid-password-message').innerHTML = "Passwords not matching";
  }
}

/**
 * Function is called when registration form is submitted
 */
function registration_submit(event)
{
  // valid_password is set in validate_credentials
  if (!valid_password) {
    event.preventDefault();
  }
}