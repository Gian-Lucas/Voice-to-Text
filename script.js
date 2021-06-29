const button = document.querySelector('.button');
const text = document.querySelector('.div-text');

const recognition = createRecognition();
let isListening = false;

button.addEventListener('click', e => {
    if (!recognition) return;

    isListening ? recognition.stop() : recognition.start();

    button.innerHTML = isListening ? 'Aperte para falar' : 'Parar de escutar';

    button.classList.toggle('button-active');

});

function createRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition : null;

    if (!recognition) {
        text.innerHTML = "Speech Recognition is not found!";
        return null;
    }

    // config
    recognition.lang = 'pt_BR';
    recognition.onstart = () => isListening = true;
    recognition.onend = () => isListening = false;
    recognition.onerror = e => console.log('error', e);

    recognition.onresult = e => text.innerHTML = e.results[0][0].transcript;

    return recognition;
};