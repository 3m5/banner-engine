var PersonalBannerData = require("./PersonalBannerData.js");
/**
 * Class: PersonalBannerDataCollection
 *
 * Package: module.exports
 *
 * extends <Coco.Collection>
 *
 * Description:
 *
 * (c) 2013 3m5. Media GmbH
 */
module.exports = dejavu.Class.declare({
    //className
    $name: "PersonalBannerDataCollection",
    //inheritance
    $extends: Coco.Collection,

    /**
     * Variable: _modelClass
     * The class of the models. Calling <Coco.Collection.createOne> and <Coco.Collection.add> will always add models
     * with the class referred here.
     */
    _modelClass: PersonalBannerData,

    _onInitialize: function () {
        //this.listenTo(this, Coco.Event.ADD, this._onModelAdded);
        //this.listenTo(this, Coco.Event.REMOVE, this._onModelRemoved);
    },

    /**
     * EventHandler, when model was added to collection
     **/
    _onModelAdded: function (model) {
        this.listenTo(model, Coco.Event.CHANGE, this._onModelChanged);
    },

    /**
     * EventHandler, when model was removed from collection
     **/
    _onModelRemoved: function (model) {
        this.stopListening(model, Coco.Event.CHANGE);
    },

    /**
     * EventHandler is called after properties of child model was changed
     **/
    _onModelChanged: function (newValue, oldValue) {
        //TODO implement model changed event handler if needed
    }

});