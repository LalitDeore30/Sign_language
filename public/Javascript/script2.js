function convertToSignLanguage() {
    let inputText = document.getElementById("textInput").value.toLowerCase();
    let outputDiv = document.getElementById("signContainer"); // For live display
    let fullOutputDiv = document.getElementById("fullSignOutput"); // Full sentence display

    outputDiv.innerHTML = "";
    fullOutputDiv.innerHTML = "";

    let predefinedWords = [
        { src: 'images/hello.png', answer: 'hello' },
        { src: 'images/thank_you.png', answer: 'thank you' },
        { src: 'images/i_love_you.png', answer: 'i love you' },
        { src: 'images/sorry.png', answer: 'sorry' },
        { src: 'images/y_r_w.png', answer: 'you are welcome' },
        { src: 'images/yes.png', answer: 'yes' },
        { src: 'images/no.png', answer: 'no' },
        { src: 'images/house.png', answer: 'house' },
        { src: 'images/good_bye.png', answer: 'good bye' },
        { src: 'images/family.png', answer: 'family' }
    ];

    let words = inputText.split(" "); // Split the input text by spaces

    let index = 0; // To keep track of words or letters
    let delay = 1000; // Delay of 1 second between displaying each letter or word



    // Function to use speech synthesis
    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

    // Function to display words or letters one by one
    function displayNext() {
        if (index >= words.length) {
            return; // Exit if all words/letters are displayed
        }

        let word = words[index];
        let predefinedMatch = predefinedWords.find(predefinedWord => predefinedWord.answer === word);

        // Word container for full sentence display (used once)
        let wordContainer = document.createElement("div");
        wordContainer.classList.add("word-container");

        if (predefinedMatch) {
            // If a predefined word matches, display its image
            let img = document.createElement("img");
            img.src = predefinedMatch.src;
            img.alt = predefinedMatch.answer;

            // Clear the previous output and show the current predefined word's image
            outputDiv.innerHTML = ""; // Clear previous content for live output
            outputDiv.appendChild(img);

            // Speak the predefined word
            speak(predefinedMatch.answer);

            // Add predefined word image in full sentence output once
            if (!fullOutputDiv.innerHTML.includes(predefinedMatch.answer)) {
                let fullImg = document.createElement("img");
                fullImg.src = predefinedMatch.src;
                fullImg.alt = predefinedMatch.answer;

                wordContainer.appendChild(fullImg);
                fullOutputDiv.appendChild(wordContainer);
            }

            index++;
            setTimeout(displayNext, delay); // Proceed to the next word or letter
        } else {
            // If not a predefined word, display letter by letter
            let charIndex = 0;

            // Function to display each character one at a time for the current word
            function displayNextChar() {
                if (charIndex >= word.length) {
                    index++;
                    setTimeout(displayNext, delay); // Move to the next word after current word is done
                    return;
                }

                let char = word[charIndex];

                if (char >= "a" && char <= "z") {
                    let img = document.createElement("img");
                    img.src = "images/" + char + ".png"; // Alphabet images like a.png, b.png, etc.
                    img.alt = char;

                    let letterText = document.createElement("p");
                    letterText.textContent = char.toUpperCase(); // Show letter text below the image

                    outputDiv.innerHTML = ""; // Clear previous character image for live display
                    outputDiv.appendChild(img); // Display new character

                    // For full word output: Create a letter container and append the image
                    let letterContainer = document.createElement("div");
                    letterContainer.classList.add("letter-container");

                    letterContainer.appendChild(img.cloneNode()); // Clone img for the full output
                    letterContainer.appendChild(letterText);

                    wordContainer.appendChild(letterContainer);

                    // Speak the letter
                    speak(char);
                }

                charIndex++;
                setTimeout(displayNextChar, delay); // Delay for next character
            }

            displayNextChar(); // Start displaying letters for the current word

            // Add the current word's letters to the full sentence output
            fullOutputDiv.appendChild(wordContainer);
        }
    }

    displayNext(); // Start displaying words or letters one by one
}
