function getNextEvent() {
    const currentDate = new Date();
    const countdownElement = window.innerWidth <= 768 ? document.getElementById('mobile-countdown') : document.getElementById('desktop-countdown');


    // Filtere alle Ereignisse, die in der Zukunft liegen
    const futureEvents = events.filter(event => {
        const eventDate = new Date(event.datum);
        return eventDate > currentDate; // Nur zukünftige Ereignisse berücksichtigen
    });

    // Wenn es ein zukünftiges Ereignis gibt, wähle das erste (nächste)
    if (futureEvents.length > 0) {
        const nextEvent = futureEvents.sort((a, b) => new Date(a.datum) - new Date(b.datum))[0];
        return nextEvent;
    }

    return null; // Wenn keine zukünftigen Ereignisse vorhanden sind
}

// Funktion, die den Countdown berechnet und in der Navbar anzeigt
function updateCountdown() {
    const nextEvent = getNextEvent();
    const countdownElement = window.innerWidth <= 768 ? document.getElementById('mobile-countdown') : document.getElementById('countdown');

    if (nextEvent) {
        const targetDate = new Date(nextEvent.datum);
        const timeDifference = targetDate - new Date();

        if (timeDifference <= 0) {
            countdownElement.textContent = "Das nächste Ereignis ist heute!";
            return;
        }

        // Berechnung der verbleibenden Tage, Stunden und Minuten
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        countdownElement.textContent = `${days} Tage, ${hours} Stunden, ${minutes} Minuten bis zum ${nextEvent.ereignis}`;
    } else {
        countdownElement.textContent = "Keine zukünftigen Ereignisse.";
    }
}

// Alle 1000 Millisekunden (1 Sekunde) den Countdown aktualisieren
setInterval(updateCountdown, 100000);

// Initiale Anzeige des Countdowns
updateCountdown();