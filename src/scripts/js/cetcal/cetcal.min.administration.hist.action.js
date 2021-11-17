/**
 * Logger l'activité admin : 
 */
function admlog(sitkn, pk_adm, adm_log, action_code, type_element, denomination_element, pk_element, commentaire) {
  $.ajax({
    url: '../../../controller/admin/cet.annuaire.controlleur.ajax.hist.action.php?sitkn=' + sitkn,
    type: 'POST',
    data: { 
        admpk : pk_adm, 
        admlog : adm_log,
        admactcde : action_code,
        type : type_element,
        denom : denomination_element,
        pk : pk_element,
        cmt : commentaire
      },
    success: function (json) { }, 
    error: function(jqXHR, textStatus, errorThrown) { console.log(textStatus, errorThrown); }
  });
}