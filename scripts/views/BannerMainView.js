var BannerDataModel = require("../services/models/de._3m5.banner_ad.web.model.BannerData.js");

/**
 * Class: BannerMainView
 *
 * Package:
 *
 * extends <Coco.View>
 *
 * Description:
 *
 * (c) 2013 3m5. Media GmbH
 */
module.exports = dejavu.Class.declare({
    //className
    $name: "BannerMainView",
    //inheritance
    $extends: Coco.View,
    //version
    version: 0.5,
    //jQuery selector to add this view
    _anchor: ".banner-container",
    //jQuery events to handle directly
    _events: {
        //"EVENT CSS-Selector": "eventhandler-function"        
    },

    $inject: ['PublicBannerRestService'],

    __timeouts: [],

    /**
     * Variable: _template
     * Path to a handlebars file (relative to web root) or an CSS selector to an existing DOM element.
     * If a path is given, Coco will set it to the id of the script tag, after the file has been loaded.
     *
     * @protected
     */
    __tpl: require("../../templates/bannerMainView.hbs"),

    /**
     * Constructor
     */
    _onInitialize: function () {
        this.listenTo(this, Coco.Event.RENDER, this.onRender);

        console.log(this.$name + " (v" + this.version + ") initialized!");
        if(Bannertool.adSpaceData == null) {
            this._getService("PublicBannerRestService").getAdSpaceDataGET(this.model.getAdSpaceId(), response => {
                    //console.log("success: ", response.getAttributes());
                    this.model = response;
                    this.render();
                },
                function (errorResponse) {
                    console.error("could not load adSpace data... ", error);
                }
            );
        } else {
            this.model = new BannerDataModel(Bannertool.adSpaceData);
            //call render external, because $el is actually not set
            //this.render();
        }
    },

    //_getHbsModel() {
    //    var model = this.$super();
    //    return $.extend(model);
    //},

    onRender() {
        //console.log("banner rendered! - personalize slides");
        var elementGroups = [];
        var groupedDomElements = {};
        //replace rendered element values by personal data
        $.each(this.model.getTemplateData(), (index, slide) => {
            $.each(slide.elements, (index, templateElement) => {
                this.model.getBannerData().each((personalBannerData, index) => {
                    //make sure template element order will be maintained
                    if (personalBannerData.getElementId() === templateElement.id) {
                        console.log("replace element ",personalBannerData.getAttributes());
                        var domElement = $("#" + personalBannerData.getElementId());
                        if (domElement == null || domElement[0] == null) {
                            console.warn("domelement not found with id: -" + personalBannerData.getElementId() + "- !");
                            return;
                        }
                        if (Coco.StringUtils.isEmpty(personalBannerData.getValue())) {
                            console.info("replace element with empty content...");
                            //return;
                        }
                        if (domElement.data("editable") == false) {
                            //do not replace non editable elements
                            console.warn("do not edit non editable elements ",domElement);
                            return;
                        }

                        //collect grouped elements
                        if (domElement.data("groupId")) {
                            if (groupedDomElements[domElement.data("groupId")] == null) {
                                groupedDomElements[domElement.data("groupId")] = [];
                                elementGroups.push(domElement.data("groupId"));
                            }
                            groupedDomElements[domElement.data("groupId")].push(domElement);
                        }

                        switch (domElement.data("type")) {
                            case "TEXT":
                                $("#" + personalBannerData.getElementId()).html(Coco.Plugins.html.HTMLLayerHelper.nl2br(personalBannerData.getValue()));
                                break;
                            case "IMAGE":
                                $("#" + personalBannerData.getElementId()).attr("src",personalBannerData.getValue());
                                break;
                            case "POLYGON":
                                //just replace background color
                                $("#" + personalBannerData.getElementId() + " path").attr("fill",personalBannerData.getValue());
                                $("#" + personalBannerData.getElementId() + " path").attr("stroke",personalBannerData.getValue());
                                break;
                            default:
                                console.error("UNKNOWN TYPE: " + domElement.data("type"));
                                break;
                        }
                    }
                });
            });
        });

        //reorganize grouped elements after replacing content by custom values
        console.log("reorganize grouped elements after replacing content by custom values ", elementGroups);
        //iterate over group names
        var nextY = 0;
        //var margin = 5;
        for(var i = 0; i < elementGroups.length; i++) {
            var elementGroup = groupedDomElements[elementGroups[i]];
            for(var j = 0; j < elementGroup.length; j++) {
                var domElement = elementGroup[j];
                if(j == 0) {
                    nextY = domElement.position().top;
                } else {
                    console.log("domElement ", domElement.css("top"));
                    nextY = nextY + parseInt(domElement.css("top"));
                    domElement.css({top: nextY});
                }

                nextY = domElement.position().top + domElement.height();
            }
        }
        //console.log("reorganize grouped elements after replacing content by custom values ", groupedDomElements);

        //start slide animation
        this._startSlideAnimation(true, 0);
    },

    /**
     * start slide animation by given slide index
     * @param easeIn
     * @param slideIndex
     * @private
     */
    _startSlideAnimation(easeIn, slideIndex) {
        $(this.model.getTemplateData()).each((index, slide) => {
            if(index == slideIndex) {
                //check for easeIn flag
                if(easeIn) {
                    //show current slide
                    $("#slide" + index).css("display", "block");
                    if (slide.easeIn != null) {
                        //console.log("fadeIn - slide: " + index + " ", slide);
                        //easeIn
                        this.__timeouts.push(setTimeout(() => {

                            this._animate("#slide" + index, slide.easeIn, () => {
                                //slide easeIn complete
                                this._animateElements(slide);
                            });

                            this.__timeouts.push(setTimeout(() => {
                                this._startSlideAnimation(false, slideIndex);
                            }, 1000 * slide.duration));

                        }, slide.easeIn.time));
                    } else {
                        //animate elements directly
                        this._animateElements(slide);
                        //hard slide switch out
                        this.__timeouts.push(setTimeout(() => {
                            this._startSlideAnimation(false, slideIndex);
                        }, 1000 * slide.duration));
                    }
                } else {
                    //console.log("fadeOut - slide: " + index + " ", slide);
                    //easeOut
                    if(slide.easeOut) {
                        this._animate("#slide" + index, slide.easeOut, () => {
                            //animation complete, hide slide completely
                            if(this.model.getTemplateData().length > 1) {
                                //hide slide only if more than one slide set
                                $("#slide" + index).css("display", "none");
                            }
                        });
                    } else {
                        //hide slide directly
                        if(this.model.getTemplateData().length > 1) {
                            $("#slide" + index).css("display", "none");
                        }
                    }
                    //switch slide
                    var newIndex = (slideIndex + 1) % (this.model.getTemplateData().length);
                    //reset current animations
                    this.reset();
                    //ease in next slide
                    this._startSlideAnimation(true, newIndex);
                }
                return;
            }
        });
    },

    _animateElements(slide) {
        //animate elements now
        $(slide.elements).each((index, element) => {
            if(element.easeIn)
                this.__timeouts.push(setTimeout(() => {
                    this._animate("#" + element.id, element.easeIn, () => {
                        console.log("animate element: ", element);
                        //element animation complete, start timer to hide element
                        this.__timeouts.push(setTimeout(() => {
                            this._animate("#" + element.id, element.easeOut);
                        }, 1000 * Math.min(element.easeOut.time, slide.duration)));
                    });
                }, 1000 * element.easeIn.time));
        });
    },

    _animate(selector, ease, callback) {
        try {
            //console.log("animate from: ", ease.startParameter);
            if(ease.duration == null) {
                $(selector).css(ease.endParameter);
                callback();
                return;
            }
            //set start parameter
            $(selector).css(ease.startParameter);
            $(selector).stop().animate(ease.endParameter, ease.duration, callback);
        } catch(error) {
            console.error("invalid animation properties! ", error, ease);
            callback();
        }
    },

    reset() {
        //stop all animations
        for(var i = 0; i < this.__timeouts.length; i++) {
            try {
                clearTimeout(this.__timeouts[i]);
            } catch(e) {}
        }
        this.__timeouts = [];
        //this.$el.remove();
    }

})