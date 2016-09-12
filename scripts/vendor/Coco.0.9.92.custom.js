/**
 * @author (c) Johannes Klauss <johannes.klauss@3m5.de>
 * created at 06.02.14
 */
/** @namespace **/
var Coco = Coco || {};

/** @class Coco.config **/
if(!Coco.config) {
    Coco.config = {
        cacheHbs: true,             // If set to true, handlebar files will be cached, which increases the performance of View and ChildView creation.
        preCompileHbs: false,   // If set to true, Coco will preCompile the the handlebar files.
        baseUrl: null,      //server context path
        restService: {          //restService configuration
            path: null,       //restService path
            cacheGet: 600,       //cache time for GET Requests of same url in seconds
            cachePost: null       //cache time for GET Requests of same url in seconds
        }
    };
};/*!
 * jQuery JavaScript Library v1.10.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:48Z
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<10
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.10.2",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( jQuery.support.ownLast ) {
			for ( key in obj ) {
				return core_hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.10.2
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {

	var all, a, input, select, fragment, opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Finish early in limited (non-browser) environments
	all = div.getElementsByTagName("*") || [];
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !a || !a.style || !all.length ) {
		return support;
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName("tbody").length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName("link").length;

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone = document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Will be defined later
	support.inlineBlockNeedsLayout = false;
	support.shrinkWrapBlocks = false;
	support.pixelPosition = false;
	support.deleteExpando = true;
	support.noCloneEvent = true;
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: IE<9
	// Iteration over object's inherited properties before its own.
	for ( i in jQuery( support ) ) {
		break;
	}
	support.ownLast = i !== "0";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior.
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})({});

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"applet": true,
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			data = null,
			i = 0,
			elem = this[0];

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// Use proper attribute retrieval(#6932, #12072)
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var fn = jQuery.expr.attrHandle[ name ],
				ret = isXML ?
					undefined :
					/* jshint eqeqeq: false */
					(jQuery.expr.attrHandle[ name ] = undefined) !=
						getter( elem, name, isXML ) ?

						name.toLowerCase() :
						null;
			jQuery.expr.attrHandle[ name ] = fn;
			return ret;
		} :
		function( elem, name, isXML ) {
			return isXML ?
				undefined :
				elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};
	jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords =
		// Some attributes are constructed with empty-string values when not defined
		function( elem, name, isXML ) {
			var ret;
			return isXML ?
				undefined :
				(ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
		};
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ret.specified ?
				ret.value :
				undefined;
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = ret.push( cur );
					break;
				}
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== core_strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});
jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var len, styles,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Otherwise expose jQuery to the global object as usual
	window.jQuery = window.$ = jQuery;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

})( window );
;/*!

 handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/* exported Handlebars */
var Handlebars = (function() {
// handlebars/safe-string.js
var __module4__ = (function() {
  "use strict";
  var __exports__;
  // Build out our basic SafeString type
  function SafeString(string) {
    this.string = string;
  }

  SafeString.prototype.toString = function() {
    return "" + this.string;
  };

  __exports__ = SafeString;
  return __exports__;
})();

// handlebars/utils.js
var __module3__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  /*jshint -W004 */
  var SafeString = __dependency1__;

  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  function escapeChar(chr) {
    return escape[chr] || "&amp;";
  }

  function extend(obj, value) {
    for(var key in value) {
      if(Object.prototype.hasOwnProperty.call(value, key)) {
        obj[key] = value[key];
      }
    }
  }

  __exports__.extend = extend;var toString = Object.prototype.toString;
  __exports__.toString = toString;
  // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
  var isFunction = function(value) {
    return typeof value === 'function';
  };
  // fallback for older versions of Chrome and Safari
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }
  var isFunction;
  __exports__.isFunction = isFunction;
  var isArray = Array.isArray || function(value) {
    return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
  };
  __exports__.isArray = isArray;

  function escapeExpression(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof SafeString) {
      return string.toString();
    } else if (!string && string !== 0) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = "" + string;

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  }

  __exports__.escapeExpression = escapeExpression;function isEmpty(value) {
    if (!value && value !== 0) {
      return true;
    } else if (isArray(value) && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  __exports__.isEmpty = isEmpty;
  return __exports__;
})(__module4__);

// handlebars/exception.js
var __module5__ = (function() {
  "use strict";
  var __exports__;

  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(message, node) {
    var line;
    if (node && node.firstLine) {
      line = node.firstLine;

      message += ' - ' + line + ':' + node.firstColumn;
    }

    var tmp = Error.prototype.constructor.call(this, message);

    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }

    if (line) {
      this.lineNumber = line;
      this.column = node.firstColumn;
    }
  }

  Exception.prototype = new Error();

  __exports__ = Exception;
  return __exports__;
})();

// handlebars/base.js
var __module2__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;

  var VERSION = "1.3.0";
  __exports__.VERSION = VERSION;var COMPILER_REVISION = 4;
  __exports__.COMPILER_REVISION = COMPILER_REVISION;
  var REVISION_CHANGES = {
    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    2: '== 1.0.0-rc.3',
    3: '== 1.0.0-rc.4',
    4: '>= 1.0.0'
  };
  __exports__.REVISION_CHANGES = REVISION_CHANGES;
  var isArray = Utils.isArray,
      isFunction = Utils.isFunction,
      toString = Utils.toString,
      objectType = '[object Object]';

  function HandlebarsEnvironment(helpers, partials) {
    this.helpers = helpers || {};
    this.partials = partials || {};

    registerDefaultHelpers(this);
  }

  __exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
    constructor: HandlebarsEnvironment,

    logger: logger,
    log: log,

    registerHelper: function(name, fn, inverse) {
      if (toString.call(name) === objectType) {
        if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
        Utils.extend(this.helpers, name);
      } else {
        if (inverse) { fn.not = inverse; }
        this.helpers[name] = fn;
      }
    },

    registerPartial: function(name, str) {
      if (toString.call(name) === objectType) {
        Utils.extend(this.partials,  name);
      } else {
        this.partials[name] = str;
      }
    }
  };

  function registerDefaultHelpers(instance) {
    instance.registerHelper('helperMissing', function(arg) {
      if(arguments.length === 2) {
        return undefined;
      } else {
        throw new Exception("Missing helper: '" + arg + "'");
      }
    });

    instance.registerHelper('blockHelperMissing', function(context, options) {
      var inverse = options.inverse || function() {}, fn = options.fn;

      if (isFunction(context)) { context = context.call(this); }

      if(context === true) {
        return fn(this);
      } else if(context === false || context == null) {
        return inverse(this);
      } else if (isArray(context)) {
        if(context.length > 0) {
          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        return fn(context);
      }
    });

    instance.registerHelper('each', function(context, options) {
      var fn = options.fn, inverse = options.inverse;
      var i = 0, ret = "", data;

      if (isFunction(context)) { context = context.call(this); }

      if (options.data) {
        data = createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if (isArray(context)) {
          for(var j = context.length; i<j; i++) {
            if (data) {
              data.index = i;
              data.first = (i === 0);
              data.last  = (i === (context.length-1));
            }
            ret = ret + fn(context[i], { data: data });
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key)) {
              if(data) {
                data.key = key;
                data.index = i;
                data.first = (i === 0);
              }
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }
        }
      }

      if(i === 0){
        ret = inverse(this);
      }

      return ret;
    });

    instance.registerHelper('if', function(conditional, options) {
      if (isFunction(conditional)) { conditional = conditional.call(this); }

      // Default behavior is to render the positive path if the value is truthy and not empty.
      // The `includeZero` option may be set to treat the condtional as purely not empty based on the
      // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
      if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    instance.registerHelper('unless', function(conditional, options) {
      return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
    });

    instance.registerHelper('with', function(context, options) {
      if (isFunction(context)) { context = context.call(this); }

      if (!Utils.isEmpty(context)) return options.fn(context);
    });

    instance.registerHelper('log', function(context, options) {
      var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
      instance.log(level, context);
    });
  }

  var logger = {
    methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

    // State enum
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,

    // can be overridden in the host environment
    log: function(level, obj) {
      if (logger.level <= level) {
        var method = logger.methodMap[level];
        if (typeof console !== 'undefined' && console[method]) {
          console[method].call(console, obj);
        }
      }
    }
  };
  __exports__.logger = logger;
  function log(level, obj) { logger.log(level, obj); }

  __exports__.log = log;var createFrame = function(object) {
    var obj = {};
    Utils.extend(obj, object);
    return obj;
  };
  __exports__.createFrame = createFrame;
  return __exports__;
})(__module3__, __module5__);

// handlebars/runtime.js
var __module6__ = (function(__dependency1__, __dependency2__, __dependency3__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;
  var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;

  function checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = COMPILER_REVISION;

    if (compilerRevision !== currentRevision) {
      if (compilerRevision < currentRevision) {
        var runtimeVersions = REVISION_CHANGES[currentRevision],
            compilerVersions = REVISION_CHANGES[compilerRevision];
        throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
              "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
              "Please update your runtime to a newer version ("+compilerInfo[1]+").");
      }
    }
  }

  __exports__.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

  function template(templateSpec, env) {
    if (!env) {
      throw new Exception("No environment passed to template");
    }

    // Note: Using env.VM references rather than local var references throughout this section to allow
    // for external users to override these as psuedo-supported APIs.
    var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
      var result = env.VM.invokePartial.apply(this, arguments);
      if (result != null) { return result; }

      if (env.compile) {
        var options = { helpers: helpers, partials: partials, data: data };
        partials[name] = env.compile(partial, { data: data !== undefined }, env);
        return partials[name](context, options);
      } else {
        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
      }
    };

    // Just add water
    var container = {
      escapeExpression: Utils.escapeExpression,
      invokePartial: invokePartialWrapper,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common && (param !== common)) {
          ret = {};
          Utils.extend(ret, common);
          Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: env.VM.programWithDepth,
      noop: env.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var namespace = options.partial ? options : env,
          helpers,
          partials;

      if (!options.partial) {
        helpers = options.helpers;
        partials = options.partials;
      }
      var result = templateSpec.call(
            container,
            namespace, context,
            helpers,
            partials,
            options.data);

      if (!options.partial) {
        env.VM.checkRevision(container.compilerInfo);
      }

      return result;
    };
  }

  __exports__.template = template;function programWithDepth(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var prog = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    prog.program = i;
    prog.depth = args.length;
    return prog;
  }

  __exports__.programWithDepth = programWithDepth;function program(i, fn, data) {
    var prog = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    prog.program = i;
    prog.depth = 0;
    return prog;
  }

  __exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
    var options = { partial: true, helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    }
  }

  __exports__.invokePartial = invokePartial;function noop() { return ""; }

  __exports__.noop = noop;
  return __exports__;
})(__module3__, __module5__, __module2__);

// handlebars.runtime.js
var __module1__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var base = __dependency1__;

  // Each of these augment the Handlebars object. No need to setup here.
  // (This is done to easily share code between commonjs and browse envs)
  var SafeString = __dependency2__;
  var Exception = __dependency3__;
  var Utils = __dependency4__;
  var runtime = __dependency5__;

  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
  var create = function() {
    var hb = new base.HandlebarsEnvironment();

    Utils.extend(hb, base);
    hb.SafeString = SafeString;
    hb.Exception = Exception;
    hb.Utils = Utils;

    hb.VM = runtime;
    hb.template = function(spec) {
      return runtime.template(spec, hb);
    };

    return hb;
  };

  var Handlebars = create();
  Handlebars.create = create;

  __exports__ = Handlebars;
  return __exports__;
})(__module2__, __module4__, __module5__, __module3__, __module6__);

// handlebars/compiler/ast.js
var __module7__ = (function(__dependency1__) {
  "use strict";
  var __exports__;
  var Exception = __dependency1__;

  function LocationInfo(locInfo){
    locInfo = locInfo || {};
    this.firstLine   = locInfo.first_line;
    this.firstColumn = locInfo.first_column;
    this.lastColumn  = locInfo.last_column;
    this.lastLine    = locInfo.last_line;
  }

  var AST = {
    ProgramNode: function(statements, inverseStrip, inverse, locInfo) {
      var inverseLocationInfo, firstInverseNode;
      if (arguments.length === 3) {
        locInfo = inverse;
        inverse = null;
      } else if (arguments.length === 2) {
        locInfo = inverseStrip;
        inverseStrip = null;
      }

      LocationInfo.call(this, locInfo);
      this.type = "program";
      this.statements = statements;
      this.strip = {};

      if(inverse) {
        firstInverseNode = inverse[0];
        if (firstInverseNode) {
          inverseLocationInfo = {
            first_line: firstInverseNode.firstLine,
            last_line: firstInverseNode.lastLine,
            last_column: firstInverseNode.lastColumn,
            first_column: firstInverseNode.firstColumn
          };
          this.inverse = new AST.ProgramNode(inverse, inverseStrip, inverseLocationInfo);
        } else {
          this.inverse = new AST.ProgramNode(inverse, inverseStrip);
        }
        this.strip.right = inverseStrip.left;
      } else if (inverseStrip) {
        this.strip.left = inverseStrip.right;
      }
    },

    MustacheNode: function(rawParams, hash, open, strip, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "mustache";
      this.strip = strip;

      // Open may be a string parsed from the parser or a passed boolean flag
      if (open != null && open.charAt) {
        // Must use charAt to support IE pre-10
        var escapeFlag = open.charAt(3) || open.charAt(2);
        this.escaped = escapeFlag !== '{' && escapeFlag !== '&';
      } else {
        this.escaped = !!open;
      }

      if (rawParams instanceof AST.SexprNode) {
        this.sexpr = rawParams;
      } else {
        // Support old AST API
        this.sexpr = new AST.SexprNode(rawParams, hash);
      }

      this.sexpr.isRoot = true;

      // Support old AST API that stored this info in MustacheNode
      this.id = this.sexpr.id;
      this.params = this.sexpr.params;
      this.hash = this.sexpr.hash;
      this.eligibleHelper = this.sexpr.eligibleHelper;
      this.isHelper = this.sexpr.isHelper;
    },

    SexprNode: function(rawParams, hash, locInfo) {
      LocationInfo.call(this, locInfo);

      this.type = "sexpr";
      this.hash = hash;

      var id = this.id = rawParams[0];
      var params = this.params = rawParams.slice(1);

      // a mustache is an eligible helper if:
      // * its id is simple (a single part, not `this` or `..`)
      var eligibleHelper = this.eligibleHelper = id.isSimple;

      // a mustache is definitely a helper if:
      // * it is an eligible helper, and
      // * it has at least one parameter or hash segment
      this.isHelper = eligibleHelper && (params.length || hash);

      // if a mustache is an eligible helper but not a definite
      // helper, it is ambiguous, and will be resolved in a later
      // pass or at runtime.
    },

    PartialNode: function(partialName, context, strip, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type         = "partial";
      this.partialName  = partialName;
      this.context      = context;
      this.strip = strip;
    },

    BlockNode: function(mustache, program, inverse, close, locInfo) {
      LocationInfo.call(this, locInfo);

      if(mustache.sexpr.id.original !== close.path.original) {
        throw new Exception(mustache.sexpr.id.original + " doesn't match " + close.path.original, this);
      }

      this.type = 'block';
      this.mustache = mustache;
      this.program  = program;
      this.inverse  = inverse;

      this.strip = {
        left: mustache.strip.left,
        right: close.strip.right
      };

      (program || inverse).strip.left = mustache.strip.right;
      (inverse || program).strip.right = close.strip.left;

      if (inverse && !program) {
        this.isInverse = true;
      }
    },

    ContentNode: function(string, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "content";
      this.string = string;
    },

    HashNode: function(pairs, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "hash";
      this.pairs = pairs;
    },

    IdNode: function(parts, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "ID";

      var original = "",
          dig = [],
          depth = 0;

      for(var i=0,l=parts.length; i<l; i++) {
        var part = parts[i].part;
        original += (parts[i].separator || '') + part;

        if (part === ".." || part === "." || part === "this") {
          if (dig.length > 0) {
            throw new Exception("Invalid path: " + original, this);
          } else if (part === "..") {
            depth++;
          } else {
            this.isScoped = true;
          }
        } else {
          dig.push(part);
        }
      }

      this.original = original;
      this.parts    = dig;
      this.string   = dig.join('.');
      this.depth    = depth;

      // an ID is simple if it only has one part, and that part is not
      // `..` or `this`.
      this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

      this.stringModeValue = this.string;
    },

    PartialNameNode: function(name, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "PARTIAL_NAME";
      this.name = name.original;
    },

    DataNode: function(id, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "DATA";
      this.id = id;
    },

    StringNode: function(string, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "STRING";
      this.original =
        this.string =
        this.stringModeValue = string;
    },

    IntegerNode: function(integer, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "INTEGER";
      this.original =
        this.integer = integer;
      this.stringModeValue = Number(integer);
    },

    BooleanNode: function(bool, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "BOOLEAN";
      this.bool = bool;
      this.stringModeValue = bool === "true";
    },

    CommentNode: function(comment, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "comment";
      this.comment = comment;
    }
  };

  // Must be exported as an object rather than the root of the module as the jison lexer
  // most modify the object to operate properly.
  __exports__ = AST;
  return __exports__;
})(__module5__);

// handlebars/compiler/parser.js
var __module9__ = (function() {
  "use strict";
  var __exports__;
  /* jshint ignore:start */
  /* Jison generated parser */
  var handlebars = (function(){
  var parser = {trace: function trace() { },
  yy: {},
  symbols_: {"error":2,"root":3,"statements":4,"EOF":5,"program":6,"simpleInverse":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"sexpr":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"CLOSE_UNESCAPED":24,"OPEN_PARTIAL":25,"partialName":26,"partial_option0":27,"sexpr_repetition0":28,"sexpr_option0":29,"dataName":30,"param":31,"STRING":32,"INTEGER":33,"BOOLEAN":34,"OPEN_SEXPR":35,"CLOSE_SEXPR":36,"hash":37,"hash_repetition_plus0":38,"hashSegment":39,"ID":40,"EQUALS":41,"DATA":42,"pathSegments":43,"SEP":44,"$accept":0,"$end":1},
  terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",32:"STRING",33:"INTEGER",34:"BOOLEAN",35:"OPEN_SEXPR",36:"CLOSE_SEXPR",40:"ID",41:"EQUALS",42:"DATA",44:"SEP"},
  productions_: [0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,4],[7,2],[17,3],[17,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[37,1],[39,3],[26,1],[26,1],[26,1],[30,2],[21,1],[43,3],[43,1],[27,0],[27,1],[28,0],[28,2],[29,0],[29,1],[38,1],[38,2]],
  performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

  var $0 = $$.length - 1;
  switch (yystate) {
  case 1: return new yy.ProgramNode($$[$0-1], this._$);
  break;
  case 2: return new yy.ProgramNode([], this._$);
  break;
  case 3:this.$ = new yy.ProgramNode([], $$[$0-1], $$[$0], this._$);
  break;
  case 4:this.$ = new yy.ProgramNode($$[$0-2], $$[$0-1], $$[$0], this._$);
  break;
  case 5:this.$ = new yy.ProgramNode($$[$0-1], $$[$0], [], this._$);
  break;
  case 6:this.$ = new yy.ProgramNode($$[$0], this._$);
  break;
  case 7:this.$ = new yy.ProgramNode([], this._$);
  break;
  case 8:this.$ = new yy.ProgramNode([], this._$);
  break;
  case 9:this.$ = [$$[$0]];
  break;
  case 10: $$[$0-1].push($$[$0]); this.$ = $$[$0-1];
  break;
  case 11:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0], this._$);
  break;
  case 12:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0], this._$);
  break;
  case 13:this.$ = $$[$0];
  break;
  case 14:this.$ = $$[$0];
  break;
  case 15:this.$ = new yy.ContentNode($$[$0], this._$);
  break;
  case 16:this.$ = new yy.CommentNode($$[$0], this._$);
  break;
  case 17:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 18:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 19:this.$ = {path: $$[$0-1], strip: stripFlags($$[$0-2], $$[$0])};
  break;
  case 20:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 21:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 22:this.$ = new yy.PartialNode($$[$0-2], $$[$0-1], stripFlags($$[$0-3], $$[$0]), this._$);
  break;
  case 23:this.$ = stripFlags($$[$0-1], $$[$0]);
  break;
  case 24:this.$ = new yy.SexprNode([$$[$0-2]].concat($$[$0-1]), $$[$0], this._$);
  break;
  case 25:this.$ = new yy.SexprNode([$$[$0]], null, this._$);
  break;
  case 26:this.$ = $$[$0];
  break;
  case 27:this.$ = new yy.StringNode($$[$0], this._$);
  break;
  case 28:this.$ = new yy.IntegerNode($$[$0], this._$);
  break;
  case 29:this.$ = new yy.BooleanNode($$[$0], this._$);
  break;
  case 30:this.$ = $$[$0];
  break;
  case 31:$$[$0-1].isHelper = true; this.$ = $$[$0-1];
  break;
  case 32:this.$ = new yy.HashNode($$[$0], this._$);
  break;
  case 33:this.$ = [$$[$0-2], $$[$0]];
  break;
  case 34:this.$ = new yy.PartialNameNode($$[$0], this._$);
  break;
  case 35:this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0], this._$), this._$);
  break;
  case 36:this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0], this._$));
  break;
  case 37:this.$ = new yy.DataNode($$[$0], this._$);
  break;
  case 38:this.$ = new yy.IdNode($$[$0], this._$);
  break;
  case 39: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2];
  break;
  case 40:this.$ = [{part: $$[$0]}];
  break;
  case 43:this.$ = [];
  break;
  case 44:$$[$0-1].push($$[$0]);
  break;
  case 47:this.$ = [$$[$0]];
  break;
  case 48:$$[$0-1].push($$[$0]);
  break;
  }
  },
  table: [{3:1,4:2,5:[1,3],8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[3]},{5:[1,16],8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[2,2]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{4:20,6:18,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{4:20,6:22,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{17:23,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:29,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:30,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:31,21:24,30:25,40:[1,28],42:[1,27],43:26},{21:33,26:32,32:[1,34],33:[1,35],40:[1,28],43:26},{1:[2,1]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{10:36,20:[1,37]},{4:38,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,7],22:[1,13],23:[1,14],25:[1,15]},{7:39,8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,6],22:[1,13],23:[1,14],25:[1,15]},{17:23,18:[1,40],21:24,30:25,40:[1,28],42:[1,27],43:26},{10:41,20:[1,37]},{18:[1,42]},{18:[2,43],24:[2,43],28:43,32:[2,43],33:[2,43],34:[2,43],35:[2,43],36:[2,43],40:[2,43],42:[2,43]},{18:[2,25],24:[2,25],36:[2,25]},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38],40:[2,38],42:[2,38],44:[1,44]},{21:45,40:[1,28],43:26},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],42:[2,40],44:[2,40]},{18:[1,46]},{18:[1,47]},{24:[1,48]},{18:[2,41],21:50,27:49,40:[1,28],43:26},{18:[2,34],40:[2,34]},{18:[2,35],40:[2,35]},{18:[2,36],40:[2,36]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{21:51,40:[1,28],43:26},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,3],22:[1,13],23:[1,14],25:[1,15]},{4:52,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,5],22:[1,13],23:[1,14],25:[1,15]},{14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]},{18:[2,45],21:56,24:[2,45],29:53,30:60,31:54,32:[1,57],33:[1,58],34:[1,59],35:[1,61],36:[2,45],37:55,38:62,39:63,40:[1,64],42:[1,27],43:26},{40:[1,65]},{18:[2,37],24:[2,37],32:[2,37],33:[2,37],34:[2,37],35:[2,37],36:[2,37],40:[2,37],42:[2,37]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,66]},{18:[2,42]},{18:[1,67]},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],25:[1,15]},{18:[2,24],24:[2,24],36:[2,24]},{18:[2,44],24:[2,44],32:[2,44],33:[2,44],34:[2,44],35:[2,44],36:[2,44],40:[2,44],42:[2,44]},{18:[2,46],24:[2,46],36:[2,46]},{18:[2,26],24:[2,26],32:[2,26],33:[2,26],34:[2,26],35:[2,26],36:[2,26],40:[2,26],42:[2,26]},{18:[2,27],24:[2,27],32:[2,27],33:[2,27],34:[2,27],35:[2,27],36:[2,27],40:[2,27],42:[2,27]},{18:[2,28],24:[2,28],32:[2,28],33:[2,28],34:[2,28],35:[2,28],36:[2,28],40:[2,28],42:[2,28]},{18:[2,29],24:[2,29],32:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29],40:[2,29],42:[2,29]},{18:[2,30],24:[2,30],32:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30],40:[2,30],42:[2,30]},{17:68,21:24,30:25,40:[1,28],42:[1,27],43:26},{18:[2,32],24:[2,32],36:[2,32],39:69,40:[1,70]},{18:[2,47],24:[2,47],36:[2,47],40:[2,47]},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],41:[1,71],42:[2,40],44:[2,40]},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],35:[2,39],36:[2,39],40:[2,39],42:[2,39],44:[2,39]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{36:[1,72]},{18:[2,48],24:[2,48],36:[2,48],40:[2,48]},{41:[1,71]},{21:56,30:60,31:73,32:[1,57],33:[1,58],34:[1,59],35:[1,61],40:[1,28],42:[1,27],43:26},{18:[2,31],24:[2,31],32:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31],40:[2,31],42:[2,31]},{18:[2,33],24:[2,33],36:[2,33],40:[2,33]}],
  defaultActions: {3:[2,2],16:[2,1],50:[2,42]},
  parseError: function parseError(str, hash) {
      throw new Error(str);
  },
  parse: function parse(input) {
      var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
      this.lexer.setInput(input);
      this.lexer.yy = this.yy;
      this.yy.lexer = this.lexer;
      this.yy.parser = this;
      if (typeof this.lexer.yylloc == "undefined")
          this.lexer.yylloc = {};
      var yyloc = this.lexer.yylloc;
      lstack.push(yyloc);
      var ranges = this.lexer.options && this.lexer.options.ranges;
      if (typeof this.yy.parseError === "function")
          this.parseError = this.yy.parseError;
      function popStack(n) {
          stack.length = stack.length - 2 * n;
          vstack.length = vstack.length - n;
          lstack.length = lstack.length - n;
      }
      function lex() {
          var token;
          token = self.lexer.lex() || 1;
          if (typeof token !== "number") {
              token = self.symbols_[token] || token;
          }
          return token;
      }
      var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
      while (true) {
          state = stack[stack.length - 1];
          if (this.defaultActions[state]) {
              action = this.defaultActions[state];
          } else {
              if (symbol === null || typeof symbol == "undefined") {
                  symbol = lex();
              }
              action = table[state] && table[state][symbol];
          }
          if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                  expected = [];
                  for (p in table[state])
                      if (this.terminals_[p] && p > 2) {
                          expected.push("'" + this.terminals_[p] + "'");
                      }
                  if (this.lexer.showPosition) {
                      errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                  } else {
                      errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                  }
                  this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
              }
          }
          if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
          }
          switch (action[0]) {
          case 1:
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
              if (!preErrorSymbol) {
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  if (recovering > 0)
                      recovering--;
              } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
              }
              break;
          case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
              if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
              }
              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
              if (typeof r !== "undefined") {
                  return r;
              }
              if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;
          case 3:
              return true;
          }
      }
      return true;
  }
  };


  function stripFlags(open, close) {
    return {
      left: open.charAt(2) === '~',
      right: close.charAt(0) === '~' || close.charAt(1) === '~'
    };
  }

  /* Jison generated lexer */
  var lexer = (function(){
  var lexer = ({EOF:1,
  parseError:function parseError(str, hash) {
          if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
          } else {
              throw new Error(str);
          }
      },
  setInput:function (input) {
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
          if (this.options.ranges) this.yylloc.range = [0,0];
          this.offset = 0;
          return this;
      },
  input:function () {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);
          if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
          } else {
              this.yylloc.last_column++;
          }
          if (this.options.ranges) this.yylloc.range[1]++;

          this._input = this._input.slice(1);
          return ch;
      },
  unput:function (ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);

          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
          //this.yyleng -= len;
          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length-1);
          this.matched = this.matched.substr(0, this.matched.length-1);

          if (lines.length-1) this.yylineno -= lines.length-1;
          var r = this.yylloc.range;

          this.yylloc = {first_line: this.yylloc.first_line,
            last_line: this.yylineno+1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
                this.yylloc.first_column - len
            };

          if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }
          return this;
      },
  more:function () {
          this._more = true;
          return this;
      },
  less:function (n) {
          this.unput(this.match.slice(n));
      },
  pastInput:function () {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
      },
  upcomingInput:function () {
          var next = this.match;
          if (next.length < 20) {
              next += this._input.substr(0, 20-next.length);
          }
          return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
      },
  showPosition:function () {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c+"^";
      },
  next:function () {
          if (this.done) {
              return this.EOF;
          }
          if (!this._input) this.done = true;

          var token,
              match,
              tempMatch,
              index,
              col,
              lines;
          if (!this._more) {
              this.yytext = '';
              this.match = '';
          }
          var rules = this._currentRules();
          for (var i=0;i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                  match = tempMatch;
                  index = i;
                  if (!this.options.flex) break;
              }
          }
          if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = {first_line: this.yylloc.last_line,
                             last_line: this.yylineno+1,
                             first_column: this.yylloc.last_column,
                             last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                  this.yylloc.range = [this.offset, this.offset += this.yyleng];
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
              if (this.done && this._input) this.done = false;
              if (token) return token;
              else return;
          }
          if (this._input === "") {
              return this.EOF;
          } else {
              return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                      {text: "", token: null, line: this.yylineno});
          }
      },
  lex:function lex() {
          var r = this.next();
          if (typeof r !== 'undefined') {
              return r;
          } else {
              return this.lex();
          }
      },
  begin:function begin(condition) {
          this.conditionStack.push(condition);
      },
  popState:function popState() {
          return this.conditionStack.pop();
      },
  _currentRules:function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
      },
  topState:function () {
          return this.conditionStack[this.conditionStack.length-2];
      },
  pushState:function begin(condition) {
          this.begin(condition);
      }});
  lexer.options = {};
  lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {


  function strip(start, end) {
    return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng-end);
  }


  var YYSTATE=YY_START
  switch($avoiding_name_collisions) {
  case 0:
                                     if(yy_.yytext.slice(-2) === "\\\\") {
                                       strip(0,1);
                                       this.begin("mu");
                                     } else if(yy_.yytext.slice(-1) === "\\") {
                                       strip(0,1);
                                       this.begin("emu");
                                     } else {
                                       this.begin("mu");
                                     }
                                     if(yy_.yytext) return 14;

  break;
  case 1:return 14;
  break;
  case 2:
                                     this.popState();
                                     return 14;

  break;
  case 3:strip(0,4); this.popState(); return 15;
  break;
  case 4:return 35;
  break;
  case 5:return 36;
  break;
  case 6:return 25;
  break;
  case 7:return 16;
  break;
  case 8:return 20;
  break;
  case 9:return 19;
  break;
  case 10:return 19;
  break;
  case 11:return 23;
  break;
  case 12:return 22;
  break;
  case 13:this.popState(); this.begin('com');
  break;
  case 14:strip(3,5); this.popState(); return 15;
  break;
  case 15:return 22;
  break;
  case 16:return 41;
  break;
  case 17:return 40;
  break;
  case 18:return 40;
  break;
  case 19:return 44;
  break;
  case 20:// ignore whitespace
  break;
  case 21:this.popState(); return 24;
  break;
  case 22:this.popState(); return 18;
  break;
  case 23:yy_.yytext = strip(1,2).replace(/\\"/g,'"'); return 32;
  break;
  case 24:yy_.yytext = strip(1,2).replace(/\\'/g,"'"); return 32;
  break;
  case 25:return 42;
  break;
  case 26:return 34;
  break;
  case 27:return 34;
  break;
  case 28:return 33;
  break;
  case 29:return 40;
  break;
  case 30:yy_.yytext = strip(1,2); return 40;
  break;
  case 31:return 'INVALID';
  break;
  case 32:return 5;
  break;
  }
  };
  lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
  lexer.conditions = {"mu":{"rules":[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"com":{"rules":[3],"inclusive":false},"INITIAL":{"rules":[0,1,32],"inclusive":true}};
  return lexer;})()
  parser.lexer = lexer;
  function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
  return new Parser;
  })();__exports__ = handlebars;
  /* jshint ignore:end */
  return __exports__;
})();

// handlebars/compiler/base.js
var __module8__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var parser = __dependency1__;
  var AST = __dependency2__;

  __exports__.parser = parser;

  function parse(input) {
    // Just return if an already-compile AST was passed in.
    if(input.constructor === AST.ProgramNode) { return input; }

    parser.yy = AST;
    return parser.parse(input);
  }

  __exports__.parse = parse;
  return __exports__;
})(__module9__, __module7__);

