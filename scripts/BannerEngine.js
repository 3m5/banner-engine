require("babel-polyfill");

// Handlebars helpers
require('./util/HandlebarsHelpers.js');

//REST Services
require('./services/PublicBannerRestService.js');

var BannerEngine;

module.exports = BannerEngine = class BannerEngine {
	static get $name() {
		return "BannerEngine";
	}

	static get version() {
		return "0.2.1";
	}

	static get PersonalBannerData() {
		return require('./services/models/PersonalBannerData.js');
	}
	static get PersonalBannerDataCollection() {
		return require('./services/models/PersonalBannerDataCollection.js');
	}
	static get BannerView() {
		return require('./views/BannerMainView.js');
	}
	static get BannerModel() {
		return require('./services/models/BannerEngineModel.js');
	}

	/**
	 * static getter for BannerEngine configuration
	 * @return {*}
	 */
	static get config() {
		return this._config;
	}

	/**
	 * static setter for BannerEngine configuration
	 * @param config
	 */
	static setConfig(config) {
		this._config = config;
	}

	constructor() {
		BannerEngine.setConfig({
			autoStart:   window.BannerConfig ? window.BannerConfig.autoStart : false,
			adSpaceId:   window.BannerConfig ? window.BannerConfig.adSpaceId : "",
			adSpaceData: window.BannerConfig ? window.BannerConfig.adSpaceData : "",
			debug: window.BannerConfig ? window.BannerConfig.debug : false
		});
		//delete config setter after setting config :)
		delete BannerEngine.setConfig;

		var Coco = require('3m5-coco');
		try {
			Coco;
		} catch (error) {
			console.error(error);
			throw new Error("Missing 3m5-Coco! include npm-module '3m5-coco' into your project!");
		}

		try {
			$;
		} catch (error) {
			console.error(error);
			throw new Error("Missing jQuery! include 'jquery' into window object!");
		}

		console.debug("-------------------------------------------");
		console.debug(BannerEngine.$name + " v" + BannerEngine.version + " initialized!", this);
		console.debug("-------------------------------------------");

		delete window.BannerConfig;

		//initialize BannerView on document ready
		$(() => {
			if(BannerEngine.config.debug) {
				console.log(".document ready - initialize BannerView by config: ", BannerEngine.config);
			}
			if (BannerEngine.config.autoStart == true) {
				let bannerView = new BannerEngine.BannerView(new BannerEngine.BannerModel({adSpaceId: BannerEngine.config.adSpaceId}));
				if (BannerEngine.config.adSpaceData != null) {
					//auto render banner engine, if data is already set
					bannerView.render();
				}
			}
		});
	}

};

//set up config here
Coco.config.environment   = window.CocoConfig.environment;
Coco.config.baseUrl       = window.CocoConfig.baseUrl;
Coco.config.restService   = window.CocoConfig.restService;
Coco.config.section       = window.CocoConfig.section;
Coco.config.defaultLocale = 'de';
Coco.config.locale        = window.CocoConfig.locale;

// disable cache
Coco.config.restService.cacheGet = 0;

//delete unused configuration
delete window.CocoConfig;

new BannerEngine();

// DOCUMENT READY
// -----------------------------
// $(function () {
// 	//initialize banner main View
// 	if (Engine.config.autoStart == true) {
// 		let bannerView = new Engine.BannerView(new Engine.BannerModel({adSpaceId: Engine.config.adSpaceId}));
// 		if (Engine.config.adSpaceData != null) {
// 			//auto render banner engine, if data is already set
// 			bannerView.render();
// 		}
// 	}
// });