// Shared Methods
initSessionEditVar = function(fieldName){
  Session.set('editing_' + fieldName, false);
};
doEvent = function(fieldName, state){
  Session.set('editing_' + fieldName, state);
  Meteor.flush();
};
addOkAndCancelEvents = function(fieldName){
  okCancelEvents('#'+fieldName+'Input', {
    ok: function(value) {
      CustomerAccounts.update(Session.get('selected_user'), {
        $set: {
          fieldName: value
        }
      });
      Session.set('editing_'+fieldName, false);
      Meteor.flush();
    },
    cancel: function() {
      Session.set('editing_'+fieldName, false);
    }
  })
};
fieldEnabled = function(fieldName){
  if (Session.get('global_edit')) {
    return "enabled";
  } else if (Session.get('editing_'+fieldName)) {
      return "enabled";
    } else {
      return "readonly";
    }
};
taskCheck = function(task){
  return (Session.get('current_task') === task)
};

// Field Events & Helpers
var fields = [
  'first_name', 'last_name', 'company',
  'address', 'city', 'county', 'state',
  'zip', 'phone', 'fax', 'email', 'web',
  'password', 'date', 'datetime', 'month',
  'week', 'time', 'number', 'color'
];
fields.forEach(function(fieldName){
  // Init Sessions Variables
  initSessionEditVar(fieldName);

  // Events for field
  var clickEventName = 'click #' + fieldName + 'Input'
  var mouseoutEventName = 'mouseout #' + fieldName + 'Input'
  Template.customerFormTemplate.events({
    // Desktop Clicks - Editing
    clickEventName: function(){doEvent(fieldName, true)},
    // Mobile Tabs - Editing
    mouseoutEventName: function(){doEvent(fieldName, false)}
  });
  Template.customerFormTemplate.events(
    // Submit or Stop Editing
    addOkAndCancelEvents(fieldName)
  );

  // Helpers for field
  var fnName = fieldName + '_enabled'
  Template.customerFormTemplate.helpers({
    fnName: function(){fieldEnabled(fieldName)}
  });
});

// Misc Helpers
Template.customerFormTemplate.helpers({
  generic_enabled: function() {
    if (Session.get('global_edit')) {
      return "enabled";
    } else {
      return "readonly";
    }
  },
  isNewTask: function() {taskCheck('new')},
  isDeletingTask: function() {taskCheck('delete')},
  user: function() {
    console.log('getting user...');
    try {
      if (Session.get('current_task') == 'new') {
        return {
          "FirstName": "",
          "LastName": "",
          "Company": "",
          "Address": "",
          "City": "",
          "County": "",
          "State": "",
          "ZIP": "",
          "Phone": "",
          "Fax": "",
          "Email": "",
          "Web": ""
        };
      } else {
        return CustomerAccounts.findOne(Session.get('selected_user'));
      }
    } catch (error) {
      console.log(error);
    }
  }
});

// Misc Events
Template.customerFormTemplate.events({
  'click #newUserButton': function() {
    console.log('creating new user...');
    try {
      // TODO:  add validation functions
      if ($('#firstNameInput').val().length) {
        Meteor.call('createNewCustomer', {
          FirstName: $('#firstNameInput').val(),
          LastName: $('#lastNameInput').val(),
          Company: $('#companyInput').val(),
          Address: $('#addressInput').val(),
          City: $('#cityInput').val(),
          County: $('#countyInput').val(),
          State: $('#stateInput').val(),
          ZIP: $('#zipInput').val(),
          Phone: $('#phoneInput').val(),
          Fax: $('#faxInput').val(),
          Email: $('#emailInput').val(),
          Web: $('#webInput').val(),
          Password: $('#passwordInput').val(),
          Date: $('#dateInput').val(),
          Birthdate: $('#birthdateInput').val(),
          Month: $('#monthInput').val(),
          Week: $('#weekInput').val(),
          Time: $('#timeInput').val(),
          Number: $('#numberInput').val(),
          Color: $('#colorInput').val()
        }, function(error, customer) {
          console.log('error: ' + error);
          console.log('customer: ' + customer);
        });
      } else {
        Session.set("createError",
          "Customer needs a name, or why bother?");
      }
      evt.target.value = '';
    } catch (err) {
      console.log(err);
    }

    Session.set('current_task', 'view');
  },

  'click #deleteUserButton': function() {
    CustomerAccounts.remove(Session.get('selected_user'));
    Session.set('current_task', 'view');
  },

  'click #cancelDeleteButton': function() {
    Session.set('current_task', 'view');
  }
});
