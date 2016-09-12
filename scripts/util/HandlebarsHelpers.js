var Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('log', function(context) {
	return console.log(context);
});

Handlebars.registerHelper('random', function() {
	var words = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore".split(" ");

	function random(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	return words[random(0, words.length - 1)];
});

Handlebars.registerHelper('parseEaseParameter', function(easeParameter) {
    var easeSettings = "";
    for(var p in easeParameter) {
        if(!Coco.StringUtils.isEmpty(easeSettings)) {
            easeSettings += "; ";
        }
        easeSettings += p + ":" + easeParameter[p];
    }
    return easeSettings;
});