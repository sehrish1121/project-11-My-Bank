#! /usr/bin/env node
import inquirer from "inquirer";
//bank account class
class BankAccount {
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful.Remaining balance: $${this.balance}`);
        }
        else {
            console.log(`"Insufficient balance."`);
        }
    }
    //Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance:$${this.balance}`);
    }
    ///check balance
    checkBalance() {
        console.log(`Current balance:$${this.balance}`);
    }
}
//customer class
class Customer {
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//create bank accounts
const account = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
//create customers
const customers = [
    new Customer("Zohan", "Khan", "Male", 22, 316223334, account[0]),
    new Customer("Sehrish", "Ahsan", "Female", 24, 33316223334, account[1]),
    new Customer("Afzal", "Ali", "Male", 35, 34316223334, account[2])
];
//function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
service();
