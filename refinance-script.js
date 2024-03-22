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

    // Calculate remaining balance (Present Value of the remaining payments)
    var remainingPrincipal = originalMonthlyPayment * ((1 - Math.pow(1 + originalInterestRate, -remainingTotalMonths)) / originalInterestRate);

    // Calculate new monthly payment after refinance
    var newMonthlyPayment = (remainingPrincipal + refinanceFee) * newInterestRate / (1 - Math.pow(1 + newInterestRate, -newTermMonths));

    // Calculate total savings
    var totalSavings = (originalMonthlyPayment * remainingTotalMonths) - (newMonthlyPayment * newTermMonths) - refinanceFee;



    // Display results
    document.getElementById("newMonthlyPayment").innerText = "New Monthly Payment: $" + newMonthlyPayment.toFixed(2);
    document.getElementById("totalSavings").innerText = "Total Savings: $" + totalSavings.toFixed(2);
    document.getElementById("remainingPrincipal").innerText = "Remaining Principal: $" + remainingPrincipal.toFixed(2);

    if (!isNaN(newMonthlyPayment)) {
        generateYearlyTable(newMonthlyPayment, remainingPrincipal + refinanceFee, newInterestRate, newTermMonths);
    }
}

function generateYearlyTable(monthlyPayment, loanAmount, monthlyInterestRate, numberOfMonths) {
    var table = document.createElement("Table");

    let currentTotal = loanAmount;

    // Create a header row
    var headerRow = table.insertRow();
    var headerCell1 = headerRow.insertCell(0);
    var headerCell2 = headerRow.insertCell(1);
    var headerCell3 = headerRow.insertCell(2);
    var headerCell4 = headerRow.insertCell(3);
    headerCell1.textContent = "Year#";
    headerCell2.textContent = "Interest Occured";
    headerCell3.textContent = "Principal Repaid";
    headerCell4.textContent = "Remaining Principal";

    // Create data rows
    let yearlyInterestPaid = 0;

    for (var i = 1; i <= numberOfMonths; i++) {
        let interestOccured = currentTotal * monthlyInterestRate; // interest for current month
        yearlyInterestPaid = yearlyInterestPaid + interestOccured;  // add to total yearly interest
        currentTotal = currentTotal - (monthlyPayment - interestOccured); // amortize loan principal

        // print it every 12 months
        if (i % 12 == 0) {
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.textContent = `${i / 12}`.padStart(2);
            cell2.textContent = "$ " + yearlyInterestPaid.toFixed(2);
            cell3.textContent = "$ " + (12 * monthlyPayment - yearlyInterestPaid).toFixed(2);
            cell4.textContent = "$ " + Math.abs(currentTotal.toFixed(2));

            // reset yearly interest
            yearlyInterestPaid = 0;
        }
    }

    // Append the table to the tableContainer div
    document.getElementById("tableContainer").textContent = "";
    document.getElementById("tableContainer").appendChild(table);
}