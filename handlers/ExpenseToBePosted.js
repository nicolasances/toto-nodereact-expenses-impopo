var totoEventPublisher = require('toto-event-publisher');
var http = require('toto-request');

exports.do = (event) => {

  let correlationId = event.correlationId;
  let statusId = event.statusId;

  // Post the expense
  http({
    correlationId: correlationId,
    microservice: 'toto-nodems-expenses',
    method: 'POST',
    resource: '/expenses',
    body: event.expense
  }).then((data) => {

    // In case of success, post back an OK event
    totoEventPublisher.publishEvent('postedExpensesOk', {statusId: statusId});

  }, (err) => {

    // In case of failure, post back a KO event
    totoEventPublisher.publishEvent('postedExpensesFailed', {statusId: statusId});

  });

}
