const questions = [
    { src: 'images/a.png', answer: 'A' },
    { src: 'images/b.png', answer: 'B' },
    { src: 'images/c.png', answer: 'C' },
    { src: 'images/d.png', answer: 'D' },
    { src: 'images/e.png', answer: 'E' },
    { src: 'images/f.png', answer: 'F' },
    { src: 'images/g.png', answer: 'G' },
    { src: 'images/h.png', answer: 'H' },
    { src: 'images/i.png', answer: 'I' },
    { src: 'images/j.png', answer: 'J' },
    { src: 'images/k.png', answer: 'K' },
    { src: 'images/l.png', answer: 'L' },
    { src: 'images/m.png', answer: 'M' },
    { src: 'images/n.png', answer: 'N' },
    { src: 'images/o.png', answer: 'O' },
    { src: 'images/p.png', answer: 'P' },
    { src: 'images/q.png', answer: 'Q' },
    { src: 'images/r.png', answer: 'R' },
    { src: 'images/s.png', answer: 'S' },
    { src: 'images/t.png', answer: 'T' },
    { src: 'images/u.png', answer: 'U' },
    { src: 'images/v.png', answer: 'V' },
    { src: 'images/w.png', answer: 'W' },
    { src: 'images/x.png', answer: 'X' },
    { src: 'images/y.png', answer: 'Y' },
    { src: 'images/z.png', answer: 'Z' },
    // words and sentences
    { src: 'images/hello.png', answer: 'HELLO' },
    { src: 'images/thank_you.png', answer: 'THANK YOU' },
    { src: 'images/i_love_you.png', answer: 'I LOVE YOU' },
    { src: 'images/sorry.png', answer: 'SORRY' },
    { src: 'images/y_r_w.png', answer: 'YOU ARE WELCOME' },
    { src: 'images/yes.png', answer: 'YES' },
    { src: 'images/no.png', answer: 'NO' },
    { src: 'images/house.png', answer: 'HOUSE' },
    { src: 'images/good_bye.png', answer: 'GOOD BYE' },
    { src: 'images/family.png', answer: 'FAMILY' }
];


function learn_card(){
    for(let quest of questions) {
        let cardbox = document.querySelector('.card-box');
        
        let card = document.createElement('div');
        card.classList.add('card'); 
        card.classList.add('col');

        let learnimg = document.createElement('img');
        learnimg.classList.add('learn-img'); 
        learnimg.setAttribute("src", quest.src); 

        let cardbody = document.createElement('div');
        cardbody.classList.add('card-body'); 

        let cardtext = document.createElement('p');
        cardtext.classList.add('card-text'); 
        cardtext.textContent = quest.answer; 

        card.appendChild(learnimg);
        cardbody.appendChild(cardtext);
        card.appendChild(cardbody);
        cardbox.appendChild(card);


        card.addEventListener('click', function() {
            speakText(cardtext.textContent);
        });
    }
}

function speakText(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = .5; // You can adjust the rate of speech
    synth.speak(utterance);
}

learn_card();
