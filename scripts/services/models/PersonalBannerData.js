let Coco = require("3m5-coco");
/**
 * Class: PersonalBannerData
 *
 * Package: module.exports
 *
 * extends <Coco.Model>
 *
 * Description:
 *
 * (c) 2013 3m5. Media GmbH
 */
module.exports = dejavu.Class.declare({
    //className
    $name: "PersonalBannerData",
    //inheritance
    $extends: Coco.Model,

    _defaults: {
        elementId: ''
        ,label: ''
        ,value: ''

    },

    set(property, value) {
        console.error("you can't change banner data [" + property + "] !");
    },

    getElementId() {
        return this.get('elementId');
    },

    setElementId(v) {
        this.set('elementId', v);
    },

    getLabel() {
        return this.get('label');
    },

    setLabel(v) {
        this.set('label', v);
    },

    getValue() {
        return this.get('value');
    },

    setValue(v) {
        this.set('value', v);
    }

});