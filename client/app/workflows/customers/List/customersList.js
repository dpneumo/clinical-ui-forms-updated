//-------------------------------------------------------------
//  Index Functions

Template.customersList.helpers({
  customersList: function() {
    try {
      return CustomerAccounts.find({
        $or: [{
          'FirstName': {
            $regex: Session.get('account_search_term'),
            $options: 'i'
          }
        }, {
          'LastName': {
            $regex: Session.get('account_search_term'),
            $options: 'i'
          }
        }]
      }, {
        limit: 10, sort: {FullName: 1}
      });
    } catch (error) {
      console.log(error);
    }
  }
});


Template.customersListItem.events({
  'click .list-group-item': function(event, template) {
    Session.set('selected_customer', this._id);
    Session.set('current_task', 'view');
    Session.set('global_edit', false);
  }
});

Template.customersListItem.helpers({
  'selectedClass': function(){
   if(this._id == Session.get('selected_customer')){
      return "active"
    };
  }
});

Template.customerSearchInput.events({
  'keyup #customerSearchInput': function(event, template) {
    try {
      Session.set('account_search_term', $('#customerSearchInput').val());
      console.log($('#customerSearchInput').val());
      Meteor.flush();
    } catch (err) {
      console.log(err);
    }
  }
});
