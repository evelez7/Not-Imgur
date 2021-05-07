let modal_html = document.getElementById("auth-modal");
let modal = new bootstrap.Modal(modal_html);

function check_if_authenticated(event)
{
  if (logged_in === "false")
  {
    console.log("false!");
    modal.show();
    event.preventDefault();
  }
}

function inject_comment(event, form_name)
{
  let form = document.getElementById(form_name + "-form");
  let new_comment = document.createElement("input");
  new_comment.setAttribute('name', "comment");
  new_comment.setAttribute('type', "text");
  new_comment.setAttribute('value', document.getElementById("comment").value);
  form.appendChild(new_comment);

  let new_id = document.createElement("input");
  new_id.setAttribute('name', "postId");
  new_id.setAttribute('type', "text");
  new_id.setAttribute('value', post_Id);
  form.appendChild(new_id);
  return;
}