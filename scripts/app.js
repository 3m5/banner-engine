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

// DOCUMENT READY
// -----------------------------
$(function() {
    //initialize banner main View
    if(Bannertool.autoStart == true) {
        new window.Bannertool.BannerView(new window.Bannertool.BannerModel({adSpaceId:Bannertool.adSpaceId}));
    }
});