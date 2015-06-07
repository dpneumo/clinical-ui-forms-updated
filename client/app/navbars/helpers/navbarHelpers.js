Template.navbarFooter.events({
    'click .edit-button': function(){
        Session.set('current_task','edit');
        Session.set('global_edit', true);
        Tracker.flush();
    },
    'click .new-button': function(){
        Session.set('current_task','new');
        Session.set('selected_customer', 'newcustomer');
        Session.set('global_edit', true);
        Tracker.flush();
    },
    'click .delete-button': function(){
        if(Session.get('selected_customer') != ('' || 'newcustomer')){
            Session.set('current_task','delete');
        }
        Tracker.flush();
    },
    'click .view-button': function(){
        Session.set('current_task','view');
        Tracker.flush();
    }
});
