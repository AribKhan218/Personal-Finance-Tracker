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

const AllTransactions = [];

function renderTransactions(data = AllTransactions) {
  transactionList.innerHTML = "";
  // adding transactions to transaction-list
  data.forEach((transaction) => {
    const transactionHTML = `<div class="transaction">
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

  for (const transaction of AllTransactions) {
    // Total Income
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
      console.log(totalIncome);
      Income.innerHTML = `$${totalIncome}`;
    }
    // Total Expense
    if (transaction.type === "expense") {
      totalExpense += transaction.amount;
      console.log(totalExpense);
      Expense.innerHTML = `$${totalExpense}`;
    }
  }
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
  filter();
});

function filter() {
  let filteredArray;
  let filter = InFilter.value.toLowerCase();
  if (filter === "all") {
    renderTransactions(AllTransactions);
  } else if (filter === "expense") {
    filteredArray = AllTransactions.filter((transaction) => {
      return transaction.type === "expense";
    });
  } else if (filter === "income") {
    filteredArray = AllTransactions.filter((transaction) => {
      return transaction.type === "income";
    });
  }
  renderTransactions(filteredArray);
}

InSearch.addEventListener("input", (e) => {
  search();
});

function search() {
  let searchedTransaction;
  let search = InSearch.value.toLowerCase();
  searchedTransaction = AllTransactions.filter((transaction) => {
    if (transaction.description.toLowerCase().includes(search)) {
      return true;
    }
  });
  renderTransactions(searchedTransaction);
}

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
  calculateTotals();
  renderTransactions();
}

addBtn.addEventListener("click", (e) => {
  addTransactions();
  inputs.forEach((input) => (input.value = ""));
});

// Add Filter, Search, Edit, Delete, LocalStorage functionalities:
