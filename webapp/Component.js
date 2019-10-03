sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/alliander/todo/demo/uren-schrijven-demo-pwa/model/models",
	"./model/firestore-todo",
	"./utils/Notifications"
], function (UIComponent, Device, models, firestoreTodo, Notifications) {
	"use strict";

	return UIComponent.extend("com.alliander.todo.demo.uren-schrijven-demo-pwa.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			this.setModel(firestoreTodo, "todo");

			Notifications.requestPermission(function (status) {
				console.log('notification status: ', status);
			});

			if (Notifications.persmission === 'granted') {
				var options = {
					body: 'Eerste notificatie!',
					icon: 'Icon-48.png',
					vibrate: [100, 50, 100],
					data: {
						dateOfArrival: Date.now(),
						primaryKey: 1
					},

					actions: [{
						action: 'explore',
						title: 'Ga naar de site'
					}, {
						action: 'close',
						title: 'Sluit de notificatie'
					}, ]
				};

				navigator.serviceWorker.getRegistration().then(reg => {
					reg.showNotification("Hello world", options);
				});
			}
		}
	});
});