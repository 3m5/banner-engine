let Coco = require("3m5-coco");

/**
 * Class: BannerEngineModel
 *
 * Package: modules.export
 *
 * extends <Coco.Model>
 *
 * Description:
 *
 * (c) 2013 3m5. Media GmbH
 */
module.exports = dejavu.Class.declare({
    //className
    $name: "BannerEngineModel",
    //inheritance
    $extends: Coco.Model,

    _defaults: {
        adSpaceId: null
    },

    getAdSpaceId: function() {
        return this.get("adSpaceId");
    }

});