

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

window.MapView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this,'render');
		this.render();
		
	},
	
	render: function() {
		var place = this.collection.findWhere({name : this.options.Name});
		console.log(place.attributes['lat']);
		var latlng = new google.maps.LatLng(place.attributes['lat'], place.attributes['lng']);

		
		var options = {
			zoom: 18,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		var map = new google.maps.Map(this.el, options);

		this.$el.append(map);
		return this.map;
	}
	
});


window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    /*events: {
	    "click a" : "click"
    },
    
    click: function() {
    	var page2 = new Page2View({collection : venue});
    }, */
    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page1View = Backbone.View.extend({

    
    template:_.template($('#page1').html()),
    
   

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page2View = Backbone.View.extend({
	initialize: function() {
		this.collection.bind('reset', this.render, this);
		console.log(this.collection.toJSON());
		console.log(this.options.name);
		
		
				
		//console.log(place.attributes['address']);
		    
   //$('#venueinfo').html(place.attributes['address'] + "</br>" + place.attributes['city'] + ", " + place.attributes['state']);

		},
    
    template:_.template($('#page2').html()),

/*activate: function () {
		var mapOptions = {
			zoom: 8,
			center:new google.maps.LatLng(40.556713854272346, -74.29942030405141),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	
	this.map = new google.maps.Map(this.$('#map-canvas'), mapOptions);
	console.log('success');
	},*/

   
    render:function (eventName, place, map) {
var place = this.collection.findWhere({name: this.options.name });
		var self = this;
        $(this.el).html(this.template());
        this.$el.append("<strong>"+ place.attributes['name'] + "</strong></br>" + place.attributes['address'] + "</br>" + place.attributes['city'] + ", " + place.attributes['state']);
        var map = new MapView({el: $('#map-canvas')[0], collection: this.collection, Name: this.options.name});
        return map;
        return this;
    }
});



var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "page1":"page1",
        "venues/:name":"page2"
    },

    initialize:function () {
    // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            window.location.reload();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
    
    	
        console.log('#home');
        this.changePage(new HomeView());
    },

    page1:function () {
        console.log('#page1');
        this.changePage(new Page1View());
    },

    page2:function (name) {
    	var Name = decodeURI(name);
    	console.log(Name);
	    	    
	    this.changePage(new Page2View({collection : venue, name : Name, el: $('#venueinfo')[0]}));
	    
	    
        
        
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});

