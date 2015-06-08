
Meteor.methods({
  createCustomer: function (options) {
    try{
      console.log('created a customer: ' + JSON.stringify(options));
      options = options || {};
      // TODO:  add validation functions
      //        if (!(typeof options.text === "string" && options.text.length)){
      //            throw new Meteor.Error(400, "Required parameter missing");
      //        }
      //
      //        if (options.text.length > 100){
      //            throw new Meteor.Error(413, "Title too long");
      //        }
      //
      //        if (! options.list_id ){
      //            throw new Meteor.Error(413, "No list id!");
      //        }
      //
      //        if (! this.userId){
      //            throw new Meteor.Error(403, "You must be logged in");
      //        }

      return CustomerAccounts.insert(
        {
          FirstName: options.FirstName,
          LastName: options.LastName,
          FullName: options.FirstName + ' ' + options.LastName,
          Company: options.Company,
          Address: options.Address,
          City: options.City,
          County: options.County,
          State: options.State,
          ZIP: options.ZIP,
          Phone: options.Phone,
          Fax: options.Fax,
          Email: options.Email,
          Web: options.Web,
          Notes: options.Notes
        });
    }catch(error){
      console.log(error);
    }
  },

  updateCustomer: function(selectedCustomer, options){
    try{
      console.log('updated a customer: ' + JSON.stringify(options));
      options = options || {};
      // TODO:  add validation functions
      return CustomerAccounts.update(
        { _id: selectedCustomer },
        {
          FirstName: options.FirstName,
          LastName: options.LastName,
          FullName: options.FirstName + ' ' + options.LastName,
          Company: options.Company,
          Address: options.Address,
          City: options.City,
          County: options.County,
          State: options.State,
          ZIP: options.ZIP,
          Phone: options.Phone,
          Fax: options.Fax,
          Email: options.Email,
          Web: options.Web,
          Notes: options.Notes
        });
    }catch(error){
      console.log(error);
    }
  },

  deleteCustomer: function (selectedCustomer) {
    try{
      console.log('deleted a customer: ' + JSON.stringify(selectedCustomer));
      return CustomerAccounts.remove( {_id: selectedCustomer} );
    }catch(error){
      console.log(error);
    }
  }

});