// handlebars/compiler/compiler.js
var __module10__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  var Exception = __dependency1__;

  function Compiler() {}

  __exports__.Compiler = Compiler;// the foundHelper register will disambiguate helper lookup from finding a
  // function in a context. This is necessary for mustache compatibility, which
  // requires that context functions in blocks are evaluated by blockHelperMissing,
  // and then proceed as if the resulting value was provided to blockHelperMissing.

  Compiler.prototype = {
    compiler: Compiler,

    disassemble: function() {
      var opcodes = this.opcodes, opcode, out = [], params, param;

      for (var i=0, l=opcodes.length; i<l; i++) {
        opcode = opcodes[i];

        if (opcode.opcode === 'DECLARE') {
          out.push("DECLARE " + opcode.name + "=" + opcode.value);
        } else {
          params = [];
          for (var j=0; j<opcode.args.length; j++) {
            param = opcode.args[j];
            if (typeof param === "string") {
              param = "\"" + param.replace("\n", "\\n") + "\"";
            }
            params.push(param);
          }
          out.push(opcode.opcode + " " + params.join(" "));
        }
      }

      return out.join("\n");
    },

    equals: function(other) {
      var len = this.opcodes.length;
      if (other.opcodes.length !== len) {
        return false;
      }

      for (var i = 0; i < len; i++) {
        var opcode = this.opcodes[i],
            otherOpcode = other.opcodes[i];
        if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
          return false;
        }
        for (var j = 0; j < opcode.args.length; j++) {
          if (opcode.args[j] !== otherOpcode.args[j]) {
            return false;
          }
        }
      }

      len = this.children.length;
      if (other.children.length !== len) {
        return false;
      }
      for (i = 0; i < len; i++) {
        if (!this.children[i].equals(other.children[i])) {
          return false;
        }
      }

      return true;
    },

    guid: 0,

    compile: function(program, options) {
      this.opcodes = [];
      this.children = [];
      this.depths = {list: []};
      this.options = options;

      // These changes will propagate to the other compiler components
      var knownHelpers = this.options.knownHelpers;
      this.options.knownHelpers = {
        'helperMissing': true,
        'blockHelperMissing': true,
        'each': true,
        'if': true,
        'unless': true,
        'with': true,
        'log': true
      };
      if (knownHelpers) {
        for (var name in knownHelpers) {
          this.options.knownHelpers[name] = knownHelpers[name];
        }
      }

      return this.accept(program);
    },

    accept: function(node) {
      var strip = node.strip || {},
          ret;
      if (strip.left) {
        this.opcode('strip');
      }

      ret = this[node.type](node);

      if (strip.right) {
        this.opcode('strip');
      }

      return ret;
    },

    program: function(program) {
      var statements = program.statements;

      for(var i=0, l=statements.length; i<l; i++) {
        this.accept(statements[i]);
      }
      this.isSimple = l === 1;

      this.depths.list = this.depths.list.sort(function(a, b) {
        return a - b;
      });

      return this;
    },

    compileProgram: function(program) {
      var result = new this.compiler().compile(program, this.options);
      var guid = this.guid++, depth;

      this.usePartial = this.usePartial || result.usePartial;

      this.children[guid] = result;

      for(var i=0, l=result.depths.list.length; i<l; i++) {
        depth = result.depths.list[i];

        if(depth < 2) { continue; }
        else { this.addDepth(depth - 1); }
      }

      return guid;
    },

    block: function(block) {
      var mustache = block.mustache,
          program = block.program,
          inverse = block.inverse;

      if (program) {
        program = this.compileProgram(program);
      }

      if (inverse) {
        inverse = this.compileProgram(inverse);
      }

      var sexpr = mustache.sexpr;
      var type = this.classifySexpr(sexpr);

      if (type === "helper") {
        this.helperSexpr(sexpr, program, inverse);
      } else if (type === "simple") {
        this.simpleSexpr(sexpr);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('blockValue');
      } else {
        this.ambiguousSexpr(sexpr, program, inverse);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('ambiguousBlockValue');
      }

      this.opcode('append');
    },

    hash: function(hash) {
      var pairs = hash.pairs, pair, val;

      this.opcode('pushHash');

      for(var i=0, l=pairs.length; i<l; i++) {
        pair = pairs[i];
        val  = pair[1];

        if (this.options.stringParams) {
          if(val.depth) {
            this.addDepth(val.depth);
          }
          this.opcode('getContext', val.depth || 0);
          this.opcode('pushStringParam', val.stringModeValue, val.type);

          if (val.type === 'sexpr') {
            // Subexpressions get evaluated and passed in
            // in string params mode.
            this.sexpr(val);
          }
        } else {
          this.accept(val);
        }

        this.opcode('assignToHash', pair[0]);
      }
      this.opcode('popHash');
    },

    partial: function(partial) {
      var partialName = partial.partialName;
      this.usePartial = true;

      if(partial.context) {
        this.ID(partial.context);
      } else {
        this.opcode('push', 'depth0');
      }

      this.opcode('invokePartial', partialName.name);
      this.opcode('append');
    },

    content: function(content) {
      this.opcode('appendContent', content.string);
    },

    mustache: function(mustache) {
      this.sexpr(mustache.sexpr);

      if(mustache.escaped && !this.options.noEscape) {
        this.opcode('appendEscaped');
      } else {
        this.opcode('append');
      }
    },

    ambiguousSexpr: function(sexpr, program, inverse) {
      var id = sexpr.id,
          name = id.parts[0],
          isBlock = program != null || inverse != null;

      this.opcode('getContext', id.depth);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      this.opcode('invokeAmbiguous', name, isBlock);
    },

    simpleSexpr: function(sexpr) {
      var id = sexpr.id;

      if (id.type === 'DATA') {
        this.DATA(id);
      } else if (id.parts.length) {
        this.ID(id);
      } else {
        // Simplified ID for `this`
        this.addDepth(id.depth);
        this.opcode('getContext', id.depth);
        this.opcode('pushContext');
      }

      this.opcode('resolvePossibleLambda');
    },

    helperSexpr: function(sexpr, program, inverse) {
      var params = this.setupFullMustacheParams(sexpr, program, inverse),
          name = sexpr.id.parts[0];

      if (this.options.knownHelpers[name]) {
        this.opcode('invokeKnownHelper', params.length, name);
      } else if (this.options.knownHelpersOnly) {
        throw new Exception("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
      } else {
        this.opcode('invokeHelper', params.length, name, sexpr.isRoot);
      }
    },

    sexpr: function(sexpr) {
      var type = this.classifySexpr(sexpr);

      if (type === "simple") {
        this.simpleSexpr(sexpr);
      } else if (type === "helper") {
        this.helperSexpr(sexpr);
      } else {
        this.ambiguousSexpr(sexpr);
      }
    },

    ID: function(id) {
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);

      var name = id.parts[0];
      if (!name) {
        this.opcode('pushContext');
      } else {
        this.opcode('lookupOnContext', id.parts[0]);
      }

      for(var i=1, l=id.parts.length; i<l; i++) {
        this.opcode('lookup', id.parts[i]);
      }
    },

    DATA: function(data) {
      this.options.data = true;
      if (data.id.isScoped || data.id.depth) {
        throw new Exception('Scoped data references are not supported: ' + data.original, data);
      }

      this.opcode('lookupData');
      var parts = data.id.parts;
      for(var i=0, l=parts.length; i<l; i++) {
        this.opcode('lookup', parts[i]);
      }
    },

    STRING: function(string) {
      this.opcode('pushString', string.string);
    },

    INTEGER: function(integer) {
      this.opcode('pushLiteral', integer.integer);
    },

    BOOLEAN: function(bool) {
      this.opcode('pushLiteral', bool.bool);
    },

    comment: function() {},

    // HELPERS
    opcode: function(name) {
      this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
    },

    declare: function(name, value) {
      this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
    },

    addDepth: function(depth) {
      if(depth === 0) { return; }

      if(!this.depths[depth]) {
        this.depths[depth] = true;
        this.depths.list.push(depth);
      }
    },

    classifySexpr: function(sexpr) {
      var isHelper   = sexpr.isHelper;
      var isEligible = sexpr.eligibleHelper;
      var options    = this.options;

      // if ambiguous, we can possibly resolve the ambiguity now
      if (isEligible && !isHelper) {
        var name = sexpr.id.parts[0];

        if (options.knownHelpers[name]) {
          isHelper = true;
        } else if (options.knownHelpersOnly) {
          isEligible = false;
        }
      }

      if (isHelper) { return "helper"; }
      else if (isEligible) { return "ambiguous"; }
      else { return "simple"; }
    },

    pushParams: function(params) {
      var i = params.length, param;

      while(i--) {
        param = params[i];

        if(this.options.stringParams) {
          if(param.depth) {
            this.addDepth(param.depth);
          }

          this.opcode('getContext', param.depth || 0);
          this.opcode('pushStringParam', param.stringModeValue, param.type);

          if (param.type === 'sexpr') {
            // Subexpressions get evaluated and passed in
            // in string params mode.
            this.sexpr(param);
          }
        } else {
          this[param.type](param);
        }
      }
    },

    setupFullMustacheParams: function(sexpr, program, inverse) {
      var params = sexpr.params;
      this.pushParams(params);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      if (sexpr.hash) {
        this.hash(sexpr.hash);
      } else {
        this.opcode('emptyHash');
      }

      return params;
    }
  };

  function precompile(input, options, env) {
    if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
    }

    options = options || {};
    if (!('data' in options)) {
      options.data = true;
    }

    var ast = env.parse(input);
    var environment = new env.Compiler().compile(ast, options);
    return new env.JavaScriptCompiler().compile(environment, options);
  }

  __exports__.precompile = precompile;function compile(input, options, env) {
    if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
    }

    options = options || {};

    if (!('data' in options)) {
      options.data = true;
    }

    var compiled;

    function compileInput() {
      var ast = env.parse(input);
      var environment = new env.Compiler().compile(ast, options);
      var templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
      return env.template(templateSpec);
    }

    // Template is only compiled on first use and cached after that point.
    return function(context, options) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled.call(this, context, options);
    };
  }

  __exports__.compile = compile;
  return __exports__;
})(__module5__);

// handlebars/compiler/javascript-compiler.js
var __module11__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__;
  var COMPILER_REVISION = __dependency1__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency1__.REVISION_CHANGES;
  var log = __dependency1__.log;
  var Exception = __dependency2__;

  function Literal(value) {
    this.value = value;
  }

  function JavaScriptCompiler() {}

  JavaScriptCompiler.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function(parent, name /* , type*/) {
      var wrap,
          ret;
      if (parent.indexOf('depth') === 0) {
        wrap = true;
      }

      if (/^[0-9]+$/.test(name)) {
        ret = parent + "[" + name + "]";
      } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
        ret = parent + "." + name;
      }
      else {
        ret = parent + "['" + name + "']";
      }

      if (wrap) {
        return '(' + parent + ' && ' + ret + ')';
      } else {
        return ret;
      }
    },

    compilerInfo: function() {
      var revision = COMPILER_REVISION,
          versions = REVISION_CHANGES[revision];
      return "this.compilerInfo = ["+revision+",'"+versions+"'];\n";
    },

    appendToBuffer: function(string) {
      if (this.environment.isSimple) {
        return "return " + string + ";";
      } else {
        return {
          appendToBuffer: true,
          content: string,
          toString: function() { return "buffer += " + string + ";"; }
        };
      }
    },

    initializeBuffer: function() {
      return this.quotedString("");
    },

    namespace: "Handlebars",
    // END PUBLIC API

    compile: function(environment, options, context, asObject) {
      this.environment = environment;
      this.options = options || {};

      log('debug', this.environment.disassemble() + "\n\n");

      this.name = this.environment.name;
      this.isChild = !!context;
      this.context = context || {
        programs: [],
        environments: [],
        aliases: { }
      };

      this.preamble();

      this.stackSlot = 0;
      this.stackVars = [];
      this.registers = { list: [] };
      this.hashes = [];
      this.compileStack = [];
      this.inlineStack = [];

      this.compileChildren(environment, options);

      var opcodes = environment.opcodes, opcode;

      this.i = 0;

      for(var l=opcodes.length; this.i<l; this.i++) {
        opcode = opcodes[this.i];

        if(opcode.opcode === 'DECLARE') {
          this[opcode.name] = opcode.value;
        } else {
          this[opcode.opcode].apply(this, opcode.args);
        }

        // Reset the stripNext flag if it was not set by this operation.
        if (opcode.opcode !== this.stripNext) {
          this.stripNext = false;
        }
      }

      // Flush any trailing content that might be pending.
      this.pushSource('');

      if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
        throw new Exception('Compile completed with content left on stack');
      }

      return this.createFunctionContext(asObject);
    },

    preamble: function() {
      var out = [];

      if (!this.isChild) {
        var namespace = this.namespace;

        var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
        if (this.environment.usePartial) { copies = copies + " partials = this.merge(partials, " + namespace + ".partials);"; }
        if (this.options.data) { copies = copies + " data = data || {};"; }
        out.push(copies);
      } else {
        out.push('');
      }

      if (!this.environment.isSimple) {
        out.push(", buffer = " + this.initializeBuffer());
      } else {
        out.push("");
      }

      // track the last context pushed into place to allow skipping the
      // getContext opcode when it would be a noop
      this.lastContext = 0;
      this.source = out;
    },

    createFunctionContext: function(asObject) {
      var locals = this.stackVars.concat(this.registers.list);

      if(locals.length > 0) {
        this.source[1] = this.source[1] + ", " + locals.join(", ");
      }

      // Generate minimizer alias mappings
      if (!this.isChild) {
        for (var alias in this.context.aliases) {
          if (this.context.aliases.hasOwnProperty(alias)) {
            this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
          }
        }
      }

      if (this.source[1]) {
        this.source[1] = "var " + this.source[1].substring(2) + ";";
      }

      // Merge children
      if (!this.isChild) {
        this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
      }

      if (!this.environment.isSimple) {
        this.pushSource("return buffer;");
      }

      var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

      for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
        params.push("depth" + this.environment.depths.list[i]);
      }

      // Perform a second pass over the output to merge content when possible
      var source = this.mergeSource();

      if (!this.isChild) {
        source = this.compilerInfo()+source;
      }

      if (asObject) {
        params.push(source);

        return Function.apply(this, params);
      } else {
        var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
        log('debug', functionSource + "\n\n");
        return functionSource;
      }
    },
    mergeSource: function() {
      // WARN: We are not handling the case where buffer is still populated as the source should
      // not have buffer append operations as their final action.
      var source = '',
          buffer;
      for (var i = 0, len = this.source.length; i < len; i++) {
        var line = this.source[i];
        if (line.appendToBuffer) {
          if (buffer) {
            buffer = buffer + '\n    + ' + line.content;
          } else {
            buffer = line.content;
          }
        } else {
          if (buffer) {
            source += 'buffer += ' + buffer + ';\n  ';
            buffer = undefined;
          }
          source += line + '\n  ';
        }
      }
      return source;
    },

    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      this.replaceStack(function(current) {
        params.splice(1, 0, current);
        return "blockHelperMissing.call(" + params.join(", ") + ")";
      });
    },

    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      var current = this.topStack();
      params.splice(1, 0, current);

      this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
    },

    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function(content) {
      if (this.pendingContent) {
        content = this.pendingContent + content;
      }
      if (this.stripNext) {
        content = content.replace(/^\s+/, '');
      }

      this.pendingContent = content;
    },

    // [strip]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Removes any trailing whitespace from the prior content node and flags
    // the next operation for stripping if it is a content node.
    strip: function() {
      if (this.pendingContent) {
        this.pendingContent = this.pendingContent.replace(/\s+$/, '');
      }
      this.stripNext = 'strip';
    },

    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function() {
      // Force anything that is inlined onto the stack so we don't have duplication
      // when we examine local
      this.flushInline();
      var local = this.popStack();
      this.pushSource("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
      if (this.environment.isSimple) {
        this.pushSource("else { " + this.appendToBuffer("''") + " }");
      }
    },

    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function() {
      this.context.aliases.escapeExpression = 'this.escapeExpression';

      this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
    },

    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function(depth) {
      if(this.lastContext !== depth) {
        this.lastContext = depth;
      }
    },

    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function(name) {
      this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
    },

    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function() {
      this.pushStackLiteral('depth' + this.lastContext);
    },

    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function() {
      this.context.aliases.functionType = '"function"';

      this.replaceStack(function(current) {
        return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
      });
    },

    // [lookup]
    //
    // On stack, before: value, ...
    // On stack, after: value[name], ...
    //
    // Replace the value on the stack with the result of looking
    // up `name` on `value`
    lookup: function(name) {
      this.replaceStack(function(current) {
        return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
      });
    },

    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data, ...
    //
    // Push the data lookup operator
    lookupData: function() {
      this.pushStackLiteral('data');
    },

    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function(string, type) {
      this.pushStackLiteral('depth' + this.lastContext);

      this.pushString(type);

      // If it's a subexpression, the string result
      // will be pushed after this opcode.
      if (type !== 'sexpr') {
        if (typeof string === 'string') {
          this.pushString(string);
        } else {
          this.pushStackLiteral(string);
        }
      }
    },

    emptyHash: function() {
      this.pushStackLiteral('{}');

      if (this.options.stringParams) {
        this.push('{}'); // hashContexts
        this.push('{}'); // hashTypes
      }
    },
    pushHash: function() {
      if (this.hash) {
        this.hashes.push(this.hash);
      }
      this.hash = {values: [], types: [], contexts: []};
    },
    popHash: function() {
      var hash = this.hash;
      this.hash = this.hashes.pop();

      if (this.options.stringParams) {
        this.push('{' + hash.contexts.join(',') + '}');
        this.push('{' + hash.types.join(',') + '}');
      }

      this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
    },

    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function(string) {
      this.pushStackLiteral(this.quotedString(string));
    },

    // [push]
    //
    // On stack, before: ...
    // On stack, after: expr, ...
    //
    // Push an expression onto the stack
    push: function(expr) {
      this.inlineStack.push(expr);
      return expr;
    },

    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function(value) {
      this.pushStackLiteral(value);
    },

    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function(guid) {
      if (guid != null) {
        this.pushStackLiteral(this.programExpression(guid));
      } else {
        this.pushStackLiteral(null);
      }
    },

    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function(paramSize, name, isRoot) {
      this.context.aliases.helperMissing = 'helpers.helperMissing';
      this.useRegister('helper');

      var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
      var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

      var lookup = 'helper = ' + helper.name + ' || ' + nonHelper;
      if (helper.paramsInit) {
        lookup += ',' + helper.paramsInit;
      }

      this.push(
        '('
          + lookup
          + ',helper '
            + '? helper.call(' + helper.callParams + ') '
            + ': helperMissing.call(' + helper.helperMissingParams + '))');

      // Always flush subexpressions. This is both to prevent the compounding size issue that
      // occurs when the code has to be duplicated for inlining and also to prevent errors
      // due to the incorrect options object being passed due to the shared register.
      if (!isRoot) {
        this.flushInline();
      }
    },

    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function(paramSize, name) {
      var helper = this.setupHelper(paramSize, name);
      this.push(helper.name + ".call(" + helper.callParams + ")");
    },

    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function(name, helperCall) {
      this.context.aliases.functionType = '"function"';
      this.useRegister('helper');

      this.emptyHash();
      var helper = this.setupHelper(0, name, helperCall);

      var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

      var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
      var nextStack = this.nextStack();

      if (helper.paramsInit) {
        this.pushSource(helper.paramsInit);
      }
      this.pushSource('if (helper = ' + helperName + ') { ' + nextStack + ' = helper.call(' + helper.callParams + '); }');
      this.pushSource('else { helper = ' + nonHelper + '; ' + nextStack + ' = typeof helper === functionType ? helper.call(' + helper.callParams + ') : helper; }');
    },

    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function(name) {
      var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

      if (this.options.data) {
        params.push("data");
      }

      this.context.aliases.self = "this";
      this.push("self.invokePartial(" + params.join(", ") + ")");
    },

    // [assignToHash]
    //
    // On stack, before: value, hash, ...
    // On stack, after: hash, ...
    //
    // Pops a value and hash off the stack, assigns `hash[key] = value`
    // and pushes the hash back onto the stack.
    assignToHash: function(key) {
      var value = this.popStack(),
          context,
          type;

      if (this.options.stringParams) {
        type = this.popStack();
        context = this.popStack();
      }

      var hash = this.hash;
      if (context) {
        hash.contexts.push("'" + key + "': " + context);
      }
      if (type) {
        hash.types.push("'" + key + "': " + type);
      }
      hash.values.push("'" + key + "': (" + value + ")");
    },

    // HELPERS

    compiler: JavaScriptCompiler,

    compileChildren: function(environment, options) {
      var children = environment.children, child, compiler;

      for(var i=0, l=children.length; i<l; i++) {
        child = children[i];
        compiler = new this.compiler();

        var index = this.matchExistingProgram(child);

        if (index == null) {
          this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
          index = this.context.programs.length;
          child.index = index;
          child.name = 'program' + index;
          this.context.programs[index] = compiler.compile(child, options, this.context);
          this.context.environments[index] = child;
        } else {
          child.index = index;
          child.name = 'program' + index;
        }
      }
    },
    matchExistingProgram: function(child) {
      for (var i = 0, len = this.context.environments.length; i < len; i++) {
        var environment = this.context.environments[i];
        if (environment && environment.equals(child)) {
          return i;
        }
      }
    },

    programExpression: function(guid) {
      this.context.aliases.self = "this";

      if(guid == null) {
        return "self.noop";
      }

      var child = this.environment.children[guid],
          depths = child.depths.list, depth;

      var programParams = [child.index, child.name, "data"];

      for(var i=0, l = depths.length; i<l; i++) {
        depth = depths[i];

        if(depth === 1) { programParams.push("depth0"); }
        else { programParams.push("depth" + (depth - 1)); }
      }

      return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
    },

    register: function(name, val) {
      this.useRegister(name);
      this.pushSource(name + " = " + val + ";");
    },

    useRegister: function(name) {
      if(!this.registers[name]) {
        this.registers[name] = true;
        this.registers.list.push(name);
      }
    },

    pushStackLiteral: function(item) {
      return this.push(new Literal(item));
    },

    pushSource: function(source) {
      if (this.pendingContent) {
        this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
        this.pendingContent = undefined;
      }

      if (source) {
        this.source.push(source);
      }
    },

    pushStack: function(item) {
      this.flushInline();

      var stack = this.incrStack();
      if (item) {
        this.pushSource(stack + " = " + item + ";");
      }
      this.compileStack.push(stack);
      return stack;
    },

    replaceStack: function(callback) {
      var prefix = '',
          inline = this.isInline(),
          stack,
          createdStack,
          usedLiteral;

      // If we are currently inline then we want to merge the inline statement into the
      // replacement statement via ','
      if (inline) {
        var top = this.popStack(true);

        if (top instanceof Literal) {
          // Literals do not need to be inlined
          stack = top.value;
          usedLiteral = true;
        } else {
          // Get or create the current stack name for use by the inline
          createdStack = !this.stackSlot;
          var name = !createdStack ? this.topStackName() : this.incrStack();

          prefix = '(' + this.push(name) + ' = ' + top + '),';
          stack = this.topStack();
        }
      } else {
        stack = this.topStack();
      }

      var item = callback.call(this, stack);

      if (inline) {
        if (!usedLiteral) {
          this.popStack();
        }
        if (createdStack) {
          this.stackSlot--;
        }
        this.push('(' + prefix + item + ')');
      } else {
        // Prevent modification of the context depth variable. Through replaceStack
        if (!/^stack/.test(stack)) {
          stack = this.nextStack();
        }

        this.pushSource(stack + " = (" + prefix + item + ");");
      }
      return stack;
    },

    nextStack: function() {
      return this.pushStack();
    },

    incrStack: function() {
      this.stackSlot++;
      if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
      return this.topStackName();
    },
    topStackName: function() {
      return "stack" + this.stackSlot;
    },
    flushInline: function() {
      var inlineStack = this.inlineStack;
      if (inlineStack.length) {
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          if (entry instanceof Literal) {
            this.compileStack.push(entry);
          } else {
            this.pushStack(entry);
          }
        }
      }
    },
    isInline: function() {
      return this.inlineStack.length;
    },

    popStack: function(wrapped) {
      var inline = this.isInline(),
          item = (inline ? this.inlineStack : this.compileStack).pop();

      if (!wrapped && (item instanceof Literal)) {
        return item.value;
      } else {
        if (!inline) {
          if (!this.stackSlot) {
            throw new Exception('Invalid stack pop');
          }
          this.stackSlot--;
        }
        return item;
      }
    },

    topStack: function(wrapped) {
      var stack = (this.isInline() ? this.inlineStack : this.compileStack),
          item = stack[stack.length - 1];

      if (!wrapped && (item instanceof Literal)) {
        return item.value;
      } else {
        return item;
      }
    },

    quotedString: function(str) {
      return '"' + str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
        .replace(/\u2029/g, '\\u2029') + '"';
    },

    setupHelper: function(paramSize, name, missingParams) {
      var params = [],
          paramsInit = this.setupParams(paramSize, params, missingParams);
      var foundHelper = this.nameLookup('helpers', name, 'helper');

      return {
        params: params,
        paramsInit: paramsInit,
        name: foundHelper,
        callParams: ["depth0"].concat(params).join(", "),
        helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
      };
    },

    setupOptions: function(paramSize, params) {
      var options = [], contexts = [], types = [], param, inverse, program;

      options.push("hash:" + this.popStack());

      if (this.options.stringParams) {
        options.push("hashTypes:" + this.popStack());
        options.push("hashContexts:" + this.popStack());
      }

      inverse = this.popStack();
      program = this.popStack();

      // Avoid setting fn and inverse if neither are set. This allows
      // helpers to do a check for `if (options.fn)`
      if (program || inverse) {
        if (!program) {
          this.context.aliases.self = "this";
          program = "self.noop";
        }

        if (!inverse) {
          this.context.aliases.self = "this";
          inverse = "self.noop";
        }

        options.push("inverse:" + inverse);
        options.push("fn:" + program);
      }

      for(var i=0; i<paramSize; i++) {
        param = this.popStack();
        params.push(param);

        if(this.options.stringParams) {
          types.push(this.popStack());
          contexts.push(this.popStack());
        }
      }

      if (this.options.stringParams) {
        options.push("contexts:[" + contexts.join(",") + "]");
        options.push("types:[" + types.join(",") + "]");
      }

      if(this.options.data) {
        options.push("data:data");
      }

      return options;
    },

    // the params and contexts arguments are passed in arrays
    // to fill in
    setupParams: function(paramSize, params, useRegister) {
      var options = '{' + this.setupOptions(paramSize, params).join(',') + '}';

      if (useRegister) {
        this.useRegister('options');
        params.push('options');
        return 'options=' + options;
      } else {
        params.push(options);
        return '';
      }
    }
  };

  var reservedWords = (
    "break else new var" +
    " case finally return void" +
    " catch for switch while" +
    " continue function this with" +
    " default if throw" +
    " delete in try" +
    " do instanceof typeof" +
    " abstract enum int short" +
    " boolean export interface static" +
    " byte extends long super" +
    " char final native synchronized" +
    " class float package throws" +
    " const goto private transient" +
    " debugger implements protected volatile" +
    " double import public let yield"
  ).split(" ");

  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

  for(var i=0, l=reservedWords.length; i<l; i++) {
    compilerWords[reservedWords[i]] = true;
  }

  JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
    if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name)) {
      return true;
    }
    return false;
  };

  __exports__ = JavaScriptCompiler;
  return __exports__;
})(__module2__, __module5__);

