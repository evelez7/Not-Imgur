let modal_html = document.getElementById("auth-modal");
let modal = new bootstrap.Modal(modal_html);

function check_if_authenticated(event)
{
  if (logged_in === "false")
  {
    modal.show();
    event.preventDefault();
  }
}

function inject_comment(event)
{
  let form = document.getElementById("register-form");
  let new_comment = document.createElement("input");
  new_comment.setAttribute('name', "comment");
  new_comment.setAttribute('type', "text");
  new_comment.setAttribute('value', document.getElementById("comment").value);
  form.appendChild(new_comment);
  return;
}