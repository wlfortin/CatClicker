$(function() {

	var catModel = {
		currentCat: null,
		data: [
		{
			name:"Peanut",
			counter: 0,
			url: "http://placekitten.com.s3.amazonaws.com/homepage-samples/200/138.jpg"
		},
		{
			name:"Snippet",
			counter: 0,
			url: "http://placekitten.com.s3.amazonaws.com/homepage-samples/96/140.jpg"
		},
		{
			name:"Chartruese",
			counter: 0,
			url: "http://placekitten.com.s3.amazonaws.com/homepage-samples/200/287.jpg"
		},
		{
			name:"Yogi",
			counter: 0,
			url: "http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg"
		},
		{
			name:"Zazzles",
			counter: 0,
			url: "http://placekitten.com.s3.amazonaws.com/homepage-samples/96/139.jpg"
		}]
	};
	
	var catListView = {
		init: function() {
			this.list = $("ul.cat-list");

			this.render();
		},
		render: function() {
			var catData = catOctopus.getCatData();
			this.list.html("");

			for(var i=0, len = catData.length; i<len; i++) {
				var cat = catData[i];
				var $el = $("<li>");

				$el.on("click", (function(cat) {
					return function(event) {
						event.preventDefault();
						catOctopus.setCurrentCat(cat);
						catOctopus.renderCatArea();
					}
				})(cat));

				$el.append("<h2><a href='javascript:void(0);'>" + cat.name + "</a></h2><img src='" + cat.url + "'>");
				this.list.append($el);
			}
		}
	};

	var catAreaView = {
		init: function() {
			this.area = $("div.cat-area");
			this.name = this.area.find("h2.cat-area__name");
			this.image = this.area.find("img.cat-area__image");
			this.counter = this.area.find("div.cat-area__counter").find("span");

			this.render();
			this.bindEvents();
		},
		bindEvents: function() {
			var self = this;
			this.image.on("click", function() {
				var cat = catOctopus.getCurrentCat();
				cat.counter++;
				self.counter.text(cat.counter);
			});
		},
		render: function() {
			var cat = catOctopus.getCurrentCat();
			if(cat) {
				this.name.text(cat.name);
				this.image.attr("src", cat.url);
				this.counter.text(cat.counter);
			}
		}
	};

	var catAdminView = {
		state: "show",
		init: function() {
			this.adminArea = $(".js-catAdmin");
			this.adminForm = this.adminArea.find("form.js-catAdminForm");
			this.catName = this.adminForm.find(".js-catName");
			this.catImage = this.adminForm.find(".js-catImage");
			this.catClicks = this.adminForm.find(".js-catClicks");

			this.toggleForm();
			this.bindEvents();
		},
		bindEvents: function(){
			var self = this;
			this.adminArea.find("button.js-adminBtn").on("click", function() {
				self.toggleForm();
			});

			this.adminForm.find(".js-cancelBtn").on("click", function() {
				self.toggleForm();
			});

			this.adminForm.find(".js-submitBtn").on("click", function(event) {
				event.preventDefault();

				var name = self.catName.val();
				var url = self.catImage.val();
				var count = self.catClicks.val();

				catOctopus.updateCatModel(name, url, count);
				self.toggleForm();
			});
		},
		toggleForm: function(){
			if(this.state === "show") {
				this.adminForm.hide();
				this.state = "hide";
			} else {
				this.populateForm();
				this.adminForm.show();
				this.state = "show";
			}
		},
		populateForm: function() {
			var cat = catOctopus.getCurrentCat();
			this.catName.val(cat.name);
			this.catImage.val(cat.url);
			this.catClicks.val(cat.counter);
		}
	};

	var catOctopus = {
		init: function() {
			catModel.currentCat = catModel.data[0];
			catListView.init();
			catAreaView.init();
			catAdminView.init();
		},
		getCurrentCat: function() {
			return catModel.currentCat;
		},
		setCurrentCat: function(cat) {
			catModel.currentCat = cat;
		},
		renderCatArea: function() {
			catAreaView.render();
			catAdminView.populateForm();
		},
		getCatData: function() {
			return catModel.data;
		},
		updateCatModel: function(name, url, count) {
			catModel.currentCat.name = name;
			catModel.currentCat.url = url;
			catModel.currentCat.counter = count;

			catListView.render();
			catAreaView.render();
		}
	};

	catOctopus.init();
});