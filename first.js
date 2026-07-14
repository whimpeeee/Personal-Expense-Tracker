const state = {
    earnings: 0,
    expenses: 0,
    net: 0, 
    transactions: [
     {
        id: Math.floor(Math.random() * 1000),
        text: "Example",
        amount: 10, /* + turns the string inot interger value */
        type: "credit",
     },
    ],
};


const transactionFormEl = document.getElementById("transaction_form");

const renderTransactions = () => {
    const transactionContainerEl = document.querySelector(".transactions");
    const netAmountEl = document.getElementById("netAmount");
    const earningEl = document.getElementById("earning");
    const expenseEl = document.getElementById("expense");

    const transactions = state.transactions;

    let earning = 0;
    let expense = 0;
    let net = 0;

    transactionContainerEl.innerHTML = ""; //clearing the transaction container before appending
    
    transactions.forEach((transaction) => {
        const { id, amount, text, type } = transaction;
        const isCredit = type === "credit" ? true : false;
        const sign = isCredit ? "+" : "-";
        const transactionEl = `
        <div class="transaction" id="${id}">
            <div class="left">
            <p>${text}</p>
            <p>${sign}  ₹ ${amount}</p>
            </div>
            <div class="status ${isCredit ? "credit" : "debit"}">${isCredit ? "C" : "D"}</div>
         </div>`;

         earning += isCredit ? amount : 0;
         expense += !isCredit ? amount : 0;
         net = earning - expense;

         transactionContainerEl.insertAdjacentHTML('afterbegin', transactionEl); //appending the transaction
    });

    netAmountEl.innerHTML = `₹ ${net}`;
    earningEl.innerHTML = `₹ ${earning}`;
    expenseEl.innerHTML = `₹ ${expense}`;

};

const addTransaction = (e) => {
    e.preventDefault();
    console.log(e.submitter.id);

    const isEarn = e.submitter.id === "earnBtn" ? true : false;

    const formData = new FormData(transactionFormEl);
    const tData = {};

    formData.forEach((Value, Key) => {
        tData[Key] = Value;
    });

    const { text, amount } = tData;

    const transaction = {
         
        id: Math.floor(Math.random() * 1000),
        text: text,
        amount: +amount, /* + turns the string inot interger value */
        type: isEarn ? "credit" : "debit",
    };

    state.transactions.push(transaction);
    renderTransactions();

    console.log(state);

}

renderTransactions();
transactionFormEl.addEventListener('submit', addTransaction)