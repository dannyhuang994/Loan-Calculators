function calculateRefinance() {
    // Get form values
    let originalInterestRate = parseFloat(document.getElementById("originalInterestRate").value) / 100 / 12;
    let remainingYears = parseFloat(document.getElementById("remainingYears").value);
    let remainingMonths = parseFloat(document.getElementById("remainingMonths").value);
    let remainingTotalMonths = remainingYears * 12 + remainingMonths;
    let originalMonthlyPayment = parseFloat(document.getElementById("originalMonthlyPayment").value);
    let newInterestRate = parseFloat(document.getElementById("newInterestRate").value) / 100 / 12;
    let newTermYears = parseFloat(document.getElementById("newTermYears").value);
    let newTermMonths = newTermYears * 12;
    let refinanceFee = parseFloat(document.getElementById("refinanceFee").value);

    // Calculate remaining balance (Present Value of the remaining payments)
    let remainingPrincipal = originalMonthlyPayment * ((1 - Math.pow(1 + originalInterestRate, -remainingTotalMonths)) / originalInterestRate);

    // Calculate new monthly payment after refinance
    let newMonthlyPayment = (remainingPrincipal + refinanceFee) * newInterestRate / (1 - Math.pow(1 + newInterestRate, -newTermMonths));

    // Calculate total savings
    let totalSavings = (originalMonthlyPayment * remainingTotalMonths) - (newMonthlyPayment * newTermMonths) - refinanceFee;



    // Display results
    document.getElementById("newMonthlyPayment").innerText = "New Monthly Payment: $" + newMonthlyPayment.toFixed(2);
    document.getElementById("totalSavings").innerText = "Total Savings: $" + totalSavings.toFixed(2);
    document.getElementById("remainingPrincipal").innerText = "Remaining Principal: $" + remainingPrincipal.toFixed(2);

    if (!isNaN(newMonthlyPayment)) {
        generateYearlyTable(newMonthlyPayment, remainingPrincipal + refinanceFee, newInterestRate, newTermMonths);
    }
}

function generateYearlyTable(monthlyPayment, loanAmount, monthlyInterestRate, numberOfMonths) {
    let table = document.createElement("Table");

    let currentTotal = loanAmount;

    // Create a header row
    let headerRow = table.insertRow();
    let headerCell1 = headerRow.insertCell(0);
    let headerCell2 = headerRow.insertCell(1);
    let headerCell3 = headerRow.insertCell(2);
    let headerCell4 = headerRow.insertCell(3);
    headerCell1.textContent = "Year#";
    headerCell2.textContent = "Interest Occured";
    headerCell3.textContent = "Principal Repaid";
    headerCell4.textContent = "Remaining Principal";

    // Create data rows
    let yearlyInterestPaid = 0;

    for (let i = 1; i <= numberOfMonths; i++) {
        let interestOccured = currentTotal * monthlyInterestRate; // interest for current month
        yearlyInterestPaid = yearlyInterestPaid + interestOccured;  // add to total yearly interest
        currentTotal = currentTotal - (monthlyPayment - interestOccured); // amortize loan principal

        // print it every 12 months
        if (i % 12 == 0) {
            let row = table.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
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