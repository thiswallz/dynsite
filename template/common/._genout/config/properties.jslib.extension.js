/**
 *
 * @ngdoc overview
 * @name gallery.extra
 *
 * @requires window.eGBLprocess
 *
 * @description
 *
 * eGBLprocess es la clase principal de extensión.
 * ## Extension de elementos extras de edición
 *
 * - keytext: Es la clave del elemento extra expuesto en el arichivo properties.edit.json 
 * - process: es la función callback que se llamará al procesar el elemento personalizado clave
 *
 **/
eGBLprocess.addInput({
    keytext: 'number',
    process: function(extobj, refElement, customId){
        var strContent = "";
        var cValDyn = eGBLprocess.getValue(refElement, extobj.klass, extobj.extension);
        var idcminterno = eGBLprocess.genId(extobj.klass, customId);

        strContent += '<label >'+extobj.description+'</label>';
        strContent += '<input type="number" style="float:left;float: left;width: 50%;" id="'+idcminterno+'" value="' + cValDyn + '" class="form-control" placeholder="..."  onkeyup="javascript:bcApplyExtra(\''+idcminterno+'\',\'' + customId + '\', \''+extobj.klass+'\', \''+extobj.extension+'\')"><span style="    padding-top: 14px;padding-left: 5px; ">'+extobj.msg+'</span><br style="clear: both;">';
        return strContent;
    }
});