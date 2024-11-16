const BASE_URL = {
  api_url: "http://localhost:3000",
  prod_api_url: "https://free-walrus-qa-senpai-11322ee0.koyeb.app",
};

/// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select the form element
  const form = document.getElementById("verificationForm");

  // Add an event listener for form submission
  form.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the input values
    const studentName = document.getElementById("student-name").value.trim();
    const certificateID = document
      .getElementById("certificate-id")
      .value.trim();

    // Basic form validation
    if (studentName === "" || certificateID === "") {
      // Show an error if either field is empty
      alert("Please fill in both the student name and certificate ID.");
    } else {
      fetch(
        `${BASE_URL.prod_api_url}/api/certificate/?full_name=${studentName}&certificateId=${certificateID}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Certificate not found");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // If the certificate is valid, show the success modal
          if (data.isValid) {
            showModal("successModal");
          } else {
            // If the certificate is not valid, show the error modal
            showModal("errorModal");
          }
        })
        .catch((error) => {
          // Handle error (e.g., certificate not found, network error)
          showModal("errorModal");
        });
    }

    // API call to check if the certificate ID is valid
  });
});

function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "flex"; // Show the modal

  const closeModal = modal.querySelector(".close");
  closeModal.onclick = function () {
    modal.style.display = "none"; // Hide the modal when clicking on the close button
  };

  // Hide the modal if the user clicks outside of it
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