// handlebars.js
var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var Handlebars = __dependency1__;

  // Compiler imports
  var AST = __dependency2__;
  var Parser = __dependency3__.parser;
  var parse = __dependency3__.parse;
  var Compiler = __dependency4__.Compiler;
  var compile = __dependency4__.compile;
  var precompile = __dependency4__.precompile;
  var JavaScriptCompiler = __dependency5__;

  var _create = Handlebars.create;
  var create = function() {
    var hb = _create();

    hb.compile = function(input, options) {
      return compile(input, options, hb);
    };
    hb.precompile = function (input, options) {
      return precompile(input, options, hb);
    };

    hb.AST = AST;
    hb.Compiler = Compiler;
    hb.JavaScriptCompiler = JavaScriptCompiler;
    hb.Parser = Parser;
    hb.parse = parse;

    return hb;
  };

  Handlebars = create();
  Handlebars.create = create;

  __exports__ = Handlebars;
  return __exports__;
})(__module1__, __module7__, __module8__, __module10__, __module11__);

  return __module0__;
})();
;/**
 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function(){var e,t,n;(function(r){function d(e,t){return h.call(e,t)}function v(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function m(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function g(e){return function(t){return v(t,e)}}function y(e){return function(t){a[e]=t}}function b(e){if(d(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!d(a,e)&&!d(c,e))throw new Error("No "+e);return a[e]}function w(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function E(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice;o=function(e,t){var n,r=w(e),i=r[0];return e=r[1],i&&(i=v(i,t),n=b(i)),i?n&&n.normalize?e=n.normalize(e,g(t)):e=v(e,t):(e=v(e,t),r=w(e),i=r[0],e=r[1],i&&(n=b(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return m(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:E(e)}}},i=function(e,t,n,i){var s,l,h,p,v,g=[],w;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")g[v]=u.require(e);else if(l==="exports")g[v]=u.exports(e),w=!0;else if(l==="module")s=g[v]=u.module(e);else if(d(a,l)||d(f,l)||d(c,l))g[v]=b(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,m(i,!0),y(l),{}),g[v]=a[l]}}h=n.apply(a[e],g);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!w)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):b(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s)},s.config=function(e){return l=e,l.deps&&s(l.deps,l.callback),s},e._defined=a,n=function(e,t,n){t.splice||(n=t,t=[]),!d(a,e)&&!d(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}})(),n("almond",function(){}),n("lib/inspect",[],function(){typeof console=="object"&&!console.inspect&&(console.inspect=typeof navigator!="undefined"&&/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent)?console.dir||console.log:console.log)}),n("lib/printWarning",[],function(){function e(e){typeof console!="undefined"&&console.warn(e)}return e}),n("mout/lang/kindOf",["require","exports","module"],function(e,t,n){function o(e){return e===null?"Null":e===s?"Undefined":r.exec(i.call(e))[1]}var r=/^\[object (.*)\]$/,i=Object.prototype.toString,s;n.exports=o}),n("mout/lang/isKind",["require","exports","module","./kindOf"],function(e,t,n){function i(e,t){return r(e)===t}var r=e("./kindOf");n.exports=i}),n("mout/lang/isFunction",["require","exports","module","./isKind"],function(e,t,n){function i(e){return r(e,"Function")}var r=e("./isKind");n.exports=i}),n("lib/hasDefineProperty",["mout/lang/isFunction"],function(e){function t(){if(!e(Object.defineProperty))return!1;try{Object.defineProperty({},"x",{})}catch(t){return!1}return!0}return t()}),n("lib/obfuscateProperty",["./hasDefineProperty"],function(e){function t(t,n,r,i,s){e?Object.defineProperty(t,n,{value:r,configurable:s||!1,writable:i||!1,enumerable:!1}):t[n]=r}return t}),n("mout/lang/isNumber",["require","exports","module","./isKind"],function(e,t,n){function i(e){return r(e,"Number")}var r=e("./isKind");n.exports=i}),n("mout/lang/isString",["require","exports","module","./isKind"],function(e,t,n){function i(e){return r(e,"String")}var r=e("./isKind");n.exports=i}),n("mout/lang/isBoolean",["require","exports","module","./isKind"],function(e,t,n){function i(e){return r(e,"Boolean")}var r=e("./isKind");n.exports=i}),n("lib/isImmutable",["mout/lang/isNumber","mout/lang/isString","mout/lang/isBoolean"],function(e,t,n){function r(r){return r==null||n(r)||e(r)||t(r)}return r}),n("mout/lang/isObject",["require","exports","module","./isKind"],function(e,t,n){function i(e){return r(e,"Object")}var r=e("./isKind");n.exports=i}),n("mout/lang/isArray",["require","exports","module","./isKind"],function(e,t,n){var r=e("./isKind"),i=Array.isArray||function(e){return r(e,"Array")};n.exports=i}),n("mout/lang/isDate",["require","exports","module","./isKind"],function(e,t,n){function i(e){return r(e,"Date")}var r=e("./isKind");n.exports=i}),n("mout/lang/isRegExp",["require","exports","module","./isKind"],function(e,t,n){function i(e){return r(e,"RegExp")}var r=e("./isKind");n.exports=i}),n("mout/object/hasOwn",["require","exports","module"],function(e,t,n){function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}n.exports=r}),n("mout/object/forIn",["require","exports","module"],function(e,t,n){function s(){i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=!0;for(var e in{toString:null})r=!1}function o(e,t,n){var o,a=0;r==null&&s();for(o in e)if(u(t,e,o,n)===!1)break;if(r)while(o=i[a++])if(e[o]!==Object.prototype[o]&&u(t,e,o,n)===!1)break}function u(e,t,n,r){return e.call(r,t[n],n,t)}var r,i;n.exports=o}),n("mout/object/forOwn",["require","exports","module","./hasOwn","./forIn"],function(e,t,n){function s(e,t,n){i(e,function(i,s){if(r(e,s))return t.call(n,e[s],s,e)})}var r=e("./hasOwn"),i=e("./forIn");n.exports=s}),n("mout/object/mixIn",["require","exports","module","./forOwn"],function(e,t,n){function i(e,t){var n=0,i=arguments.length,o;while(++n<i)o=arguments[n],o!=null&&r(o,s,e);return e}function s(e,t){this[t]=e}var r=e("./forOwn");n.exports=i}),n("mout/lang/createObject",["require","exports","module","../object/mixIn"],function(e,t,n){function i(e,t){function n(){}return n.prototype=e,r(new n,t)}var r=e("../object/mixIn");n.exports=i}),n("mout/array/indexOf",["require","exports","module"],function(e,t,n){function r(e,t,n){n=n||0;var r=e.length,i=n<0?r+n:n;while(i<r){if(e[i]===t)return i;i+=1}return-1}n.exports=r}),n("mout/array/combine",["require","exports","module","./indexOf"],function(e,t,n){function i(e,t){var n,i=t.length;for(n=0;n<i;n++)r(e,t[n])===-1&&e.push(t[n]);return e}var r=e("./indexOf");n.exports=i}),n("mout/array/contains",["require","exports","module","./indexOf"],function(e,t,n){function i(e,t){return r(e,t)!==-1}var r=e("./indexOf");n.exports=i}),n("mout/lang/isPlainObject",["require","exports","module"],function(e,t,n){function r(e){return!!e&&typeof e=="object"&&e.constructor===Object}n.exports=r}),n("mout/lang/clone",["require","exports","module","./kindOf","./isPlainObject","../object/mixIn"],function(e,t,n){function o(e){switch(r(e)){case"Object":return u(e);case"Array":return l(e);case"RegExp":return a(e);case"Date":return f(e);default:return e}}function u(e){return i(e)?s({},e):e}function a(e){var t="";return t+=e.multiline?"m":"",t+=e.global?"g":"",t+=e.ignorecase?"i":"",new RegExp(e.source,t)}function f(e){return new Date(+e)}function l(e){return e.slice()}var r=e("./kindOf"),i=e("./isPlainObject"),s=e("../object/mixIn");n.exports=o}),n("mout/lang/deepClone",["require","exports","module","./clone","../object/forOwn","./kindOf","./isPlainObject"],function(e,t,n){function u(e,t){switch(s(e)){case"Object":return a(e,t);case"Array":return f(e,t);default:return r(e)}}function a(e,t){if(o(e)){var n={};return i(e,function(e,n){this[n]=u(e,t)},n),n}return t?t(e):e}function f(e,t){var n=[],r=-1,i=e.length,s;while(++r<i)n[r]=u(e[r],t);return n}var r=e("./clone"),i=e("../object/forOwn"),s=e("./kindOf"),o=e("./isPlainObject");n.exports=u}),n("lib/mixIn",[],function(){function e(e,t){var n,r=arguments.length,i,s;for(n=1;n<r;n+=1){s=arguments[n];for(i in arguments[n])e[i]=s[i]}return e}return e}),n("mout/array/append",["require","exports","module"],function(e,t,n){function r(e,t){var n=e.length,r=-1,i=t.length;while(++r<i)e[n+r]=t[r];return e}n.exports=r}),n("mout/function/bind",["require","exports","module"],function(e,t,n){function r(e,t){return Array.prototype.slice.call(e,t||0)}function i(e,t,n){var i=r(arguments,2);return function(){return e.apply(t,i.concat(r(arguments)))}}n.exports=i}),n("mout/lang/toArray",["require","exports","module","./kindOf"],function(e,t,n){function s(e){var t=[],n=r(e),s;if(e!=null)if(e.length==null||n==="String"||n==="Function"||n==="RegExp"||e===i)t[t.length]=e;else{s=e.length;while(s--)t[s]=e[s]}return t}var r=e("./kindOf"),i=this;n.exports=s}),n("mout/array/forEach",["require","exports","module"],function(e,t,n){function r(e,t,n){if(e==null)return;var r=-1,i=e.length;while(++r<i)if(t.call(n,e[r],r,e)===!1)break}n.exports=r}),n("mout/function/prop",["require","exports","module"],function(e,t,n){function r(e){return function(t){return t[e]}}n.exports=r}),n("mout/object/matches",["require","exports","module","./forOwn"],function(e,t,n){function i(e,t){var n=!0;return r(t,function(t,r){if(e[r]!==t)return n=!1}),n}var r=e("./forOwn");n.exports=i}),n("mout/function/makeIterator_",["require","exports","module","./prop","../object/matches"],function(e,t,n){function s(e){switch(typeof e){case"object":return e!=null?function(t,n,r){return i(t,e)}:e;case"string":case"number":return r(e);default:return e}}var r=e("./prop"),i=e("../object/matches");n.exports=s}),n("mout/array/filter",["require","exports","module","./forEach","../function/makeIterator_"],function(e,t,n){function s(e,t,n){t=i(t);var s=[];return r(e,function(e,r,i){t.call(n,e,r,i)&&s.push(e)}),s}var r=e("./forEach"),i=e("../function/makeIterator_");n.exports=s}),n("mout/array/unique",["require","exports","module","./indexOf","./filter"],function(e,t,n){function s(e){return i(e,o)}function o(e,t,n){return r(n,e,t+1)===-1}var r=e("./indexOf"),i=e("./filter");n.exports=s}),n("mout/array/some",["require","exports","module","../function/makeIterator_"],function(e,t,n){function i(e,t,n){t=r(t);var i=!1,s=-1,o=e.length;while(++s<o)if(t.call(n,e[s],s,e)){i=!0;break}return i}var r=e("../function/makeIterator_");n.exports=i}),n("mout/array/difference",["require","exports","module","./unique","./filter","./some","./contains"],function(e,t,n){function u(e){var t=Array.prototype.slice.call(arguments,1),n=i(r(e),function(e){return!s(t,function(t){return o(t,e)})});return n}var r=e("./unique"),i=e("./filter"),s=e("./some"),o=e("./contains");n.exports=u}),n("mout/array/insert",["require","exports","module","./difference","../lang/toArray"],function(e,t,n){function s(e,t){var n=r(i(arguments).slice(1),e);return n.length&&Array.prototype.push.apply(e,n),e.length}var r=e("./difference"),i=e("../lang/toArray");n.exports=s}),n("Class",["./lib/inspect","./lib/printWarning","./lib/obfuscateProperty","./lib/isImmutable","mout/lang/isString","mout/lang/isFunction","mout/lang/isObject","mout/lang/isArray","mout/lang/isDate","mout/lang/isRegExp","mout/lang/createObject","mout/object/hasOwn","mout/array/combine","mout/array/contains","mout/lang/deepClone","./lib/mixIn","mout/array/append","mout/function/bind","mout/lang/toArray","mout/array/insert"],function(t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w){function k(e,t){var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}function L(e,t,n,r){if(n[x].efficient)return t;var i,s=n.$parent,o=s&&(r?s:s.prototype),u;return t=t[C]||t,i=function(){var r=this.$super,i=this.$self,s=o&&o[e],u;return this.$super=s,this.$self=n,u=t.apply(this,arguments),this.$super=r,this.$self=i,u},i[C]=t,i}function A(e,t){var n,r;for(n in e){if(/^(_){0,2}initialize$/.test(n))continue;r=e[n],h(t.prototype,n)||(o(r)&&!r[x]&&!r[T]?(t.prototype[n]=L(n,r,t),r[N]&&w(t[x].binds,n)):(t.prototype[n]=r,i(r)||w(t[x].properties,n)))}}function O(e,t){if(h(e,"$borrows")){var n,r,i,s,a=b(e.$borrows),f=a.length;for(f-=1;f>=0;f-=1){n=a[f];if(u(n)){A(n,t);continue}if(o(n)&&!n[x]){A(n.prototype,t);continue}n=n.prototype,A(n,t);for(r=n.$static[x].staticMethods.length-1;r>=0;r-=1)i=n.$static[x].staticMethods[r],w(t[x].staticMethods,i),t[i]=n.$static[i];for(i in n.$static[x].staticProperties)s=n.$static[x].staticProperties[i],t[x].staticProperties[i]=s,t[i]=s;p(t[x].binds,n.$static[x].binds)}delete e.$borrows}}function M(e,t){e=b(e);var n,r=e.length,i;for(r-=1;r>=0;r-=1){n=e[r];if(!d(t[x].interfaces,n)){for(i=n[T].constants.length-1;i>=0;i-=1)t[n[T].constants[i]]=n[n[T].constants[i]],t[x].staticProperties[n[T].constants[i]]=n[n[T].constants[i]];t[x].interfaces.push(n)}}}function _(e,t,n){var r,s,u={};if(h(e,"$statics")){for(r in e.$statics)s=e.$statics[r],o(s)&&!s[x]&&!s[T]?(w(t[x].staticMethods,r),t[r]=L(r,s,t,!0)):(t[x].staticProperties[r]=s,t[r]=s);delete e.$statics}h(e,"$implements")&&(u.$implements=e.$implements,delete e.$implements),h(e,"$abstracts")&&(u.$abstracts=e.$abstracts,delete e.$abstracts);for(r in e)s=e[r],o(s)&&!s[x]&&!s[T]?(t.prototype[r]=L(r,s,t),s[N]&&(w(t[x].binds,r),delete s[N])):(t.prototype[r]=s,i(s)||w(t[x].properties,r));m(e,u)}function D(e,t){var n,r,i={};delete e.$locked,h(e,"$constants")&&(i.$constants=e.$constants,delete e.$constants),h(e,"$finals")&&(i.$finals=e.$finals,delete e.$finals),_(e,t);if(i.$constants)for(n in i.$constants)r=i.$constants[n],t[x].staticProperties[n]=r,t[n]=r;i.$finals&&_(i.$finals,t,!0)}function P(e,t){var n,r;for(n=e.length-1;n>=0;n-=1)r=t[e[n]],t[e[n]]=y(r,t)}function H(e,t){var n=e||function(){var t,n;n=this.$static[x];for(t=n.properties.length-1;t>=0;t-=1)this[n.properties[t]]=v(this[n.properties[t]]);n.efficient||(this.$super=this.$self=null),n.binds.length&&P(n.binds,this,this),this.initialize.apply(this,arguments)};return n[x]||r(n,x,{staticMethods:[],staticProperties:{},properties:[],interfaces:[],binds:[]}),n}function B(e){return e=e||this,e}function j(e){var t=b(arguments),n;return this&&!e[C]&&this.$static&&this.$static[x]&&(e=L(null,e,this.$self||this.$static)),t.splice(1,0,this),n=y.apply(e,t),n}function F(e){var t=b(arguments),n;return this&&!e[C]&&this.$static&&this.$static[x]&&(e=L(null,e,this.$self||this.$static,!0)),t.splice(1,0,this),n=y.apply(e,t),n}function I(e,t){var n,i=t[x].binds,s,o;for(n=i.length-1;n>=0;n-=1)i[n].substr(0,2)!=="__"&&e[x].binds.push(i[n]);g(e[x].properties,t[x].properties),g(e[x].staticMethods,t[x].staticMethods);for(n=t[x].staticMethods.length-1;n>=0;n-=1)t[x].staticMethods[n].substr(0,2)!=="__"&&(e[t[x].staticMethods[n]]=t[t[x].staticMethods[n]]);for(s in t[x].staticProperties)o=t[x].staticProperties[s],s.substr(0,2)!=="__"&&(e[x].staticProperties[s]=o,e[s]=o);r(e,"$parent",t),e[x].interfaces=[].concat(t[x].interfaces)}function q(e){var t=e[x],n,i,s;if(t.efficient){n=e.$canOptimizeConst,delete e.$canOptimizeConst;if(n&&!t.properties.length&&!t.binds.length){if(h(e.prototype,"initialize"))i=e.prototype.initialize;else{s=e.prototype.initialize;switch(s.length){case 0:i=function(){s.call(this)};break;case 1:i=function(e){s.call(this,e)};break;case 2:i=function(e,t){s.call(this,e,t)};break;case 3:i=function(e,t,n){s.call(this,e,t,n)};break;case 4:i=function(e,t,n,r){s.call(this,e,t,n,r)};break;default:i=function(){s.apply(this,arguments)}}}return e.$parent&&(k(i,e),i.$parent=e.$parent),m(i.prototype,e.prototype),m(i,e),r(i,x,e[x]),i}}return e}function R(e,t){return S.declare(this,e,t)}var E,S={},x="$class",T="$interface",N="$bound_dejavu",C="$wrapped_dejavu";E=function(e,t,n){n=n||{};var i,s,o=!!t;return h(e,"$extends")?(s=e.$extends,delete e.$extends,s[x]||(s=E(s.prototype,s,{isVanilla:!0})),e.initialize=n.isVanilla?i:e.initialize||e._initialize||e.__initialize,e.initialize||delete e.initialize,i=H(t),k(i,s),I(i,s)):(i=H(t),e.initialize=n.isVanilla?i:e.initialize||e._initialize||e.__initialize||function(){}),i[x].efficient=o,n.isVanilla||(delete e._initialize,delete e.__initialize),O(e,i),D(e,i),i=q(i),r(i.prototype,"$static",i),r(i,"$static",i),r(i,"$self",null,!0),r(i,"$super",null,!0),r(i,"$member",B),r(i,"$bind",F),i.$parent||(r(i.prototype,"$bind",j),r(i.prototype,"$member",B)),h(e,"$implements")&&(M(e.$implements,i),delete i.prototype.$implements),h(e,"$abstracts")&&delete e.$abstracts,i.extend=R,i},S.declare=function(e,t,n){var r,i=o(this)?this:E,s,a;e&&t&&t!==!0?((s=o(t))||n?(a=H(),a.$canOptimizeConst=!!n,r=s?t(e.prototype,e,a):t):r=t,r.$extends=e):(s=o(e))||t?(a=H(),a.$canOptimizeConst=!!t,r=s?e(a):e):r=e;if(!u(r))throw new Error("Expected class definition to be an object with the class members.");return r.delegate=function(e){var t=this;return function(){if(e!=undefined)return e.apply(t,arguments)}},i(r,a)},r(S,"$create",E);if(!Function.prototype.$bound||!Function.prototype.$bound.dejavu)try{r(Function.prototype,"$bound",function(){return this[N]=!0,this}),Function.prototype.$bound.dejavu=!0}catch(U){n("Could not set Function.prototype.$bound.")}if(!Function.prototype.$bind||!Function.prototype.$bind.dejavu)try{r(Function.prototype,"$bind",function(e){var t=b(arguments);return t.splice(0,1,this),o(e)?F.apply(e,t):j.apply(e,t)}),Function.prototype.$bind.dejavu=!0}catch(U){n("Could not set Function.prototype.$bind.")}if(!Function.prototype.$member||!Function.prototype.$member.dejavu)try{r(Function.prototype,"$member",function(){return B(this)}),Function.prototype.$member.dejavu=!0}catch(U){n("Could not set Function.prototype.$member.")}return S}),n("AbstractClass",["mout/object/hasOwn","mout/array/insert","./Class"],function(t,n,r){function a(e,u){var a,f,l,c;t(e,"$abstracts")&&(f=e.$abstracts,delete e.$abstracts),a=r.$create(e,u),a[i]=!0;if(f)for(l in f)c=f[l],c[o]&&n(a[s].binds,l);return a}var i="$abstract",s="$class",o="$bound_dejavu",u={};return u.declare=function(e,t,n){return r.declare.call(a,e,t,n)},u}),n("Interface",["mout/lang/isFunction","mout/object/hasOwn","mout/lang/toArray"],function(t,n,r){function o(e){return e.$extends=this,s.declare(e)}function u(e){delete e.$name;var t,s,u,a,f=function(){};f[i]={parents:[],constants:[]};if(n(e,"$extends")){t=r(e.$extends),s=t.length;for(s-=1;s>=0;s-=1){a=t[s];for(u=a[i].constants.length-1;u>=0;u-=1)f[a[i].constants[u]]=a[a[i].constants[u]];f[i].parents.push(a)}delete e.$extends}if(n(e,"$constants"))for(s in e.$constants)f[s]=e.$constants[s],f[i].constants.push(s);return f.extend=o,f}var i="$interface",s={};return s.declare=u,s}),n("FinalClass",["./Class"],function(t){function r(e,n){var r=t.$create(e,n);return r}var n={};return n.declare=function(e,n,i){return t.declare.call(r,e,n,i)},n}),n("instanceOf",["mout/lang/isFunction"],function(t){function i(e,t){var n,s=e[r].parents;for(n=s.length-1;n>=0;n-=1){if(s[n]===t)return!0;if(i(e,s[n]))return!0}return!1}function s(e,t){var r,s=e.$static[n].interfaces;for(r=s.length-1;r>=0;r-=1)if(s[r]===t||i(s[r],t))return!0;return!1}function o(e,i){return t(i)?e instanceof i?!0:e&&e.$static&&e.$static[n]&&i&&i[r]?s(e,i):!1:!1}var n="$class",r="$interface";return o}),n("options",[],function(){return{}}),n("dejavu",["./Class","./AbstractClass","./Interface","./FinalClass","./instanceOf","./options"],function(e,t,n,r,i,s){var o={};o.Class=e,o.AbstractClass=t,o.Interface=n,o.FinalClass=r,o.instanceOf=i,o.options=s,o.mode="loose",window.dejavu=o}),t("dejavu",null,null,!0)})();;/*
    json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
;/**
 * some default JS classes have to be extended...
 * do this here...
 */

/** extends String class by function starts with **/
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (str) {
        return (this.indexOf(str) == 0);
    };
}

/** extends String class by function ends with **/
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (str) {
        return this.lastIndexOf(str) == this.length - 1;
    };
}

/** extends String class by trim functions **/
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };

    String.prototype.ltrim = function () {
        return this.replace(/^\s+/, '');
    };

    String.prototype.rtrim = function () {
        return this.replace(/\s+$/, '');
    };

    String.prototype.fulltrim = function () {
        return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
    };
}

if (!String.prototype.hashCode) {
    String.prototype.hashCode = function () {
        var hash = 0;

        if(this.length === 0) {
            return hash;
        }

        for(var i = 0; i < this.length; i++) {
            hash = ((hash << 5) - hash) + this.charCodeAt(i);
            hash = hash & 0xFFFF;
        }

        return hash;
    };
}

/** check for indexOf function on array **/
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;

        from = (from < 0) ? Math.ceil(from) : Math.floor(from);

        if (from < 0) {
            from += len;
        }

        for (; from < len; from++) {
            if (from in this && this[from] === elt) {
                return from;
            }
        }

        return -1;
    };
}

/** check for size function on Object */
if(!Object.prototype.sizeOf) {
    Object.sizeOf = function(obj) {
        var size = 0,
            key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }

        return size;
    };
}

/** A short cut for Object.hasOwnProperty */
if(!Object.prototype.hasOwn) {
    Object.hasOwn = function (obj, property) {
        return obj.hasOwnProperty(property);
    };
}

/** $service function to add services to Coco.ServiceProvider */
if (!Function.prototype.$service) {
    Function.prototype.$service = function () {
        // Create the service instance.
        var instance = new this();

        // If the service is not valid we throw an error.
        if(instance == null || instance.$serviceId == null) {
            throw new Error("Class '" + instance.$name + "' has no $serviceId and cannot be created as a service.");
        }

        // We add the Service to the global service container.
        Coco.ServiceContainer.addService(instance);

        // We return an error to the variable the service constructor is assigned to, to avoid manual service instantiation.
        return function () {
            throw new Error("The class '" + instance.$name + "' is a service and can't be instantiated directly. Inject it instead.");
        };
    };
}

/** $observe function to register change listeners to properties in Coco.Model */
if (!Function.prototype.$observe) {
    Function.prototype.$observe = function () {
        var fn = this;
        var args = Array.prototype.slice.call(arguments);

        /**
         * We capsule the function and the $observe properties, because our this context is the function and not the
         * model. When the model gets instantiated we call this returned function with the model context, set the observers
         * and return the original function (with assigned model context) back to the initial model property.
         */
        var retFn = function (targetAttribute, observers) {
            for(var i = 0; i < args.length; i++) {
                observers.push({
                    attribute: args[i],
                    target: targetAttribute,
                    old: fn.call(this)
                });
            }

            return fn.$bind(this);
        };

        // Assign a flag to the function, that we can distinct between normal functions as attributes and computed properties.
        retFn.hasObservers = true;

        return retFn;
    }
};/**
 * (c) Johannes Klauss <johannes.klauss@3m5.de>
 * created at 14.01.14
 */

Handlebars.registerHelper('ifNot', function (v1, options) {
    if (!v1) {
        return options.fn(this);
    }

    return options.inverse(this);
});

Handlebars.registerHelper('nl2br', function (value) {
    if (!value) {
        return "";
    }
    return value.replace(/\n/g, "<br/>");
});

Handlebars.registerHelper('is', function (v1, v2, options) {
    if (v1 == v2) {
        return options.fn(this);
    }

    return options.inverse(this);
});

Handlebars.registerHelper('isNot', function (v1, v2, options) {
    if (v1 != v2) {
        return options.fn(this);
    }

    return options.inverse(this);
});

Handlebars.registerHelper('isGreater', function (v1, v2, options) {
    if (v1 > v2) {
        return options.fn(this);
    }

    return options.inverse(this);
});

Handlebars.registerHelper('isGreaterThan', function (v1, v2, options) {
    if (v1 >= v2) {
        return options.fn(this);
    }

    return options.inverse(this);
});

Handlebars.registerHelper('isLess', function (v1, v2, options) {
    if (v1 < v2) {
        return options.fn(this);
    }

    return options.inverse(this);
});

Handlebars.registerHelper('isLessThan', function (v1, v2, options) {
    if (v1 <= v2) {
        return options.fn(this);
    }

    return options.inverse(this);
});

Handlebars.registerHelper('testIf', function () {
    var args = Array.prototype.slice.call(arguments);

    // We just have one argument (besides options), so this one is just a regular
    if(args.length === 2) {
        return (args[0] == true) ? args[1].fn(this) : args[1].inverse(this);
    }

    if (v1 <= v2) {
        return options.fn(this);
    }

    return options.inverse(this);
});

Handlebars.registerHelper('trans', function (v1, options) {
    if (Coco.Init.i18n && v1.length > 0 && Coco.Plugins.i18n.Translator.has) {

    }

    return options.inverse(this);
});;/**
 * (c) Johannes Klauss <johannes.klauss@3m5.de>
 * created at 06.02.14
 */

function measure(msg, $scope)  {
    if($scope) {
        if(measure.scopes.hasOwnProperty($scope)) {
            var ms = new Date().getTime();

            if(measure.scopes[$scope].time !== null) {
                console.log(ms - measure.scopes[$scope].time, $scope + ' - ' + msg);
            }
            else {
                measure.scopes[$scope].startTime = ms;

                console.log(0, $scope + ' - ' + msg);
            }

            measure.scopes[$scope].time = ms;

            return;
        }

        measure.scopes[$scope] = {time: new Date().getTime(), startTime: new Date().getTime(), endTime: null};

        console.log('start scope', $scope);
        console.log(0, $scope + ' - ' + msg);

        return;
    }

    console.log(new Date().getTime(), msg);
}

measure.scopes = {};
measure.resetScope = function (scope) {
    if(measure.scopes.hasOwnProperty(scope)) {
        measure.scopes[scope].time = null;
        measure.scopes[scope].startTime = null;
        measure.scopes[scope].endTime = null;
    }
};

measure.endScope = function (scope, $reset) {
    if(measure.scopes.hasOwnProperty(scope)) {
        measure.scopes[scope].endTime = new Date().getTime();

        console.log('Total time of Scope ' + scope, measure.scopes[scope].endTime - measure.scopes[scope].startTime);

        if($reset !== false) {
            measure.resetScope(scope);
        }
    }
};

measure.getTotalTimeOfScope = function (scope) {
    if(measure.scopes.hasOwnProperty(scope)) {
        console.log('Total time of Scope ' + scope, measure.scopes[scope].endTime - measure.scopes[scope].startTime);
    }
};;/**
 * (c) Johannes Klauss <johannes.klauss@3m5.de>
 * created at 19.03.14
 */

Coco.Env = dejavu.Class.declare({
    $name: 'Env',

    $constants: {
        PROD: 0,
        DEV: 1,
        TEST: 2
    },

    $statics: {
        /**
         * The currently set environment.
         *
         * If current is set to Coco.Env.PROD, there won't be any logging messages.
         */
        current: 0,

        /**
         * Function: setEnv(env)
         * Set the environment of the application. This can be Coco.Env.PROD, .DEV or .TEST
         *
         * Parameter:
         * @param {Number} env  -   The environment to set to.
         */
        setEnv: function (env) {
            Coco.Env.current = env;
        }
    }
});

Coco.Env.prototype.toString = function () {
    return Coco.Env.current;
};;/**
 * Class: Log
 * This class wraps the console object and prevents errors if the console is not found.
 *
 * @author Andreas Wiedenfeld <andreas.wiedenfeld@3m5.de>
 */
var Log = dejavu.Class.declare({
    $name: "Log",

    $constants: {
        LEVEL_NONE: 0,
        LEVEL_ERROR: 1,
        LEVEL_WARN: 2,
        LEVEL_INFO: 3,
        LEVEL_DEBUG: 4,
        LEVEL_OBJECT: 5,
        LEVEL_ALL: 99
    },

    $finals: {
        $statics: {
            /**
             * If set to true, the date will be logged.
             */
            logWithDate: true,

            /**
             * If set to true, the stack trace will be logged.
             */
            logWithTrace: true,

            /**
             * Current debug mode. Default is log everything.
             */
            debugMode: 99,

            /**
             * Function: checkConsole()
             * Checks if the browser has a console object and if not, creates a console object, that catches the errors.
             */
            checkConsole: function () {
                if (window.console == null) {
                    window.console = {
                        log: function (s) {
                        },
                        info: function (s) {
                        },
                        error: function (s) {
                        },
                        inspect: function (s) {
                        },
                        warn: function (s) {
                        }
                    };
                }
            },

            /**
             * Function: error(string msg)
             * Log error message.
             *
             * Parameter:
             * @param {string}  msg -   The message to log.
             * @param {object}  $object -   {optional}  The object to log.
             */
            error: function (msg, $object) {
                if (this.debugMode >= Log.LEVEL_ERROR) {
                    this.__writeConsole(msg, false, "error", $object);
                }
            },

            /**
             * Function: warn(string msg)
             * Log warn message.
             *
             * Parameter:
             * @param {string}  msg -   The message to log.
             * @param {object}  $object -   {optional}  The object to log.
             */
            warn: function (msg, $object) {
                if (this.debugMode > Log.LEVEL_ERROR) {
                    this.__writeConsole(msg, false, "warn", $object);
                }
            },

            /**
             * Function: info(string msg)
             * Log info message.
             *
             * Parameter:
             * @param {string}  msg -   The message to log.
             */
            info: function (msg, $object) {
                if (this.debugMode > Log.LEVEL_WARN) {
                    this.__writeConsole(msg, false, "info", $object);
                }
            },

            /**
             * Function: debug(string msg, object $object)
             * Log debug message and object.
             *
             * Parameter:
             * @param {string}  msg     -               The message to log.
             * @param {object}  $object -   {optional}  The object to log.
             */
            debug: function (msg, $object) {
                if (this.debugMode > Log.LEVEL_INFO) {
                    this.__writeConsole(msg, false, "debug", $object);
                }
            },

            /**
             * Function: logObject(object object)
             * Log objects.
             *
             * Parameter:
             * @param {object}  object          -   The object to log.
             * @param {boolean} $reference      -   If false, the object will be copied instead of showing the reference. If true it will only show the reference.
             */
            logObject: function (object, $reference) {
                if (this.debugMode > Log.LEVEL_DEBUG) {
                    this.__writeConsole('', true, null, object, $reference);
                }
            },

            /**
             * Function: alert(string msg)
             * Logs messages by using javascripts alert() function.
             *
             * Parameter:
             * @param {string}  msg -   The object to log.
             */
            alert: function (msg) {
                alert(msg);
            },

            __writeConsole: function (msg, hideDate, modus, object, $reference) {
                if (console == null) {
                    return;
                }

                if (object === null) {
                    object = "null";
                }
                //do not log 'undefined' objects
                if (object === false) {
                    object = "false";
                }

                try {
                    if (this.logWithDate && !hideDate) {
                        msg = new Date() + ' ' + msg;
                    }
                    switch (modus) {
                        default:
                            if (Coco.Utils.isMobile.any()) {
                                if (object != null) {
                                    this.__logObject(msg, object, console.log, false, $reference);
                                } else {
                                    console.log(msg);
                                }
                            } else {
                                this.__logObject(msg, object, console.log, true, $reference);
                            }

                            break;
                        case "warn":
                            if (Coco.Utils.isMobile.any()) {
                                if (object != null) {
                                    this.__logObject(msg, object, console.warn, false, $reference);
                                } else {
                                    console.warn(msg);
                                }
                            } else {
                                this.__logObject(msg, object, console.warn, true, $reference);
                            }

                            break;
                        case "error":
                            if (Coco.Utils.isMobile.any()) {
                                if (object != null) {
                                    this.__logObject(msg, object, console.error, false, $reference);
                                } else {
                                    console.error(msg);
                                }
                            } else {
                                this.__logObject(msg, object, console.error, true, $reference);
                            }

                            break;
                    }
                } catch (e) {
                }
            },

            __logObject: function (msg, object, method, isDesktop, $reference) {
                var fn = (isDesktop) ? console.inspect : method;

                //keep context to console for console logging...
                if (object) {
                    if ($reference) {
                        fn.call(console, msg, (object instanceof Array) ? object.slice() : $.extend(true, {}, object));
                    }
                    else {
                        fn.call(console, msg, object);
                    }
                }
                else {
                    method.call(console, msg);
                }
            }
        }
    }
});

/**
 * Make this completely static
 */
Log.checkConsole();;/**
 * @namespace Coco
 */
var Coco = Coco || {};

/**
 * Class: Coco.DateHelper
 *
 * Description:
 * static class to format Date
 *
 * (c) 2013 3m5. Media GmbH
 */
'use strict';
Coco.DateHelper = dejavu.Class.declare({
    $name: "DateHelper",

    $statics: {

        _isocode: "de_de",

        _months: null,

        isocode: function (code) {
            if (code != null) {
                this._isocode = code.toLowerCase();
            }

            return this._isocode;
        },

        __initMonths: function () {
            if (this._months != null) {
                return;
            }

            this._months = new Coco.HashMap();

            var german = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            var english = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            this._months.put("de_de", german);
            this._months.put("default", english);
        },

        getDayAndTime: function (date) {
            this.__initMonths();

            var minutes = date.getMinutes();
            var hours = date.getHours();

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            if (hours < 10) {
                hours = "0" + hours;
            }

            switch (this._isocode) {
                default:
                    //en
                    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + ", " + hours + ":" + minutes;
                case "de_de":
                    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + ", " + hours + ":" + minutes;
            }
        },

        getFullDateAndTime: function (date) {
            this.__initMonths();

            var d = new Date();
            var minutes = date.getMinutes();
            var hours = date.getHours();

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            if (hours < 10) {
                hours = "0" + hours;
            }

            switch (this._isocode) {
                default:
                    //en
                    return this._months.getValue("default")[date.getMonth()] + " " + date.getDate() + (date.getDate() == 1 ? "st" : (date.getDate() == 2 ? "nd" : (date.getDate() == 3 ? "rd" : "th"))) + ", " + date.getFullYear() + ", " + hours + ":" + minutes;
                case "de_de":
                    if (date.getFullYear() == d.getFullYear() && date.getMonth() == d.getMonth() && date.getDay() + 6 > d.getDay()) {
                        //return date.toString("dddd, MM.yyyy, hh:mm");
                    }

                    return date.getDate() + ". " + this._months.getValue("de_de")[date.getMonth()] + " " + date.getFullYear() + ", " + hours + ":" + minutes;
            }
        }
    }
});

/**
 * Function: Date.parse
 *
 * Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
 * © 2011 Colin Snover <http://zetafleet.com>
 * Released under MIT license.
 */
(function (Date, undefined) {
    var origParse = Date.parse, numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];
    Date.parse = function (date) {
        var timestamp, struct, minutesOffset = 0;

        // ES5 §15.9.4.2 states that the string should attempt to be parsed as a Date Time String Format string
        // before falling back to any implementation-specific date parsing, so that’s what we do, even if native
        // implementations could be faster
        //              1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec        8 Z 9 ±    10 tzHH    11 tzmm
        //            /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/
        if ((struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/.exec(date))) {
            // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
            for (var i = 0, k; (k = numericKeys[i]); ++i) {
                struct[k] = +struct[k] || 0;
            }

            // allow undefined days and months
            struct[2] = (+struct[2] || 1) - 1;
            struct[3] = +struct[3] || 1;

            if (struct[8] !== 'Z' && struct[9] !== undefined) {
                minutesOffset = struct[10] * 60 + struct[11];

                if (struct[9] === '+') {
                    minutesOffset = 0 - minutesOffset;
                }
            }

            timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
        }
        else {
            timestamp = origParse ? origParse(date) : NaN;
        }

        return timestamp;
    };
}(Date));;var Coco = Coco || {};
/**
 * Class: Coco.File
 *
 * Description:
 *
 * the Coco.File handle class
 *
 * (c) 2013 3m5. Media GmbH
 */
