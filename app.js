document.querySelector("#loan-form").addEventListener("submit", function (e) {
  document.querySelector("#results").style.display = "none";
  document.querySelector("#loading").style.display = "block";
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults() {
  // amount
  const amount = document.querySelector("#amount");
  // interes
  const interest = document.querySelector("#interest");
  // years to repay
  const years = document.querySelector("#years");
  // month
  const monthPayment = document.querySelector("#monthly-payment");
  // total payment
  const totalPayment = document.querySelector("#total-payment");
  // total interes
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    document.querySelector("#results").style.display = "block";
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

function showError(message) {
  document.querySelector("#results").style.display = "none";
  document.querySelector("#loading").style.display = "none";
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  const error = document.createElement("div");
  error.className = "alert alert-danger";
  error.appendChild(document.createTextNode(message));
  card.insertBefore(error, heading);
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
