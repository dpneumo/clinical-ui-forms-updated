// Shared Methods
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

// Field Events & Helpers
var fields = [
  'first_name', 'last_name', 'company',
  'address', 'city', 'county', 'state',
  'zip', 'phone', 'fax', 'email', 'web',
  'password', 'date', 'datetime', 'month',
  'week', 'time', 'number', 'color'
];
fields.forEach(function(fieldName){
  // Events for field
  var clickEventName = 'click #' + fieldName + 'Input'
  var mouseoutEventName = 'mouseout #' + fieldName + 'Input'
  Template.customerForm.events({
    // Desktop Clicks - Editing
    clickEventName: function(){doEvent(fieldName, true)},
    // Mobile Tabs - Editing
    mouseoutEventName: function(){doEvent(fieldName, false)}
  });
  Template.customerForm.events(
    // Submit or Stop Editing
    addOkAndCancelEvents(fieldName)
  );

  // Helpers for field
  var fnName = fieldName + '_enabled'
  Template.customerForm.helpers({
    fnName: function(){fieldEnabled(fieldName)}
  });
});

// Misc Helpers
Template.customerForm.helpers({
  generic_enabled: function() {
    if (Session.get('global_edit')) {
      return "enabled";
    } else {
      return "readonly";
    }
  },
  isNewTask: function() {
    return Session.get('current_task') === 'new'
  },
  isEditingTask: function() {
    return Session.get('current_task') === 'edit'
  },
  isDeletingTask: function() {
    return Session.get('current_task') === 'delete'
  },
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