'use strict';
Coco.File = dejavu.Class.declare({
    //className
    $name: "Coco.File",

    initialize: function () {
        Log.error("Do not instantiate static class: " + this.$name);
    },

    $finals: {
        $statics: {

            /**
             * Function: saveAs(blob, name)
             *
             * Description:
             * A {static} saveAs() FileSaver implementation.
             *
             * By Eli Grey, http://eligrey.com
             * License: X11/MIT
             *   See LICENSE.md
             *
             * needs global variable 'window'
             * jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true, plusplus: true
             *
             * @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js
             *
             * Parameter:
             * Blob blob - Blob of data to save
             * String name - filename of download target file
            **/
            saveAs : (navigator.msSaveBlob && navigator.msSaveBlob.bind(navigator))
                || (function(view) {
                "use strict";

                //prevent errors in IE8, this fixes nothing!
                if (typeof view.document.createElementNS !== 'function') {
                    return false;
                }

                var
                    doc = view.document
                // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
                    , get_URL = function() {
                        return view.URL || view.webkitURL || view;
                    }
                    , URL = view.URL || view.webkitURL || view
                    , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
                    , can_use_save_link = "download" in save_link
                    , click = function(node) {
                        var event = doc.createEvent("MouseEvents");
                        event.initMouseEvent(
                            "click", true, false, view, 0, 0, 0, 0, 0
                            , false, false, false, false, 0, null
                        );
                        node.dispatchEvent(event);
                    }
                    , webkit_req_fs = view.webkitRequestFileSystem
                    , req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
                    , throw_outside = function (ex) {
                        (view.setImmediate || view.setTimeout)(function() {
                            throw ex;
                        }, 0);
                    }
                    , force_saveable_type = "application/octet-stream"
                    , fs_min_size = 0
                    , deletion_queue = []
                    , process_deletion_queue = function() {
                        var i = deletion_queue.length;
                        while (i--) {
                            var file = deletion_queue[i];
                            if (typeof file === "string") { // file is an object URL
                                URL.revokeObjectURL(file);
                            } else { // file is a File
                                file.remove();
                            }
                        }
                        deletion_queue.length = 0; // clear queue
                    }
                    , dispatch = function(filesaver, event_types, event) {
                        event_types = [].concat(event_types);
                        var i = event_types.length;
                        while (i--) {
                            var listener = filesaver["on" + event_types[i]];
                            if (typeof listener === "function") {
                                try {
                                    listener.call(filesaver, event || filesaver);
                                } catch (ex) {
                                    throw_outside(ex);
                                }
                            }
                        }
                    }
                    , FileSaver = function(blob, name) {
                        // First try a.download, then web filesystem, then object URLs
                        var
                            filesaver = this
                            , type = blob.type
                            , blob_changed = false
                            , object_url
                            , target_view
                            , get_object_url = function() {
                                var object_url = get_URL().createObjectURL(blob);
                                deletion_queue.push(object_url);
                                return object_url;
                            }
                            , dispatch_all = function() {
                                dispatch(filesaver, "writestart progress write writeend".split(" "));
                            }
                        // on any filesys errors revert to saving with object URLs
                            , fs_error = function() {
                                // don't create more object URLs than needed
                                if (blob_changed || !object_url) {
                                    object_url = get_object_url(blob);
                                }
                                if (target_view) {
                                    target_view.location.href = object_url;
                                }
                                filesaver.readyState = filesaver.DONE;
                                dispatch_all();
                            }
                            , abortable = function(func) {
                                return function() {
                                    if (filesaver.readyState !== filesaver.DONE) {
                                        return func.apply(this, arguments);
                                    }
                                };
                            }
                            , create_if_not_found = {create: true, exclusive: false}
                            , slice
                            ;
                        filesaver.readyState = filesaver.INIT;
                        if (!name) {
                            name = "download";
                        }
                        if (can_use_save_link) {
                            object_url = get_object_url(blob);
                            save_link.href = object_url;
                            save_link.download = name;
                            click(save_link);
                            filesaver.readyState = filesaver.DONE;
                            dispatch_all();
                            return;
                        }
                        // Object and web filesystem URLs have a problem saving in Google Chrome when
                        // viewed in a tab, so I force save with application/octet-stream
                        // http://code.google.com/p/chromium/issues/detail?id=91158
                        if (view.chrome && type && type !== force_saveable_type) {
                            slice = blob.slice || blob.webkitSlice;
                            blob = slice.call(blob, 0, blob.size, force_saveable_type);
                            blob_changed = true;
                        }
                        // Since I can't be sure that the guessed media type will trigger a download
                        // in WebKit, I append .download to the filename.
                        // https://bugs.webkit.org/show_bug.cgi?id=65440
                        if (webkit_req_fs && name !== "download") {
                            name += ".download";
                        }
                        if (type === force_saveable_type || webkit_req_fs) {
                            target_view = view;
                        } else {
                            target_view = view.open();
                        }
                        if (!req_fs) {
                            fs_error();
                            return;
                        }
                        fs_min_size += blob.size;
                        req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
                            fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
                                var save = function() {
                                    dir.getFile(name, create_if_not_found, abortable(function(file) {
                                        file.createWriter(abortable(function(writer) {
                                            writer.onwriteend = function(event) {
                                                target_view.location.href = file.toURL();
                                                deletion_queue.push(file);
                                                filesaver.readyState = filesaver.DONE;
                                                dispatch(filesaver, "writeend", event);
                                            };
                                            writer.onerror = function() {
                                                var error = writer.error;
                                                if (error.code !== error.ABORT_ERR) {
                                                    fs_error();
                                                }
                                            };
                                            "writestart progress write abort".split(" ").forEach(function(event) {
                                                writer["on" + event] = filesaver["on" + event];
                                            });
                                            writer.write(blob);
                                            filesaver.abort = function() {
                                                writer.abort();
                                                filesaver.readyState = filesaver.DONE;
                                            };
                                            filesaver.readyState = filesaver.WRITING;
                                        }), fs_error);
                                    }), fs_error);
                                };
                                dir.getFile(name, {create: false}, abortable(function(file) {
                                    // delete file if it already exists
                                    file.remove();
                                    save();
                                }), abortable(function(ex) {
                                    if (ex.code === ex.NOT_FOUND_ERR) {
                                        save();
                                    } else {
                                        fs_error();
                                    }
                                }));
                            }), fs_error);
                        }), fs_error);
                    }
                    , FS_proto = FileSaver.prototype
                    , saveAs = function(blob, name) {
                        return new FileSaver(blob, name);
                    }
                    ;
                FS_proto.abort = function() {
                    var filesaver = this;
                    filesaver.readyState = filesaver.DONE;
                    dispatch(filesaver, "abort");
                };
                FS_proto.readyState = FS_proto.INIT = 0;
                FS_proto.WRITING = 1;
                FS_proto.DONE = 2;

                FS_proto.error =
                    FS_proto.onwritestart =
                        FS_proto.onprogress =
                            FS_proto.onwrite =
                                FS_proto.onabort =
                                    FS_proto.onerror =
                                        FS_proto.onwriteend =
                                            null;

                view.addEventListener("unload", process_deletion_queue, false);
                return saveAs;
            }(window))
        }
    }

});;var Coco = Coco || {};
/**
 * Class: Coco.HashMap
 * v1.0
 *
 * Description:
 * HashMap is a key-value array
 *
 */
Coco.HashMap = dejavu.Class.declare({
    $name: "HashMap",

    __hashmap: null,

    __keys: null,

    initialize: function () {
        this.__hashmap = {};
        this.__keys = [];
    },

    /**
     * Function: getValue
     * returns stored object for given key
     *
     * Parameter:
     * (String)key to identify object
     *
     * Returns:
     * object value
     */
    getValue: function (key) {
        return this.__hashmap[key];
    },

    /**
     * Function: getKeys
     *
     * @returns array of keys
     */
    getKeys: function () {
        return this.__keys;
    },

    /**
     * Function: put
     * Puts a value with the given key to the map.
     *
     * Parameter:
     * @param {Number} key
     * @param {Object} value
     */
    put: function (key, value) {
        if (value === undefined || key == null) {
            //cannot set property of undefined
            return;
        }

        this.__hashmap[key] = value;

        if (this.__keys.indexOf(key) < 0) {
            this.__keys.push(key);
        }
    },

    /**
     * Function: remove
     * Removes value by given key.
     *
     * Parameter:
     * @param {Number} key
     * @param {Object} value
     */
    remove: function(key) {
        if (key == null) {
            //cannot set property of undefined
            return;
        }
        delete this.__hashmap[key];
        var index = this.__keys.indexOf(key);
        if(index > -1) {
            this.__keys = this.__keys.splice(index, 1);
        }
    },

    /**
     * Function length
     * @returns (int) length of current object}
     */
    length: function () {
        return this.__keys.length;
    }
});;var Coco = Coco || {};

/**
 * Class: Coco.HbsLoader
 *
 * Description:
 * This class loads a handlebar file.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.HbsLoader = dejavu.Class.declare({
    $name: 'HbsLoader',

    $finals: {
        $statics: {
            /**
             * Variable: regEx
             *
             * Description:
             * {final static} The regular expression to check if a string points to a handlebar file.
             */
            regEx: /(.+)\/([a-zA-Z0-9\$\.-_]+)(.hbs|.handlebars)/ig,

            /**
             * Function: isHandlebar
             *
             * Description:
             * {final static} Check if a file is a handlebar file.
             *
             * Parameter:
             * @param {string}      path  -  The handlebar files path, relative to the web root
             *
             * Return:
             * @returns {boolean}
             */
            isHandlebar: function (path) {
                if (typeof path !== "string") {
                    return false;
                }

                return (null !== path.match(this.regEx));
            },

            /**
             * Function: isLoaded
             *
             * Description:
             * {final static} Check if a hbs is already loaded in DOM.
             *
             * Parameter:
             * @param {string}  path  -   The handlebar files path, relative to the web root
             *
             * Return:
             * @return {boolean}
             */
            isLoaded: function (path) {
                var id = this.getHbsId(this.getFileName(path));

                return $('#' + id).size() > 0;
            },

            /**
             * Function: getHbsId
             *
             * Description:
             * {final static} Returns the filename and a prepended hash representation of the filename.
             *
             * @param {string}  filename    -   The handlebar id
             * @returns {string}
             */
            getHbsId: function (filename) {
                return filename.hashCode() + filename;
            },

            /**
             * Function: getFileDir
             *
             * Description:
             * Return the file directory without a appending slash.
             *
             * Parameter:
             * @param {string}  path   -  The handlebar files path, relative to the web root
             *
             * Return:
             * @returns {string}
             */
            getFileDir: function (path) {
                return path.replace(this.regEx, "$1");
            },

            /**
             * Function: getFileName
             *
             * Description:
             * Return the file name without the file extension.
             *
             * Parameter:
             * @param {string}  path  -   The handlebar files path, relative to the web root
             *
             * Return:
             * @returns {string}
             */
            getFileName: function (path) {
                return path.replace(this.regEx, "$2");
            },

            /**
             * Function: getFileExtension
             *
             * Description:
             * Return the file extension.
             *
             * Parameter:
             * @param {string}  path  -   The handlebar files path, relative to the web root
             *
             * Return:
             * @returns {string}
             */
            getFileExtension: function (path) {
                return path.replace(this.regEx, "$3");
            },

            /**
             * Function: parse
             *
             * Description:
             * Retrieve a handlebar file via synchronous AJAX call and executes callback on success.
             *
             * Parameter:
             * @param {string}      path   -     The handlebar files path, relative to the web root
             *
             * @param {Function}    $callback  - An optional callback to execute after the file was loaded into the DOM. If no callback is given the AJAX request will be synchronous.
             *
             * Return:
             * @returns {string} id of created script tag (without #)
             */
            parse: function (path, $callback) {
                var id = this.getHbsId(this.getFileName(path));
                //prevent browser cache for hbs files
                $.ajax({
                    url: path + "?time=" + new Date().getTime(),
                    type: "GET",
                    global: false,
                    async: (typeof $callback === 'function'),
                    success: function (hbsString) {
                        var tag = '<script type="text/x-handlebars-template" id="' + id + '">' + hbsString + '</script>';
                        $('body').append(tag);

                        if (typeof $callback === "function") {
                            $callback(id);
                        }
                    },
                    error: function () {
                        throw new Error("Could not parse handlebars file " + path + ". Check it's existence and spelling.");
                    }
                });

                return id;
            }
        }
    }
});;/**
 * Class: Coco.Math
 *
 * Math Helper Class
 *
 * (c) Johannes Klauss <johannes.klauss@3m5.de>
 */

var Coco = Coco || {};

'use strict';
Coco.Math = dejavu.Class.declare({
    $name: "Math",

    $finals: {
        $statics: {
            /**
             * Function: {final static}  isNumber(x)
             *
             * Description:
             * checks if a given variable is a number
             *
             * returns:
             *
             * boolean
             */
            isNumber: function (x) {
                return (!isNaN(parseFloat(x)));
            },

            /**
             * Function: {final static} round(value, precision)
             *
             * Description:
             * rounds a float to a given precision.
             *
             * Parameter:
             * @param {Number} value        -   The value to round.
             * @param {Number} $precision   -   {optional} The number of decimals. If omitted, the function will round to an Integer
             *
             * Return:
             * @returns {number}
             */
            round: function (value, $precision) {
                $precision = ($precision != null) ? $precision : 0;

                return Math.round((value + 0.0000001) * Math.pow(10, $precision)) / Math.pow(10, $precision);
            },

            /**
             * Function: {final static} random(noOfDigits)
             *
             * Description:
             */
            random: function(noOfDigits) {
                var charset = '123456789';
                var ret = '';

                for(var i = 0; i < noOfDigits; i++) {
                    ret += charset.substr(Math.floor(Math.random() * 9), 1);
                }

                return parseInt(ret);
            }
        }
    }
});;/**
 * Class: Coco.Storage
 * This class abstracts the very simple LocalStorage API.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
var Coco = Coco || {};

Coco.Storage = dejavu.Class.declare({
    $name: 'Storage',

    $statics: {
        /**
         * holds a boolean, that checks if the localStorage is available.
         */
        isAvailable: (window.localStorage != null),

        /**
         * Function: has(key)
         *
         * Description:
         * Checks if the key is in the localStorage.
         *
         * Parameter:
         * @param {string} key
         *
         * Return:
         * @returns {boolean}
         */
        has: function (key) {
            if (this.isAvailable) {
                return window.localStorage.hasOwnProperty(key);
            }
        },

        /**
         * Function: get(key)
         *
         * Description:
         * Returns the value of the key.
         * If value is an object, the method will try to parse it and then return the parsed object.
         *
         * Parameter:
         * @param {string}  key
         *
         * Return:
         * @returns {*}
         */
        get: function (key) {
            if (this.isAvailable) {
                var value = window.localStorage.getItem(key);

                try {
                    value = JSON.parse(value);
                } catch (e) {
                }

                return value;
            }
        },

        /**
         * Function: set(key, value)
         *
         * Description:
         * Saves a key and it's value to the localStorage.
         * If the value is an object, the function will stringify it.
         *
         * Parameter:
         * @param {string}  key
         * @param {*}       value
         */
        set: function (key, value) {
            if (this.isAvailable) {
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }

                window.localStorage.setItem(key, value);
            }
        },

        /**
         * Function: copy(sourceKey, targetKey, $deleteSource)
         *
         * Description:
         * Copies a value to another destination.
         *
         * @param {string}  sourceKey       -   Where lives the value that should be copied
         * @param {string}  targetKey       -   The destination
         * @param {boolean} $deleteSource   -   {optional}  If set to true the sourceKey will be deleted.
         */
        copy: function (sourceKey, targetKey, $deleteSource) {
            if (this.isAvailable) {
                if (window.localStorage.hasOwnProperty(sourceKey)) {
                    window.localStorage.setItem(targetKey, window.localStorage.getItem(sourceKey));
                }

                if ($deleteSource) {
                    window.localStorage.removeItem(sourceKey);
                }
            }
        },

        /**
         * Function: remove(key)
         *
         * Description:
         * Removes a key and it's value from the localStorage.
         *
         * Parameter:
         * @param {string} key
         */
        remove: function (key) {
            if (this.isAvailable) {
                window.localStorage.removeItem(key);
            }
        },

        /**
         * Function: clear()
         *
         * Description:
         * Clears the locationStorage.
         */
        clear: function () {
            if (this.isAvailable) {
                window.localStorage.clear();
            }
        },

        /**
         * Function: getUsedSpace()
         *
         * Description:
         * Returns the number of kilobyte of memory the localStorage has taken.
         *
         * Return:
         * @returns {null|Number}
         */
        getUsedSpace: function ($key) {
            if (this.isAvailable) {
                var values = '';

                if($key) {
                    values = window.localStorage.hasOwnProperty($key) ? window.localStorage.getItem($key) : '';
                }
                else {
                    for (var key in window.localStorage) {
                        if (window.localStorage.hasOwnProperty(key)) {
                            values += window.localStorage[key];
                        }
                    }
                }

                return values ? 3 + ((values.length * 16) / (8 * 1024)) : 0;
            }

            return null;
        }
    }
});;var Coco = Coco || {};
/**
 * Class: Coco.StringUtils
 *
 * Description:
 *
 * {static} Class
 *
 * (c) 2013 3m5. Media GmbH
 */
'use strict';
Coco.StringUtils = dejavu.Class.declare({
    $name: "StringUtils",

    initialize: function () {
        Log.error("Do not instantiate static class: " + this.$name);
    },

    $finals: {
        $statics: {
            /**
             * Function: {final static}  isEmpty
             *
             * Description:
             *
             * checks if given string is null or empty
             *
             * returns:
             *
             * boolean
             */
            isEmpty: function (string) {
                return string == null || string === "" || string.length === 0;
            }
        }
    }
});;var Coco = Coco || {};

/**
 * Class: Coco.Utils
 *
 * Description:
 * This class holds several helping function, like a caster or a .hbs parser.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.Utils = dejavu.Class.declare({
    $name: "Utils",

    /**
     * Constants:
     * These constants are used to cast or type test variables.
     *
     * @public
     */
    $constants: {
        /**
         * Constant: BOOLEAN
         *
         * for boolean casting
         *
         */
        BOOLEAN: 0,
        /**
         * Constant: INTEGER
         *
         * for integer casting
         */
        INTEGER: 1,

        /**
         * Constant: FLOAT
         *
         * for float casting
         */
        FLOAT: 2,

        /**
         * Constant: STRING
         *
         * for string casting
         */
        STRING: 3,

        /**
         * Constant: OBJECT
         *
         * for object casting
         */
        OBJECT: 4,

        /**
         * Constant: ARRAY
         *
         * for array casting
         */
        ARRAY: 5,

        /**
         * Constant: NULL
         *
         * for null casting
         */
        NULL: 6,

        /**
         * Constant: UNDEFINED
         *
         * for undefined casting
         */
        UNDEFINED: 99
    },

    $statics: {
        __id: 0
    },

    $finals: {
        $statics: {
            /**
             * Function: uniqueId
             *
             * Description:
             * {final static} Generates a unique id with an optional prefix. Be careful: It's only unique if all generated ids use the
             * same function and it's only unique while lifetime of application.
             *
             * Parameter:
             * @param {string}  $prefix     -   {optional} optional prefix for unique id. Is not allowed to contain a number.
             *
             * Return:
             * @returns {string|number} - created unique id
             */
            uniqueId: function ($prefix) {
                if(/[0-9]$/.test($prefix)) {
                    throw new Error("$prefix is not allowed to end with a number in Coco.Utils.uniqueId().");
                }

                var id = ++Coco.Utils.__id + '';

                return $prefix ? "" + $prefix + id : id;
            },

            /**
             * Function: randomId
             *
             * Description:
             * {final static} Generates a random id with an optional prefix.
             *
             * Parameter:
             * @param {string}  $prefix     -   {optional} optional prefix for random id.
             *
             * Return:
             * @returns {string|number} - created random id
             */
            randomId: function ($prefix) {
                var rand = window.btoa(Math.floor(Math.random() * 5000000) + '' + new Date().getTime() + '' + (++this.__id));

                return $prefix ? "" + $prefix + rand.substr(0, 32) : rand.substr(0, 32);
            },

            /**
             * Function: isMobile : {Android, BlackBerry, iOS, Opera, Windows, any}
             *
             * {final static} object for mobile detection
             */
            isMobile : {
                /**
                 * Function: isMobile.Android
                 *
                 * returns matched navigator String if Android device detected, otherwise null
                 */
                Android: function() {
                    return navigator && navigator.userAgent && navigator.userAgent.match(/Android/i);
                },
                /**
                 * Function: isMobile.BlackBerry
                 *
                 * returns matched navigator String if BlackBerry device detected, otherwise null
                 */
                BlackBerry: function() {
                    return navigator && navigator.userAgent && navigator.userAgent.match(/BlackBerry/i);
                },
                /**
                 * Function: isMobile.BlackBerry
                 *
                 * returns matched navigator String if BlackBerry device detected, otherwise null
                 */
                iOS: function() {
                    return navigator && navigator.userAgent && navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                /**
                 * Function: isMobile.Opera
                 *
                 * returns matched navigator String if Opera Mini device detected, otherwise null
                 */
                Opera: function() {
                    return navigator && navigator.userAgent && navigator.userAgent.match(/Opera Mini/i);
                },
                /**
                 * Function: isMobile.Windows
                 *
                 * returns matched navigator String if IEMobile device detected, otherwise null
                 */
                Windows: function() {
                    return navigator && navigator.userAgent && navigator.userAgent.match(/IEMobile/i);
                },
                /**
                 * Function: isMobile.any
                 *
                 * returns matched navigator String if any mobile device detected, otherwise null
                 */
                any: function() {
                    return (Coco.Utils.isMobile.Android() || Coco.Utils.isMobile.BlackBerry() || Coco.Utils.isMobile.iOS() || Coco.Utils.isMobile.Opera() || Coco.Utils.isMobile.Windows());
                }
            },

            /**
             * Function: cast
             *
             * Description:
             * {final static} Cast value to a specific type.
             *
             * Parameter:
             * @param {*} value   -  The value to cast
             *
             * @param {Number} type  - The type to cast the value to. Should refer to <Coco.Utils.Constants>
             *
             * @param {string|Number}   $key - optional $key is needed if type is Coco.Util.OBJECT
             */
            cast: function (value, type, $key) {
                switch (type) {
                    case Coco.Utils.INTEGER:
                        return parseInt(value, 10);

                    case Coco.Utils.BOOLEAN:
                        return parseInt(value, 10) === 1 || value === "true" || value === "1";

                    case Coco.Utils.FLOAT:
                        return parseFloat(value);

                    case Coco.Utils.STRING:
                        return (value).toString();

                    case Coco.Utils.ARRAY:
                        return (value instanceof Array) ? value : [value];

                    case Coco.Utils.OBJECT:
                        if (typeof value === 'object') {
                            return value;
                        }

                        if (typeof $key !== 'undefined') {
                            var o = {};
                            o[$key] = value;

                            return o;
                        }

                        throw new Error('Cannot cast value ' + value + ' to object because no $key is given in Coco.Utils.cast().');
                        break;

                    case Coco.Utils.NULL:
                        return null;

                    default:
                        return value;
                }
            }
        }
    }
});;var Coco = Coco || {};

/**
 * Class: Coco.Event
 *
 * Description:
 * This {abstract} class manages all events and attached callbacks.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.Event = dejavu.AbstractClass.declare({
    $name: 'Event',

    $constants: {
        /**
         * Event: INITIALIZED
         * Called in <Coco> when Coco is initialized.
         */
        INITIALIZED: 'coco:initialized',
        /**
         * Event: ADD
         * Called in <Coco.Collection> when a new <Coco.Model> has been added.
         */
        ADD: 'coco:add',
        /**
         * Event: AUTHORIZATION_FAILED
         * Called in <Coco.BaseRestService> if http status 401 was received
         */
        AUTHORIZATION_FAILED: 'coco:authorization_failed',
        /**
         * Event: CHANGE
         * Called in <Coco.Model> if the attributes changed.
         */
        CHANGE: 'coco:change',
        /**
         * Event: CHANGE_KEY
         * Called in <Coco.Model> if a specified attribute changed. (Built like CHANGE_KEY + 'key').
         */
        CHANGE_KEY: 'coco:change:',
        /**
         * Event: DESTROY
         * Called in <Coco.Model>, <Coco.Collection> and <Coco.View> before instance gets destroyed.
         */
        DESTROY: 'coco:destroy',
        /**
         * Event: INTERNAL_SERVER_ERROR
         * Called in <Coco.BaseRestService> if http status 500 was received
         */
        INTERNAL_SERVER_ERROR: 'coco:internal_server_error',
        /**
         * Event: INVALID
         * Called in <Coco.Model> if the validation of the model failed.
         */
        INVALID: 'coco:invalid',
        /**
         * Event: REMOVE
         * Called in <Coco.Collection> if a <Coco.Model> instance has been removed from the collection.
         */
        REMOVE: 'coco:remove',
        /**
         * Event: RENDER
         * Called in <Coco.View> when the DOM has been refreshed.
         */
        RENDER: 'coco:render',
        /**
         * Event: RESET
         * Called in <Coco.Collection> when the collection has been reset.
         */
        RESET: 'coco:reset',
        /**
         * Event: SORTED
         * Called in <Coco.Collection> when the collection has been sorted.
         */
        SORTED: 'coco:sorted',
        /**
         * Event: VALID
         * Called in <Coco.Model> when the validation of the model passed.
         */
        VALID: 'coco:valid',
        /**
         * Event: CHANGE_ROUTE
         * Called in <Coco.RouterService> when the url changed.
         */
        CHANGE_ROUTE: 'coco:route:change',
        /**
         * Event: FIRE_ROUTE
         */
        FIRE_ROUTE: 'coco:route:fire',
        /**
         * Event: HIDE_VIEW
         * Called in <Coco.RouterService> when the url changed.
         */
        HIDE_VIEW: 'coco:view:hide',
        /**
         * Event: SHOW_VIEW
         * Called in <Coco.RouterService> when the url changed.
         */
        SHOW_VIEW: 'coco:view:show'
    },

    /**
     * The saved listeners.
     */
    __listeners: {},

    /**
     * All contexts the instance is listen to.
     */
    __ctx: [],

    $abstracts: {
        /**
         * Function: {abstract} getId()
         *
         * returns unique identifier for inheritance, it's needed to get unique event context
         *
         * If you inherit from Coco.Event you always have to implement this function.
         *
         * @returns: {String} uid
         */
        getId: function () {
        }
    },

    /**
     * Ctor.
     */
    initialize: function () {
    },

    /**
     * Function: listenTo
     *
     * Adds a listener to given context.
     *
     * Parameter:
     * @param {Coco.Event}  context    - The <Coco.Event> object to listen to for an event
     *
     * @param {string}      event      - The event to listen to
     *
     * @param {Function}    callback   - The callback
     *
     * Return:
     * @returns {string}    -   The generated handle.
     */
    listenTo: function (context, event, callback) {
        if (callback == null) {
            throw new Error("The given callback does not exist in " + this.$name + ".");
        }

        if (context == null) {
            throw new Error("Tried to attach a listener in " + this.$name + " for the Event " + event + ". But the context is null.");
        }

        if (typeof context.__listeners[event] === "undefined") {
            context.__listeners[event] = [];
        }

        var handle = Coco.Utils.uniqueId('e');

        context.__listeners[event].push({
            callback: callback.$bind(this),
            keep: true,
            ctx: this.getId(),
            handle: handle
        });

        this.__ctx.push({
            __listeners: context.__listeners,
            id: context.getId()
        });

        return handle;
    },

    /**
     * Function: on
     * calls <Coco.Event.listenTo>
     *
     * Parameter:
     * @param {Coco.Event}  context    - The <Coco.Event> object to listen to for an event
     *
     * @param {string}      event      - The event to listen to
     *
     * @param {Function}    callback   - The callback
     *
     * Return:
     * @returns {string}    -   The generated handle.
     */
    on: function (context, event, callback) {
        return this.listenTo(context, event, callback);
    },

    /**
     * Function: once
     * Add a listener to call once.
     *
     * Parameter:
     * @param {Coco.Event}  context    - The <Coco.Event> context to listen to for an event
     *
     * @param {string}      event      - The event to listen to
     *
     * @param {Function}    callback   - The callback
     */
    once: function (context, event, callback) {
        if (typeof context.__listeners[event] === "undefined") {
            context.__listeners[event] = [];
        }

        context.__listeners[event].push({
            callback: callback.$bind(this),
            keep: false
        });
    },

    /**
     * Function: stopListening
     *
     * Removes a listener.
     * If no arguments are given, this instance will delete all listeners from every context where
     * it attached callbacks.
     *
     * Parameter:
     * @param {Coco.Event}  $context    - {optional} The <Coco.Event> context to stop listen.
     *
     * @param {string}      $event      - {optional} The event to listen off.
     *
     * @param {string}      $handle     - {optional} The handle for a specific callback that should be detached.
     */
    stopListening: function ($context, $event, $handle) {
        var sum = 0,
            event = null,
            i = 0;

        if ($context != null) {
            sum += 3;
        }

        if ($event != null) {
            sum += 5;
        }

        if ($handle != null) {
            sum += 7;
        }

        switch (sum) {
            case 0:
                // No parameters given
                for (i = 0; i < this.__ctx.length; i++) {
                    var ctxListeners = this.__ctx[i].__listeners;

                    for (var e in ctxListeners) {
                        if (ctxListeners.hasOwnProperty(e)) {
                            for (var j = 0; j < ctxListeners[e].length; j++) {
                                if (ctxListeners[e][j].ctx === this.getId()) {
                                    this.__ctx[i].__listeners[e].splice(j, 1);
                                }
                            }
                        }
                    }
                }

                break;

            case 3:
                // $context are given
                for (i = 0; i < this.__ctx.length; i++) {
                    ctxListeners = this.__ctx[i].__listeners;

                    if (this.__ctx[i].id !== $context.getId()) {
                        continue;
                    }

                    for (e in ctxListeners) {
                        if (ctxListeners.hasOwnProperty(e)) {
                            for (j = 0; j < ctxListeners[e].length; j++) {
                                if (ctxListeners[e][j].ctx === this.getId()) {
                                    this.__ctx[i].__listeners[e].splice(j, 1);
                                }
                            }
                        }
                    }
                }

                break;

            case 8:
                // $context and $event are given
                $context.__listeners[$event] = [];

                break;

            case 15:
                // $context, $event and $handle are given
                var l = $context.__listeners[$event];

                for(i = 0; i < l.length; i++) {
                    if(l[i].handle === $handle) {
                        l.splice(i, 1);

                        break;
                    }
                }

                break;
        }
    },

    /**
     * Function: off
     * calls: <Coco.Event.stopListening>
     *
     * Parameter:
     * @param {Coco.Event}  $context    - {optional} The <Coco.Event> object to stop listen
     *
     * @param {string}      $event      - {optional} The event to listen off
     *
     * @param {string}      $handle     - {optional} The handle for a specific callback that should be detached.
     */
    off: function ($context, $event, $handle) {
        this.stopListening($context, $event, $handle);
    },

    /**
     * Function: trigger
     * Triggers an event.
     *
     * Dispatch idea is taken from backbone.js. Love this approach.
     *
     * You can add as many arguments that will given to the callback functions as you like.
     *
     * If you add up to 5 additional arguments, they will be handles separately.
     *
     * Example:
     * `this.trigger('some:event', arg1, arg2, arg3);` will lead to `callback(arg1, arg2, arg3)`
     *
     * `this.trigger('some:event', arg1, arg2, arg3, arg4, arg5, arg6, arg7);` will lead to `callback(arguments)`
     *
     * Parameter:
     * @param {string} event    - The event to trigger
     */
    trigger: function (event) {
        var cbObject = (this.__listeners[event]) ? this.__listeners[event].slice(0) : null,
            i = -1,
            l = (this.__listeners[event]) ? this.__listeners[event].length : 0,
            a1 = arguments[0],
            a2 = arguments[1],
            a3 = arguments[2],
            a4 = arguments[3],
            a5 = arguments[4];

        switch (arguments.length) {
            case 0:
                while (++i < l) {
                    cbObject[i].callback.call();

                    this.__checkForRemove(event, i);
                }
                break;
            case 1:
                while (++i < l) {
                    cbObject[i].callback.call(a1);

                    this.__checkForRemove(event, i);
                }
                break;
            case 2:
                while (++i < l) {
                    cbObject[i].callback.call(a1, a2);

                    this.__checkForRemove(event, i);
                }
                break;
            case 3:
                while (++i < l) {
                    cbObject[i].callback.call(a1, a2, a3);

                    this.__checkForRemove(event, i);
                }
                break;
            case 4:
                while (++i < l) {
                    cbObject[i].callback.call(a1, a2, a3, a4);

                    this.__checkForRemove(event, i);
                }
                break;
            case 5:
                while (++i < l) {
                    cbObject[i].callback.call(a1, a2, a3, a4, a5);

                    this.__checkForRemove(event, i);
                }
                break;
            default:
                while (++i < l) {
                    cbObject[i].callback.call(arguments);

                    this.__checkForRemove(event, i);
                }
        }

        this.__removeOnceListeners(event);
    },

    /**
     * If callback is a one time listener mark it so we can delete it at the end of the trigger function.
     *
     * @param {number|string}   event   The event
     * @param {number}          i       The listener.
     * @private
     */
    __checkForRemove: function (event, i) {
        if (this.__listeners && this.__listeners[event] && this.__listeners[event][i] && !this.__listeners[event][i].keep) {
            this.__listeners[event][i].doDelete = true;
        }
    },

    /**
     * Actually remove the one time listeners.
     *
     * @param {number|string}   event
     * @private
     */
    __removeOnceListeners: function (event) {
        if(this.__listeners[event]) {
            for(var i = this.__listeners[event].length - 1; i >= 0; i--) {
                if(this.__listeners[event][i].doDelete) {
                    this.__listeners[event].splice(i, 1);
                }
            }
        }
    },

    /**
     * Function: _createModelChangeKey
     * {protected} creates an Event String for the model Event <Coco.Event.CHANGE_KEY>
     *
     * Parameter:
     * key - String of key to create Change-Event to
     */
    _createModelChangeKey : function(key) {
        return Coco.Event.CHANGE_KEY + key;
    }
});;var Coco = Coco || {};

