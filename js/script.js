//for payment method hide/show
function showPaymentMethod() {
  // var cashMethod = document.getElementById("cashMethod");
  // var cardMethod = document.getElementById("cardMethod");
  // var upiMethod = document.getElementById("upiMethod");

  // var selectedMethod = document.querySelector(
  //   'input[name="paymentMethod"]:checked'
  // ).value;

  // cashMethod.style.display = "none";
  // cardMethod.style.display = "none";
  // upiMethod.style.display = "none";

  // if (selectedMethod === "cash") {
  //   cashMethod.style.display = "block";
  // } else if (selectedMethod === "card") {
  //   cardMethod.style.display = "block";
  // } else if (selectedMethod === "upi") {
  //   upiMethod.style.display = "block";
  // }
}



//seat booking
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const seats = document.querySelectorAll(".row .seat:not(.occupied)");
  const count = document.getElementById("count");
  const total = document.getElementById("total");
  const movieSelect = document.getElementById("movie");
  const bookButton = document.getElementById("bookBtn");

  populateUI();

  let ticketPrice = +movieSelect.value;

  // Save selected movie index and price
  function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
  }

  // Update total and count
  function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = [...selectedSeats].map((seat) =>
      [...seats].indexOf(seat)
    );

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    setMovieData(movieSelect.selectedIndex, movieSelect.value);
  }

  // Get data from local storage and populate UI
  function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add("selected");
        }
      });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    
  }

  // Movie select event
  movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
  });

  // Seat click event
  container.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied") &&
      !e.target.classList.contains("booked") // Check if the seat is not already booked
    ) {
      e.target.classList.toggle("selected");

      updateSelectedCount();
    }
  });

  // Book button click event
  bookButton.addEventListener("click", function () {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatIds = [...selectedSeats].map((seat) => seat.id);
    const totalPrice = +total.innerText;

    // Store selected seat IDs and total price in a cookie
    document.cookie = `selectedSeatIds=${selectedSeatIds.join(
      ","
    )}; expires=${new Date(Date.now() + 86400000).toUTCString()}`;
    document.cookie = `totalPrice=${totalPrice}; expires=${new Date(
      Date.now() + 86400000
    ).toUTCString()}`;

    // Mark selected seats as booked
    selectedSeats.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("booked");
    });

    // Reset count and total
    count.innerText = "0";
    total.innerText = "0";
  });

  // Initial count and total set
  updateSelectedCount();
});

// Function to retrieve cookie value by name
function getCookieValue(cookieName) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName) {
      return value;
    }
  }
  return null;
}

// Retrieve booked seats, seat values, and total price from cookies
const bookedSeats = getCookieValue("selectedSeatIds");
const totalPrice = getCookieValue("totalPrice");

// Display information on the webpage
const bookedSeatsElement = document.getElementById("bookedSeats");
const totalPriceElement = document.getElementById("totalPrice");

bookedSeatsElement.textContent += bookedSeats;
totalPriceElement.textContent += totalPrice;

//validate payment
function validatePayment() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;

  if (name=='' && email=='' && phone=='') 
  {
    alert('Please fill out all required fields.');
    return false;
  }
  else
  {
    alert('Thank you for your payment! Enjoy The Movie');
    return true;
  }
  
}

