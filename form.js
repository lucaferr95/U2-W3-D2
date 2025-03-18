document.addEventListener("DOMContentLoaded", () => {
  const timerNumber = document.getElementById("timer-number"); // Numero al centro
  const donutLine = document.getElementById("donut-line"); // Ciambella animata

  const startTime = Date.now(); // Tempo di inizio

  const timer = () => {
    const now = Date.now();
    const tempoTrascorso = Math.floor((now - startTime) / 1000); // Secondi trascorsi
    timerNumber.textContent = tempoTrascorso; // Aggiorna il numero al centro

    // Aggiorna la ciambella (loop continuo ogni 30 secondi)
    const percentage = ((tempoTrascorso % 30) / 30) * 100; // Percentuale animazione
    donutLine.style.background = `conic-gradient(#ff00d4 0% ${percentage}%, rgba(230, 21, 212, 0.2) ${percentage}% 100%)`;

    // Continua l'aggiornamento
    requestAnimationFrame(timer);
  };

  // Avvia il timer
  timer();
});

// --- SEZIONE GESTIONE NOMI ---
// Recupera gli elementi dal DOM
const textInput = document.getElementById("exampleInputName1");
const saveButton = document.getElementById("saveButton");
const resetButton = document.getElementById("removeButton");
const labelElement = document.querySelector("label[for='exampleInputName']");
const previousNameDisplay = document.createElement("p"); // Elemento per mostrare il valore salvato
previousNameDisplay.classList.add("text-muted", "fw-bold"); // Aggiungi stile
labelElement.parentNode.insertBefore(previousNameDisplay, labelElement); // Posiziona sopra l'input

// Inizializza l'array e salva subito nel localStorage se non esiste
let namesArray = JSON.parse(localStorage.getItem("names")) || [];
localStorage.setItem("names", JSON.stringify(namesArray)); // Salva nel localStorage

// Gestione del pulsante SAVE
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  const name = textInput.value.trim();
  if (!name) return alert("Inserisci un nome valido!");

  namesArray.push(name); // Aggiungi il nome all'array
  localStorage.setItem("names", JSON.stringify(namesArray)); // Aggiorna il localStorage

  previousNameDisplay.textContent = `Ultimo nome salvato: ${name}`; // Aggiorna il display
  textInput.value = ""; // Resetta l'input
});

// Gestione del pulsante REMOVE
removeButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (namesArray.length === 0) {
    alert("Non ci sono nomi da rimuovere!"); // Mostra un messaggio se l'array è vuoto
    return;
  }

  namesArray.pop(); // Rimuovi l'ultimo elemento dall'array
  localStorage.setItem("names", JSON.stringify(namesArray)); // Aggiorna il localStorage

  // Aggiorna il display
});