/**
 * Class: Coco.ServiceContainer
 *
 * Description:
 * This class holds and provide all previously created services.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.ServiceContainer = dejavu.Class.declare({
    $name: 'ServiceContainer',
    $extends: Coco.Event,

    $statics: {
        __services: {},

        /**
         * Function addService
         *
         * {static} function to add service class
         *
         * @param serviceInstance
         */
        addService: function (serviceInstance) {
            if(!this.__services.hasOwnProperty(serviceInstance.$serviceId)) {
                this.__services[serviceInstance.$serviceId] = serviceInstance;
            }
            else {
                throw new Error("Service '" + serviceInstance.$serviceId + "' already defined with class '" + serviceInstance.$name + "'.");
            }
        }
    },

    /**
     * Function: getService
     *
     * Return the service
     *
     * @param serviceId
     */
    getService: function (serviceId) {
        if(Coco.ServiceContainer.__services.hasOwnProperty(serviceId)) {
            return Coco.ServiceContainer.__services[serviceId];
        }

        throw new Error("Service '" + serviceId + "' does not exist. Maybe you forgot to append .$service() at the end of the declaration of your class.");
    }
});;var Coco = Coco || {};

/**
 * Class: Coco.ServiceProvider
 *
 * extends: <Coco.Event>
 *
 * Description:
 * This class provides all defined services.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.ServiceProvider = dejavu.AbstractClass.declare({
    $name: 'ServiceProvider',

    $extends: Coco.Event,

    /**
     * Variable: $inject
     * Array to inject other services, simply provide an array of service ids.
     */
    $inject: [],

    /**
     * Variable: $services
     * The services will be filled on instantiation of the class.
     * Key is the serviceId and value is the service instance.
     */
    $services: {},

    initialize: function () {
        this._injectServices();

        // Protect the ServiceContainer
        this._injectServices = null;
    },

    /**
     * Function: _injectServices
     * {protected} function injects service instances, its portected because <Coco.ChildView> initialization differs
     */
    _injectServices: function () {
        var serviceContainer = new Coco.ServiceContainer();

        for(var i = 0; i < this.$inject.length; i++) {
            this.$services[this.$inject[i]] = serviceContainer.getService(this.$inject[i]);
        }
    },

    /**
     * Function: _getService(serviceId)
     * {protected} returns special service by given service id
     *
     * Parameter:
     * @param serviceId - String service id to get
     *
     * Return:
     * @returns service - <Coco.Service>
     */
    _getService : function(serviceId) {
        return this.$services[serviceId];
    }
});;var Coco = Coco || {};

/**
 * Class: Coco.Service
 *
 * extends: <Coco.ServiceProvider>
 *
 * Description:
 * This {abstract} class is extensible for building injectable services.
 * This service class holds the basic information to define a service.
 *
 * Append .$service() after your declare function and before semicolon to tell Coco that this is an injectable service class.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.Service = dejavu.AbstractClass.declare({
    $name: 'Service',

    $extends: Coco.ServiceProvider,

    /**
     * Variable: $serviceId
     * This will be the name of the service.
     */
    $serviceId: 'service',

    /**
     * The internal instance id.
     */
__id: Coco.Utils.uniqueId('s'),

    /**
     * Function: getId
     * returns unique ID of this ServiceProvider
     *
     * @returns {String}
     */
    getId: function () {
        return this.__id;
    }
});;var Coco = Coco || {};
/**
 * Class: BaseRestService
 *
 * Package: Coco
 *
 * extends <Coco.Service>
 *
 * Description: Base service for calling REST endpoints.
 *
 * Override this class by concrete implementation, dont forget .$service() for automatic service-injection!
 *
 * (c) 2014 3m5. Media GmbH
 */
'use strict';
Coco.BaseRestService = dejavu.AbstractClass.declare({
	/**
	 * Class name.
	 */
	$name: "BaseRestService",

	/**
	 * Super class: Coco.Service
	 */
	$extends: Coco.Service,

	/**
	 * cache for GET requests
	 */
	_getCache: null,

	/**
	 * cache for POST requests
	 */
	_postCache: null,


	/**
	 * The REST service path.
	 */
	_restServicePath : null,

	$constants : {
		XHR_FIELDS: {
			withCredentials: true
		},
		CROSSDOMAIN: true
	},

	/**
	 * Ctor.
	 *
	 * @param {string} contextPath the web application context path
	 * @param {string} restApplicationPath the REST application path
	 * @param {string} restServicePath the REST service path
	 */
	initialize: function () {
		this.$super();

		if(Coco.StringUtils.isEmpty(this._restServicePath)) {
			Log.error(this.$name + "._restServicePath not set!");
		}
		this._onInitialize();
	},

	/**
	 * Function: _onInitialize
	 *
	 * is called after class was initialized
	 * @protected
	 */
	_onInitialize : function() {

	},

	_validateParameterIsBoolean: function (param , onError) {
		if(param != null && typeof param != "boolean") {
            onError({status: 99, responseText: "Parameter is not type of Boolean"});
			return false;
		}
		return true;
	},

	_validateParameterIsInteger: function (param, onError) {
		if(param != null && parseInt(param) !== param ) {
            onError({status: 99, responseText: "Parameter is not type of Integer"});
			return false;
		}
		return true;
	},

	_validateParameterIsFloat: function (param, onError) {
		if(param != null && typeof param !== "number") {
            onError({status: 99, responseText: "Parameter is not type of Number"});
			return false;
		}
		return true;
	},
	_validateParameterIsArray: function (param, onError) {
		if(param != null && !Array.isArray(param)) {
			onError({status: 99, responseText: "Parameter is not type of Array"});
			return false;
		}
		return true;
	},

	_validateParameterClass: function (param, paramType, onError) {
		if(param != null && !(param instanceof paramType)){
			onError({status: 99, responseText: "Parameter is not type of " + (typeof paramType)});
			return false;
		}
		return true;
	},


	/**
	 * Function: _buildEndpointURL
	 *
	 * Builds the full endpoint URL absolute to the host. The URL looks like:
	 * [CONTEXT-PATH]/[REST-PATH]/[ENDPOINT]
	 *
	 * Parameter:
	 *
	 * @param {string} endpoint the REST endpoint
	 */
	_buildEndpointURL : function(endpoint, pathParameter) {
		if(Coco.StringUtils.isEmpty(this._restServicePath)) {
			Log.error(this.$name + "._restServicePath not set!");
			return;
		}
		if(Coco.StringUtils.isEmpty(Coco.config.baseUrl)) {
			Log.error("Coco.config.baseUrl  not set!");
			return;
		}
		if(Coco.StringUtils.isEmpty(Coco.config.restService.path)) {
			Log.error("Coco.config.restService.path not set!");
			return;
		}
		if(endpoint == null) {
			endpoint = "";
		}
		var finalUrl = Coco.config.baseUrl + Coco.config.restService.path + this._restServicePath + endpoint;
		if(pathParameter && pathParameter.length > 0) {
			finalUrl = this._replacePathParameters(finalUrl, pathParameter);
		}
		return finalUrl;
	},

	_replacePathParameters : function(path, pathParameter) {
		do {
			var paramStart = path.indexOf("{");
			if (paramStart < 0) {
				break;
			}
			var paramEnd = paramStart;
			var depth = 1;
			do {
				paramEnd++;
				var c = path.substring(paramEnd, paramEnd + 1);
				if (c === "{") {
					depth++;
				} else if (c === "}") {
					depth--;
				}
			} while (depth > 0 && paramEnd + 1 < path.length);
			paramEnd++;
			if (paramEnd > path.length) {
				break;
			}
			var pathDefinition = path.substring(paramStart, paramEnd);
			var paramName = pathDefinition.substring(1, pathDefinition.length - 1);
			if (paramName.indexOf(":") > 0) {
				paramName = paramName.substring(0, paramName.indexOf(":"));
			}
			var value = null;
			for(var i = 0; i < pathParameter.length; i++) {
				if(pathParameter[i].name === paramName) {
					value = pathParameter[i].replacement;
					break;
				}
			}
			if(value == null) {
				Log.error("missing path parameter: " + paramName + " not set...");
				continue;
			}
			//replace position
			path = path.substring(0, paramStart) + value + path.substring(paramEnd);
		} while (true);

		return path;
	},

	/**
	 * Function: __call {private}
	 *
	 * Calls the given endpoint via jQuery ajax function using the given method, data and callbacks.
	 *
	 * Parameter:
	 * @param {string} endpoint the REST endpoint
	 *
	 * @param {string} method the request method ('GET', 'POST', 'PUT' or 'DELETE')
	 *
	 * @param {object} data the request data
	 *
	 * @param {object} xhrFields
	 *
	 * @param {function} callbackSuccess the success handler
	 *
	 * @param {function} callbackError the error handler
	 */
	__call : function(endpoint, pathParameter, method, data, xhrFields, callbackSuccess, callbackError, $contentType) {
		var url = this._buildEndpointURL(endpoint, pathParameter);

		var cacheKey = url;
		if($contentType) {
			cacheKey = cacheKey + $contentType;
		} else {
            if (method !== 'GET' && method !== 'DELETE') {
                $contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
            }
        }

		if(method == "GET") {
			if(this._getCache == null) {
				this._getCache = new Coco.HashMap();
			}

			var cacheData = this._getCache.getValue(cacheKey);
			if(cacheData != null) {
				//extend cached object, to prevent killing timeout variable
				cacheData = $.extend({}, cacheData);
				//cached entry found
				if(cacheData.cocoTimeout == null) {
					//no timeout
					delete cacheData.cocoTimeout;
					callbackSuccess(cacheData);
					return;
				}
				if(cacheData.cocoTimeout > new Date().getTime()) {
					//cache is still valid
					delete cacheData.cocoTimeout;
					callbackSuccess(cacheData);
					return;
				}
				//cache timed out, delete it
				this._getCache.remove(cacheKey);
			}
		}
		Log.debug("Calling REST service (method: '" + method + "', URL: " + url + ") with data: ", data);
		$.ajax({
			url: url,
			type: method,
			xhrFields: xhrFields,
			contentType: $contentType,
			crossDomain: this.$self.CROSSDOMAIN, //enable crossdomain calls - implement serverside!
			data: data,
			dataType: 'json', //dont use jsonp for RESTservices, only GET requests allowed with jsonp
			success: function(response) {
				if(method == "GET") {
					if(Coco.config.restService.cacheGet == null) {
						this._getCache.put(cacheKey, response);
					} else {
						if(Coco.config.restService.cacheGet > 0) {
							var timeout = new Date(new Date().getTime() + (1000 * Coco.config.restService.cacheGet));
							this._getCache.put(cacheKey, $.extend({cocoTimeout: timeout}, response));
						} else {
							//cache disabled
						}
					}

				}
				callbackSuccess(response);
			}.$bind(this),
			error: function(error) {
				if(error != null && error.status == 401) {
					//Authorization failed - throw Event
					this.trigger(Coco.Event.AUTHORIZATION_FAILED);
				}
				if(error != null && error.status == 500) {
					//Authorization failed - throw Event
					this.trigger(Coco.Event.INTERNAL_SERVER_ERROR, error);
				}
				if(callbackError != null) {
					callbackError(error);
				}
			}.$bind(this)
		});
	},

	/**
	 * Function: _get
	 *
	 * Delegates to _call using 'GET' method.
	 *
	 * Parameter:
	 * @param {string} endpoint the REST endpoint
	 *
	 * @param {Array} pathParameter Array
	 *
	 * @param {object} data the request data
	 *
	 * @param {object} xhrFields
	 *
	 * @param {function} callbackSuccess the success handler
	 *
	 * @param {function} callbackError the error handler
	 */
	_get : function(endpoint, pathParameter, data, xhrFields, callbackSuccess, callbackError) {
		if(!Array.isArray(pathParameter)) {
			throw new Error("2nd parameter has to be pathParameter array, but was: " + typeof pathParameter);
		}
		this.__call(endpoint, pathParameter, 'GET', data, xhrFields, callbackSuccess, callbackError, null);
	},

	/**
	 * Function: _post
	 *
	 * Delegates to _call using 'POST' method.
	 *
	 * Parameter:
	 * @param {string} endpoint the REST endpoint
	 *
	 * @param {object} data the request data
	 *
	 * @param {object} xhrFields
	 *
	 * @param {function} callbackSuccess the success handler
	 *
	 * @param {function} callbackError the error handler
	 */
	_post : function(endpoint, pathParameter, data, xhrFields, callbackSuccess, callbackError) {
		if(!Array.isArray(pathParameter)) {
			throw new Error("2nd parameter has to be pathParameter array, but was: " + typeof pathParameter);
		}
		this.__call(endpoint, pathParameter, 'POST', data, xhrFields, callbackSuccess, callbackError, null);
	},

	/**
	 * Function: _postJson
	 *
	 * Delegates to _call using 'POST' method, contentType 'application/json' and
	 * stringifys the data object.
	 * Use this method if you consume a (complexly JSON) mapped  object on server-side.
	 *
	 * Parameter:
	 * @param {string} endpoint the REST endpoint
	 *
	 * @param {object} data the request data
	 *
	 * @param {function} callbackSuccess the success handler
	 *
	 * @param {function} callbackError the error handler
	 */
	_postJson : function(endpoint, pathParameter, data, xhrFields, callbackSuccess, callbackError) {
		if(!Array.isArray(pathParameter)) {
			throw new Error("2nd parameter has to be pathParameter array, but was: " + typeof pathParameter);
		}
		this.__call(endpoint, pathParameter, 'POST', JSON.stringify(data), xhrFields, callbackSuccess, callbackError, 'application/json');
	},


	/**
	 * Function: _put
	 *
	 * Delegates to _call using 'PUT' method.
	 *
	 * Parameter:
	 * @param {string} endpoint the REST endpoint
	 *
	 * @param {object} data the request data
	 *
	 * @param {object} xhrFields
	 *
	 * @param {function} callbackSuccess the success handler
	 *
	 * @param {function} callbackError the error handler
	 */
	_put : function(endpoint, pathParameter, data, xhrFields, callbackSuccess, callbackError) {
		if(!Array.isArray(pathParameter)) {
			throw new Error("2nd parameter has to be pathParameter array, but was: " + typeof pathParameter);
		}
		this.__call(endpoint, pathParameter, 'PUT', data, xhrFields, callbackSuccess, callbackError, null);
	},


	/**
	 * Function: _putJson
	 *
	 * Delegates to _call using 'PUT' method.
	 *
	 * Parameter:
	 * @param {string} endpoint the REST endpoint
	 *
	 * @param {object} data the request data
	 *
	 * @param {object} xhrFields
	 *
	 * @param {function} callbackSuccess the success handler
	 *
	 * @param {function} callbackError the error handler
	 */
	_putJson : function(endpoint, pathParameter, data, xhrFields, callbackSuccess, callbackError) {
		if(!Array.isArray(pathParameter)) {
			throw new Error("2nd parameter has to be pathParameter array, but was: " + typeof pathParameter);
		}
		this.__call(endpoint, pathParameter, 'PUT', JSON.stringify(data), xhrFields, callbackSuccess, callbackError, 'application/json');
	},

	/**
	 * Function: _delete
	 *
	 * Delegates to _call using 'DELETE' method.
	 *
	 * Parameter:
	 * @param {string} endpoint the REST endpoint
	 *
	 * @param {object} data the request data
	 *
	 * @param {object} xhrFields
	 *
	 * @param {function} callbackSuccess the success handler
	 *
	 * @param {function} callbackError the error handler
	 */
	_delete : function(endpoint, pathParameter, data, xhrFields, callbackSuccess, callbackError) {
		if(!Array.isArray(pathParameter)) {
			throw new Error("2nd parameter has to be pathParameter array, but was: " + typeof pathParameter);
		}
		this.__call(endpoint, pathParameter, 'DELETE', data, xhrFields, callbackSuccess, callbackError, null);
	}

});;var Coco = Coco || {};

/**
 * Class: Coco.Collection
 *
 * extends: <Coco.Event>
 *
 * Description:
 * This class holds an array of model instances and provides some helping functions.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.Collection = dejavu.Class.declare({
    $name: 'Collection',

    $extends: Coco.Event,

    /**
     * The internal collection id.
     */
    __id: null,

    /**
     * A private class identifier, copied from `this.$name`
     */
    __$name: "Collection",

    /**
     * Variable: _models
     * {protected} Array of Coco.Model objects.
     */
    _models: [],

    /**
     * Variable: _modelClass
     * The class of the models. Calling <Coco.Collection.createOne> and <Coco.Collection.add> will always add models
     * with the class referred here.
     * {protected}
     */
    _modelClass: null,

    /**
     * Function: Constructor
     *
     * @param {Array}   $models -   The models to add initial.
     */
    initialize: function ($models) {
        if (this._modelClass === null || !(this._modelClass.$parent && this._modelClass.$parent.prototype.__$name === 'Model')) {
            throw new Error("Cannot create Collection '" + this.$name + "' with '_modelClass' being null or not extending from Coco.Model.");
        }

        this.__$name = this.$name;
        this.__id = Coco.Utils.uniqueId("c");

        this._onInitialize($models);

        if ($models != null) {
            this.add($models);
        }
    },

    /**
     * Function: _onInitialize
     * Function is called after class is initialized, but BEFORE models are added.
     *
     * Parameter:
     * @param {Array}   $models -   The models to add initial. You can change those by altering the this parameter.
     */
    _onInitialize : function($models) {
    },

    /**
     * Function: add
     * Adds an array of models to the collection. This can be either an instance of Coco.Model or attributes or an Array
     * containing one of both.
     *
     * Parameter:
     * @param {Coco.Model|Object|Array} attributes  - Array of models to add.
     *
     * Event:
     * Triggers <Coco.Event.ADD> event with each model that has been added.
     */
    add: function (attributes) {
        if (attributes == null) {
            return;
        }

        if (!(attributes instanceof Array)) {
            attributes = [attributes];
        }

        var model = null;

        for (var i = 0; i < attributes.length; i++) {
            if (attributes[i] == null) {
                continue;
            }

            // If attribute is a model store it, otherwise create a new model and set it's attributes.
            model = (!(attributes[i] instanceof this._modelClass)) ? new this._modelClass(attributes[i]) : attributes[i];

            this.listenTo(model, Coco.Event.DESTROY, this.__onModelDestroy);
            this._models.push(model);
            this.trigger(Coco.Event.ADD, model, this);
        }

    },

    /**
     * Function: createOne
     * Creates a new model based on given attributes.
     *
     * Parameter:
     * @param {Object} $attributes  - {optional} The attributes the new model should have.
     *
     * Return:
     * @return {Coco.Model}         - The created model.
     *
     * Event:
     * Triggers <Coco.Event.ADD> event.
     */
    createOne: function ($attributes) {
        if ($attributes instanceof this._modelClass) {
            return null;
        }

        var model = new this._modelClass($attributes);

        this.listenTo(model, Coco.Event.DESTROY, this.__onModelDestroy);
        this._models.push(model);
        this.trigger(Coco.Event.ADD, model, this);

        return model;
    },

    /**
     * Function: has
     * checks for existing model in collection.
     *
     * Parameter:
     * @param {Coco.Model} model    - An <Coco.Model> instance
     *
     * Return:
     * @returns {boolean}           - True if model is in Collection
     */
    has: function (model) {
        for (var i = 0; i < this._models.length; i++) {
            if (model.isEqual(this._models[i])) {
                return true;
            }
        }

        return false;
    },

    /**
     * Function: reset
     * Removes all models from the collection.
     *
     * Event:
     * Triggers <Coco.Event.REMOVE> event for each model that gets removed.
     *
     * Triggers <Coco.Event.RESET> event.
     *
     * Return:
     * @return {Coco.Collection}     - The <Coco.Collection> instance.
     */
    reset: function () {
        for (var i = 0; i < this._models.length; i++) {
            this.trigger(Coco.Event.REMOVE, this._models[i], this);
        }

        this._models = [];
        this.trigger(Coco.Event.RESET, this);

        return this;
    },

    /**
     * Function: remove
     * Removes one model.
     *
     * Parameter:
     * @param {Coco.Model}  model     - The instance of <Coco.Model> to remove.
     *
     * @param {boolean}     $silent   - If set to true the model won't trigger the <Coco.Event.REMOVE> event.
     *
     * Event:
     * Triggers <Coco.Event.REMOVE> event if $silent is not set to true.
     */
    remove: function (model, $silent) {
        for (var i = 0; i < this._models.length; i++) {
            if (model.isEqual(this._models[i])) {
                this.removeAt(i, $silent);
                break;
            }
        }
    },

    /**
     * Function: removeAt
     * Removes model at specific index position.
     *
     * Parameter:
     * @param {integer}     index    - The index position.
     *
     * @param {boolean}     $silent  - {optional} If set to true the model won't trigger the `remove` event.
     *
     * Event:
     * Triggers <Coco.Event.REMOVE> event if $silent is not set to true.
     */
    removeAt: function (index, $silent) {
        if (this._models.length > index) {
            var m = this._models.splice(index, 1);

            this.stopListening(m[0]);

            if ($silent !== true) {
                this.trigger(Coco.Event.REMOVE, m[0], this);
            }
        }
    },

    /**
     * Function: getAt
     * Gets model at specific index.
     *
     * Parameter:
     * @param {integer}  index  - The index position.
     *
     * Return:
     * @return {Coco.Model}     - The remove <Coco.Model> instance.
     */
    getAt: function (index) {
        if (index >= this._models.length || index < 0) {
            return null;
        }

        return this._models[index];
    },

    /**
     * Function: indexOf
     * Gets the index of a model.
     *
     * Parameter:
     * @param {Coco.Model}   model  - An <Coco.Model> instance
     *
     * Return:
     * @return {Number}             - The index of the <Coco.Model> instance.
     */
    indexOf: function (model) {
        for (var i = 0; i < this._models.length; i++) {
            if (model.isEqual(this._models[i])) {
                return i;
            }
        }

        return -1;
    },

    /**
     * Function: getAll
     * Gets all models as <Coco.Model> instances.
     *
     * Return:
     * @return {Array} - Array of <Coco.Model> instances.
     */
    getAll: function () {
        return this._models;
    },

    /**
     * Function: getAllAttributes
     * Gets all models. This returns an array of all attributes of all models, not the Coco.Model instances.
     * every model has its own entry
     *
     * Return:
     * @returns {Array} - Array of attributes of <Coco.Model> instances.
     */
    getAllAttributes: function () {
        var models = [];

        $.each(this._models, function (i, e) {
            // Add all attributes of current model
            models.push(e.getAttributes());
        });

        return models;
    },

    /**
     * Function: each
     * Iterates over all objects in the collection and executes a given callback function for every model.
     *
     * If the callback returns false, the each function breaks.
     *
     * Parameter:
     * @param {Function}    callback    - The method to execute for each model. Parameters are Coco.Model instance and index.
     */
    each: function (callback) {
        if(this._models == null) {
            return false;
        }
        for (var i = 0; i < this._models.length; i++) {
            if (callback(this._models[i], i) === false) {
                break;
            }
        }
    },

    /**
     * Function: push
     * Adds a model at the end of the collection.
     *
     * Parameter:
     * @param {Coco.Model}  model   - The <Coco.Model> instance to add.
     *
     * Event:
     * Triggers <Coco.Event.ADD> event
     */
    push: function (model) {
        if (model instanceof this._modelClass) {
            this._models.push(model);
            this.trigger(Coco.Event.ADD, model, this);
        }
    },

    /**
     * Function: pop
     * Removes and returns the last model from the collection.
     *
     * Return
     * @return {Coco.Model} - The removed <Coco.Model> instance.
     *
     * Event:
     * Triggers <Coco.Event.REMOVE> event
     */
    pop: function () {
        var model = this._models.pop();

        this.trigger(Coco.Event.REMOVE, model, this);

        return model;
    },

    /**
     * Function: unshift
     * Adds a model at the beginning of the collection.
     *
     * Parameter:
     * @param {Coco.Model}  model   - The <Coco.Model> instance to add.
     *
     * Event:
     * Triggers <Coco.Event.ADD> event
     */
    unshift: function (model) {
        if (model instanceof this._modelClass) {
            this._models.unshift(model);
            this.trigger(Coco.Event.ADD, model, this);
        }
    },

    /**
     * Function: shift
     * Removes and returns the first model from the collection.
     *
     * Return:
     * @return {Coco.Model} - The removed <Coco.Model> instance.
     *
     * Event:
     * Triggers <Coco.Event.REMOVE> event
     */
    shift: function () {
        var model = this._models.shift();

        this.trigger(Coco.Event.REMOVE, model, this);

        return model;
    },

    /**
     * Function: findBy
     * Finds models by given query object. The object contains attributes and their values and findBy will match this
     * against the collections models.
     *
     * Parameter:
     * @param {object}  query   - The object of attributes and values to look for in the collection.
     *
     * Return:
     * @return {Array}          - Array of matched <Coco.Model> instances.
     */
    findBy: function (query) {
        var models = [];
        var valid = false;

        $.each(this._models, function (i, e) {
            valid = true;

            $.each(query, function (key, value) {
                if (!e.has(key) || e.get(key) !== value) {
                    valid = false;

                    return false;
                }
            });

            if (valid) {
                models.push(e);
            }
        });

        return models;
    },

    /**
     * Function: findOneBy
     * Acts like findBy but returns the first matched model.
     *
     * Parameter:
     * @param {object}  query       - The object of attributes and values to look for in the collection.
     *
     * Return:
     * @return {Coco.Model|null}    - First matched <Coco.Model> instance of null.
     */
    findOneBy: function (query) {
        var model = null;
        var valid = false;

        $.each(this._models, function (i, e) {
            valid = true;

            $.each(query, function (key, value) {
                if (!e.has(key) || e.get(key) !== value) {
                    valid = false;

                    return false;
                }
            });

            if (valid) {
                model = e;

                return false;
            }
        });

        return model;
    },

    /**
     * Function: sortByProperty
     * sorts all models in collection by property
     *
     * Parameter:
     * @param {String }propertyName - name of property to sort on
     * @param {boolean} $descending - (optional) sort direction: descending (default) == true
     */
    sortByProperty: function (propertyName, $descending) {
        if ($descending == null) {
            $descending = true;
        }

        var val;

        this._models.sort(function (a, b) {
            if (a === b) {
                return 0;
            }

            if (a == null) {
                //b is not null
                return $descending ? 1 : -1;
            }

            if (b == null) {
                //a is not null
                return $descending ? -1 : 1;
            }

            if (a.get(propertyName) === b.get(propertyName)) {
                return 0;
            }

            if (a.get(propertyName) == null) {
                return $descending ? 1 : -1;
            }

            if (b.get(propertyName) == null) {
                return $descending ? -1 : 1;
            }

            //Log.debug("ascending? " + $descending + " " + a.get(propertyName) + "<" + b.get(propertyName));
            if (Coco.Math.isNumber(a.get(propertyName))) {
                val = parseFloat(a.get(propertyName)) < parseFloat(b.get(propertyName)) ? 1 : (parseFloat(a.get(propertyName)) === parseFloat(b.get(propertyName)) ? 0 : -1);
                return $descending ? val : (-1 * val);
            }

            val = a.get(propertyName) < b.get(propertyName) ? 1 : (a.get(propertyName) === b.get(propertyName) ? 0 : -1);

            return $descending ? val : (-1 * val);
        });
    },

    /**
     * Function: size
     * Returns the size of the collection.
     *
     * Return:
     * @return {integer} - The size of the collection.
     */
    size: function () {
        return this._models.length;
    },

    /**
     * Removes a model from the collection when it's destroyed.
     *
     * @param {Coco.Model}  model
     * @private
     */
    __onModelDestroy: function (model) {
        this.remove(model, true);
    },

    /**
     * Function: getId
     * Returns the internal id. Useful for comparison between different objects. If two object have the same id,
     * they are identical.
     *
     * Return:
     * @return {string} - The internal collection id.
     */
    getId: function () {
        return this.__id;
    },

    /**
     * Function: isEqual
     * Checks if two collections are the same
     *
     * Parameter:
     * @param {Coco.Collection} collection  - The <Coco.Collection> instance to compare
     *
     * Return:
     * @return {boolean}                    - True if both collections are the same instance, otherwise false.
     */
    isEqual: function (collection) {
        return this.__id === collection.getId();
    },

    /**
     * Function: destroy
     * Destroy the collection. Destroying the collection will remove and destroy
     * all attached models.
     */
    destroy: function () {
        this.trigger(Coco.Event.DESTROY, this);

        this.each(function (model) {
            // Destroy all models
            model.destroy();
        }.$bind(this));

        // Stop all remaining listeners
        this.stopListening();
    }
});;var Coco = Coco || {};

/**
 * Class: Coco.Model
 *
 * extends: <Coco.ServiceProvider>
 *
 * Description:
 * This class stores data and function to manipulate this data.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 *
 *     Events:
 *     <Coco.Event.ADD>:  callback(key, value, thisModel)             -        Triggered when and attribute has been added to the model
 *
 *     <Coco.Event.CHANGE>:  callback(newAttributes, thisModel, oldAttributes) -  Triggered when one attributes value has changed.
 *
 *     <Coco.Event.CHANGE_KEY>:  callback(newValue, thisModel, oldValue)   -   Triggered when a specific attributes value has changed.
 *
 *     <Coco.Event.INVALID>:  callback(returnOf_validate, thisModel)      -        Triggered when the models validation failed.
 *
 *     <Coco.Event.VALID>:  callback(thisModel)                         -        Triggered when the models validation passed.
 *
 *     <Coco.Event.DESTROY>:  callback(thisModel)                    -             Triggered before the model gets destroyed.
 */
