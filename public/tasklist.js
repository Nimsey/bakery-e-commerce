// Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     myNodelist[i].appendChild(span);
// }
document.addEventListener('DOMContentLoaded', function () {
    const badges = document.querySelectorAll('.priority-badge');

    badges.forEach(badge => {
        const priority = badge.getAttribute('data-priority');
        switch (priority) {
            case 'High':
                badge.classList.add('badge', 'bg-danger');
                break;
            case 'Medium':
                badge.classList.add('badge', 'bg-warning');
                break;
            case 'Low':
                badge.classList.add('badge', 'bg-success');
                break;
            default:
                badge.classList.add('badge', 'bg-secondary');
        }
    });
});
// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// if field is empty throw an error
function checkEmpty() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must write something!");
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}

function openModal(taskId) {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";

    var form = document.getElementById('editForm');
    form.action = "/edit/" + taskId + "?_method=PUT";

}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modalClose")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    var boxModal = document.getElementById('myModal');
    boxModal.style.display = "none";
    boxModal.style.background.color = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    var boxModal = document.getElementById('myModal');
    if (event.target == boxModal) {
        modal.style.display = "none";
    }
}