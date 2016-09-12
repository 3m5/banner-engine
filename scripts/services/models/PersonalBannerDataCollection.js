let Coco = require("3m5-coco");
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
    _modelClass: PersonalBannerData

});