Coco.Model = dejavu.Class.declare({
    $name: 'Model',

    $extends: Coco.ServiceProvider,

    /**
     * The internal model id.
     */
    __id: 0,

    /**
     * A private class identifier, copied from `this.$name`
     */
    __$name: "Model",

    /**
     * The current attributes of the model.
     *
     * @type {Object}
     */
    __attributes: {},

    /**
     * The status of the attributes on instantiation. Used to check if the model has changed since it was created.
     *
     * @type {Object}
     */
    __initialAttributes: null,

    /**
     * Hold probable validation error. You can retrieve this with `this.getValidationError()`. It's set internally by
     * the `this.isValid()` method.
     *
     * @type {Object}
     */
    __validationError: null,

    /**
     * Array of observers registered by the $observe flag on computed functions.
     */
    __observers: [],

    /**
     * Variable: _defaults
     *
     * Description:
     * The default attributes that are assigned to each new instance of the model.
     * Default values can be overwritten on instantiation.
     *
     * @type {Object}
     */
    _defaults: {},

    /**
     * Variable: _etherKeys
     *
     * Description:
     * The ether keys, that can be demanded by all Coco.View instances.
     *
     * @type {Array}
     */
    _etherKeys: [],

    /**
     * Constructor.
     * It should not be necessary to overwrite this method in your subclass.
     *
     * Parameter:
     * @param {Object} $attributes  -   {optional}  The attributes that are set to the models attributes on creation.
     */
    initialize: function ($attributes) {
        this.__$name = this.$name;
        this.__id = Coco.Utils.uniqueId("m");

        if($attributes != null) {
            for(var i in this._defaults) {

                // Check if the value of the attributes key is a function and if so, delete it (because we don't want to overwrite the computed properties)
                if(this._defaults.hasOwnProperty(i) && typeof this._defaults[i] === 'function' && $attributes.hasOwnProperty(i)) {
                    delete $attributes[i];
                }
            }
        }

        this.__attributes = $.extend({}, this._defaults, ($attributes != null) ? $attributes : {});
        this.__attributes = this.__setObservers(this.__attributes);
        this.__initialAttributes = $.extend({}, this.__attributes);
        this._setCollections();
        this._onInitialize();
    },

    /**
     * Function: _onInitialized
     *
     * Description:
     * Is called at the end of the initialize method and acts like the hook in <Coco.View>
     *
     * @protected
     */
    _onInitialize: function () {
    },

    /**
     * Function: _setCollections
     *
     * Description:
     * Overwrite this function in your model if you have collections inside the model. You need to set the default
     *
     * parameters with `new <Coco.Collection> ()` to ensure that a new collection is created.
     *
     * @protected
     */
    _setCollections: function () {
    },

    /**
     * Sets the observers and assigns the correct context to the computed properties functions.
     *
     * @param attributes
     * @returns {*}
     * @private
     */
    __setObservers: function (attributes) {
        for (var i in attributes) {
            if (attributes.hasOwnProperty(i) && typeof attributes[i] === 'function' && attributes[i].hasObservers) {
                attributes[i] = attributes[i].call(this, i, this.__observers);
            }
        }

        return attributes;
    },

    /**
     * We trigger the target attribute keys, when an observed attribute changed.
     *
     * @param attribute
     * @private
     */
    __triggerObservers: function (attribute) {
        for (var i in this.__observers) {
            if (this.__observers.hasOwnProperty(i) && this.__observers[i].attribute === attribute) {
                var newValue = this.get(this.__observers[i].target);

                if (newValue !== this.__observers[i].old) {
                    this.trigger(Coco.Event.CHANGE_KEY + this.__observers[i].target, newValue, this.__observers[i].old);
                    this.__observers[i].old = newValue;
                }
            }
        }
    },

    /**
     * Function: add
     * Adds a new key value pair(s) to the attributes. If key already exists, <Coco.Model.set> will be called instead.
     *
     * Parameter:
     * @param {string}  attribute   - The new attribute to add
     *
     * @param {*}       value       - The attributes value.
     *
     * Return:
     * @returns {Coco.Model}        - The <Coco.Model> instance.
     *
     * Event:
     * Triggers <Coco.Event.ADD> event if attribute did not exist before.
     */
    add: function (attribute, value) {
        var object = {};

        (typeof attribute === 'string') ? object[attribute] = value : object = attribute;

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                // Check for existing key in attributes
                if (!this.__attributes.hasOwnProperty(key)) {
                    // Key does not exist, so add it
                    this.__attributes[key] = object[key];

                    this.trigger(Coco.Event.ADD, key, object[key], this);
                }
                else {
                    // Key exists, set new value
                    this.set(key, object[key]);
                }
            }
        }

        return this;
    },

    /**
     * Function: set
     * Sets one or more attributes.
     *
     * Parameter:
     * @param {string|object}   attribute   - If a string is given, Coco will use this value as key, if object is given, Coco will overwrite all matched attributes of the object.
     *
     * @param {*}               $value      - {optional} The attributes value, if attribute is a string.
     *
     * Return:
     * @returns {Coco.Model}        - The <Coco.Model> instance.
     *
     * Event:
     * Triggers <Coco.Event.CHANGE> event.
     *
     * Triggers <Coco.Event.CHANGE_KEY> value on each changes attribute.
     */
    set: function (attribute, $value) {
        var object = {};
        var oldObject = $.extend(true, {}, this.__attributes);
        var changed = false;

        (typeof attribute === 'string') ? object[attribute] = $value : object = attribute;

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                this.__attributes[key] = object[key];

                // TODO: deep check for objects.
                if (object[key] !== oldObject[key]) {
                    changed = true;

                    // Throw special key changed event
                    this.trigger(Coco.Event.CHANGE_KEY + key, object[key], this, oldObject[key]);

                    // Trigger all dependent computed attributes when an observed attribute changed.
                    this.__triggerObservers(key);
                }
            }
        }

        if (changed) {
            // Throw default changed event
            this.trigger(Coco.Event.CHANGE, object, this, oldObject);
        }

        return this;
    },

    /**
     * Function: get
     * Gets a value by key. If no key is passed the whole object is returned. This can be also achieved by calling `this.getAll`.
     *
     * Parameter:
     * @param {string}      $attribute  - {optional} The key to return the value of
     *
     * @param {integer}     $castTo     - {optional} Parse the value to given type. Should refer to a constant from `Coco.Util`
     *
     * @param {boolean}     $fix        - {optional} If set to `true` the casted value will be saved to the attributes.
     *
     * Return:
     * @returns {*} - The value of the key.
     *
     * Event:
     * Triggers <Coco.Event.CHANGE> and <Coco.Event.Event_CHANGE_KEY> events, if $fix is set to true.
     */
    get: function ($attribute, $castTo, $fix) {
        if ($attribute == null) {
            // Return all attributes of this model
            var ret = {};

            for(var i in this.__attributes) {
                if(this.__attributes.hasOwnProperty(i)) {
                    ret[i] = (typeof this.__attributes[i] === 'function' && this.__attributes[i].hasObservers) ? this.__attributes[i]() : this.__attributes[i];
                }
            }

            return ret;
        }

        if ($castTo == null) {
            // Return value of given key
            if (this.__attributes.hasOwnProperty($attribute)) {
                // If value is a function, call it
                if (typeof this.__attributes[$attribute] === 'function') {
                    return this.__attributes[$attribute].call(this);
                }

                return this.__attributes[$attribute];
            }
            else {
                throw new Error("Tried to get '" + $attribute + "' in model '" + this.$name + "'. The key does not exist. Maybe you have a typo.");
            }
        }

        if ($fix == null) {
            return (this.__attributes.hasOwnProperty($attribute)) ? Coco.Utils.cast(this.__attributes[$attribute], $castTo, $attribute) : null;
        }

        if (this.__attributes.hasOwnProperty($attribute)) {
            // Save casted value into this attributes
            this.cast($attribute, $castTo);

            return this.__attributes[$attribute];
        }

        throw new Error("Tried to get '" + $attribute + "' in model '" + this.$name + "'. The key does not exist. Maybe you have a typo.");
    },

    /**
     * Function: boundGet
     * A bound variant of <Coco.Model.get>
     *
     * Parameter:
     * @param {string}      $key      - {optional} The key to return the value of
     * @param {integer}     $castTo   - {optional} Parse the value to given type. Should refer to a constant from `Coco.Util`
     * @param {boolean}     $fix      - {optional} If set to `true` the casted value will be saved to the attributes.
     *
     * Return:
     * @returns {*} - The value of the key
     */
    boundGet: function ($key, $castTo, $fix) {
        return this.get($key, $castTo, $fix);
    }.$bound(),

    /**
     * Function: getAttributes
     * Returns the attributes object.
     *
     * Return:
     * @returns {Object} - All attributes of the model instance.
     */
    getAttributes: function () {
        var attributes = {};
        var keys = this.getKeys();
        for(var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = this.get(key);
            if(value instanceof Coco.Model) {
                //resolve all Coco.Models
                value = value.getAttributes();
            }
            if(value instanceof Coco.Collection) {
                //resolve all Coco.Collections
                value = value.getAllAttributes();
            }
            if(value instanceof Array) {
                //search for Coco.Models within an array
                var val = [];
                for(var j = 0; j < value.length; j++) {
                    var innerValue = value[j];
                    if(innerValue instanceof Coco.Model) {
                        innerValue = innerValue.getAttributes();
                    }
                    if(innerValue instanceof Coco.Collection) {
                        innerValue = innerValue.getAllAttributes();
                    }
                    val.push(innerValue);
                }
                value = val;
            }
            attributes[key] = value;
        }
        return attributes;
    },

    /**
     * Function: getKeys
     * Returns all attribute keys as an array.
     *
     * Return:
     * @return {Array} - All attribute keys of the model instance as an Array.
     */
    getKeys: function () {
        // Check for ECMA5
        if (typeof Object.keys === "function") {
            return Object.keys(this.__attributes);
        }

        var keys = [];

        for (var k in this.__attributes) {
            if (this.__attributes.hasOwnProperty(k)) {
                keys.push(k);
            }
        }

        return keys;
    },

    /**
     * Function: has
     * Returns `true` if the value is defined, otherwise `false`.
     *
     * Parameter:
     * @param {string}      key       - The attribute to check for it's existence.
     *
     * @param {boolean}     $strict   - {optional} If set to true, also attributes with the value null will return false
     *
     * Return:
     * @return {boolean} - True if the key exists, otherwise false.
     */
    has: function (key, $strict) {
        if ($strict) {
            // Check also for defined value
            return (this.__attributes.hasOwnProperty(key) && this.__attributes[key] != null && this.__attributes[key].length !== 0);
        }

        // Check only for key
        return (this.__attributes.hasOwnProperty(key));
    },

    /**
     * Function: is
     * Checks if `key` is type of the parameter `type`.
     *
     * Parameter:
     * @param {string}       attribute - The models attribute to check
     * @param {integer}      type      - The type to check for. Should refer to a constant from `Coco.Util`
     *
     * Return:
     * @return {boolean}    True if the typed is matched, otherwise false.
     */
    is: function (attribute, type) {
        if (!this.__attributes.hasOwnProperty(attribute)) {
            return type === Coco.Utils.UNDEFINED;
        }

        var value = this.__attributes[attribute];

        switch (type) {
            case Coco.Utils.INTEGER:
                return (typeof value === 'number' && value % 1 == 0);

            case Coco.Utils.FLOAT:
                // Returns false, if we have an integer value or sth like this: 1.0
                return (typeof value === 'number' && value % 1 != 0);

            case Coco.Utils.STRING:
                return (typeof value === 'string');

            case Coco.Utils.ARRAY:
                return (value instanceof Array);

            case Coco.Utils.OBJECT:
                return (typeof value === 'object' && !(value instanceof Array));

            case Coco.Utils.NULL:
                return (value === null);

            default:
                return false;
        }
    },

    /**
     * Function: remove($key)
     * Removes a key from the model.
     *
     * Parameter:
     * @param {string}  key    -    The key to remove.
     */
    remove: function (key) {
        if(this.has(key)) {
            delete this.__attributes[key];
        }
    },

    /**
     * Function reset
     * Resets the attributes of a model to its defaults.
     *
     * Parameter:
     * @param {boolean} $toDefaults - {optional} if set to true the model will be reset with the `this._defaults` object.
     *
     * Event:
     * Triggers <Coco.Event.RESET> event.
     */
    reset: function ($toDefaults) {
        var collections = {};

        for (var i in this.__attributes) {
            if (this.__attributes.hasOwnProperty(i) && this.__attributes[i] instanceof Coco.Event) {
                collections[i] = this.__attributes[i].reset();
            }
        }

        if ($toDefaults) {
            this.__attributes = $.extend({}, this._defaults, collections);
            this.__initialAttributes = $.extend({}, this.__attributes);
        }
        else {
            this.__attributes = $.extend({}, this.__initialAttributes, collections);
        }

        this.trigger(Coco.Event.RESET);
    },

    /**
     * Function: cast
     * Casts a attributes value to given `type` and stores it to the attributes.
     *
     * Parameter:
     * @param {string}   attribute  - The attribute key
     * @param {integer}  type       - The type to cast to. Should refer to a constant from `Coco.Utils`
     *
     * Return:
     * @return {*} - The casted value of the attribute.
     *
     * Event:
     * See <Coco.Model.set> for information what events are triggered.
     */
    cast: function (attribute, type) {
        this.set(attribute, Coco.Utils.cast(this.get(attribute), type, attribute));

        return this.get(attribute);
    },

    /**
     * Function: isValid
     * Checks if model is valid by calling user specified `this._validate` function.
     *
     * Return:
     * @return {boolean}
     *
     * Event:
     * @event Triggers `invalid` if model validation failed, otherwise `valid`
     */
    isValid: function () {
        this.__validationError = null;
        var result = this._validate(this.getAttributes());

        if (result !== true) {
            this.__validationError = result;

            this.trigger(Coco.Event.INVALID, result, this);

            return false;
        }
        else {
            this.trigger(Coco.Event.VALID, this);
        }

        return true;
    },

    /**
     * Function: _validate
     * Is called by `this.isValid` from within the model. Return anything but `true` to indicate that the validation failed.
     *
     * Parameter:
     * @param {object}  attrs   - The attributes of the model
     *
     * Return:
     * @return {*}
     *
     * @protected
     */
    _validate: function (attrs) {
        return true;
    },

    /**
     * Function: getValidationError
     * Returns the validation errors.
     *
     * Return:
     * @return {null|Object}
     */
    getValidationError: function () {
        return this.__validationError;
    },

    /**
     * Function: getEtherKeys
     * Returns the ether keys.
     *
     * Return:
     * @return {Array}
     */
    getEtherKeys: function () {
        return this._etherKeys;
    },

    /**
     * Function: getId
     * Returns the internal id. Useful for comparison between different objects. If two object have the same id,
     * they are identical.
     *
     * Return:
     * @return {string}
     */
    getId: function () {
        return this.__id;
    },

    /**
     * Function: isEqual
     * Checks if two models are the same
     *
     * Parameter:
     * @param {Coco.Model} model - The <Coco.Model> instance
     *
     * Return:
     * @return {boolean} - True if both are equal.
     */
    isEqual: function (model) {
        return this.__id === model.getId();
    },

    /**
     * Function: destroy
     * Destroy the model
     */
    destroy: function () {
        this.trigger(Coco.Event.DESTROY, this);
        this.stopListening();
    }
});;var Coco = Coco || {};

/**
 * Class: Coco.RouterService
 *
 * extends: <Coco.Service>
 *
 * Description:
 * This class holds routing and history information to navigate through the app.
 * This class must be injected as a service into some major app controlling class.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.RouterService = dejavu.Class.declare({
    $name: 'RouterService',

    $extends: Coco.Service,

    $serviceId: 'router',

    /**
     * Holds the routing object, that defines routes and their corresponding views that should be shown.
     */
    __routes: {},

    /**
     * Holds the current route plus it's current mapped arguments.
     */
    __currentRoute: null,

    /**
     * If the hashchange event has been triggered, a next route will be determined that is stored here and copied to
     * __currentRoute after the views have been switched.
     */
    __nextRoute: null,

    /**
     * The path history to refer to for back and forth manipulation.
     */
    __pathHistory: [],

    /**
     * The current path history index.
     */
    __pathHistoryIndex: -1,

    initialize: function () {
        $(window).on('hashchange', this.__onRouteChanged.$bind(this));

        var self = this;

        /**
         * The syntax in the helper is e.g. "id:id, linkOne:someKeyInTheModel"
         * We split the string to a array of these key1:key2 pairs.
         *
         * In the for loop we then split the key1:key2 and add key1 as key to the parsedParams object and the value of
         * key2 as the key1 value.
         */
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

            return self.generateUrl(v1, parsedParams);
        });
    },

	setContainer: function($container) {
		this.$container = $container;
	},

    /**
     * Function: start($path)
     * Start the Routing.
     *
     * Parameter:
     * @param {string} $path    -   {optional} If a path is given, the routing starts with this path.
     */
    start: function ($path) {
        if($path == null) {
            $path = '/';
        }
        //only accept valid deeplinks!
        if(window.location.hash.length > 0 && this.__matchRoute(window.location.hash)) {
            $(window).trigger('hashchange');
        }
        else {
            window.location.hash = $path;
        }
    },

    /**
     * Function: addRoute(name, params)
     * Add a route.
     *
     * @param name   {string}   -   The name of the route.
     * @param params {object}   -   The params of the route (view object or constructor and path)
     */
    addRoute: function (name, params) {
        if(this.__routes.hasOwnProperty(name)) {
            throw new Error('Route "' + name + '" is already defined.');
        }

        this.__routes[name] = params;
    },

    /**
     * Function: generateUrl(route, $params)
     * Generate a url by a route name and optional arguments to fill the placeholders.
     *
     * Parameter:
     * @param {string} route    -   The route name
     * @param {object} $params  -   {optional}  A object of parameters for the given route
     */
    generateUrl: function (route, $params) {
        if(!this.__routes.hasOwnProperty(route)) {
            throw new Error('Route "' + route + '" does not exist.');
        }

        if($params) {
            var parts = this.__routes[route].path.slice(1).replace(/[()]/g, '').split('/');

            for(var i = 0; i < parts.length; i++) {
                if(parts[i].indexOf(':') === 0) {
	                if ( $params.hasOwnProperty(parts[i].substr(1))) {
                        parts[i] = $params[parts[i].substr(1)];
	                } else {
		                parts.splice(i, 1);
		                i--;
	                }
                }
            }

            parts.unshift('');
            return '#' + parts.join('/');
        }

        return this.__routes[route].path.replace(/\(.*\)/g, '');
    },

    /**
     * Function: getCurrentRoute()
     * Returns the current route object.
     *
     * Return:
     * @return {object} -   The current route object.
     */
    getCurrentRoute: function () {
        return this.__currentRoute;
    },

    /**
     * Function: setPath(path)
     * Set the new path programmatically.
     *
     * Parameter:
     * @param path {string} - The path the application should be set to.
     */
    setPath: function (path) {
        window.location.hash = path;
    },

    /**
     * Function: callPath(path)
     * Set the new path programmatically.
     *
     * Parameter:
     * @param route     {string}    - The route the application should be set to.
     * @param $params   {object}   - An object containing the parameters.
     */
    callRoute: function (route, $params) {
        window.location.hash = this.generateUrl(route, $params);
    },

    hasRoute: function (route) {
        return this.__routes.hasOwnProperty(route);
    },

    /**
     * Function history
     * returns array with historical path objects, without current path
     *
     * @params {Integer} steps - steps needed for history, -1 for whole history
     * @returns {Array}
     */
    history: function(steps, duplicates) {
        var history = [];
        if(steps == -1) {
            steps = this.__pathHistory.length - 1;
        }
        steps = Math.min(this.__pathHistory.length - 1, steps);
        var routes = [];
        var counter = 1;
        for(var i = this.__pathHistory.length - 2; i >= (this.__pathHistory.length - 1) - steps; i--) {
            var pHistory = this.__pathHistory[i];
            if(!duplicates) {
                if(routes.indexOf(pHistory) > -1) {
                    //no duplicates allowed
                    continue;
                }
            }
            routes.push(pHistory);
            //send steps back to reach this route
            var route = $.extend(true, {back: counter}, this.__getRoute(pHistory));
            counter++;
            history.unshift(route);
        };

        return history;
    },

    clearHistory: function() {
        this.__pathHistory = [];
        this.__pathHistoryIndex = -1;
    },

    /**
     * Function: goback()
     * Go back given steps in history, delete
     */
    goback: function (steps) {
        if(steps > 0 && steps < this.__pathHistory.length) {
            //drop current route
            var newPath = this.__pathHistory.pop();
            //drop previous routes
            while(steps > 0) {
                newPath = this.__pathHistory.pop();
                steps--;
            }
            this.__pathHistoryIndex = this.__pathHistory.length - 1;
            this.setPath(newPath);
        }
    },

    /**
     * Function: back()
     * Go back one step in history.
     */
    back: function () {
        if(this.__pathHistoryIndex > 0 && this.__pathHistoryIndex <= this.__pathHistory.length) {
            this.setPath(this.__pathHistory[--this.__pathHistoryIndex]);
        }
    },

    /**
     * Function: forward()
     * Go one step forward in history.
     */
    forward: function () {
        if(this.__pathHistoryIndex - 1 < this.__pathHistory.length) {
            this.setPath(this.__pathHistory[++this.__pathHistoryIndex]);
        }
    },

    /**
     * Function: go(steps)
     * Go a specified number of steps back or forth in history.
     *
     * Parameter:
     * @param {Number} steps    -   A signed integer indicating how many steps to go. Values below zero go back, values above go forth in History.
     */
    go: function (steps) {
        if(steps === 0) {
            return;
        }

        var i = this.__pathHistoryIndex += steps;

        if(i > 0 && i < this.__pathHistory.length) {
            window.location.hash = this.__pathHistory[i];
        }
    },

    /**
     * Adds the current hash value of the location to the pathHistory array.
     *
     * @param {string} path -   The path to add to the history.
     * @private
     */
    __pushPathToHistory: function (path) {
        this.__pathHistory.splice(++this.__pathHistoryIndex, (this.__pathHistory.length - this.__pathHistoryIndex), path);
    },

    /**
     * Callback for hashchange event. Tries to match a route.
     * If a route has been found this.__fireRoute will be called.
     *
     * @private
     */
    __onRouteChanged: function () {
        if(this.__matchRoute(window.location.hash)) {
            this.__fireRoute();
        }
    },

    /**
     * Tries to match a route by taken the given path and returns route object.
     *
     * @param  {string} path - The path from the current url
     * @return {boolean}
     * @private
     */
    __getRoute: function (path, duplicates) {
	    path = path.slice(2);
	    var pathParts = path.split('/'),
	        matched;

        var addedRoutes = [];
        for(var i in this.__routes) {
            if(this.__routes.hasOwnProperty(i)) {
	            var routeRegex = this.__convertToRegex(this.__routes[i].path.slice(1));
                matched = true;

                if (path.match(routeRegex) === null) {
	                matched = false;
                }

                if(matched) {
                    if(!duplicates) {
                        if(addedRoutes.indexOf[i] > -1) {
                            //no duplicates allowed
                            continue;
                        }
                    }
                    addedRoutes.push(i);

                    var routeParts = this.__routes[i].path.slice(1).replace(/[()]/g, '').split('/');

                    this.__mapArguments(pathParts, routeParts, this.__routes[i]);
                    //copy route object, add route label
                    var r = $.extend(true, {key: i}, this.__routes[i]);
                    //replace path variables
                    for(var parts = 0; parts < routeParts.length; parts++) {
                        r.path = r.path.replace(routeParts[parts], pathParts[parts]);
                    }

                    //delete view from route
                    delete r.view;
                    return r;
                }
            }
        }

        return null;
    },

    /**
     * Tries to match a route by taken the given path and returns boolean flag.
     *
     * @param  {string} path - The path from the current url
     * @return {boolean}
     * @private
     */
    __matchRoute: function (path) {
        path = path.slice(2);
		var pathParts = path.split('/'),
			matched;

        for(var i in this.__routes) {
            if(this.__routes.hasOwnProperty(i)) {
	            var routeRegex = this.__convertToRegex(this.__routes[i].path.slice(1));
                matched = true;

	            if (path.match(routeRegex) === null) {
		            matched = false;
	            }

	            if (matched) {
		            var routeParts = this.__routes[i].path.slice(1).replace(/[()]/g, '').split('/');
		            this.__nextRoute = this.__mapArguments(pathParts, routeParts, this.__routes[i]);

                    return true;
                }
            }
        }

        return false;
    },

	__convertToRegex: function(route) {
		var optionalParam = /\((.*?)\)/g;
		var namedParam    = /(\(\?)?:\w+/g;

		route = route.replace(optionalParam, '(?:$1)?')
			.replace(namedParam, function(match, optional) {
				return optional ? match : '([^/?]+)';
			});

		return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
	},

    /**
     * Maps the arguments from the hash path to the currently matched route.
     *
     * @param {Array} pathParts
     * @param {Array} routeParts
     * @param {Array} nextRoute
     * @private
     */
    __mapArguments: function (pathParts, routeParts, nextRoute) {
        var mode = 0;

        if(nextRoute.paramsAsObject != null && nextRoute.paramsAsObject) {
            mode = 1;
        }

        nextRoute.args = [];

        if(mode === 1) {
            nextRoute.args.push({});
        }

        for(var i = 0; i < routeParts.length; i++) {
            if(routeParts[i].indexOf(':') === 0) {
                if(!isNaN(pathParts[i])) {
                    pathParts[i] = Number(pathParts[i]);
                }

                if(mode === 0) {
                    nextRoute.args.push(pathParts[i]);
                }
                else {
                    nextRoute.args[0][routeParts[i].substring(1)] = pathParts[i];
                }
            }
        }

	    return nextRoute;
    },

    /**
     * Fires a route and executes the attached callback methods of the view that will be showed and the view that will
     * be hidden.
     *
     * @private
     */
    __fireRoute: function () {
        if(this.__currentRoute != null) {
            // The onPause method of a view can return a value that is pushed to the params to the next active view.
            this.__callRouteView(this.__currentRoute);
            this.__callRouteMethod(this.__currentRoute, 'onPause');
        }

        this.__callRouteView(this.__nextRoute);

        if(this.__nextRoute == null) {
            return;
        }

        if(this.__currentRoute != null) {
            this.trigger(Coco.Event.HIDE_VIEW);
            this.trigger(Coco.Event.HIDE_VIEW + this.__currentRoute.view.$name);

            // This is a hack. Actually `__isActive` is a private member that we can not change. Also this would not work
            // in dejavus strict mode.
            // TODO: FIX THIS FOR 1.0
            this.__currentRoute.view.__isActive = false;
        }

	    // This is a hack. Actually `__isActive` is a private member that we can not change. Also this would not work
	    // in dejavus strict mode.
	    // TODO: FIX THIS FOR 1.0
	    this.__nextRoute.view.__isActive = true;

        //call this AFTER deactivating current view, because current view can be also NEXT view - and so, all events are killed
        this.__callRouteMethod(this.__nextRoute, 'onActive');

	    if (this.__currentRoute && (this.__currentRoute.view.$name == this.__nextRoute.view.$name)) {
		    // If we navigate to the same view, don't add new route to history array
		    // Just replace the last one with new value
		    this.__pathHistory[this.__pathHistory.length - 1] = window.location.hash;
	    } else {
		    // Otherwise add new route path to history array
		    this.__pushPathToHistory(window.location.hash);
	    }

        this.trigger(Coco.Event.CHANGE_ROUTE, this.__nextRoute, this.__currentRoute);

        this.__currentRoute = $.extend({}, this.__nextRoute);

        this.__callRouteMethod(this.__nextRoute, 'onRenderedActive');

        this.__nextRoute = null;
    },

    /**
     * Calls the onActive or onPause callback of the view.
     *
     * @param {object} route    - The route object where the view lies in
     * @param {string} method   - The method of the view to call (onPause or onActive)
     */
    __callRouteView: function (route) {
        if(typeof route.view === 'function') {
            route.view = new route.view();
        }
    },

    __callRouteMethod : function(route, method) {
        if (method === 'onPause') {
            //deactivated views do not need any eventhandler!
            route.view.undelegateEvents();
            return route.view[method]();
        } else if (method === 'onActive') {
            //route.view.delegateEvents();
            return route.view[method].apply(route.view, this.__nextRoute.args);
        }
        else if(typeof route.view[method] === 'function') {
            route.view[method].apply(route.view, this.__nextRoute.args);
        }
    }

}).$service();;var Coco = Coco || {};

/**
 * Class: Coco.Router
 *
 * extends: <Coco.ServiceProvider>
 *
 * Description:
 * This class holds routing and history information to navigate through the app.
 * This class must be injected as a service into some major app controlling class.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.Router = dejavu.Class.declare({
    $name: 'Router',

    $extends: Coco.ServiceProvider,

    $inject: ['router'],

    __id: Coco.Utils.uniqueId("r"),

    /**
     * A jQuery element where the view gets appended to.
     */
    __$container: null,

    /**
     * Function: Constructor
     * Initialize the routing functionality of Coco.
     *
     * @param selector      {string}    -   A CSS selector to append the current views.
     * @param routing       {Object}    -   A object containing routing information.
     * @param $initialPath  {Object}    -   A optional $initialPath to start the application with. Defaults to '/'
     */
    initialize: function (selector, routing, $initialPath) {
        this.$super();

        this.listenTo(this.$services.router, Coco.Event.SHOW_VIEW, this.__onShowView);
        this.listenTo(this.$services.router, Coco.Event.HIDE_VIEW, this.__onHideView);

        this.__$container = $(selector);

	    this.$services.router.setContainer(this.__$container);

        // Copy the routing object to prevent any modification during application lifetime.
        this.__createRouting($.extend({}, routing), $initialPath);
    },

    /**
     * Adds the routing object to the routerService and starts the routing.
     *
     * @param routing
     * @param $initialPath
     * @private
     */
    __createRouting: function (routing, $initialPath) {
        for(var i in routing) {
            if(routing.hasOwnProperty(i)) {
                this.$services.router.addRoute(i, routing[i]);
            }
        }

        this.$services.router.start($initialPath);
    },

    /**
     * This function checks if the cached routing anchor is still in the DOM or has been removed or replaced during
     * the lifetime of the application.
     *
     * @returns {boolean}
     * @private
     */
    __isRoutingAnchorStillInDom: function () {
        return this.__$container.closest('body').length > 0;
    },

    /**
     * Reselect the routing anchor, if it has been replaced.
     *
     * @private
     */
    __reselectAnchor: function () {
        this.__$container = $(this.__$container.selector);
    },

    /**
     * Show the new view.
     *
     * @param $dom {Array} - {optional}   The dom of the view
     * @private
     */
    __onShowView: function ($dom) {
        if(!this.__isRoutingAnchorStillInDom()) {
            this.__reselectAnchor();
        }

        this.__$container.append($dom);

        window.scrollTo(0, 0);
    },

    /**
     * Hide the old view.
     *
     * @private
     */
    __onHideView: function () {
        if(!this.__isRoutingAnchorStillInDom()) {
            this.__reselectAnchor();
        }

        //this.__$container.empty();
    },

    /**
     * Function: getId
     * returns unique id of this ServiceProvider
     *
     * @returns {String}
     */
    getId: function () {
        return this.__id;
    }
});;/** @namespace **/
var Coco = Coco || {};

