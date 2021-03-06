// -----------------------------
// de._3m5.banner_ad.web.model.BannerData
// -----------------------------

var Coco   = require("3m5-coco"),
    base64 = require("js-base64").Base64;

var de__3m5_banner_ad_web_model_BannerDataBase = require('./base/de._3m5.banner_ad.web.model.BannerDataBase.js');
var PersonalBannerDataCollection = require("../../services/models/PersonalBannerDataCollection.js");

module.exports = dejavu.Class.declare({
	$name: 'de._3m5.banner_ad.web.model.BannerData',
	$extends: de__3m5_banner_ad_web_model_BannerDataBase,

    _setCollections: function() {
        var json;
        var personalData;

        //decode base64 banner data
        //console.log(this.$name + "._setCollections ", this.getBannerData());

        if (this.getBannerData() == null) {
            personalData = [];
        } else {
            //make sure old non-utf8-decoded data does not crash the app
            try {
                json = JSON.parse(base64.decode(this.getBannerData()));
            } catch (e) {
                json = JSON.parse(base64.decode(this.getBannerData()));
            }
            personalData = json["personalData"];
        }

        let BannerEngine = require("../../BannerEngine");
        if(BannerEngine.config.debug) {
            console.log(this.$name + ".decoded personalData ", personalData);
        }

        this.setBannerData(new PersonalBannerDataCollection(personalData));

        //decode base64 template data
        if(!Coco.StringUtils.isEmpty(this.getTemplateData())) {
            //make sure old non-utf8-decoded data does not crash the app
            try {
                json = JSON.parse(base64.decode(this.getTemplateData(),true));
            } catch(e) {
                json = JSON.parse(base64.decode(this.getTemplateData()));
            }

            this.setTemplateData(json);

        } else {
            this._createDummyData();
        }
    },

    _createDummyData() {
        //use dummy data:
        var templateData = [{
            backgroundImage: "dummy/bg.png",
            duration: 10,
            easeIn: {
                duration: 200,
                type: "FADE",
                ease: "LINEAR",
                startParameter: {opacity: 1},
                endParameter: {opacity: 1}
            },
            easeOut: {
                //duration: 200,
                //type: "FADE",
                //ease: "LINEAR",
                //startParameter: {opacity: 1},
                //endParameter: {opacity: 0}
            },
            elements: [
                {
                    id: "notepad",
                    type: "POLYGON",
                    left: 15,
                    top: 15,
                    width: 130,
                    height: 175,
                    label: "Notepad",
                    dataDefault: "M15 0 L145 0 L145 145 L115 175 L15 175 Z",
                    color: "red",
                    editable: true,
                    easeIn: {
                        time: 1,
                        duration: 200,
                        type: "FADE",
                        ease: "LINEAR",
                        startParameter: {opacity: 0, top:"-100px"},
                        endParameter: {opacity: 1, top:"15px"}
                    },
                    easeOut: {
                        time: 8,
                        duration: 200,
                        type: "FADE",
                        ease: "LINEAR",
                        startParameter: {opacity: 1, top:"15px"},
                        endParameter: {opacity: 0, top:"-100px"}
                    }
                },
                {
                    id: "claim1",
                    type: "IMAGE",
                    left: 28,
                    top: 30,
                    width: 102,
                    height: 39,
                    label: "Ihr Name",
                    dataDefault: "dummy/claim1.png",
                    color: "#0000ff",
                    editable: true,
                    easeIn: {
                        time: 1.5,
                        duration: 200,
                        type: "FADE",
                        ease: "LINEAR",
                        startParameter: {opacity: 0},
                        endParameter: {opacity: 1}
                    },
                    easeOut: {
                        time: 7,
                        duration: 200,
                        type: "FADE",
                        ease: "LINEAR",
                        startParameter: {opacity: 1},
                        endParameter: {opacity: 0}
                    }
                },
                {
                    id: "claim2",
                    type: "IMAGE",
                    left: 28,
                    top: 80,
                    width: 82,
                    height: 33,
                    label: "Ihr Firmenname",
                    dataDefault: "dummy/claim2.png",
                    editable: true,
                    easeIn: {
                        time: 2,
                        duration: 200,
                        type: "FADE",
                        ease: "LINEAR",
                        startParameter: {opacity: 0},
                        endParameter: {opacity: 1}
                    },
                    easeOut: {
                        time: 6,
                        duration: 200,
                        type: "FADE",
                        ease: "LINEAR",
                        startParameter: {opacity: 1},
                        endParameter: {opacity: 0}
                    }
                },
                {
                    id: "claim3",
                    type: "IMAGE",
                    left: 28,
                    top: 150,
                    width: 98,
                    height: 12,
                    label: "Ihr Firmenname",
                    dataDefault: "dummy/claim3.png",
                    editable: true,
                    easeIn: {
                        time: 4,
                        duration: 200,
                        type: "FADE",
                        ease: "LINEAR",
                        startParameter: {opacity: 0},
                        endParameter: {opacity: 1}
                    },
                    easeOut: {
                        time: 1,
                        duration: 200,
                        type: "FADE",
                        ease: "LINEAR",
                        startParameter: {opacity: 1},
                        endParameter: {opacity: 0}
                    }
                },
                {
                    id: "claim4",
                    type: "IMAGE",
                    left: 28,
                    top: 150,
                    width: 98,
                    height: 12,
                    label: "Ihr Firmenname",
                    dataDefault: "dummy/claim3.png",
                    editable: true,
                    easeIn: {
                        time: 5.5,
                        duration: 200,
                        type: "FADE",
                        ease: "LINEAR",
                        startParameter: {opacity: 0},
                        endParameter: {opacity: 1}
                    },
                    easeOut: {
                        time: 2,
                        duration: 200,
                        type: "FADE",
                        ease: "LINEAR",
                        startParameter: {opacity: 1},
                        endParameter: {opacity: 0}
                    }
                }
            ]
        }];
        this.setTemplateData(templateData);
    }

});