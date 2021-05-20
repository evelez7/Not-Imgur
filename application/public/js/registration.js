window.addEventListener('load', () =>
{
  // highlight nav item for current page
  let current_nav_item = document.getElementById('register-nav');
  current_nav_item.classList.add('active');

  //
  $("#password")
    .popover({
      html: true,
      title: 'Password Requirements',
      placement: 'right',
      content: () =>
      {
        return $("#password-reqs").html();
      }
    })
    .blur(function ()
    {
      $(this).popover('hide');
    });
});

let valid_password = false;
/**
 * Client-side credential validation
 *
 * Credentials include the username and password, which should conform to certain conditions
 */
function validate_credentials()
{
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  // check that passwords match
  if (document.getElementById('password').value == document.getElementById('confirm-password').value) {
    let message_span = document.getElementById("valid_password_message");

    message_span.style.color = "green";
    message_span.innerHTML = "Passwords match";

    // if passwords match, check that they match regex conditions
    let password_pattern = new RegExp('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[/\*-+!@#\$\^&]).*');
    if (password_pattern.test(password)) {
      message_span.innerHTML = "Passwords match and meet requirements";
      valid_password = true;
    } else {
      message_span.style.color = "red";
      message_span.innerHTML = "Password does not conform to conditions";
      valid_password = false;
    }
  } else {
    valid_password = false;

    document.getElementById('valid_password_message').style.color = 'red';
    document.getElementById('valid_password_message').innerHTML = "Passwords not matching";
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