/**
 * Class: Coco.View
 *
 * extends <Coco.ServiceProvider>
 *
 * Description:
 * This class holds a template and a model or collection. It adds events to the view and holds their callbacks.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.View = dejavu.Class.declare({
    $name: 'View',

    $extends: Coco.ServiceProvider,

    $statics: {
        /**
         * A object or variable from the model declared as "ether" can be demanded as a read-only value by other
         * views to work with the value of a otherwise invisible model.
         *
         * Ether variables hold their origins and property name in the key of `this.$static.__etherStore` and
         * their method to fetch their value in the value of the `this.$static.__etherStore` object.
         */
        ether: {
            /**
             * All objects that you can demand.
             */
            __etherStore: {},

            /**
             * Function: _add
             * Adds ether attributes to the `this.__etherStore` object.
             *
             * Parameter:
             * @param {Coco.Model}  model   A <Coco.Model> instance
             * @protected
             */
            _add: function (model) {
                var etherObjects = {};
                var etherModel = model.getEtherKeys();

                for (var i = 0; i < etherModel.length; i++) {
                    etherObjects[model.$name + ":" + etherModel[i]] = model.boundGet;
                }

                this.__etherStore = $.extend(this.__etherStore, etherObjects);
            },

            /**
             * Function: get
             * Demands a ether object.
             * Returns undefined if nothing could be found.
             *
             * Parameter:
             * @param {string}  etherKey    A key of a ether attribute from a model
             * @return {*}
             */
            get: function (etherKey) {
                var property = etherKey.substr(etherKey.indexOf(':') + 1);
                var reg = new RegExp(etherKey, "ig");

                for (var key in this.__etherStore) {
                    if (this.__etherStore.hasOwnProperty(key)) {
                        if (reg.test(key) === true) {
                            // this.__etherStore[key] returns the .boundGet() method for given key of current model.
                            var value = this.__etherStore[key](property);

                            if (value instanceof Coco.Event) {
                                return value;
                            }
                            if (typeof value === 'object') {
                                //return object clone to protect original model
                                return $.extend({}, value);
                            }

                            return value;
                        }
                    }
                }

                return undefined;
            }
        }
    },

    /**
     * An array of service ids to inject needed services.
     */
    $inject: [],

    /**
     * The internal view id.
     *
     * @private
     */
    __id: null,

    /**
     * The compiled handlebar template or DOM.
     *
     * @private
     */
    __tpl: null,

    /**
     * Is set to true when view becomes active in the router.
     *
     * @private
     */
    __isActive: false,

    /**
     * A hash map of all attached child views of this view. Works similar to the `this._events` hash map. The only
     * difference is, that `this.__childViews` holds an array, because multiple child views could be attached to the same
     * selector.
     * Key is a selector within the scope of the parent views DOM segment.
     * Value is an instance of a valid Coco.View.
     *
     * Example:
     * {
     *      "div.anchor": [view1, view2],
     *      "div.anchor2: [view3]
     * }
     *
     * @private
     */
    __childViews: {},

    /**
     * Variable: _anchor
     * A CSS selector defining the block where the template gets appended to. If empty, the anchor will be a <div>.
     *
     * @protected
     */
    _anchor: '<div></div>',

    /**
     * Variable: _template
     * Path to a handlebars file (relative to web root) or an CSS selector to an existing DOM element.
     * If a path is given, Coco will set it to the id of the script tag, after the file has been loaded.
     *
     * @protected
     */
    _template: null,

    /**
     * Variable: _events
     * Developer defined jQuery events.
     *
     * jQuery Events are built like this: {"event selector": "callback"}
     *
     * Example:
     * {
     *      "click button": "callbackFunctionName"
     * }
     *
     * @protected
     */
    _events: {},

    /**
     * Variable: _options
     * options for current view
     */
    _options: {
        syncModelWithForm: false
    },

    /**
     * Variable: $el
     * A jQuery object holding the scope of the view in the DOM.
     */
    $el: null,

    /**
     * Variable: model
     * The attached <Coco.Model>.
     */
    model: null,

    /**
     * Variable: collection
     * The attached <Coco.Collection>.
     */
    collection: null,

    /**
     * Variable _eventsDelegated
     * @protected Flag to show if <Coco.View._events> are still delegated or not
     */
    _eventsDelegated: false,

    /**
     * Variable _firstRendered
     * @protected Flag to show if <Coco.View> is rendered once or never
     */
    _firstRendered: false,

    /**
     * Ctor.
     *
     * @param {Coco.Model|Coco.Collection}  $model                  Can be a new or existing model.
     * @param {Object}                      $syncModelWithForms     Override default options of view (optional).
     * @param {string}                      $template               Will override `this._template`
     */
    initialize: function ($model, $syncModelWithForms, $template) {
        this.$super();

        // Assign new id to the view object
        this.__id = Coco.Utils.uniqueId("v");

        var modelSet = false;

        // Set the model if given
        if ($model instanceof Coco.Model) {
            modelSet = true;
            this.setModel($model);
        }

        // Set the collection if given
        if ($model instanceof Coco.Collection) {
            modelSet = true;
            this.setCollection($model);
        }

        if ($model != null && !modelSet) {
            Log.error("Invalid model object! Coco.Model or Coco.Collection expected, given: " + $model);
        }

        // Extend the options
        this._options.syncModelWithForm = (null != $syncModelWithForms) ? $syncModelWithForms : false;

        // Set the template
        this._template = ($template != null) ? $template : this._template;

        // Call this._onInitialize before this.$el is set, to prevent any multiple rendering on initialization.
        this._onInitialize();

        if(this._getService('router') != null) {
            this.listenTo(this._getService('router'), Coco.Event.HIDE_VIEW + this.$name, this.showLoading.$bind(this));
        }

        // Create the html wrapper element.
        this.$el = $(this._anchor);
        this.$el.attr('data-coco', this.__id);

        this.__configure();

        // Check if template is handlebar template ...
        if (Coco.HbsLoader.isHandlebar(this._template)) {
            this.__parseTemplate();
            //this.render();
        }
        else if (this._template !== null) {
            // ... or css selector
            this.__tpl = Handlebars.compile($(this._template).html());
        }
        //we have a precompiled template
        if(this.__tpl != null) {
            //this.render();
            //this._onFirstRender();
        }
    },

    /**
     * Function: $(string selector)
     * A function that acts as a proxy for `jQuery.find` in the scope of the views DOM.
     *
     * Parameter:
     * @param {string} selector
     *
     * Return:
     * @return {jQuery|null}
     */
    $: function (selector) {
        if (this.$el === null) {
            throw new Error("$el of " + this.$name + " (" + this.getId() + ") is null. Please provide an _anchor.");
        }

        return this.$el.find(selector);
    },

    /**
     * Function: setModel(Coco.Model model)
     * Set the model if after `this.initialize` there is no model set.
     * It also copies the transferable objects to the $static segment of the view.
     *
     * Parameter:
     * @param {Coco.Model}  model  - A <Coco.Model> instance
     */
    setModel: function (model) {
        if (!(model instanceof Coco.Model)) {
            return;
        }

        if (this.model !== null) {
            this.stopListening(this.model);
            this.model.destroy();

            delete this.model;
        }

        this.model = model;

        Coco.View.ether._add(this.model);
    },

    /**
     * Function: setCollection(Coco.Collection collection)
     * Set the collection if after `this.initialize` there is no model set.
     * It also copies the transferable objects to the $static segment of the view.
     *
     * Parameter:
     * @param {Coco.Collection}     collection  - A <Coco.Collection> instance
     */
    setCollection: function (collection) {
        if (!(collection instanceof Coco.Collection)) {
            return;
        }

        if (this.collection !== null) {
            this.stopListening(this.collection);
            this.collection.destroy();

            delete this.collection;
        }

        this.collection = collection;

        this.collection.each(function (model) {
            Coco.View.ether._add(model);
        }.$bind(this));
    },

    /**
     * Function getModel()
     * Public getter for the model instance.
     *
     * Return:
     * @return Coco.Model - The current <Coco.Model> instance or null.
     */
    getModel: function () {
        return this.model;
    },

    /**
     * Function getCollection()
     * Public getter for the collection instance.
     *
     * Return:
     * @return Coco.Collection - The current <Coco.Collection> instance or null.
     */
    getCollection: function () {
        return this.collection;
    },

    /**
     * Function: _onInitialize()
     * Override these two functions to add anything you want to the init function.
     * This function is called at the end of the <Coco.View.initialize> function to prevent that subclasses of <Coco.View>
     * need to extend the <Coco.View.initialize> function and call this.$super.
     *
     * This method is called before the first time <Coco.View.render> is called, so you can attach events to the <Coco.Event.RENDER>
     * event.
     *
     * @protected
     */
    _onInitialize: function () {
    },

    /**
     * Function: _onFirstRender()
     * This method is called after everything has been rendered for the first time and after everything has been
     * initialized.
     *
     * @protected
     */
    _onFirstRender: function () {
    },

    onPreActive: function() {
        this.$el.attr('data-coco', this.__id);
    },

    /**
     * Function: onActive()
     * This method is called before the view gets appended to the DOM by the Router (Right after the ROUT_CHANGE event fired).
     * Implement this method if you want to do some business logic on this event.
     */
    onActive: function ($routerParameter) {
    },

    /**
     * Function: onPause()
     * This method is called before the view gets removed from the DOM by the Router (Right after the ROUT_CHANGE event fired).
     * Implement this method if you want to do some business logic on this event.
     */
    onPause: function () {
    },

    /**
     * Function: onRenderedActive()
     * This method is called after the view gets appended to the DOM by the Router.
     * Implement this method if you want to do some UI related stuff when the view gets active.
     */
    onRenderedActive: function () {
    },

    /**
     * Function: render()
     * Updates the view.
     *
     * Return:
     * @return Coco.View - The current <Coco.View> instance.
     */
    render: function() {
	    if (this.__tpl === null && this._template === null) {
		    return this;
	    }

	    var html = (typeof this.__tpl === 'function') ? this.__tpl(this._getHBSModel()) : this.__tpl;

	    this.$('> :first-child').detach();
	    this.$el.empty().append(html);

	    if (this.__isActive) {

		    // Empty/append ONLY IF the $el inside main container is not THE SAME
		    if(this._getService('router').$container.children().first()[0] != this.$el[0]) {
			    this._getService('router').$container.empty().append(this.$el);
		    }

		    this.hideLoading();
	    }


        if(this._firstRendered === false) {
            this._firstRendered = true;
            this._onFirstRender();
        }
        this.delegateEvents();
	    this.trigger(Coco.Event.RENDER);
	    this.trigger(Coco.Event.RENDER + this.$name);
    },

	/**
	 * Function: showLoading()
	 * Add 'loading' class to main container after 300ms of page loading
	 * This works for long AJAX request, not for pages with heavy rendering
	 */
	showLoading: function() {
		// Show loader only after delay
		// Because we don't want the pages to flash if the loading was really fast
		clearTimeout(window.loading_timeout);
		window.loading_timeout = setTimeout(function() {
			if (this._getService('router').$container) {
				this._getService('router').$container.addClass('loading');
			}
		}.$bind(this), 300);
	},

	/**
	 * Function: hideLoading()
	 */
	hideLoading: function() {
		clearTimeout(window.loading_timeout);
		setTimeout(function() {
			if (this._getService('router').$container) {
				this._getService('router').$container.removeClass('loading application-loading');
			}
		}.$bind(this), 10);

	},

    /**
     * Function: _getHBSModel()
     * creates the hbs model for this view, based on given <Coco.Model> objects
     *
     * @returns {object} - properties (array of all properties of all <Coco.Collection> models, or for one <Coco.Model>)
     *
     * @protected
     */
    _getHBSModel: function () {
        var props = {};

        //use only simple comparison, to catch null and undefined
        if (this.collection != null || this.model != null) {
            /**
             * The available properties when using a collection are models and length
             * @deprecated Will be removed on Jan 27 2014
             *
             * Use collection.models and collection.size instead of model and length.
             */
            if (this.collection != null && this.model != null) {
                Log.warn(this.$name + " collection AND model are set at once, but only one model can be used in template, collection will override model data!");
            }
            props = (this.collection == null) ? this.model.getAttributes() : {collection: {models: this.collection.getAllAttributes(), size: this.collection.size()}};
        }

        return props;
    },

    /**
     * Function: getDOM()
     * Returns the DOM of the view. Calling this function will always cause a render of this view.
     *
     * Return:
     * @return {*} - The DOM representation of the <Coco.View> instance.
     */
    getDOM: function () {
        this.render();

        return this.$el.get();
    },

    /**
     * Function: getCachedDOM()
     * Return the cached DOM of the view. Calling this function won't cause a render of the view.
     *
     * Return:
     * @returns {*}
     */
    getCachedDOM: function () {
        return this.$el.get();
    },

    /**
     * Function: remove(boolean removeAssoc)
     * Removes the view permanently.
     *
     * Parameter:
     * @param {boolean} removeAssoc   - If set to true, the associated model/collection will trigger it's destroy event.
     */
    remove: function (removeAssoc) {
        this.trigger(Coco.Event.DESTROY, this);

        if (removeAssoc && this.model !== null) {
            this.model.destroy();
            this.model = null;
        }

        if (removeAssoc && this.collection !== null) {
            this.collection.destroy();
            this.collection = null;
        }

        //stop listening jQuery events
        this.undelegateEvents();
        this.stopListening();
        this.removeAllChildViews();
    },

    /**
     * Renders the child views that are attached to the view.
     * This can be stopped because this method is an callback for the `render` event that is triggered by `this.render`.
     * This has the advantage that the need to re-render is propagated to each child view and it's child views, etc.
     *
     * @private
     */
    __renderChildViews: function () {
        for (var selector in this.__childViews) {
            if (this.__childViews.hasOwnProperty(selector)) {
                for (var i = 0; i < this.__childViews[selector].length; i++) {
                    this.$el.find(selector).append(this.__childViews[selector][i].getCachedDOM());
                }
            }
        }
    },

    /**
     * Function: addChildView(String selector, Coco.View view)
     * Add a child view to this view. Child views are attached again to it's parent view automatically, if `this.render`
     * was called by the parent view.
     *
     * Parameter:
     * @param {string}        selector      - Where to attach the child view
     *
     * @param {Coco.ChildView}     view     - An instance of a <Coco.View>
     *
     * @param {string|number} $strategy     - {optional} How should the child view be inserted? Valid values are "push" and "unshift".
     *
     * @param {boolean} $addToAllMatching   - {optional} If set to true child views will be added to all matching selector instead of the first.
     *
     * Return:
     * @returns {Coco.ChildView}
     */
    addChildView: function (selector, view, $strategy, $addToAllMatching) {
        if (!(view instanceof Coco.ChildView)) {
            throw new Error("View '" + view.$name + "' is not a instance of Coco.ChildView. To add the view as a child view extend from Coco.ChildView rather than from Coco.View");
        }

        if (!this.__childViews.hasOwnProperty(selector)) {
            this.__childViews[selector] = [];
        }

        if ($strategy && $strategy === 'unshift') {
            this.__childViews[selector].unshift(view);

            if ($addToAllMatching) {
                this.$el.find(selector).prepend(view.getDOM());
            }
            else {
                this.$el.find(selector).first().prepend(view.getDOM());
            }
        }
        else {
            this.__childViews[selector].push(view);

            if ($addToAllMatching) {
                this.$el.find(selector).append(view.getDOM());
            }
            else {
                this.$el.find(selector).first().append(view.getDOM());
            }
        }

        /**
         * Call child views _onFirstRender. Because this method is called after the first rendering, but has no effect
         * if the <Coco.View> instance is a child view, since it's only inserted into the DOM after the above line.
         * So we need to call the child views _onFirstRender again.
         */
        //view._onFirstRender();

        return view;
    },

    /**
     * Function: addChildViews
     * add multiple child views in one container to given childview container, its better to use this function for large data
     *
     * @param {string}        selector      - Where to attach the child view
     *
     * @param {Coco.ChildView}     view     - An instance of a <Coco.View>
     *
     * @param {string|number} $strategy     - {optional} How should the child view be inserted? Valid values are "push" and "unshift".
     *
     * @param {boolean} $addToAllMatching   - {optional} If set to true child views will be added to all matching selector instead of the first.
     *
     * @param {Coco.Collection} collection - <Coco.Collection> with models to create childviews from
     * @param {string} selector - CSS selector to add childviews
     * @param {class} view_definition - class of <Coco.View> to add
     */
    addChildViews: function (collection, selector, view_definition) {
        if (!(collection instanceof Coco.Collection)) {
            throw new Error("Collection '" + collection.$name + "' is not a instance of Coco.Collection.");
        }

        if (!this.__childViews.hasOwnProperty(selector)) {
            this.__childViews[selector] = [];
        }

        // Create virtual DOM element
        var $virtualElement = $(document.createDocumentFragment());

        // Append all childviews to it
        collection.each(function(model) {
            var view_instance = new view_definition(model);
            this.__childViews[selector].push(view_instance);

            $virtualElement.append(view_instance.getDOM());
        }.$bind(this));

        // Append virtual element to actual HTML
        this.$el.find(selector).first().append($virtualElement);
    },

    /**
     * Function: getChildViewsBySelector
     * Get all child views attached to the given selector.
     *
     * Parameter:
     * @param {string} selector - A CSS selector
     *
     * Return:
     * @return {Array} - Array of <Coco.View> instances or an empty array.
     */
    getChildViewsBySelector: function (selector) {
        var ret = this.__childViews[selector];

        return (ret instanceof Array) ? ret : [];
    },

    /**
     * Function: getChildViewById
     * Get a view by it's id.
     *
     * Parameter:
     * @param {string} viewId    - The view id to look for.
     *
     * Return:
     * @return {Coco.View} - The matched <Coco.View> instance or null.
     */
    getChildViewById: function (viewId) {
        for (var views in this.__childViews) {
            if (this.__childViews.hasOwnProperty(views)) {
                for (var i = 0; i < this.__childViews[views].length; i++) {
                    if (this.__childViews[views][i].getId() === viewId) {
                        return this.__childViews[views][i];
                    }
                }
            }
        }

        return null;
    },

    /**
     * Function: getChildViewByModelId
     * Get a view by it's attached model id.
     *
     * Parameter:
     * @param {string} modelId - The internal id of a <Coco.Model> instance.
     *
     * Return:
     * @return {Coco.View} - The matched <Coco.View> instance or null.
     */
    getChildViewByModelId: function (modelId) {
        for (var views in this.__childViews) {
            if (this.__childViews.hasOwnProperty(views)) {
                for (var i = 0; i < this.__childViews[views].length; i++) {
                    if (this.__childViews[views][i].model !== null && this.__childViews[views][i].model.getId() === modelId) {
                        return this.__childViews[views][i];
                    }
                }
            }
        }

        return null;
    },

    /**
     * Function: countChildViews
     *
     * @returns true or false if childview still exists
     */
    countChildViews: function() {
        for (var views in this.__childViews) {
            if (this.__childViews.hasOwnProperty(views)) {
                return this.__childViews[views].length;
            }
        }
        return 0;
    },

    /**
     * Function
     * Get the internal child views.
     *
     * @returns {Object} - The internal childViews object.
     */
    getChildViews: function () {
        return this.__childViews;
    },

    /**
     * Function: eachChildView
     * Iterate over all child views.
     *
     * @param {Function} callback   -   The callback function. Takes the view, the index, the selector and the index in the selector context.
     */
    eachChildView: function (callback) {
        var index = 0;

        for (var views in this.__childViews) {
            if (this.__childViews.hasOwnProperty(views)) {
                for (var i = 0; i < this.__childViews[views].length; i++) {
                    callback(this.__childViews[views][i], index++, views, i);
                }
            }
        }
    },

    /**
     * Function: removeChildView
     * Remove a child view from this view.
     *
     * @deprecated This will be removed on April 14, 2014.
     *
     * Parameter:
     * @param {Number|string|Coco.View} viewId        - The id of the view instance to remove.
     */
    removeChildView: function (viewId) {
        Log.warn("The use of Coco.View.removeChildView is deprecated and will be removed on April 14, 2014. Use Coco.View.removeChildViewById instead.");

        this.removeChildViewById(viewId);
    },

    /**
     * Function: removeChildViewById
     * Remove a child view from this parent view.
     *
     * Parameter:
     * @param {Number|string}   viewId        - The id of the view instance to remove.
     */
    removeChildViewById: function (viewId) {
        for (var views in this.__childViews) {
            if (this.__childViews.hasOwnProperty(views)) {
                for (var i = 0; i < this.__childViews[views].length; i++) {
                    if (this.__childViews[views][i].getId() === viewId) {
                        this.$('[data-coco="' + this.__childViews[views][i].getId() + '"]').remove();

                        this.__childViews[views][i].remove();
                        this.__childViews[views].splice(i, 1);

                        break;
                    }
                }
            }
        }
    },

    /**
     * Function: removeChildViewByModelId
     * Remove a child view from it's parent view by the model of the child view.
     *
     * Parameter:
     * @param {Number|string}   modelId         - The id of the model that the child view holds.
     */
    removeChildViewByModelId: function (modelId) {
        var view = this.getChildViewByModelId(modelId);

        if (view !== null) {
            this.removeChildViewById(view.getId());
        }
    },

    /**
     * Function: removeChildViewsBySelector
     * Removes all child views attached to the given selector.
     *
     * Parameter:
     * @param {string} selector      - The selector to remove all child views from.
     */
    removeChildViewsBySelector: function (selector) {
        if (!this.__childViews.hasOwnProperty(selector)) {
            return;
        }

        for (var i = 0; i < this.__childViews[selector].length; i++) {
            this.$('[data-coco="' + this.__childViews[selector][i].getId() + '"]').remove();

            this.__childViews[selector][i].remove();
        }

        this.__childViews[selector].splice(0, i);
    },

    /**
     * Function: removeAllChildViews
     * Removes all attached childViews.
     */
    removeAllChildViews: function () {
        for (var views in this.__childViews) {
            if (this.__childViews.hasOwnProperty(views)) {
                for (var i = 0; i < this.__childViews[views].length; i++) {
                    this.$('[data-coco="' + this.__childViews[views][i].getId() + '"]').remove();

                    this.__childViews[views][i].remove();
                }

                this.__childViews[views].splice(0, i);
            }
        }
    },

    /**
     * Parses the template if one is given.
     *
     * @private
     */
    __parseTemplate: function () {
        var handlebarId = this.__loadHandlebars();

        this._template = '#' + handlebarId;

        if (Coco.config.cacheHbs) {
            if (Coco.Cache.hasCachedHbs(handlebarId)) {
                this.__tpl = Coco.Cache.getCachedHbs(handlebarId);

                return;
            }

            this.__tpl = Handlebars.compile($(this._template).html());

            Coco.Cache.cacheHbs(handlebarId, this.__tpl);

            return;
        }

        this.__tpl = Handlebars.compile($(this._template).html());
    },

    /**
     * Configures the View based on the given options and sets the defined eventHandlers
     *
     * @private
     */
    __configure: function () {
        if (this.model !== null) {
            this.listenTo(this.model, Coco.Event.DESTROY, function () {
                this.stopListening(this.model);

                this.model = null;
            }.$bind(this));

            //this works only with 1 model
            if (this._options.syncModelWithForm) {
                this.$el.on('change', 'select, textarea, input', function (e) {
                    var $ele = $(e.target);

                    if (this.model.has($ele.prop('name'))) {
                        this.model.set($ele.prop('name'), $ele.val());
                    }
                }.$bind(this));
            }
        }

        this.listenTo(this, Coco.Event.RENDER, this.__renderChildViews);
    },

    /**
     * Load handlebar file into DOM.
     *
     * @param $callback     An optional callback to execute. If no callback is given, the AJAX request will be synchronous.
     * @return string       Returns the id attribute of the handlebar tag in the DOM without the '#'.
     * @private
     */
    __loadHandlebars: function ($callback) {
        if (!Coco.HbsLoader.isLoaded(this._template)) {
            return Coco.HbsLoader.parse(this._template, $callback);
        }

        return Coco.HbsLoader.getHbsId(Coco.HbsLoader.getFileName(this._template));
    },

    /**
     * Function: delegateEvents
     * Delegate the Events to jQuerys .on() method.
     * If no events passed as parameter it uses the <Coco.View._events> property of the view.
     *
     * Parameter:
     * @param $events   - {optional} An object of events, just like the views _events object.
     */
    delegateEvents: function ($events) {
        if ($events == null) {
            if (this._eventsDelegated) {
                //do not delegate events twice
                return;
            }

            this._eventsDelegated = true;
        }

        $events = ($events != null) ? $events : this._events;

        for (var key in $events) {
            if ($events.hasOwnProperty(key)) {
                var event = key.substr(0, key.indexOf(' '));
                var selector = key.substr(key.indexOf(' ') + 1);
                var callback = $events[key];

                if (undefined === this[callback]) {
                    throw new Error("The callback function '" + callback + "' does not exist in '" + this.$name + "'.");
                }

                this.$el.on(event, selector, this[callback].$bind(this));
            }
        }

        this.eachChildView(function (view) {
            view.delegateEvents();
        });
    },

    /**
     * Function: undelegateEvents
     * Removes all jQuery event handlers defined in <Coco.View._events>.
     *
     * Parameter:
     * @param $events   - {optional} An object of events, just like the views _events object.
     */
    undelegateEvents: function ($events) {
        if ($events == null) {
            this._eventsDelegated = false;
        }

        $events = ($events != null) ? $events : this._events;

        for (var key in $events) {
            if ($events.hasOwnProperty(key)) {
                var event = key.substr(0, key.indexOf(' '));
                var selector = key.substr(key.indexOf(' ') + 1);

                //remove evenhandler
                this.$el.off(event, selector);
            }
        }

        this.eachChildView(function (view) {
            view.undelegateEvents();
        });
    },


    /**
     * Function: animate
     * Shortcut for animating parts of the view via jQuery. Note that animations are saved until next rendering.
     *
     * Parameter:
     * @param {String} selector      - Which part should be animated
     *
     * @param {object} properties    - Which properties should be animated
     *
     * @param {Number} $duration     - {optional} An optional duration the animation takes. Default is 100
     *
     * @param {Function} $callback   - {optional} An optional callback to execute when the animation finished
     */
    animate: function (selector, properties, $duration, $callback) {
        $duration = (null != $duration) ? $duration : 100;

        this.$(selector).animate(properties, $duration, $callback);
    },

    /**
     * Function: css
     * Shortcut for restyle parts of the view via jQuery.
     *
     * Parameter:
     * @param {String} selector      - Which part should be changed
     *
     * @param {Object} properties    - Which properties should be changed
     */
    css: function (selector, properties) {
        this.$(selector).css(properties);
    },

    /**
     * Function: show
     * Display the views DOM.
     */
    show: function () {
        this.$el.show();
    },

    /**
     * Function: hide
     * Hide the views DOM.
     */
    hide: function () {
        this.$el.hide();
    },

    isActive: function () {
        return this.__isActive;
    },

    /**
     * Function: getId
     * Return the internal id. Useful for comparison between different objects. If two object have the same id,
     * they are identical.
     *
     * @returns {string} - The internal id of this instance.
     */
    getId: function () {
        return this.__id;
    },

    /**
     * Function: isEqual
     * Checks if two views are the same
     *
     * @param {Coco.View} view  - A <Coco.View> instance to compare.
     * @returns {boolean}   - True if both instances are the same, otherwise false.
     */
    isEqual: function (view) {
        return this.__id === view.getId();
    }
});;var Coco = Coco || {};

/**
 * Class: Coco.ChildView
 * This class holds a template and a model or collection. It adds events to the view and holds their callbacks.
 *
 * extends: <Coco.View>
 *
 * Description:
 * Extend from this class if your view will always be a child view. The only difference between Coco.View and
 * Coco.ChildView is that a child view does not call _onFirstRender on the initialize function.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.ChildView = dejavu.Class.declare({
    $name: 'ChildView',

    $extends: Coco.View,

    /**
     * Ctor.
     *
     * @param {Coco.Model|Coco.Collection}  $model                  Can be a new or existing model.
     * @param {Object}                      $syncModelWithForms     Override default options of view (optional).
     * @param {string}                      $template               Will override `this._template`
     */
    initialize: function ($model, $syncModelWithForms, $template) {
        this._injectServices();

        //kill service injection
        this._injectServices = null;

        // Assign new id to the view object
        this.__id = Coco.Utils.uniqueId("v");

        var modelSet = false;

        // Set the model if given
        if($model instanceof Coco.Model) {
            modelSet = true;
            this.setModel($model);
        }

        // Set the collection if given
        if ($model instanceof Coco.Collection) {
            modelSet = true;
            this.setCollection($model);
        }

        if($model != null && !modelSet) {
            Log.error("Invalid model object! Coco.Model or Coco.Collection expected, given: " + $model);
        }

        // Extend the options
        this._options.syncModelWithForm = (null != $syncModelWithForms) ? $syncModelWithForms : false;

        // Set the template
        this._template = (typeof $template !== 'undefined' && null !== $template) ? $template : this._template;

        // Call this._onInitialize before this.$el is set, to prevent any multiple rendering on initialization.
        this._onInitialize();

        // Create the html wrapper element.
        this.$el = $(this._anchor);
        this.$el.attr('data-coco', this.__id);

        this.__configure();

        // Check if template is handlebar template...
        // We don't render anything here. Since it's a child view, the Coco.View.getDom method is called in Coco.View.addChildView, which will cause the rendering.
        if (Coco.HbsLoader.isHandlebar(this._template)) {
            this.__parseTemplate();
        }
        else if (this._template !== null) {
            //... or css selector
            this.__tpl = $(this._template).html();
        }

        // Omit the this._onFirstRender() call.
    }
});;var Coco = Coco || {};
/**
 * Class: Coco.Cache
 *
 * (c) Johannes Klauss <johannes.klauss@3m5.de>
 *
 * created at 06.02.14
 */
Coco.Cache = dejavu.Class.declare({
    $name: 'Cache',

    $finals: {
        $statics: {
            /**
             * Function: cacheHbs(hbsId, hbs, $forceOverwrite)
             *
             * Description:
             * {final static} Cache a compiled hbs to the Coco cache.
             *
             * Parameter:
             * @param {string|number}   hbsId           - The id from the handlebar template retrieved from Coco.HbsLoader.
             * @param {function}        hbs             - The compiled handlebar function.
             * @param {boolean}         $forceOverwrite - optional, If set to true, the hbs will written to cache even if it already exists.
             */
            cacheHbs: function (hbsId, hbs, $forceOverwrite) {
                if(hbsId == null) {
                    throw new Error("There is no hbsId given in Coco.Cache.cacheHbs");
                }

                if(hbs != null) {
                    Coco.__CACHE__ = Coco.__CACHE__ || {};

                    Coco.__CACHE__.hbs = Coco.__CACHE__.hbs || {};

                    if($forceOverwrite || !Coco.__CACHE__.hbs.hasOwnProperty(hbsId)) {
                        Coco.__CACHE__.hbs[hbsId] = hbs;
                    }
                }
            },

            /**
             * Function: getCachedHbs(hbsId)
             *
             * Description:
             * {final static} Get a cached hbs from the Coco cache.
             *
             * @param {string|number}   hbsId   -   The hbsId that identifies the cached hbs.
             * @returns {Function|null}
             */
            getCachedHbs: function (hbsId) {
                if(hbsId == null) {
                    throw new Error("There is no hbsId given in Coco.Cache.getCachedHbs");
                }

                if(Coco.Cache.hasCachedHbs(hbsId)) {
                    return Coco.__CACHE__.hbs[hbsId];
                }

                return null;
            },

            /**
             * Function: hasCachedHbs(hbsId)
             *
             * Description:
             * {final static} Check if the cache contains a cached handlebar.
             *
             * @param {string|number}   hbsId   -   The hbsId that identifies the cached hbs.
             * @returns {boolean}
             */
            hasCachedHbs: function (hbsId) {
                if(hbsId == null) {
                    throw new Error("There is no hbsId given in Coco.Cache.hasCachedHbs");
                }

                return Coco.__CACHE__ && Coco.__CACHE__.hbs && Coco.__CACHE__.hbs[hbsId];
            }
        }
    }
});;var Coco = Coco || {};
Coco.Plugins = Coco.Plugins || {};
Coco.Plugins.event = Coco.Plugins.event || {};
/**
 * Package: Plugins.html
 *
 * Class: Coco.Plugins.event.Event
 *
 * Description:
 * Event class that will be dispatched by an <Coco.Plugins.event.EventDispatcher>.
 *
 * (c) 2014 3m5. Media GmbH
 */
'use strict';
Coco.Plugins.event.Event = dejavu.Class.declare({
    $name: "Event",

    /**
     * The event type.
     */
    type: null,

    /**
     * Ctor.
     *
     * Parameter:
     * @param {string}      type  - The event type
     *
     */
    initialize: function (type) {
        this.type = type;
    }

});;var Coco = Coco || {};
Coco.Plugins = Coco.Plugins || {};
Coco.Plugins.event = Coco.Plugins.event || {};
/**
 * Package: Plugins.html
 *
 * Class: Coco.Plugins.event.EventDispatcher
 *
 * Description:
 * Event dispatcher class for dispatching events to all java script classes.
 *
 * (c) 2014 3m5. Media GmbH
 */
'use strict';
Coco.Plugins.event.EventDispatcher = dejavu.Class.declare({
    $name: "EventDispatcher",

    $statics: {
        /**
         * Counter for the event listener handle.
         */
        __nextHandle: 0
    },

    /**
     * Private map of listeners.
     */
    __listeners: {},

    /**
     * Ctor.
     */
    initialize: function () {
    },

    /**
     * Function: addEventListener
     *
     * Adds an event listener to this class. Save the returned event listener handle for removing this listener again.
     *
     * Parameter:
     * @param {string}      eventType  - The event type to listen to
     *
     * @param {Function}    listener   - The event listener function
     *
     * @param {boolean}    $once       - Flag if the listener should only listen for first event
     *
     * Return:
     * @returns {number} listener handle for removing event listeners again
     */
    addEventListener : function(eventType, listener, $once) {
        if (eventType == null) {
            throw new Error("Missing eventType parameter in " + this.$name + ".addEventListener");
        }
        if (typeof eventType !== 'string') {
            throw new Error("Invalid eventType parameter in " + this.$name + ".addEventListener");
        }
        if (listener == null) {
            throw new Error("Missing listener parameter in " + this.$name + ".addEventListener");
        }
        if (typeof listener !== 'function') {
            throw new Error("Invalid listener parameter in " + this.$name + ".addEventListener");
        }

        // create unique handle
        var handle = Coco.Plugins.event.EventDispatcher.__nextHandle++;

        // create array of listeners if not exists yet
        if (!$.isArray(this.__listeners[eventType])) {
            this.__listeners[eventType] = [];
        }

        // create listener object
        var listenerObject = {
            handle : handle,
            listener : listener
        };
        if ($once) {
            listenerObject.once = true;
        }
        this.__listeners[eventType].push(listenerObject);

        return handle;
    },

    /**
     * Function: addOnceEventListener
     *
     * Adds an event listener to this class that will only be called on first event. Save the returned event listener handle for removing this listener again.
     *
     * Parameter:
     * @param {string}      eventType  - The event type to listen to
     *
     * @param {Function}    listener   - The event listener function
     *
     * Return:
     * @returns {number} listener handle for removing event listeners again
     */
    addOnceEventListener : function(eventType, listener) {
        return this.addEventListener(eventType, listener, true);
    },

    /**
     * Function: removeEventListener
     *
     * Removes an event listener from this class. If there is no such event listener the method does nothing.
     *
     * Parameter:
     * @param {string|number}  eventTypeOrHandle  - The event type to remove all event listeners for or the event handle to remove a specific event listener.
     */
    removeEventListener : function(eventTypeOrHandle) {
        if (eventTypeOrHandle == null) {
            throw new Error("Missing parameter in " + this.$name + ".removeEventListener");
        }
        if (typeof eventTypeOrHandle === 'string') {
            this.__removeEventListenerByEventType(eventTypeOrHandle);
        } else if (typeof eventTypeOrHandle === 'number') {
            this.__removeEventListenerByHandle(eventTypeOrHandle);
        } else {
            throw new Error("Invalid parameter in " + this.$name + ".removeEventListener");
        }
    },

    /**
     * Function: hasEventListener
     *
     * Checks if there is an event listener for the given event type.
     *
     * Parameter:
     * @param {string}  eventType  - The event type to check for event listeners.
     *
     * Return:
     * @returns {boolean} true if the event dispatcher has event listeners for the given event type
     */
    hasEventListener : function(eventType) {
        if (eventType == null) {
            throw new Error("Missing eventType parameter in " + this.$name + ".hasEventListener");
        }
        if (typeof eventType !== 'string') {
            throw new Error("Invalid eventType parameter in " + this.$name + ".hasEventListener");
        }

        return ($.isArray(this.__listeners[eventType]) && this.__listeners[eventType].length > 0);
    },

    /**
     * Function: __removeEventListenerByEventType
     *
     * Removes all event listener with for the given event type from this class.
     *
     * Parameter:
     * @param {string}  eventType  - The event type to remove all event listeners for.
     */
    __removeEventListenerByEventType : function(eventType) {
        // check if we have event listeners
        if (this.__listeners[eventType] == null || this.__listeners[eventType].length == 0) {
            return;
        }

        delete this.__listeners[eventType];
    },

    /**
     * Function: __removeEventListenerByHandle
     *
     * Removes an event listener with the given handle from this class.
     *
     * Parameter:
     * @param {number}  handle  - The event listener handle to remove.
     */
    __removeEventListenerByHandle : function(handle) {
        // iterate over all event types
        for (var eventType in this.__listeners) {
            var listeners = this.__listeners[eventType];

            // iterate over all listeners for this event type
            var i = -1;
            var foundHandle = false;
            while (++i < listeners.length) {
                var listener = listeners[i];
                if (listener.handle === handle) {
                    // found matching handle
                    listeners.splice(i, 1);
                    foundHandle = true;
                    break;
                }
            }

            // cleanup
            if (foundHandle) {
                if (listeners.length == 0) {
                    // remove listeners array
                    delete this.__listeners[eventType];
                }
                break;
            }
        }
    },

    /**
     * Function: dispatchEvent
     *
     * Dispatches an event to all event listeners. If there are no event listeners nothing happens.
     *
     * Parameter:
     * @param {Coco.Plugins.event.Event|string}      event  - The event type to dispatch. You can supply a string as shortcut when you don't want to pass any parameters to the event listener.
     */
    _dispatchEvent : function(event) {
        if (event == null) {
            throw new Error("Missing event parameter in " + this.$name + "._dispatchEvent");
        }

        // get event type
        var eventType = null;
        var hasEventParam = false;
        if (typeof event === 'string') {
            eventType = event;
        } else if (event instanceof Coco.Plugins.event.Event) {
            eventType = event.type;
            hasEventParam = true;
        } else {
            throw new Error("Unknown event parameter in " + this.$name + "._dispatchEvent. Must be string or Coco.Plugins.event.Event!");
        }

        // check if we have event listeners
        if (!this.hasEventListener(eventType)) {
            return;
        }
        var listeners = this.__listeners[eventType];

        // iterate over all event listeners
        var i = -1;
        while (++i < listeners.length) {
            if (hasEventParam) {
                // dispatch event
                listeners[i].listener(event);
            } else {
                // call listener without event as shortcut for "dispatchEvent('MYEVENT')"
                listeners[i].listener();
            }

            if (listeners[i].once) {
                // remove once listener
                listeners.splice(i, 1);
                i--;
            }
        }

        // check if we just removed the last once listener
        if (listeners.length == 0) {
            // ... and remove event type array from listeners map
            delete this.__listeners[eventType];
        }
    }
});;var Coco = Coco || {};
Coco.Plugins = Coco.Plugins || {};
Coco.Plugins.event = Coco.Plugins.event || {};
/**
 * Package: Plugins.html
 *
 * Class: Coco.Plugins.event.ModelEvent
 *
 * Description:
 * Event class that will be dispatched by for Events in <Coco.Model> or <Coco.Collection>.
 *
 * (c) 2014 3m5. Media GmbH
 */
