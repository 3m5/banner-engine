var Handlebars  = require('hbsfy/runtime');

Handlebars.registerHelper('nl2br', function(value) {
	if(value == null) {
		return "";
	}
	if(value.lastIndexOf("\n") === value.length - 1) {
		value = value.substr(0, value.length - 1);
	}
	return value.replace(/\n/g, "<br/>");
});

Handlebars.registerHelper('log', function(context) {
	return console.log(context);
});

Handlebars.registerHelper('times', function(n, block) {
	var accum = '';
	for(var i = 1; i <= n; ++i)
		accum += block.fn(i);
	return accum;
});

Handlebars.registerHelper('plusOne', function(context) {
	return (context + 1);
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

Handlebars.registerHelper('ifNot', function (v1, options) {
    if (!v1) {
        return options.fn(this);
    }

    return options.inverse(this);
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
	switch (operator) {
		case '==':
			return (v1 == v2) ? options.fn(this) : options.inverse(this);
		case '!=':
			return (v1 != v2) ? options.fn(this) : options.inverse(this);
		case '===':
			return (v1 === v2) ? options.fn(this) : options.inverse(this);
		case '<':
			return (v1 < v2) ? options.fn(this) : options.inverse(this);
		case '<=':
			return (v1 <= v2) ? options.fn(this) : options.inverse(this);
		case '>':
			return (v1 > v2) ? options.fn(this) : options.inverse(this);
		case '>=':
			return (v1 >= v2) ? options.fn(this) : options.inverse(this);
		case '&&':
			return (v1 && v2) ? options.fn(this) : options.inverse(this);
		case '||':
			return (v1 || v2) ? options.fn(this) : options.inverse(this);
		default:
			return options.inverse(this);
	}
});

Handlebars.registerHelper('route', function(v1, v2) {
	var params = [];
	if (typeof v2 == 'string') {
		params = v2.replace(/\s+/g, '').split(',');
	}

	var parsedParams = {};
	var key;

	for(var i = 0; i < params.length; i++) {
		if(params[i].indexOf(':') === -1) {
			if(this.hasOwnProperty(params[i])) {
				parsedParams[params[i]] = this[params[i]];
			}
			else {
				throw new Error('Error while generating route "' + v1 + '". Model has no key "' + params[i] + '".');
			}
		}
		else {
			key = params[i].substring(params[i].indexOf(':') + 1);

			if(this.hasOwnProperty(key)) {
				parsedParams[params[i].substr(0, params[i].indexOf(':'))] = this[key];
			}
			else {
				parsedParams[params[i].substr(0, params[i].indexOf(':'))] = key;
			}
		}
	}

	return Coco.ServiceContainer.__services.router.generateUrl(v1, parsedParams);
});