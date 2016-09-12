// -----------------------------
// de._3m5.banner_ad.web.rest.PublicBannerRestServiceBase
// DO NOT MODIFY THIS FILE. IT IS GENERATED AND WILL BE OVERWRITTEN!
// (c) 06.01.2015 3m5. Media GmbH
// -----------------------------

var de__3m5_banner_ad_web_model_BannerData = require('../models/de._3m5.banner_ad.web.model.BannerData.js');

module.exports = dejavu.Class.declare({
    //unique service class
	$name: 'de._3m5.banner_ad.web.rest.PublicBannerRestServiceBase',
	$extends: Coco.BaseRestService,

	_restServicePath: '/banner_ad/pub',

    initialize: function () {
        this.$super();
        this._onInitialize();
    },

    /**
     * _onInitialize - override in child class
     * @protected
     */
    _onInitialize: function() {

    },
    
    /**
     * _defaultErrorHandler - override in child class if needed
     * @protected
     * @param {jqXHR} jqXHR
     * @param {String} textStatus
     * @param {String} errorThrown
     * @param {function(jqXHR, String, String)} customErrorHandler
     */
    _defaultErrorHandler: function(jqXHR, textStatus, errorThrown, customErrorHandler) {
    	try {
			customErrorHandler(jqXHR, textStatus, errorThrown);
		} catch (error) {
			console.warn(this.$name + "._defaultErrorHandler: no service error handler defined... ajax error called: " + textStatus);
		}
    },

    /**
     * getAdSpaceContentGET, instantiates & returns String
     *
     * @param {String} adSpacePubId (String) path parameter "adSpacePubId" with pattern "[a-f0-9\-]{36}"
     * @param {function(String, String, jqXHR)} onSuccess, success handler
     * @param {function(jqXHR, String, String)} onError, error handler
     */
    getAdSpaceContentGET: function(adSpacePubId, onSuccess, onError) {
        var replacePattern = [];
        replacePattern.push({name: 'adSpacePubId', pattern: '[a-f0-9\-]{36}', replacement: adSpacePubId});

        this._get('/{adSpacePubId: [a-f0-9\-]{36}}', replacePattern, { }, this.xhrFields, function(response, textStatus, jqXHR) {
            //call callback to map model
            this._onGetAdSpaceContentGETSuccess(response, textStatus, jqXHR, onSuccess);
        }.$bind(this), 
        function(jqXHR, textStatus, errorThrown) {
        	this._defaultErrorHandler(jqXHR, textStatus, errorThrown, onError);
        }.$bind(this)
        );
    },
    
    /**
     * success handler callback to return automatically mapped model,
     * override if mapping failed
     * @param {String} response
     * @param {String} textStatus
     * @param {jqXHR} jqXHR
     * @param {function(String, String, jqXHR)} onSuccess
     * @protected
     */
    _onGetAdSpaceContentGETSuccess: function(response, textStatus, jqXHR, onSuccess) {
        onSuccess(response, textStatus, jqXHR);
    }, 

    /**
     * getAdSpaceContentPreviewGET, instantiates & returns String
     *
     * @param {String} adSpacePubId (String) path parameter "adSpacePubId" with pattern "[a-f0-9\-]{36}"
     * @param {function(String, String, jqXHR)} onSuccess, success handler
     * @param {function(jqXHR, String, String)} onError, error handler
     */
    getAdSpaceContentPreviewGET: function(adSpacePubId, onSuccess, onError) {
        var replacePattern = [];
        replacePattern.push({name: 'adSpacePubId', pattern: '[a-f0-9\-]{36}', replacement: adSpacePubId});

        this._get('/{adSpacePubId: [a-f0-9\-]{36}}/preview', replacePattern, { }, this.xhrFields, function(response, textStatus, jqXHR) {
            //call callback to map model
            this._onGetAdSpaceContentPreviewGETSuccess(response, textStatus, jqXHR, onSuccess);
        }.$bind(this), 
        function(jqXHR, textStatus, errorThrown) {
        	this._defaultErrorHandler(jqXHR, textStatus, errorThrown, onError);
        }.$bind(this)
        );
    },
    
    /**
     * success handler callback to return automatically mapped model,
     * override if mapping failed
     * @param {String} response
     * @param {String} textStatus
     * @param {jqXHR} jqXHR
     * @param {function(String, String, jqXHR)} onSuccess
     * @protected
     */
    _onGetAdSpaceContentPreviewGETSuccess: function(response, textStatus, jqXHR, onSuccess) {
        onSuccess(response, textStatus, jqXHR);
    }, 

    /**
     * getAdSpaceDataGET, instantiates & returns de__3m5_banner_ad_web_model_BannerData
     *
     * @param {String} adSpacePubId (String) path parameter "adSpacePubId" with pattern "[a-f0-9\-]{36}"
     * @param {function(de__3m5_banner_ad_web_model_BannerData, String, jqXHR)} onSuccess, success handler
     * @param {function(jqXHR, String, String)} onError, error handler
     */
    getAdSpaceDataGET: function(adSpacePubId, onSuccess, onError) {
        var replacePattern = [];
        replacePattern.push({name: 'adSpacePubId', pattern: '[a-f0-9\-]{36}', replacement: adSpacePubId});
        console.log("getAdSpaceDataGET - ", this.xhrFields);

        this._get('/{adSpacePubId: [a-f0-9\-]{36}}/data', replacePattern, { }, this.xhrFields, function(response, textStatus, jqXHR) {
            //call callback to map model
            this._onGetAdSpaceDataGETSuccess(response, textStatus, jqXHR, onSuccess);
        }.$bind(this), 
        function(jqXHR, textStatus, errorThrown) {
        	this._defaultErrorHandler(jqXHR, textStatus, errorThrown, onError);
        }.$bind(this)
        );
    },
    
    /**
     * success handler callback to return automatically mapped model,
     * override if mapping failed
     * @param {de__3m5_banner_ad_web_model_BannerData} response
     * @param {String} textStatus
     * @param {jqXHR} jqXHR
     * @param {function(de__3m5_banner_ad_web_model_BannerData, String, jqXHR)} onSuccess
     * @protected
     */
    _onGetAdSpaceDataGETSuccess: function(response, textStatus, jqXHR, onSuccess) {
        onSuccess(new de__3m5_banner_ad_web_model_BannerData(response), textStatus, jqXHR);
    }, 

    /**
     * getAdSpaceFallbackImageGET, instantiates & returns String (base64 encoded byte array)
     *
     * @param {String} adSpacePubId (String) path parameter "adSpacePubId" with pattern "[a-f0-9\-]{36}"
     * @param {function(String, String, jqXHR)} onSuccess, success handler
     * @param {function(jqXHR, String, String)} onError, error handler
     */
    getAdSpaceFallbackImageGET: function(adSpacePubId, onSuccess, onError) {
        var replacePattern = [];
        replacePattern.push({name: 'adSpacePubId', pattern: '[a-f0-9\-]{36}', replacement: adSpacePubId});

        this._get('/{adSpacePubId: [a-f0-9\-]{36}}/image', replacePattern, { }, this.xhrFields, function(response, textStatus, jqXHR) {
            //call callback to map model
            this._onGetAdSpaceFallbackImageGETSuccess(response, textStatus, jqXHR, onSuccess);
        }.$bind(this), 
        function(jqXHR, textStatus, errorThrown) {
        	this._defaultErrorHandler(jqXHR, textStatus, errorThrown, onError);
        }.$bind(this)
        );
    },
    
    /**
     * success handler callback to return automatically mapped model,
     * override if mapping failed
     * @param {String} response
     * @param {String} textStatus
     * @param {jqXHR} jqXHR
     * @param {function(String, String, jqXHR)} onSuccess
     * @protected
     */
    _onGetAdSpaceFallbackImageGETSuccess: function(response, textStatus, jqXHR, onSuccess) {
        onSuccess(response, textStatus, jqXHR);
    }, 

    /**
     * getAdSpaceLocationGET, instantiates & returns void
     *
     * @param {String} adSpacePubId (String) path parameter "adSpacePubId" with pattern "[a-f0-9\-]{36}"
     * @param {function(Object, String, jqXHR)} onSuccess, success handler
     * @param {function(jqXHR, String, String)} onError, error handler
     */
    getAdSpaceLocationGET: function(adSpacePubId, onSuccess, onError) {
        var replacePattern = [];
        replacePattern.push({name: 'adSpacePubId', pattern: '[a-f0-9\-]{36}', replacement: adSpacePubId});

        this._get('/{adSpacePubId: [a-f0-9\-]{36}}/click', replacePattern, { }, this.xhrFields, function(response, textStatus, jqXHR) {
            //call callback to map model
            this._onGetAdSpaceLocationGETSuccess(response, textStatus, jqXHR, onSuccess);
        }.$bind(this), 
        function(jqXHR, textStatus, errorThrown) {
        	this._defaultErrorHandler(jqXHR, textStatus, errorThrown, onError);
        }.$bind(this)
        );
    },
    
    /**
     * success handler callback to return automatically mapped model,
     * override if mapping failed
     * @param {Object} response
     * @param {String} textStatus
     * @param {jqXHR} jqXHR
     * @param {function(Object, String, jqXHR)} onSuccess
     * @protected
     */
    _onGetAdSpaceLocationGETSuccess: function(response, textStatus, jqXHR, onSuccess) {
        onSuccess(response, textStatus, jqXHR);
    }, 

    /**
     * getAdSpaceLocationPreviewGET, instantiates & returns void
     *
     * @param {String} adSpacePubId (String) path parameter "adSpacePubId" with pattern "[a-f0-9\-]{36}"
     * @param {function(Object, String, jqXHR)} onSuccess, success handler
     * @param {function(jqXHR, String, String)} onError, error handler
     */
    getAdSpaceLocationPreviewGET: function(adSpacePubId, onSuccess, onError) {
        var replacePattern = [];
        replacePattern.push({name: 'adSpacePubId', pattern: '[a-f0-9\-]{36}', replacement: adSpacePubId});

        this._get('/{adSpacePubId: [a-f0-9\-]{36}}/click/preview', replacePattern, { }, this.xhrFields, function(response, textStatus, jqXHR) {
            //call callback to map model
            this._onGetAdSpaceLocationPreviewGETSuccess(response, textStatus, jqXHR, onSuccess);
        }.$bind(this), 
        function(jqXHR, textStatus, errorThrown) {
        	this._defaultErrorHandler(jqXHR, textStatus, errorThrown, onError);
        }.$bind(this)
        );
    },
    
    /**
     * success handler callback to return automatically mapped model,
     * override if mapping failed
     * @param {Object} response
     * @param {String} textStatus
     * @param {jqXHR} jqXHR
     * @param {function(Object, String, jqXHR)} onSuccess
     * @protected
     */
    _onGetAdSpaceLocationPreviewGETSuccess: function(response, textStatus, jqXHR, onSuccess) {
        onSuccess(response, textStatus, jqXHR);
    }


});

