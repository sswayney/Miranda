

// Function to create and open the modal
function openModal() {
    // Create the modal div and its content
    const modal = document.createElement("div");
    modal.setAttribute("id", "myModal");
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.zIndex = "1";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    const modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");
    modalContent.style.position = "absolute";
    modalContent.style.top = "50%";
    modalContent.style.left = "50%";
    modalContent.style.transform = "translate(-50%, -50%)";
    modalContent.style.backgroundColor = "#fff";
    modalContent.style.padding = "20px";
    modalContent.style.borderRadius = "5px";

    // Create the form elements
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.innerText = "Name: ";
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "name");

    const ageLabel = document.createElement("label");
    ageLabel.setAttribute("for", "age");
    ageLabel.innerText = "Age: ";
    const ageInput = document.createElement("input");
    ageInput.setAttribute("type", "number");
    ageInput.setAttribute("id", "age");

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "submitBtn");
    submitBtn.innerText = "Submit";

    // Append the form elements to the modal content
    modalContent.appendChild(nameLabel);
    modalContent.appendChild(nameInput);
    modalContent.appendChild(ageLabel);
    modalContent.appendChild(ageInput);
    modalContent.appendChild(submitBtn);

    // Append the modal content to the modal
    modal.appendChild(modalContent);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Function to close the modal
    function closeModal() {
        modal.style.display = "none";
        // Remove the modal from the DOM after closing
        document.body.removeChild(modal);
    }

    // Function to handle form submission
    submitBtn.addEventListener("click", () => {
        const name = nameInput.value;
        const age = ageInput.value;
        console.log("Name: ", name);
        console.log("Age: ", age);
        closeModal();
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Attach event listener to open the modal when the button is clicked
const openModalBtn = document.getElementById("openModalBtn");
openModalBtn.addEventListener("click", openModal);






