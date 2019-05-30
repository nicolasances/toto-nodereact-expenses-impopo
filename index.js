var Controller = require('toto-api-controller');
var TotoEventConsumer = require('toto-event-consumer');
var totoEventPublisher = require('toto-event-publisher');
var logger = require('toto-logger');

var expenseToBePosted = require('./handlers/ExpenseToBePosted');

var apiName = 'expenses-impopo';

// EVENT OUT:
// 1. Posted expenses for which I got an OK (200) from /expenses API
// 2. Posted expenses for which I got an KO (any error code) from /expenses API
totoEventPublisher.registerTopic({topicName: 'postedExpensesOk', microservice: apiName}).then(() => {}, (err) => {console.log(err);});
totoEventPublisher.registerTopic({topicName: 'postedExpensesFailed', microservice: apiName}).then(() => {}, (err) => {console.log(err);});

// EVENT IN : posted expenses (Expenses to be posted to the /expenses API)
var eventConsumer = new TotoEventConsumer(apiName, 'expenseToBePosted', expenseToBePosted.do);

var api = new Controller(apiName, totoEventPublisher, eventConsumer);

api.listen();
