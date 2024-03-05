// Define the popup variable at the top of your script
const popup = document.getElementById("popup"); // Make sure this ID matches your popup's ID in HTML

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
  expenseForm.reset(); // Reset the form fields when closing the popup
}

// Get form, expense list, and total amount elements
const expenseForm = document.getElementById("add-expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

// Initialize expenses array from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Listen for form submission instead of button click
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  addExpense(); // Call addExpense when the form is submitted
});

// Function to render expenses in tabular form
function renderExpenses() {
  expenseList.innerHTML = ""; // Clear expense list
  let totalAmount = 0; // Initialize total amount

  expenses.forEach((expense, i) => {
    // Use forEach for better readability
    const expenseRow = document.createElement("tr");
    expenseRow.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.description}</td>
      <td>$${parseFloat(expense.amount).toFixed(2)}</td> 
      <td><button onclick="deleteExpense(${i})">Delete</button></td> 
    `;
    expenseList.appendChild(expenseRow);
    totalAmount += parseFloat(expense.amount); // Make sure to parse the amount as float
  });

  totalAmountElement.textContent = totalAmount.toFixed(2); // Update total amount display
  localStorage.setItem("expenses", JSON.stringify(expenses)); // Save expenses to localStorage
}

// Function to add expense
function addExpense() {
  const expenseNameInput = document.getElementById("expense-name");
  const expenseDescriptionInput = document.getElementById(
    "expense-description"
  );
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseDateInput = document.getElementById("expense-date");

  const expenseName = expenseNameInput.value.trim();
  const expenseDescription = expenseDescriptionInput.value.trim();
  const expenseAmount = parseFloat(expenseAmountInput.value);
  const expenseDate = expenseDateInput.value;

  if (
    !expenseName ||
    isNaN(expenseAmount) ||
    !expenseDescription ||
    !expenseDate
  ) {
    alert("Please enter valid expense details.");
    return;
  }

  const expense = {
    name: expenseName,
    description: expenseDescription,
    amount: expenseAmount,
    date: new Date(expenseDate).toISOString(), // Store date in ISO format
  };

  expenses.push(expense);
  renderExpenses(); // Render the updated expenses

  expenseNameInput.value = "";
  expenseDescriptionInput.value = "";
  expenseAmountInput.value = "";
  expenseDateInput.value = "";

  closePopup(); // Close the popup
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1); // Remove the expense from the array
  renderExpenses(); // Re-render the list with the expense removed
}

// Initial rendering of expenses when the page loads
document.addEventListener("DOMContentLoaded", renderExpenses);
