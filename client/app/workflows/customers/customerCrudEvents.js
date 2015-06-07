// CRUD Events
resultReporter = function(action){
  return (function(error, customer) {
            console.log('error: ' + (error || 'none'));
            console.log('customer(s) '+action+'d: ' + (customer || 'none'));
          });
};

Template.customerForm.events({

  'click #createCustomerButton': function() {
    console.log('creating new customer...');
    var firstNameExists = $('#firstNameInput').val().length
    if (!firstNameExists) {
      Session.set("createError", "Customer needs a name, or why bother?");
      Session.set('current_task', 'view');
    } else {
      try {
        Meteor.call('createCustomer',
          { FirstName: $('#firstNameInput').val(),
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
          },
          resultReporter('create')
        );
        evt.target.value = '';
      } catch (error) {
        console.log(error);
      };
    Session.set('current_task', 'view');
    };
  },

  'click #updateCustomerButton': function() {
    var selectedCustomer = Session.get('selected_user');
    console.log('updating customer: ' + selectedCustomer);
    try {
      Meteor.call('updateCustomer', selectedCustomer,
        { FirstName: $('#firstNameInput').val(),
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
        },
        resultReporter('update')
      );
    } catch (error) {
      console.log(error);
    };
    Session.set('current_task', 'view');
  },

  'click #deleteCustomerButton': function() {
    var selectedCustomer = Session.get('selected_user');
    console.log('deleting customer: ' + selectedCustomer);
    try{
      Meteor.call('deleteCustomer', selectedCustomer,
        resultReporter('delete')
      );
    } catch (error) {
      console.log(error);
    };
    Session.set('current_task', 'view');
  },

  'click #cancelDeleteButton': function() {
    Session.set('current_task', 'view');
  }
});
