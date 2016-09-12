// -----------------------------
// de._3m5.banner_ad.web.model.BannerDataBase
// DO NOT MODIFY THIS FILE. IT IS GENERATED AND WILL BE OVERWRITTEN!
// (c) 06.01.2015 3m5. Media GmbH
// -----------------------------


module.exports = dejavu.Class.declare({
	$name: 'de._3m5.banner_ad.web.model.BannerDataBase',
	$extends: Coco.Model,

	_defaults: {
        /** @type String bannerData (String (base64 encoded byte array)) */
        bannerData: null,
        /** @type Number height (Integer) */
        height: null,
        /** @type String linkUrl (String) */
        linkUrl: null,
        /** @type String templateData (String (base64 encoded byte array)) */
        templateData: null,
        /** @type Number width (Integer) */
        width: null
    },
    
	//initialize complex properties
	_setCollections: function() {    	
	},

    /**
     * getBannerData, returns the property bannerData
     * 
     * @returns {String} (String (base64 encoded byte array))
     */
    getBannerData: function() {
        return this.get("bannerData");
    },

    /**
     * setBannerData, sets the property bannerData 
     * 
     * @param {String} newValue (String (base64 encoded byte array))
     */
    setBannerData: function(newValue) {
        this.set("bannerData", newValue);
    }, 
    
    /**
     * getHeight, returns the property height
     * 
     * @returns {Number} (Integer)
     */
    getHeight: function() {
        return this.get("height");
    },

    /**
     * setHeight, sets the property height 
     * 
     * @param {Number} newValue (Integer)
     */
    setHeight: function(newValue) {
        this.set("height", newValue);
    }, 
    
    /**
     * getLinkUrl, returns the property linkUrl
     * 
     * @returns {String} (String)
     */
    getLinkUrl: function() {
        return this.get("linkUrl");
    },

    /**
     * setLinkUrl, sets the property linkUrl 
     * 
     * @param {String} newValue (String)
     */
    setLinkUrl: function(newValue) {
        this.set("linkUrl", newValue);
    }, 
    
    /**
     * getTemplateData, returns the property templateData
     * 
     * @returns {String} (String (base64 encoded byte array))
     */
    getTemplateData: function() {
        return this.get("templateData");
    },

    /**
     * setTemplateData, sets the property templateData 
     * 
     * @param {String} newValue (String (base64 encoded byte array))
     */
    setTemplateData: function(newValue) {
        this.set("templateData", newValue);
    }, 
    
    /**
     * getWidth, returns the property width
     * 
     * @returns {Number} (Integer)
     */
    getWidth: function() {
        return this.get("width");
    },

    /**
     * setWidth, sets the property width 
     * 
     * @param {Number} newValue (Integer)
     */
    setWidth: function(newValue) {
        this.set("width", newValue);
    }
    
	
});