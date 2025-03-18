document.addEventListener("DOMContentLoaded", () => {
  // Recupera il contenitore del timer
  const timerContainer = document.querySelector("#timer-container");

  // Assicurati che il contenitore esista
  if (!timerContainer) {
    console.error("Elemento #timer-container non trovato!");
    return;
  }

  // Creazione dell'elemento per il timer
  const timerNumber = document.createElement("div");
  timerNumber.classList.add("number");
  timerContainer.appendChild(timerNumber);

  // Recupera il cerchio animato (donut)
  const donutLine = document.getElementById("donut-line");

  // Inizializza il tempo di avvio
  const startTime = Date.now();
  let timerAnimationFrame;

  // Funzione per il timer (conteggio in avanti)
  const timer = () => {
    // Calcola il tempo trascorso in secondi
    const now = Date.now();
    const tempoTrascorso = Math.floor((now - startTime) / 1000);

    // Aggiorna il testo del timer
    timerNumber.textContent = tempoTrascorso;

    // Aggiorna l'animazione del cerchio (loop ogni 30 secondi)
    if (donutLine) {
      const percentage = ((tempoTrascorso % 30) / 30) * 100;
      donutLine.style.background = `conic-gradient(#00ffff 0% ${percentage}%, rgba(255, 255, 255, 0.5) ${percentage}% 100%)`;
    }

    // Continua l'aggiornamento
    timerAnimationFrame = requestAnimationFrame(timer);
  };

  // Avvia il timer
  timer();

  // --- SEZIONE GESTIONE NOMI ---
  const textInput = document.getElementById("exampleInputName1");
  const saveButton = document.getElementById("saveButton");
  const resetButton = document.getElementById("removeButton");
  const previousNameDisplay = document.createElement("p");
  previousNameDisplay.classList.add("text-muted", "fw-bold");
  textInput.parentNode.insertBefore(previousNameDisplay, textInput);

  // Inizializza l'array dei nomi dal localStorage
  let namesArray = JSON.parse(localStorage.getItem("names")) || [];

  // Aggiorna il valore visibile sopra l'input
  const updatePreviousNameDisplay = () => {
    if (namesArray.length > 0) {
      const lastSavedName = namesArray[namesArray.length - 1];
      previousNameDisplay.textContent = `Ultimo nome salvato: ${lastSavedName}`;
    } else {
      previousNameDisplay.textContent = "Nessun nome salvato.";
    }
  };

  // Salva un nuovo nome nel localStorage
  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = textInput.value.trim();
    if (name !== "") {
      namesArray.push(name);
      localStorage.setItem("names", JSON.stringify(namesArray));
      updatePreviousNameDisplay();
      textInput.value = "";

      // Mostra una notifica di successo
      const successAlert = document.getElementById("success-alert");
      successAlert.classList.remove("invisible", "alert-going");
      successAlert.classList.add("alert-coming");

      setTimeout(() => {
        successAlert.classList.add("alert-going");
      }, 3000);
    } else {
      alert("Inserisci un nome prima di salvarlo!");
    }
  });

  // Rimuove l'ultimo valore salvato nel localStorage
  resetButton.addEventListener("click", () => {
    if (namesArray.length > 0) {
      namesArray.pop();
      localStorage.setItem("names", JSON.stringify(namesArray));
      updatePreviousNameDisplay();

      // Mostra una notifica di successo
      const resetAlert = document.getElementById("reset-alert");
      resetAlert.classList.remove("invisible", "alert-going");
      resetAlert.classList.add("alert-coming");

      setTimeout(() => {
        resetAlert.classList.add("alert-going");
      }, 3000);
    } else {
      alert("Non c'è nulla da rimuovere.");
    }
  });

  // Recupera e mostra i dati salvati nel localStorage all'avvio
  updatePreviousNameDisplay();
});