'use strict';
Coco.Plugins.event.ModelEvent = dejavu.Class.declare({
    $name: "ModelEvent",
    $extends: Coco.Plugins.event.Event,

    $constants: {
        /**
         * Event: ADD
         * Called in <Coco.Collection> when a new <Coco.Model> has been added.
         */
        ADD: "Coco.ModelEvent.ADD",
        /**
         * Event: CHANGE
         * Called in <Coco.Model> if the attributes changed.
         */
        CHANGE: "Coco.ModelEvent.CHANGE",
        /**
         * Event: DESTROY
         * Called in <Coco.Model>, <Coco.Collection>  before instance gets destroyed.
         */
        DESTROY: "Coco.ModelEvent.DESTROY",
        /**
         * Event: INVALID
         * Called in <Coco.Model> if the validation of the model failed.
         */
        INVALID: "Coco.ModelEvent.INVALID",
        /**
         * Event: REMOVE
         * Called in <Coco.Collection> if a <Coco.Model> instance has been removed from the collection.
         */
        REMOVE: "Coco.ModelEvent.REMOVE",
        /**
         * Event: RESET
         * Called in <Coco.Collection> when the collection has been reset.
         */
        RESET: "Coco.ModelEvent.RESET",
        /**
         * Event: SORTED
         * Called in <Coco.Collection> when the collection has been sorted.
         */
        SORTED: "Coco.ModelEvent.SORTED",
        /**
         * Event: VALID
         * Called in <Coco.Model> when the validation of the model passed.
         */
        VALID: "Coco.ModelEvent.VALID"
    },

    /**
     * <Coco.Model> or <Coco.Collection> that dispatched this event.
     */
    model: null,
    /**
     * Key that has changed in case of an change event.
     */
    key: null,

    /**
     * Ctor.
     *
     * Parameter:
     * @param {Coco.Model|Coco.Collection}    model      - The <Coco.Model> or <Coco.Collection> that dispatched the event
     *
     * @param {string}                        $key       - {optional} The key in the <Coco.Collection> that has changed in case of an change event
     */
    initialize: function (model, $key) {
        if (model == null) {
            throw new Error("Missing model parameter in " + this.$name + ".initialize");
        }
        if (!(model instanceof Coco.Model || model instanceof Model.Collection)) {
            throw new Error("Invalid model parameter in " + this.$name + ".initialize. Must be Coco.Model or Coco.Collection!");
        }
        this.model = model;
        this.key = $key;
    }

});;var Coco = Coco || {};
Coco.Plugins = Coco.Plugins || {};
Coco.Plugins.event = Coco.Plugins.event || {};
/**
 * Package: Plugins.html
 *
 * Class: Coco.Plugins.event.ViewEvent
 *
 * Description:
 * Event class that will be dispatched by for Events in <Coco.View> or <Coco.ChildView>.
 *
 * (c) 2014 3m5. Media GmbH
 */
'use strict';
Coco.Plugins.event.ViewEvent = dejavu.Class.declare({
    $name: "ViewEvent",
    $extends: Coco.Plugins.event.Event,

    $constants: {
        /**
         * Event: DESTROY
         * Called in <Coco.View> before instance gets destroyed.
         */
        DESTROY: "Coco.ViewEvent.DESTROY",
        /**
         * Event: HIDE
         * Called in <Coco.RouterService> when the url changed.
         */
        HIDE: "Coco.ViewEvent.HIDE",
        /**
         * Event: SHOW
         * Called in <Coco.RouterService> when the url changed.
         */
        SHOW: "Coco.ViewEvent.SHOW"
    },

    /**
     * <Coco.View> that dispatched this event.
     */
    view: null,

    /**
     * Ctor.
     *
     * Parameter:
     * @param {<Coco.View>}  view      - The <Coco.View> that dispatched the event
     */
    initialize: function (view) {
        if (view == null) {
            throw new Error("Missing view parameter in " + this.$name + ".initialize");
        }
        if (!(model instanceof Coco.View)) {
            throw new Error("Invalid view parameter in " + this.$name + ".initialize. Must be Coco.View!");
        }
        this.view = view;
    }

});;var Coco = Coco || {};
Coco.Plugins = Coco.Plugins || {};
Coco.Plugins.html = Coco.Plugins.html || {};
/**
 * Package: Plugins.html
 *
 * Class: Coco.Plugins.html.HTMLLayerHelper
 *
 * Description:
 * helper class for HTMLLayer
 */
Coco.Plugins.html.HTMLLayerHelper = dejavu.Class.declare({
    $name: "HTMLLayerHelper",

    $statics: {

        protectedMails : null,

        /**
         * Function: protectEmailLinks
         *
         * {static} (auto called function) to protect all mail links of SPAM bots
         * links are identified by CSS class 'cocoMailProtection'
         *
         */
        protectEmailLinks : function() {
            this.protectedMails = new Coco.HashMap();

            $('.cocoMailProtection').each(function(index, value) {
                var uniqueID = "mailto:" + new Date().getTime() + "@g00gle.com";
                Coco.Plugins.html.HTMLLayerHelper.protectedMails.put(uniqueID, $(value).attr("href"));
                $(value).attr("href", uniqueID);
                $(value).html($(value).html().replace("@", "[at]"));
            });

            $('.cocoMailProtection').on("click", function(event) {
                var originalMail = Coco.Plugins.html.HTMLLayerHelper.protectedMails.getValue($(event.target).attr("href"));
                $(event.target).attr("href", originalMail);
            });
        },

        /**
         * Function: getAttributeValue
         *
         * get attributes from div layer
         *
         * Parameter:
         *
         * String id - id of layer
         * String attributeName - Name of Attribute
         * String type - type of the Attribute
         * Object defaultValue - defaultvalue, if attribute is not set
         *
         * Returns:
         * Object
         */
        getAttributeValue: function (id, attributeName, type, defaultValue) {
            var atr = $('#' + id).attr(attributeName);

            switch (type) {
                case Coco.Utils.BOOLEAN:
                    return (atr != undefined) ? atr === "true" : false;
                    break;
                case Coco.Utils.STRING:
                    return (atr != undefined) ? atr : "";
                    break;
                default:
                    return (atr != undefined) ? atr : defaultValue;
                    break;
            }
        },

        /**
         * Function: nl2br(string)
         *
         * replaces new line pattern '\n' by html linebreaks
         *
         * Parameter:
         * string - {String}
         *
         * @returns {String}
         */
        nl2br: function(value) {
            if(value == null) {
                return "";
            }
            if(value.lastIndexOf("\n") === value.length - 1) {
                value = value.substr(0, value.length - 1);
            }
            return value.replace(/\n/g, "<br/>");
        },

        /**
         * Function: setValue
         *
         * sets given value to given HTML object
         *
         * auto detects type of field for correct value setting
         *
         * Parameter:
         *
         * jQuery.HTMLObject - target field
         * String value - value to write
         */
        setValue: function (field, value) {
            if (field == null || field.size() === 0) {
                return;
            }

            switch (field.get(0).tagName) {
                default:
                    field.html(this.nl2br(value));
                    break;
                case "TEXTAREA":
                case "textarea":
                    field.html(value);
                    break;
                case "INPUT":
                case "input":
                    field.val(value);
                    break;
            }
        }
    }
});

$(document).ready(function(){
    Coco.Plugins.html.HTMLLayerHelper.protectEmailLinks();
});;var Coco = Coco || {};
Coco.Plugins = Coco.Plugins || {};
Coco.Plugins.html = Coco.Plugins.html || {};
/**
 * Package: Plugins.html
 *
 * Class: Coco.Plugins.html.LinkScrapper
 * v1.0
 *
 * Description:
 * LinkScrapper class for link scrapping like facebook
 *
 */
Coco.Plugins.html.LinkScrapper = dejavu.Class.declare({
    $name: "LinkScrapper",

    imgArrayCounter: null,

    tid: null,

    scrapeCache: null,

    urlActive: null,

    initialize: function () {
        this.imgArrayCounter = 0;
        this.scrapeCache = {};

        $('#scrapper_img_previous').hide();
        $('#scrapper_img_next').hide();

        $("#scrapper_img_next").click(function () {
            var url = $('#scrapper_img_next').attr('data-url');
            var data = this.scrapeCache[url];

            if (data == null) {
                return;
            }

            this.imgArrayCounter++;

            if (this.imgArrayCounter >= data.imgSrcArray.length) this.imgArrayCounter = 0;

            this.__setImage(url);
        }.$bind(this));

        $("#scrapper_img_previous").click(function () {
            var url = $('#scrapper_img_previous').attr('data-url');
            var data = this.scrapeCache[url];

            if (data == null) {
                return;
            }

            this.imgArrayCounter--;

            if (this.imgArrayCounter < 0) this.imgArrayCounter = data.imgSrcArray.length - 1;

            this.__setImage(url);
        }.$bind(this));

        $("#linkBox").on("keyup", function (event) {
            this.__abortTimer();

            this.tid = setTimeout(function () {
                var urlText = $(event.target).val();
                this.scrapeURL(urlText, null, null)
            }.$bind(this), 500);

            if (event.which == 13) {
                this.rows++
            }
        }.$bind(this));

        Log.debug("LinkScrapper initialized.");
    },

    /**
     * Function: applyCss
     *
     * apply default  css Classes
     *
     * Parameter:
     * @param scrapper_total_width : int - total width of scrapper table
     *
     * @param scrapper_image_width : int - maximum width of scrapped image
     *
     * @param scrapper_image_height : int - maximum height of scrapped image
     */
    applyCss: function (scrapper_total_width, scrapper_image_width, scrapper_image_height) {
        var linkBox_css = {
            'border': '1px solid #e2e2e2'
        };
        var scrapper_css = {
            'border': '1px solid #e2e2e2'
        };
        var scrapper_img_css = {
            'background-position': 'center',
            'background-color': 'white',
            'background-repeat': 'no-repeat',
            'background-size': 'contain'
        };
        var scrapper_img_count_css = {
            'font-size': '10px',
            'color': 'rgb(127,127,127)',
            'text-align': 'center'
        };
        var scrapper_text_holder_css = {
            'padding': '2px',
            'margin': '2px'
        };
        var scrapper_title_css = {
            'font-weight': 'bold',
            'font-size': '14px'
        };
        var linkScrapper_css = {
            'font': '12px Calibri'
        };
        var button_css = {
            'border': '1px solid  rgba(0, 0, 0, 0.5)',
            'cursor': 'pointer'
        };

        $('#linkScrapper').css(linkScrapper_css);
        $('#scrapper_img').css(scrapper_img_css).css('width', scrapper_image_width + 'px').css('height', scrapper_image_height + 'px').css("display", "table-cell").css("vertical-align", "middle").css("text-align", "center").css("overflow", "hidden");
        $('#scrapper_img img').css("max-width", scrapper_image_width).css("max-height", scrapper_image_height);
        $('#scrapper').css(scrapper_css).css('width', (scrapper_total_width + 3) + 'px');
        $('#scrapper_img_holder').css("width", scrapper_image_width + 10);
        $('#scrapper_img_count').css(scrapper_img_count_css);
        $('#scrapper_text_holder').css(scrapper_text_holder_css);
        $('#scrapper_title').css(scrapper_title_css);
        $('#prevPicButton').css(button_css);
        $('#nextPicButton').css(button_css);
        $('.linkBox').css(linkBox_css).css('width', scrapper_total_width + 'px');
    },

    /**
     * Function: scrapeURL
     *
     * scrapes given url
     *
     * Parameter:
     * @param urlText : String - url to scrape, stores scraped data on 'data' object, accepts urls starting with: http://, https://, www.
     *
     * @param callbackData : Function - callback after url was scraped successfully
     *
     * @param callbackImages : Function - callback after all images in scraped page were identified successfully
     */
    scrapeURL: function (urlText, callbackData, callbackImages) {
        var urlString;

        if (urlText.indexOf('http://') >= 0) {
            urlString = this.getUrl('http://', urlText);
        }
        else if (urlText.indexOf('https://') >= 0) {
            urlString = this.getUrl('https://', urlText);
        }
        else if (urlText.indexOf('www.') >= 0) {
            urlString = "http://" + this.getUrl('www.', urlText);
        }
        else {
            Log.info("LinkScrapper.scrapeULR - CANCELED: no url to scrape! " + urlText);

            return;
        }

        if (this.urlActive == null) {
            this.urlActive = urlString;
            this.__getUrlData(this.urlActive, callbackData, callbackImages);
        }
    },

    /**
     * cancel timer for loading data
     */
    __abortTimer: function () {
        if (null != this.tid) clearTimeout(this.tid)
    },

    /**
     * Function: getUrl
     *
     * Description:
     * gets url from given text
     *
     * Parameter:
     * @param {string} prefix - URL prefix, url has to starts with it
     *
     * @param {string}urlText - text to find url inside
     *
     * Return:
     * @returns {string} - found url
     */
    getUrl: function (prefix, urlText) {
        var urlString = '';
        var startIndex = urlText.indexOf(prefix);

        for (var i = startIndex; i < urlText.length; i++) {
            if (urlText[i] == ' ' || urlText[i] == '\n') {
                break;
            }
            else {
                urlString += urlText[i];
            }
        }

        return urlString
    },

    /**
     * @param urlString
     * @param callbackData
     * @param callbackImages
     */
    __getUrlData: function (urlString, callbackData, callbackImages) {
        Log.debug("LinkScrapper.getUrlData " + urlString + " ?");

        //do not scrape same url twice
        var data = this.scrapeCache[urlString];
        if (data != null) {
            this.__setSrapedData(urlString);

            if (callbackData != null) {
                callbackData(data);
            }

            if (callbackImages != null) {
                callbackImages(data);
            }

            this.urlActive = null;

            return;
        }

        $('#scrapper_loader').show();

        $.ajax({
            url: urlString,
            type: 'GET',
            error: function (jqXHR, textStatus, errorThrown) {
                this.urlActive = null;

                $('#scrapper_loader').hide();

                Log.error("LinkScrapper.getUrlData failed! " + textStatus);
                Log.debug("errorThrown: ", errorThrown);
                Log.logObject(jqXHR);
            }.$bind(this),
            success: function (res) {
                Log.debug("LinkScrapper: url successfully loaded! ", res);

                var data = {};
                var metaName;
                var metaProperty;
                var metaContent;
                var imgSrc;

                data.imgSrcArray = [];

                this.imgArrayCounter = 0;

                //parse content
                var htmlString = res.responseText;

                if (htmlString == null) {
                    //clear current cache
                    Log.debug("htmlString is null ", res);
                    this.scrapeCache[urlString] = null;
                    return;
                }

                var $htmlString = $(htmlString);
                var startIndex = htmlString.indexOf('<head>') + 6;
                var endIndex = htmlString.indexOf('</head>');
                var headerHTML = htmlString.substring(startIndex, endIndex);
                var $wrapper = $('<div />').html(headerHTML);
                var title = $("title", $wrapper).text();

                data.title = title;
                data.url = urlString;

                ($wrapper.find("meta")).each(function (index, domElement) {
                    metaName = $(domElement).attr('name');
                    metaProperty = $(domElement).attr('property');
                    metaContent = $(domElement).attr('content');

                    if (metaName == undefined) {
                        //check for images
                        if (metaContent != null && ((metaContent.indexOf("http://") > -1 || metaContent.indexOf("https://") > -1) && (metaContent.indexOf(".jpg") > -1 || metaContent.indexOf(".jpeg") > -1 || metaContent.indexOf(".png") > -1 || metaContent.indexOf(".gif") > -1))) {
                            metaName = "image";
                        }
                    }

                    if (metaName == 'description' || metaName == 'Description' || metaName == "og:description" || metaProperty == "og:description") {
                        //$('#scrapper_description').text(metaContent);
                        data.description = metaContent;
                    }

                    if (metaName == 'image' || metaName == 'Image' || metaProperty == "image" || metaProperty == "og:image"|| metaName == 'og:image' ) {
                        data.imgSrcArray.push(metaContent);
                    }
                }.$bind(this));

                this.scrapeCache[urlString] = data;
                this.urlActive = null;
                this.__setSrapedData(urlString);

                if (callbackData != null) {
                    callbackData(data);
                }

                /** trying to load all images */
                var alternativeImages = [];
                var alternativeImage = null;

                ($htmlString.find("img")).each(function (index, domElement) {
                    imgSrc = $(domElement).attr('src');

                    if (imgSrc != null && imgSrc.length > 0) {
                        //TODO only fill absolute urls at first, check other urls...
                        if (imgSrc.startsWith("//")) {
                            imgSrc = "http:" + imgSrc;
                        }
                        else if (imgSrc.startsWith("/")) {
                            //imgSrc = urlString + imgSrc
                            //TODO get host only
                            alternativeImage = urlString + imgSrc;
                        }

                        if (imgSrc.indexOf("http://") < 0 && imgSrc.indexOf("https://") < 0) {
                            //create correct url
                            if (urlString.endsWith("/")) {
                                alternativeImage = urlString + imgSrc;
                            }
                            else {
                                alternativeImage = urlString + "/" + imgSrc;
                            }

                            imgSrc = null;
                        }

                        //Log.debug("image found " + imgSrc);
                        //do not push same image more than once
                        if (alternativeImages.indexOf(alternativeImage) < 0 && alternativeImage != null) {
                            alternativeImages.push(alternativeImage);
                            alternativeImage = null;
                        }

                        if (data.imgSrcArray.indexOf(imgSrc) < 0 && imgSrc != null) {
                            data.imgSrcArray.push(imgSrc)
                        }
                    }
                }.$bind(this));

                this.__checkImages(urlString, alternativeImages, callbackImages);
                this.__setImage(urlString);
            }.$bind(this)
        })
    },

    /**
     *
     * @param urlString
     * @private
     */
    __setSrapedData: function (urlString) {
        var data = this.scrapeCache[urlString];

        $('#scrapper_loader').hide();

        Coco.Plugins.html.HTMLLayerHelper.setValue($('#scrapper_title'), data.title);
        Coco.Plugins.html.HTMLLayerHelper.setValue($('#scrapper_url'), urlString);
        Coco.Plugins.html.HTMLLayerHelper.setValue($('#scrapper_caption'), urlString.replace("http://", "").replace("https://", ""));

        if (data.description != null) {
            Coco.Plugins.html.HTMLLayerHelper.setValue($('#scrapper_description'), data.description);
        }
        else {
            Coco.Plugins.html.HTMLLayerHelper.setValue($('#scrapper_description'), '');
        }

        this.__setImage(urlString);
    },

    /**
     * checks image validation, adds valid images, drops invalid adresses
     * @param alternativeImages
     */
    __checkImages: function (urlString, alternativeImages, callbackImages) {
        var data = this.scrapeCache[urlString];

        if (data == null) {
            if (callbackImages != null) {
                callbackImages(data);
            }
            return;
        }

        if (alternativeImages == null || alternativeImages.length == 0) {
            if (callbackImages != null) {
                callbackImages(data);
            }
            return;
        }

        var img = alternativeImages[0];
        var image = new Image();

        image.onload = function () {
            if (data.imgSrcArray.indexOf(image.src) < 0) {
                data.imgSrcArray.push(image.src);
                this.__setImage(urlString);
            }

            if (alternativeImages.length > 1) {
                this.__checkImages(urlString, alternativeImages.slice(1, alternativeImages.length), callbackImages);
            }
            else {
                if (callbackImages != null) {
                    callbackImages();
                }
            }
        }.$bind(this);

        image.onerror = function () {
            if (alternativeImages.length > 1) {
                this.__checkImages(urlString, alternativeImages.slice(1, alternativeImages.length), callbackImages);
            }
            else if (callbackImages != null) {
                callbackImages();
            }
        }.$bind(this);

        //start loading
        image.src = img;
    },

    /**
     * sets current image and image navigation buttons
     */
    __setImage: function (urlString) {
        var data = this.scrapeCache[urlString];
        var img = $('#scrapper_img img');

        if (img == null || img.size() < 1) {
            $('#scrapper_img').html("<img />");

            img = $('#scrapper_img img');
        }

        img.attr('src', data.imgSrcArray[this.imgArrayCounter]);

        var scrapper = $('#scrapper_img_count');

        scrapper.find('.first').text(this.imgArrayCounter + 1);
        scrapper.find('.of').text(data.imgSrcArray.length);

        if (data.imgSrcArray.length > 1) {
            $('#scrapper_img_previous').attr('data-url', urlString);
            $('#scrapper_img_next').attr('data-url', urlString);
            $('#scrapper_img_previous').show();
            $('#scrapper_img_next').show();
        }
        else {
            $('#scrapper_img_previous').hide();
            $('#scrapper_img_next').hide();
        }
    }
});


;var Coco = Coco || {};
Coco.Plugins = Coco.Plugins || {};
Coco.Plugins.html = Coco.Plugins.html || {};
/**
 * Package: Plugins.html
 *
 * Class: Coco.Plugins.html.URLHelper
 *
 * Description:
 * Helper Class for URL activities like parsing etc.
 *
 * (c) 2013 3m5. Media GmbH
 */
'use strict';
Coco.Plugins.html.URLHelper = dejavu.Class.declare({
    $name: "URLHelper",

    initialize: function () {
        Log.debug(this.$name + ".initialized");
    },

    $finals: {
        $statics: {
            /**
             * Function: getUrlVars (static)
             *
             * Description:
             * {final static} parses current url for GET parameter
             *
             * Return:
             * @returns <Coco.HashMap> of given URL GET-Parameters
             */
            getUrlVars: function () {
                var vars = new Coco.HashMap();

                window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                    vars.put(key, value);
                });

                return vars;
            }
        }
    }
});;var Coco = Coco || {};
Coco.Plugins = Coco.Plugins || {};
Coco.Plugins.i18n = Coco.Plugins.i18n || {};

/**
 * Package: Plugins.i18n
 *
 * Class: Coco.Plugins.i18n.Translator
 *
 * Description:
 * This class stores messages per locale and domain and can be used to translate placeholders.
 *
 * @author Johannes Klauss <johannes.klauss@3m5.de>
 */
Coco.Plugins.i18n.Translator = dejavu.Class.declare({
    $name: "Translator",

    /**
     * All retrieved messages are stored in here.
     *
     * @private
     * @type {Object}
     */
    __messages: {},

    /**
     * The current locale.
     *
     * @private
     * @type {string}
     * @default
     */
    __locale: "de",

    /**
     * The current domain.
     *
     * @private
     * @type {string}
     * @default
     */
    __domain: "default",

    /**
     * Function: Constructor
     *
     * Description:
     * Initialize the Translator class.
     *
     * Parameter:
     * @param {string}    $locale  - The optional locale to translate, default is "de"
     *
     * @param {string}    $domain - The optional domain the message live in. Acts like a namespace, default is "default"
     */
    initialize: function ($locale, $domain) {
        if (typeof $locale !== 'undefined') {
            this.__locale = $locale;
        }

        if (typeof $domain !== 'undefined') {
            this.__domain = $domain;
        }
    },

    /**
     * Function: loadMessages
     *
     * Description:
     * Loads all messages from a json file synchronously by given path.
     *
     * Parameter:
     * @param {string}  path   -   The JSON file to load.
     * @param {string}  $locale -  (optional) If set the locale will be changed.
     * @param {string}  $domain -  (optional) If set the message will be added to given $domain.
     */
    loadMessages: function (path, $locale, $domain) {
        $.ajax({
            url: path,
            global: false,
            async: false,
            dataType: "json",
            success: function (data) {
                if(typeof data == "string") {
                    data = JSON.parse(data);
                }
                if (typeof $locale !== 'undefined') {
                    this.__locale = $locale;
                }

                if (typeof $domain !== 'undefined') {
                    this.__domain = $domain;
                }

                this.createDomain(this.__domain);
                this.fill(data);
            }.$bind(this)
        });
    },

    /**
     * Function: loadMessagesFromObject
     *
     * Description:
     * Load messages from a well formed object. Works like {@link loadMessages}, but takes the object instead of a
     * file path containing the objects.
     *
     * Parameter:
     * @param {object}  messages  -    The object containing the translations
     *
     * @param {string}  $locale   -    The optional locale to save to. If not set the current locale is assumed.
     * @param {string}  $domain   -    The optional domain to save to. If not set the current domain is assumed.
     */
    loadMessagesFromObject: function (messages, $locale, $domain) {
        if (typeof $locale !== 'undefined') {
            this.__locale = $locale;
        }

        if (typeof $domain !== 'undefined') {
            this.__domain = $domain;
        }

        this.createDomain(this.__domain);
        this.fill(messages);
    },

    /**
     * Function: get
     *
     * Description:
     * Get a message by key.
     *
     * Parameter:
     * @param {string}  key  -     The message to look for. Can be separated with points.
     * @param {object}  $replace - optional Object. If set the function will replace all matched keys of $replace in string with the proper value.
     *
     * Return:
     * @returns {string}
     */
    get: function (key, $replace) {
        var string = "";

        if (key.split('.').length > 1) {
            var array = this.__messages[this.__locale + ':' + this.__domain];

            $.each(key.split('.'), function (i, e) {
                if(array == null) {
                    Log.error("Could not find label with key: " + key);
                    return false;
                }
                array = array[e];
            });

            string = array;
        }
        else {
            string = this.__messages[this.__locale + ':' + this.__domain][key];
        }

        if (typeof $replace !== 'undefined') {
            $.each($replace, function (i, e) {
                var reg = new RegExp("%" + i + "%", "ig");

                string = string.replace(reg, e);
            });
        }

        return string;
    },

    /**
     * Function: getAll
     *
     * Description:
     * Get all messages of current domain.
     *
     * Parameter:
     * @param {boolean} $allDomains - (optional) If set to true, all messages of current locale of all domains will be returned.
     *
     * Return:
     * @returns {object} - returns the whole messages object for given domain and current iso
     */
    getAll: function ($allDomains) {
        if ($allDomains) {
            var msgs = {};
            for (var key in this.__messages) {
                if (this.__messages.hasOwnProperty(key)) {
                    if (key.startsWith(this.__locale)) {
                        msgs = $.extend(msgs, this.__messages[key]);
                    }
                }
            }
            return msgs;
        }

        return this.__messages[this.__locale + ':' + this.__domain];
    },

    /**
     * Function: has
     *
     * Description:
     * Check if a key exists in the current domain. This works only for the first level.
     *
     * Parameter:
     * @param {string}      key   -  The key to look for
     *
     * Return:
     * @returns {boolean}
     */
    has: function (key) {
        return this.__messages[this.__locale + ':' + this.__domain].hasOwnProperty(key);
    },

    /**
     * Function set
     *
     * Description:
     * Set a key with value. Also works if key did not exist before.
     *
     * Parameter:
     * @param {string}  key   -  The key to add.
     *
     * @param {string}  value -  The keys value.
     */
    set: function (key, value) {
        this.__messages[this.__locale + ':' + this.__domain][key] = value;
    },

    /**
     * Function add
     * calls <Coco.Translator.set>
     *
     * Parameter:
     * @param {string}  key   -  The key to add.
     *
     * @param {string}  value  - The keys value.
     */
    add: function (key, value) {
        this.set(key, value);
    },

    /**
     * Function: fill
     *
     * Description:
     * Fills a domain with messages.
     *
     * Parameter:
     * @param {object}  messages - The messages object.
     *
     * @param {boolean} $soft  - (optional)  If set to true already existing messages will not be overridden
     */
    fill: function (messages, $soft) {
        if ($soft) {
            this.__messages[this.__locale + ':' + this.__domain] = $.extend(messages, this.__messages[this.__domain]);
        }

        this.__messages[this.__locale + ':' + this.__domain] = messages;
    },

    /**
     * Function: hasDomain
     *
     * Description:
     * Check if the a given domain is set
     *
     * Parameter:
     * @param {string}      domain -   The domain to check for.
     *
     * Return:
     * @returns {boolean}
     */
    hasDomain: function (domain) {
        return this.__messages.hasOwnProperty(this.__locale + ':' + domain);
    },

    /**
     * Function: createDomain
     *
     * Description:
     * Create a domain.
     *
     * Parameter:
     * @param {string}  domain  -  The domain to create.
     *
     * @param {boolean} $force  - (optional)  If set to `true` the domain will overwrite a possible already existing domain with same name.
     */
    createDomain: function (domain, $force) {
        if ($force) {
            this.__messages[this.__locale + ':' + domain] = {};
        }
        else if (!this.hasDomain(domain)) {
            this.__messages[this.__locale + ':' + domain] = {};
        }
    },

    /**
     * Function: deleteDomain
     *
     * Description:
     * Delete a domain.
     * Parameter:
     * @param {string}  domain - The domain to delete.
     */
    deleteDomain: function (domain) {
        if (this.hasDomain(domain)) {
            delete this.__messages[this.__locale + ':' + domain];
        }
    },

    /**
     * Function: setLocale
     *
     * Description:
     * Set the locale.
     *
     * Parameter:
     * @param {string}  locale  -  The locale to set to.
     */
    setLocale: function (locale) {
        this.__locale = locale;
    },

    /**
     * Function: getLocale
     *
     * Description:
     * Get the locale.
     *
     * Return:
     * @returns {string} - current locale
     */
    getLocale: function () {
        return this.__locale;
    },

    /**
     * Function: setDomain
     *
     * Description:
     * Set the domain name to write to.
     *
     * Parameter:
     * @param {string}  domain  -  The domain to switch to.
     */
    setDomain: function (domain) {
        this.__domain = domain;
    },

    /**
     * Function: switchDomain
     *
     * Description:
     * Same as setDomain.
     *
     * Parameter:
     * @param {string}  domain    The domain to switch to.
     */
    switchDomain: function (domain) {
        this.setDomain(domain);
    },

    /**
     * Function: getDomain
     *
     * Description:
     * Get the currently active domain.
     *
     * Return:
     * @returns {string} - current domain
     */
    getDomain: function () {
        return this.__domain;
    },

    /**
     * Function: hasLocaleAndDomain
     *
     * Description:
     * Check if there are messages for locale and domain.
     *
     * Parameter:
     * @param {string}  locale   -     The locale to look for.
     *
     * @param {string}  domain   -     The domain to look for.
     *
     * Return:
     * @returns {boolean}
     */
    hasLocaleAndDomain: function (locale, domain) {
        return this.__messages.hasOwnProperty(locale + ':' + domain);
    }
});;var Coco = Coco || {};
/**
 * Class: .Coco
 * v0.9.91
 *
 * 3m5. Javascript SDK main class (Coco.Init)
 *
 * instantiates automatically on $(document).ready Event
 *
 * triggers <Coco.Event.INITIALIZED> Event on body when Coco is ready
 *
 * (c) 2014 3m5. Media GmbH
 */
Coco.Init = dejavu.Class.declare({
    $name: "Coco.Init",

    $statics: {
        version: "0.9.92",
        initialized: false,
        html: false,
        i18n: false
    },

    initialize: function () {
        Log.logWithDate = false;

        Log.debug("-------------------------------------------");
        Log.debug("Coco.js v" + this.$static.version);
        Log.debug("Handlebars v" + Handlebars.VERSION);
        Log.debug("jQuery v" + $().jquery);

        if (Coco.Plugins != null) {
            if (Coco.Plugins.html != null) {
                Log.debug("Detected Coco.Plugins.html");

                Coco.Init.html = true;
            }
            if (Coco.Plugins.i18n != null) {
                Log.debug("Detected Coco.Plugins.i18n");

                Coco.Init.i18n = true;
            }
        }

        Log.debug("-------------------------------------------");

        Log.logWithDate = true;

        $("body").trigger(Coco.Event.INITIALIZED);

        this.initialized = true;
    }
});

$(document).ready(function () {
    new Coco.Init();
});