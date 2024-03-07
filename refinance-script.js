function calculateRefinance() {
    // Get form values
    var originalInterestRate = parseFloat(document.getElementById("originalInterestRate").value) / 100 / 12;
    var remainingYears = parseFloat(document.getElementById("remainingYears").value);
    var remainingMonths = parseFloat(document.getElementById("remainingMonths").value);
    var remainingTotalMonths = remainingYears * 12 + remainingMonths;
    var originalMonthlyPayment = parseFloat(document.getElementById("originalMonthlyPayment").value);
    var newInterestRate = parseFloat(document.getElementById("newInterestRate").value) / 100 / 12;
    var newTermYears = parseFloat(document.getElementById("newTermYears").value);
    var newTermMonths = newTermYears * 12;
    var refinanceFee = parseFloat(document.getElementById("refinanceFee").value);

    // Calculate original remaining balance (Present Value of the remaining payments)
    var originalRemainingBalance = originalMonthlyPayment * ((1 - Math.pow(1 + originalInterestRate, -remainingTotalMonths)) / originalInterestRate);

    // Calculate new monthly payment after refinance
    var newMonthlyPayment = (originalRemainingBalance + refinanceFee) * newInterestRate / (1 - Math.pow(1 + newInterestRate, -newTermMonths));

    // Calculate total savings
    var totalSavings = (originalMonthlyPayment * remainingTotalMonths) - (newMonthlyPayment * newTermMonths) - refinanceFee;

    // Calculate remaining principal
    var remainingPrincipal = originalRemainingBalance;

    // Display results
    document.getElementById("newMonthlyPayment").innerText = "New Monthly Payment: $" + newMonthlyPayment.toFixed(2);
    document.getElementById("totalSavings").innerText = "Total Savings: $" + totalSavings.toFixed(2);
    document.getElementById("remainingPrincipal").innerText = "Remaining Principal: $" + remainingPrincipal.toFixed(2);
}
