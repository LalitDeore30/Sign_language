const micIcons = document.querySelectorAll(".mic-icon");
const inputs = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    message: document.getElementById("message"),
};

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let currentInput = null;

    // Set the active input when the mic icon is clicked
    micIcons.forEach((icon, index) => {
        icon.addEventListener("click", () => {
            switch (index) {
                case 0:
                    currentInput = inputs.name;
                    break;
                case 1:
                    currentInput = inputs.email;
                    break;
                case 2:
                    currentInput = inputs.phone;
                    break;
                case 3:
                    currentInput = inputs.message;
                    break;
            }

            recognition.start();
        });
    });

    recognition.addEventListener("result", (event) => {
        const transcript = event.results[0][0].transcript; // Get the transcribed text
        currentInput.value += transcript; // Append the transcript to the active input field
    });

    recognition.addEventListener("end", () => {
        // Optionally, give feedback after recognition ends
    });

    recognition.addEventListener("start", () => {
        // Optionally, change mic icon color or behavior when recognition starts
    });
} else {
    alert("Speech recognition is not supported in this browser.");
    micIcons.forEach((icon) => {
        icon.style.display = "none"; // Hide microphone icon if not supported
    });
}