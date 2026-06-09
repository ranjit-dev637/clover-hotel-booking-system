// ===============================
// ROOM PRICE DATA
// ===============================

const roomPrices = {
    "Deluxe Room": 3000,
    "Cabana Deluxe": 3500,
    "Master Suite Family": 4000
};


// ===============================
// BOOKING SUMMARY UPDATE
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    function updatePrice() {
        let selectedRoom = "";
        let nights = 1;

        // Try to get values from booking.html
        const roomSelect = document.getElementById("roomType");
        const checkInInput = document.getElementById("checkIn");
        const checkOutInput = document.getElementById("checkOut");

        // Try to get values from payment.html
        const roomNameElem = document.getElementById("roomName");
        const checkInDateElem = document.getElementById("checkInDate");
        const checkOutDateElem = document.getElementById("checkOutDate");

        if (roomSelect && roomSelect.value) {
            selectedRoom = roomSelect.value;
        } else if (roomNameElem && roomNameElem.innerText) {
            selectedRoom = roomNameElem.innerText;
        }

        if (!selectedRoom || selectedRoom === "Select Room") return;

        let roomName = "";
        if (selectedRoom.includes("Deluxe Room")) roomName = "Deluxe Room";
        if (selectedRoom.includes("Cabana Deluxe")) roomName = "Cabana Deluxe";
        if (selectedRoom.includes("Master Suite Family")) roomName = "Master Suite Family";

        // Prevent NaN by using || 0
        const price = roomPrices[roomName] || 0;

        // Calculate nights
        let checkInStr = "";
        let checkOutStr = "";

        if (checkInInput && checkInInput.value) checkInStr = checkInInput.value;
        else if (checkInDateElem && checkInDateElem.innerText) checkInStr = checkInDateElem.innerText;

        if (checkOutInput && checkOutInput.value) checkOutStr = checkOutInput.value;
        else if (checkOutDateElem && checkOutDateElem.innerText) checkOutStr = checkOutDateElem.innerText;

        if (checkInStr && checkOutStr) {
            const d1 = new Date(checkInStr);
            const d2 = new Date(checkOutStr);
            if (!isNaN(d1) && !isNaN(d2)) {
                const diffDays = Math.ceil(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
                nights = diffDays > 0 ? diffDays : 1;
            }
        }
        
        // Ensure absolutely no NaN or 0 nights (demo safety)
        if (isNaN(nights) || nights < 1) {
            nights = 1;
        }

        // Calculate total price
        const total = price * nights;

        // Update booking.html elements
        const roomSummary = document.getElementById("summaryRoom");
        if (roomSummary) {
            roomSummary.innerText = roomName;
        }

        const nightsSummary = document.getElementById("summaryNights");
        if (nightsSummary) {
            nightsSummary.innerText = nights + (nights === 1 ? " night" : " nights");
        }

        const summaryTotal = document.getElementById("summaryTotal");
        if (summaryTotal) {
            summaryTotal.innerText = "₹" + total;
            // Also store for inline form submission
            window.bookingTotalAmount = total;
        }

        // Update payment.html elements
        const totalElement = document.getElementById("totalAmount");
        if (totalElement) {
            totalElement.innerText = "₹" + total;
        }
    }

    // Attach to global scope
    window.updatePrice = updatePrice;

    // Run on load. Add slight delay for payment.html inline script to finish
    setTimeout(updatePrice, 100);

    // Add event listeners for booking.html
    const roomSelect = document.getElementById("roomType");
    const checkInInput = document.getElementById("checkIn");
    const checkOutInput = document.getElementById("checkOut");

    if (roomSelect) roomSelect.addEventListener("change", updatePrice);
    if (checkInInput) checkInInput.addEventListener("change", updatePrice);
    if (checkOutInput) checkOutInput.addEventListener("change", updatePrice);

});


// ===============================
// GALLERY LIGHTBOX
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const galleryImages = document.querySelectorAll(".masonry-item img");
    const modalImage = document.getElementById("lightboxImg");

    galleryImages.forEach(img => {

        img.addEventListener("click", function () {

            if (!modalImage) return;

            modalImage.src = this.src;

            const modal = new bootstrap.Modal(document.getElementById("lightboxModal"));
            modal.show();

        });

    });

});


// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

window.addEventListener("scroll", function () {

    const navbar = document.getElementById("mainNav");

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }

});