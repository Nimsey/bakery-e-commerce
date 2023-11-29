// Create a "close" button and append it to each list item
// let myNodelist = document.getElementsByTagName("LI");
// let i;
// for (i = 0; i < myNodelist.length; i++) {
//     let span = document.createElement("SPAN");
//     let txt = document.createTextNode("\u00D7");
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
            case 'Future Me':
                badge.classList.add('badge', 'bg-info');
            case 'Default':
                badge.classList.add('badge', 'bg-primary');
        }
    });
});
// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
let i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Attach event listeners to edit buttons
    let editButtons = document.querySelectorAll('.editBtn');
    editButtons.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent event bubbling to parent li

            // Extract taskId from the button and open the modal
            let taskId = this.getAttribute('data-task-id'); // Ensure you set this attribute in your HTML
            openModal(taskId);
        });
    });

    // Existing code for list item click handling
    let list = document.querySelector('#myUL');
    if (list) {
        list.addEventListener('click', function (ev) {
            // Check if the clicked element is a list item or within a list item
            if (ev.target.tagName === 'LI' || ev.target.closest('li')) {
                ev.target.closest('li').classList.toggle('checked');
            }
        }, false);
    }
});

function openModal(taskId) {
    let modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = "block";
    }

    let form = document.getElementById('editForm');
    if (form) {
        form.action = "/edit/" + taskId + "?_method=PUT";
    }
}


// Add a "checked" symbol when clicking on a list item
// document.addEventListener('DOMContentLoaded', function () {
//     let list = document.querySelector('#myUL');
//     if (list) {
//         list.addEventListener('click', function (ev) {
//             if (ev.target.tagName === 'LI') {
//                 ev.target.classList.toggle('checked');
//             } else if (ev.target.closest('li')) {
//                 // This will ensure that clicking on child elements of the li also triggers the event
//                 ev.target.closest('li').classList.toggle('checked');
//             }
//         }, false);
//     }
// });


// if field is empty throw an error
function checkEmpty() {
    let inputValue = document.getElementById("myInput").value;
    let emailValue = document.getElementById("emailInput").value;
    if (inputValue.trim() === '' || emailValue.trim() === '') {
        alert("You must fill in the fields");
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}

// function openModal(taskId) {
//     let modal = document.getElementById('myModal');
//     modal.style.display = "block";

//     let form = document.getElementById('editForm');
//     form.action = "/edit/" + taskId + "?_method=PUT";

// }


// Get the <span> element that closes the modal
document.addEventListener('DOMContentLoaded', function() {
    // Your existing code goes here
    let span = document.getElementsByClassName("modalClose")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    console.log("Close button clicked"); // Debugging line
    let boxModal = document.getElementById('myModal');
    boxModal.style.display = "none";
    boxModal.style.background.color = "none";
}
});


// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     let boxModal = document.getElementById('myModal');
//     if (event.target == boxModal) {
//         modal.style.display = "none";
//     }
// }

