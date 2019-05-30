# Toto Expenses Poster
This microservice reacts to events `expenseToBePosted` and performs the following tasks:
 * Posts an expense on the /expenses API
 * Based on the result, the microservice will post the created expense on the following topics: `postedExpensesOk` or `postedExpensesFailed`
