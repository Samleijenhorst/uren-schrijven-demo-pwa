sap.ui.define([], function() {
   return {
       hasSupport: function() {
           if (!('Notification' in window)) {
               return false;
           } else {
               return true;
           }
       },
       requestPermission: function(callback) {
           if (!this.hasSupport()) return;
		    Notification.requestPermission(function(status) {
                callback(status);
		    });
       }
   };
});
