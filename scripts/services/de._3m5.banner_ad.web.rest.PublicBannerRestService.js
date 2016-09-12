// -----------------------------
// de._3m5.banner_ad.web.rest.PublicBannerRestService
// -----------------------------

var de__3m5_banner_ad_web_rest_PublicBannerRestServiceBase = require('./base/de._3m5.banner_ad.web.rest.PublicBannerRestServiceBase.js');

dejavu.Class.declare({
    //unique service class
	$name: 'de._3m5.banner_ad.web.rest.PublicBannerRestService',
	$extends: de__3m5_banner_ad_web_rest_PublicBannerRestServiceBase,

	$serviceId: 'PublicBannerRestService',

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
            console.error(this.$serviceId + ": Could not load AdSpaceData ", jqXHR);
        }
    },

    _onInitialize: function() {
        //disable CORS via xhr, change it if you want
    }

}).$service();