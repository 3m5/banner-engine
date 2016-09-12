require('babel-polyfill');

let jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

var Coco = require('3m5-coco');

/**
 * JavaScript (c) 2014 3m5. Media GmbH
 * File: app.js
 *
 * Description:
 *
 */
// Handlebars helpers
require('./util/HandlebarsHelpers.js');

//REST Services
// -----------------------------
require('./services/de._3m5.banner_ad.web.rest.PublicBannerRestService');

window.Bannertool = window.Bannertool || {};
$.extend(window.Bannertool, {
    PersonalBannerData : require('./services/models/PersonalBannerData.js'),
    PersonalBannerDataCollection : require('./services/models/PersonalBannerDataCollection.js'),
    BannerView : require('./views/BannerMainView.js'),
    BannerModel : require('./services/models/BannerEngineModel.js')
});

// Support CORS for IE9+
$.support.cors = true;

//set up config here
Coco.config.environment = window.CocoConfig.environment;
Coco.config.baseUrl = window.CocoConfig.baseUrl;
Coco.config.restService = window.CocoConfig.restService;
Coco.config.section = window.CocoConfig.section;
Coco.config.defaultLocale = 'de';
Coco.config.locale = window.CocoConfig.locale;

// disable cache
Coco.config.restService.cacheGet = 0;

//delete unused configuration
delete window.CocoConfig;

// DOCUMENT READY
// -----------------------------
$(function() {
    //initialize banner main View
    if(window.Bannertool.autoStart == true) {
        let bannerView = new window.Bannertool.BannerView(new window.Bannertool.BannerModel({adSpaceId:Bannertool.adSpaceId}));
        if(window.Bannertool.adSpaceData != null) {
            //auto render banner engine, if data is already set
            bannerView.render();
        }
    }
});