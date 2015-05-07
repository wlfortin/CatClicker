var catModel = {
	data: [
	{
		name: "Phat Cat",
		imgSrc: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQKrARcY1u8XGYXlfkWJ_dviRcSQ9Kwea3VdIktd4tNf3Izr-vmWg",
		clickCount: 0,
		nicknames: ["Phattie", "Mr. Phats", "Cats a Phats", "PhattyPuss"]
	},
	{
		name:"Peanut",
		clickCount: 0,
		imgSrc: "http://placekitten.com.s3.amazonaws.com/homepage-samples/200/138.jpg",
		nicknames: []
	},
	{
		name:"Snippet",
		clickCount: 0,
		imgSrc: "http://placekitten.com.s3.amazonaws.com/homepage-samples/96/140.jpg",
		nicknames: []
	},
	{
		name:"Chartruese",
		clickCount: 0,
		imgSrc: "http://placekitten.com.s3.amazonaws.com/homepage-samples/200/287.jpg",
		nicknames: []
	},
	{
		name:"Yogi",
		clickCount: 0,
		imgSrc: "http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg",
		nicknames: []
	},
	{
		name:"Zazzles",
		clickCount: 0,
		imgSrc: "http://placekitten.com.s3.amazonaws.com/homepage-samples/96/139.jpg",
		nicknames: []
	}]
};

var Cat = function(catData) {
	this.name = ko.observable(catData.name);
	this.imgSrc = ko.observable(catData.imgSrc);
	this.clickCount = ko.observable(catData.clickCount);
	this.nicknames = ko.observableArray(catData.nicknames);

	this.level = ko.computed(function() {
		if(this.clickCount() < 50) {
			return "Infant";
		} else if (this.clickCount() >= 50 && this.clickCount() < 100) {
			return "Teen";
		} else if (this.clickCount() >= 100) {
			return "Grown-up";
		}
	}, this);
};

var viewModel = function() {
	var self = this;

	this.catList = ko.observableArray([]);

	catModel.data.forEach(function(catItem) {
		self.catList.push(new Cat(catItem));
	});

	this.currentCat = ko.observable(this.catList()[0]);

	this.incrementCounter = function() {
		self.currentCat().clickCount(self.currentCat().clickCount() + 1);
	};
};

ko.applyBindings(new viewModel());