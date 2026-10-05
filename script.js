async function translateText() {

    const text = document.getElementById("textInput").value;
    const source = document.getElementById("sourceLanguage").value;
    const target = document.getElementById("targetLanguage").value;

    if (text.trim() === "") {
        alert("Please enter some text.");
        return;
    }

    const result = document.getElementById("result");

    result.innerText = "Translating...";

    try {
        const url =
            "https://api.mymemory.translated.net/get?q=" +
            encodeURIComponent(text) +
            "&langpair=" +
            source +
            "|" +
            target;

        const response = await fetch(url);
        const data = await response.json();

        result.innerText = data.responseData.translatedText;

    } catch (error) {
        result.innerText = "Translation failed. Please try again.";
        console.error(error);
    }
}


function copyText() {

    const text = document.getElementById("result").innerText;

    navigator.clipboard.writeText(text);

    alert("Translation copied!");
}


function speakText() {

    const text = document.getElementById("result").innerText;

    if (!text || text === "Translation will appear here...") {
        alert("Please translate some text first.");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    const targetLanguage =
        document.getElementById("targetLanguage").value;

    const languageMap = {
        en: "en-US",
        te: "te-IN",
        hi: "hi-IN",
        ta: "ta-IN",
        fr: "fr-FR",
        es: "es-ES"
    };

    speech.lang = languageMap[targetLanguage] || "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;

    setTimeout(function () {
        window.speechSynthesis.speak(speech);
    }, 100);
}