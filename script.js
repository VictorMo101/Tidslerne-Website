function eventSiteCardDetails(card) {
    const details = document.getElementById("eventDetails");
  
    card.classList.toggle("active");
  
    if (details.classList.contains("hidden")) {
      details.classList.remove("hidden");
      details.classList.add("flex");
    } else {
      details.classList.add("hidden");
      details.classList.remove("flex");
    }
  }