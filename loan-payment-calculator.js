function calculateMortgage() {
    // Get form values
    var loanAmount = parseFloat(document.getElementById("loanAmount").value);

    // convert the nominal/annual to the actual interest rate computed monthly
    var interestRate = parseFloat(document.getElementById("annualInterestRate").value) / 100 / 12;
    var loanTermMonths = parseFloat(document.getElementById("loanTerm").value) * 12;

    // Calculate monthly mortgage payment
    // https://en.wikipedia.org/wiki/Mortgage_calculator
    var monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTermMonths));

    // Display result
    document.getElementById("monthlyPayment").innerText = "Monthly Payment: $ " + monthlyPayment.toFixed(2);
}

