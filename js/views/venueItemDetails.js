var MenuItemDetails = Backbone.View.extend({
	render: function () {
		var markup = '<div>' +
		'<h1>' + this.options.name + '</h1>' +
		'<p><span class="label">' + this.options.category + '</span></p>' +
		'<img src="photos/' + this.options.imagepath + '" class="img-polaroid" />' +
		'</div>';

		this.$el.html(markup);
		return this;
	}
});