let photo_count = 0;
function get_photos()
{
    let photo_container = document.getElementById("photo_container");
    document.getElementById("photo_button").remove();
    let photo_count_div = document.createElement("div");
    document.body.insertBefore(photo_count_div, photo_container);
    photo_count_div.setAttribute("id", "photo_count");

    document.body.append
    let photo_response= fetch("https://jsonplaceholder.typicode.com/albums/2/photos").then(async (response) => {
        const data = await response.json();
        let photo_count_h1 = document.createElement("h1");
        photo_count_div.appendChild(photo_count_h1);
        photo_count_div.setAttribute("id", photo_count);
        photo_count = data.length;
        photo_count_h1.append(document.createTextNode("Photo count: ".concat(photo_count)));
        for (var x in data)
        {
            let new_photo = document.createElement("div");
            // document.getElementById("photo_container").insertBefore(new_photo, document.getElementById("photo_container").lastChild.nextSibling);
            document.getElementById("photo_container").append(new_photo);
            // new_photo.setAttribute("onclick", "fade_out(event);")
            new_photo.setAttribute("id", "photo-".concat(x) );
            new_photo.addEventListener("click", () => new_photo.style.opacity = '0');
            new_photo.addEventListener("transitionend", () => {
                new_photo.remove();
                photo_count = photo_count - 1;
                photo_count_div.removeChild(photo_count_div.lastChild);
                let updated_h1 = document.createElement("h1");
                photo_count_div.appendChild(updated_h1);
                updated_h1.append(document.createTextNode("Photo count: ".concat(photo_count)));
            });
            
            let new_image_elem = document.createElement("img");
            new_photo.appendChild(new_image_elem);
            new_image_elem.setAttribute("src", data[x]["thumbnailUrl"]);

            let new_h1_elem = document.createElement("h1");
            new_photo.appendChild(new_h1_elem);
            new_h1_elem.appendChild(document.createTextNode(data[x]["title"]))
        }
    });
}

function fade_out(event)
{

}