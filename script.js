function initTeamCarousel() {
    const track = document.getElementById("teamTrack");
    const dotsWrap = document.getElementById("teamDots");
    if (!track || !dotsWrap) return;

    const members = track.querySelectorAll(".member");
    dotsWrap.innerHTML = "";

    members.forEach((member, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Go to crew member " + (i + 1));
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            member.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        });
        dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll("button");
    let ticking = false;

    track.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const trackRect = track.getBoundingClientRect();
            const center = trackRect.left + trackRect.width / 2;
            let closest = 0;
            let closestDist = Infinity;

            members.forEach((member, i) => {
                const r = member.getBoundingClientRect();
                const dist = Math.abs((r.left + r.width / 2) - center);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = i;
                }
            });

            dots.forEach((dot, i) => dot.classList.toggle("active", i === closest));
            ticking = false;
        });
    });
}

document.addEventListener("DOMContentLoaded", initTeamCarousel);

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
