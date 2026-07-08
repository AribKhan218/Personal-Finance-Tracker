const currBalance = document.querySelector(".currBalance");
const InDescription = document.querySelector(".desc");
const InAmount = document.querySelector(".amount");
const InTimeStamps = document.querySelector(".datetime");
const InType = document.querySelector(".type");
const InCategory = document.querySelector(".category");
const addBtn = document.querySelector(".addBtn");
const Income = document.querySelector(".income");
const Expense = document.querySelector(".expense");
const noData = document.querySelector(".noData");
const transactions = document.querySelector(".transactions");
const transactionList = document.querySelector(".transaction-list");
const actions = document.querySelector(".actions");
const inputs = document.querySelectorAll("input");
const InFilter = document.querySelector(".filter");
const InSearch = document.querySelector(".search input");
const exportBtn = document.querySelector(".export");
const importBtn = document.querySelector(".import");

let AllTransactions = [];
// Getting AllTransactions(if any) from the localStorage:
function loadTransactions() {
  AllTransactions = JSON.parse(localStorage.getItem("allTransactions")) || [];
  calculateTotals(AllTransactions);
  if (AllTransactions.length !== 0) {
    // displaying transactions UI
    noData.style.display = "none";
    transactions.style.display = "block";
  } else if (AllTransactions.length === 0) {
    noData.style.display = "flex";
    transactions.style.display = "none";
  }
  renderTransactions(AllTransactions);
}
function renderTransactions(data = AllTransactions) {
  transactionList.innerHTML = "";
  // adding transactions to transaction-list
  data.forEach((transaction, index) => {
    const transactionHTML = `<div class="transaction" data-index="${index}">
    <div>${transaction.description}</div>
                                    <div>$${transaction.amount}</div>
                                    <div>${transaction.type}</div>
                                    <div>${transaction.category}</div>
                                    <div>${transaction.timeStamps.replace("T", ", ")}</div>
                                    <div class="actions">
                                    <div><img style="background-size: contain; width: 30px; height: 30px;" class="edit" src="assets/pen.png" alt=""></div>
                                        <div><img style="background-size: contain; width: 30px; height: 30px;" class="delete" src="assets/delete.png" alt=""></div>
                                        </div>
                                        </div>`;
    transactionList.innerHTML += transactionHTML;
  });
}

function calculateTotals() {
  let currentBalance = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  // Calculating values
  for (const transaction of AllTransactions) {
    // Total Income
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    }
    // Total Expense
    if (transaction.type === "expense") {
      totalExpense += transaction.amount;
    }
  }
  // Updating values
  Income.innerHTML = `$${totalIncome}`;
  Expense.innerHTML = `$${totalExpense}`;
  // Current Balance
  currentBalance = totalIncome - totalExpense;
  if (currentBalance >= 0) {
    currBalance.innerHTML = `$${currentBalance}`;
    currBalance.style.color = "#23c552";
  } else if (currentBalance < 0) {
    currBalance.innerHTML = `$${currentBalance}`;
    currBalance.style.color = "#F84F31";
  }
}

InFilter.addEventListener("change", (e) => {
  filterTransactions();
});

function filterTransactions() {
  let filteredArray;
  let filter = InFilter.value.toLowerCase();
  if (filter === "all") {
    renderTransactions(AllTransactions);
  } else {
    if (
      filter === "food" ||
      filter === "shopping" ||
      filter === "salary" ||
      filter === "utilities" ||
      filter === "freelance" ||
      filter === "entertainment" ||
      filter === "gifts" ||
      filter === "healthcare" ||
      filter === "others"
    ) {
      filteredArray = AllTransactions.filter((t) => t.category === filter);
    }
  }
  renderTransactions(filteredArray);
}

InSearch.addEventListener("input", (e) => {
  debouncedSearch();
});

function searchTransactions() {
  let searchedTransaction;
  let search = InSearch.value.toLowerCase();
  searchedTransaction = AllTransactions.filter((transaction) => {
    if (transaction.description.toLowerCase().includes(search)) {
      return true;
    }
  });
  renderTransactions(searchedTransaction);
}

// debounce function
function debounce(fn, ms) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout((...args) => {
      return fn(...args);
    }, ms);
  };
}

const debouncedSearch = debounce(searchTransactions, 300);

function addTransactions() {
  // getting values
  const description = InDescription.value;
  let amount = Number(InAmount.value);
  const timeStamps = InTimeStamps.value;
  const type = InType.value;
  const category = InCategory.value;

  // displaying transactions UI
  noData.style.display = "none";
  transactions.style.display = "block";

  // Check for empty input values
  if (description == "" || amount == "" || timeStamps == "") {
    alert("Please fill all the inputs!");
    return;
  }

  // transaction object
  const transaction = {
    // Object Shorthand
    description,
    amount,
    timeStamps,
    type,
    category,
  };

  // Check for duplicate values
  const isDuplicate = AllTransactions.some((t) => {
    return (
      t.description === transaction.description &&
      t.amount === transaction.amount &&
      t.timeStamps === transaction.timeStamps &&
      t.type === transaction.type &&
      t.category === transaction.category
    );
  });

  if (isDuplicate) {
    alert("An exact transaction already exists!");
    return;
  }

  // adding transaction to AllTransaction
  AllTransactions.push(transaction);
  saveTransactions();
  calculateTotals();
  renderTransactions();
}

addBtn.addEventListener("click", (e) => {
  addTransactions();
  inputs.forEach((input) => (input.value = ""));
});

transactionList.addEventListener("click", (e) => {
  if (e.target.matches(".delete")) {
    const transaction = e.target.closest(".transaction");
    const userConfirmed = confirm("Would you like to delete this transaction?");
    if (userConfirmed) {
      deleteTransaction(transaction);
    }
  }
});
function deleteTransaction(target) {
  const afterDelete = AllTransactions.filter((transaction, i) => {
    return i !== Number(target.dataset.index);
  });
  AllTransactions = afterDelete;
  saveTransactions();
  calculateTotals();
  renderTransactions(AllTransactions);
}

transactionList.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    const transaction = e.target.closest(".transaction");
    editTransaction(transaction);
    InDescription.focus();
  }
});

function editTransaction(target) {
  const toEdit = AllTransactions.filter((transaction, i) => {
    return i === Number(target.dataset.index);
  });

  InDescription.value = toEdit[0].description;
  InAmount.value = toEdit[0].amount;
  InTimeStamps.value = toEdit[0].timeStamps;
  InType.value = toEdit[0].type;
  InCategory.value = toEdit[0].category;

  const afterEdit = AllTransactions.filter((transaction, i) => {
    return i !== Number(target.dataset.index);
  });

  AllTransactions = afterEdit;
  saveTransactions();
  calculateTotals();
  renderTransactions(AllTransactions);
}

// Setting AllTransactions to the localStorage:
function saveTransactions() {
  localStorage.setItem("allTransactions", JSON.stringify(AllTransactions));
}

// calling this function every time the page loads:
loadTransactions();

// Exporting JSON:
exportBtn.addEventListener("click", (e) => {
  exportData();
});

async function exportData() {
  const data = localStorage.getItem("allTransactions");
  if (!data) {
    alert("No transaction data available");
  }

  try {
    await navigator.clipboard.writeText(data);
    alert("Transaction data copied to clipboard.");
  } catch (err) {
    alert("Failed to copy data. Please try again!");
  }
}

// Importing JSON:
importBtn.addEventListener("click", (e) => {
  const data = prompt("Import the data below: ");
  importData(data);
});

function importData(data) {
  localStorage.setItem("allTransactions", data);
  loadTransactions();
}
