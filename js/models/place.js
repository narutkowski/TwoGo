window.Place = Backbone.Model.extend({
	defaults: {
		"name": 'undefined',
		"address": 'undefined',
		"city": 'undefined',
		"state": 'undefined',
		"lat": 'undefined',
		"lng": 'undefined'
	},
	
	urlRoot: "#venues/"
	
});

window.PlaceCollection = Backbone.Collection.extend({
	model: Place,
	url: "#venues/"
});