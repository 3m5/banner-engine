var Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('log', function(context) {
	return console.log(context);
});

Handlebars.registerHelper('parseEaseParameter', function(easeParameter) {
	let Coco = require("3m5-coco");

	var easeSettings = "";
    for(var p in easeParameter) {
        if(!Coco.StringUtils.isEmpty(easeSettings)) {
            easeSettings += "; ";
        }
        easeSettings += p + ":" + easeParameter[p];
    }
    return easeSettings;
});