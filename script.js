function filterEvents(type, btn) {
    const events = document.querySelectorAll(".event-card");
    const buttons = document.querySelectorAll(".filters button");

    events.forEach(event => {
        if (type === "all") {
            event.style.display = "grid";
        } else {
            event.style.display =
                event.dataset.type === type ? "grid" : "none";
        }
    });

    buttons.forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
}
