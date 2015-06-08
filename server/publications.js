Meteor.publish('customerAccounts', function (account_search_term) {
  try{
    return CustomerAccounts.find({
      FullName: { $regex: account_search_term, $options: 'i' }
    },{sort: {FullName: 1}, limit: 10} );
  }catch(error){
    console.log(error);
  }
});
