function validate_password_inline()
{
    if (document.getElementById('password').value == document.getElementById('confirm_password').value)
    {
        document.getElementById('valid_password_message').style.color = 'green';
        document.getElementById('valid_password_message').innerHTML = "Passwords match";
    } else
    {

        document.getElementById('valid_password_message').style.color = 'red';
        document.getElementById('valid_password_message').innerHTML = "Passwords not matching";
    }
}

function registration_submit(event)
{

    if (document.getElementById('password').value == document.getElementById('confirm_password').value)
    {
        // if match, check validity with regex
        let password_pattern = new RegExp('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[/\*-+!@#\$\^&]).*');
        let username_pattern = new RegExp('^[a-zA-Z].*')
        if (password_pattern.test(document.getElementById('password').value) && username_pattern.test(document.getElementById('username').value))
        {

            // just refresh page if the passwords is valid to 'submit' 
            location.reload();
            return true
        }
        return false;
    } else
    {
        return false;
    }
}