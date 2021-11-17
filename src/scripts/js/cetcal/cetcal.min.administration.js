$('#cet-admin-prd-inscrits').on('hidden.bs.collapse', function () {
  $('#cet-accordion-icon-admin-prd-inscrits').removeClass('fa-hand-o-up');
  $('#cet-accordion-icon-admin-prd-inscrits').addClass('fa-hand-o-down');
});

$('#cet-admin-prd-inscrits').on('shown.bs.collapse', function () {
  $('#cet-accordion-icon-admin-prd-inscrits').removeClass('fa-hand-o-down');
  $('#cet-accordion-icon-admin-prd-inscrits').addClass('fa-hand-o-up');
});

$('#cet-admin-bioab').on('hidden.bs.collapse', function () {
  $('#cet-admin-bioab-accordion').removeClass('fa-hand-o-up');
  $('#cet-admin-bioab-accordion').addClass('fa-hand-o-down');
});

$('#cet-admin-bioab').on('shown.bs.collapse', function () {
  $('#cet-admin-bioab-accordion').removeClass('fa-hand-o-down');
  $('#cet-admin-bioab-accordion').addClass('fa-hand-o-up');
});

$('#cet-admin-1').on('hidden.bs.collapse', function () {
  $('#cet-accordion-icon-admin-main-1').removeClass('fa-hand-o-up');
  $('#cet-accordion-icon-admin-main-1').addClass('fa-hand-o-down');
});

$('#cet-admin-1').on('shown.bs.collapse', function () {
  $('#cet-accordion-icon-admin-main-1').removeClass('fa-hand-o-down');
  $('#cet-accordion-icon-admin-main-1').addClass('fa-hand-o-up');
});

$('#cet-admin-2').on('hidden.bs.collapse', function () {
  $('#cet-accordion-icon-admin-main-2').removeClass('fa-hand-o-up');
  $('#cet-accordion-icon-admin-main-2').addClass('fa-hand-o-down');
});

$('#cet-admin-2').on('shown.bs.collapse', function () {
  $('#cet-accordion-icon-admin-main-2').removeClass('fa-hand-o-down');
  $('#cet-accordion-icon-admin-main-2').addClass('fa-hand-o-up');
});

$('#cet-admin-3').on('hidden.bs.collapse', function () {
  $('#cet-accordion-icon-admin-main-3').removeClass('fa-hand-o-up');
  $('#cet-accordion-icon-admin-main-3').addClass('fa-hand-o-down');
});

$('#cet-admin-3').on('shown.bs.collapse', function () {
  $('#cet-accordion-icon-admin-main-3').removeClass('fa-hand-o-down');
  $('#cet-accordion-icon-admin-main-3').addClass('fa-hand-o-up');
});

$(document).ready(function() {
  
  // Bouton de suppression producteur.
  $('button.administration-desactiver-producteur').on('mousedown', function() {

    clearModalAdmin();
    var pk = $(this).attr('data');
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var rowcible = $(this).attr('row-cible');
    var prdCible = $(this).attr('prd-cible');
    $('#cet-modal-alerte-titre').text("Demande de suppression producteur.e");
    $('#cet-modal-alerte-paragraphe').text("Veuillez confirmer la suppression du producteur.s suivant : ");
    $('#cet-modal-alerte-paragraphe-bis').text($(this).attr('prd-cible'));
    $('#cet-modal-alerte-paragraphe-ter').text("La suppression est immédiatement effcetive pour tout utilisateur de decidelabiolocale.org. En cas d'erreur sur une suppression, veuillez contacter l'équipe technique.");
    $('#cet-modal-alerte-btn-annuler').text("Annuler");
    $('#cet-modal-alerte-btn-annuler').show();
    $('#cet-modal-alerte-btn-primary').text("Supprimer ce producteur.e");
    $('#cet-modal-alerte-btn-primary').on('mousedown', function() { 
      $.ajax({
        url: '../../../controller/cet.annuaire.controller.administration.actions.php?sitkn=' + urlParams.get('sitkn'),
        type: 'POST',
        data: { admin_action_cible : 'sup-producteur', pkid : pk },
        success: function (json) { 
          admlog(urlParams.get('sitkn'), urlParams.get('admpk'), urlParams.get('admlog'), 'supprd', 'producteur', 
            prdCible, pk, $('#commentaire-action-admin').val());
        }, 
        error: function(jqXHR, textStatus, errorThrown) { console.log(textStatus, errorThrown); }
      });
      $('#cet-modal-alerte').modal('hide');
      $('#' + rowcible).hide('slow');
    });
    $('#cet-modal-alerte-btn-annuler').on('mousedown', function() { 
      $('#cet-modal-alerte').modal('hide'); 
    });
    $('#commentaire-action-admin-container').show();
    $('#cet-modal-alerte-btn').click();
  });

  // Bouton de modification admin producteur.
  $('.administration-modifier-producteur').on('mousedown', function() {

    clearModalAdmin();
    var pk = $(this).attr('data');
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var rowcible = $(this).attr('row-cible');
    var prdCible = $(this).attr('prd-cible');
    $('#cet-modal-alerte-titre').text("Demande de modification producteur.e");
    $('#cet-modal-alerte-paragraphe').text("Veuillez confirmer la prise en charge du producteur suivant : ");
    $('#cet-modal-alerte-paragraphe-bis').text($(this).attr('prd-cible'));
    $('#cet-modal-alerte-btn-annuler').text("Annuler");
    $('#cet-modal-alerte-btn-annuler').show();
    $('#cet-modal-alerte-btn-primary').text("Modifier le producteur.e n°" + pk);
    $('#cet-modal-alerte-btn-primary').on('mousedown', function() { 
      $('#cet-modal-alerte').modal('hide');
      $('#admin-modifier-producteur-link-' + pk).attr('href');
      window.open($('#admin-modifier-producteur-link-' + pk).attr('href'), '_blank');
      admlog(urlParams.get('sitkn'), urlParams.get('admpk'), urlParams.get('admlog'), 'majprd', 'producteur', 
        prdCible, pk, $('#commentaire-action-admin').val());
    });
    $('#cet-modal-alerte-btn-annuler').on('mousedown', function() { 
      $('#cet-modal-alerte').modal('hide'); 
    });
    $('#commentaire-action-admin-container').show();
    $('#cet-modal-alerte-btn').click();
  });

  // Log actions admin sur entités :
  $('#admin-entite-form').on('submit', function() {
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var action = $('input#admin_action_cible').val();
    var action_entite = '';
    if (action === 'insert-entite') action_entite = 'creent'; 
    else if (action === 'update-entite') action_entite = 'majent'; 
    else if (action === 'delete-entite') action_entite = 'supent';
    admlog(urlParams.get('sitkn'), urlParams.get('admpk'), urlParams.get('admlog'), action_entite, 
      $('#entite-entite-type').find(":selected").text(), 
      $('#entite-entite-denomination').val(), $('#admin-pk-entite').val(), $('#commentaire-action-admin').val());
  });

  // Log actions admin sur géolocalisation producteur :
  $('#admin-geoloc-form-prd').on('submit', function() {
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var action = 'geoprd';
    var type = 'producteur';
    admlog(urlParams.get('sitkn'), urlParams.get('admpk'), urlParams.get('admlog'), action, 
      type, '', $('#producteur-geoloc-pkproducteur').val(), $('#commentaire-action-admin').val());
  });

  // Log actions admin sur géolocalisation entités :
  $('#admin-geoloc-form-entite').on('submit', function() {
    const queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var action = 'geoent';
    var type = 'entité';
    admlog(urlParams.get('sitkn'), urlParams.get('admpk'), urlParams.get('admlog'), action, 
      type, '', $('#entite-geoloc-pkentite').val(), $('#commentaire-action-admin').val());
  });

	/*********************************************************************
	 * Actions liées aux marchés, lieux de distributions, Asso, AMAPS etc.
	 */
	$('#btn-admin-ajout-entite').click(function() {
		$('input#admin_action_cible').val('insert-entite');
		$('#admin-entite-form').submit();
	});

	$('#btn-admin-modifier-entite').click(function() {
		$('input#admin_action_cible').val('update-entite');
		$('#admin-entite-form').submit();
	});

	$('#btn-admin-delete-entite').click(function() {
		$('input#admin_action_cible').val('delete-entite');
		$('#admin-entite-form').submit();
	});

	$('#btn-admin-annuler-entite').click(function() {
		$('input#admin_action_cible').val('');
		$('#admin-entite-form').submit();
	});

	$('.admin-entite-administrer').each(function() {
		$(this).click(function() {
			var pk = $(this).find('.pk').text();
			const queryString = window.location.search;
			var urlParams = new URLSearchParams(queryString);
			$.ajax({
		        url: '../../../controller/cet.annuaire.controller.administration.actions.php?sitkn=' + urlParams.get('sitkn'),
		        type: 'POST',
		        data: {
		        	admin_action_cible : 'get-entite',
            		pkid : pk
		        },
		        success: function (json) {
							var entite = JSON.parse(json)[0];	        	
		        	// Ajouter les données au formaulaire 
		        	// Relancer la zone de création marchés en update.
		        	$('input[name ="admin-pk-entite"]').val(entite.pk_entite);
		        	$('input[name ="entite-entite-denomination"]').val(entite.denomination);
		        	$('input[name ="entite-entite-territoire"]').val(entite.territoire);
		        	$('textarea[name ="entite-entite-activite"]').text(entite.activite);
		        	$('input[name ="entite-entite-adresse"]').val(entite.adresse);
		        	$('input[name ="entite-entite-tel"]').val(entite.tels);
		        	$('input[name ="entite-entite-personne"]').val(entite.personne);
		        	$('input[name ="entite-entite-email"]').val(entite.email);
		        	$('input[name ="entite-entite-urlwww"]').val(entite.urlwww);
		        	$('textarea[name ="entite-entite-infoscmd"]').text(entite.infoscmd);
		        	$('textarea[name ="entite-entite-jourhoraire"]').text(entite.jourhoraire);
		        	$('textarea[name ="entite-entite-specificites"]').text(entite.specificites);
		        	$('select#entite-entite-type  > option').each(function() {
                if (entite.type === $(this).val()) $(this).attr('selected', 'selected');
                else $(this).removeAttr('selected');
              });
		        	// maintenant, déplacer vers l'ancre.
							scrollTowardsId('admin-entite-form', -172);
							// mise à jour du statut des boutons et visibilité de fonctionnalités.
							$('#btn-admin-ajout-entite').hide();
							$('#btn-admin-modifier-entite').show();
							$('#btn-admin-delete-entite').show();
							$('#btn-admin-annuler-entite').show();

              // START Lié administration des images et dropzone.
              $('#data-media-admin-entite-container').show();
              $('#entite-media-pkent-value').val(entite.pk_entite);
              $('#cetFileDropzoneImgentite').attr('action', '/src/app/controller/media/cet.qstprod.controller.media.form.php?pkent=' + entite.pk_entite 
                + '&sitkn=' + urlParams.get('sitkn') + '&cible=logo-entite');
              // Initier la dropzone pour cette entite : 
              Dropzone.forElement("#cetFileDropzoneImgentite").options.url = '/src/app/controller/media/cet.qstprod.controller.media.form.php?pkent=' + entite.pk_entite 
                + '&sitkn=' + urlParams.get('sitkn') + '&cible=logo-entite';
              clearAllFiles(1);
              reloadMedia(entite.pk_entite, 'entite');
              // END dropzone.

		        }, error: function(jqXHR, textStatus, errorThrown) {
		           console.log(textStatus, errorThrown);
		        }
		    });
		});
	});
	/*********************************************************************/

});

Dropzone.options.cetFileDropzoneImgentite = {
  init: function() {
    this.on("success", function(file) { 
      var pk = $('#entite-media-pkent-value').val();
      reloadMedia(pk, 'entite');
    });
  }
};

function clearAllFiles(t) {
  setTimeout(function() {  
      Dropzone.forElement("#cetFileDropzoneImgentite").removeAllFiles();
    }, t);
}

/**
 * Recharger un media et l'ajouter.
 */
function appendAllMedia(images) {
  
  var content = false;
  $('#espace-entite-media-listing').empty();
  for (var i = 0; i < images.length; i++) {
    content = true;
    $('#espace-entite-media-listing').append('<button type="button" class="btn entite-media-element-btn"><div><span class="badge entite-media-element-desc">' + images[i].cible + '</span><span class="badge entite-media-element-delete-btn" data="' + images[i].id + '" pkent="' + images[i].fk_entite + '" urlr="' + images[i].urlr + '"><i class="fas fa-folder-minus fa-2x"></i></span></div><img src="' + images[i].urlr + '" class="rounded mx-auto d-block entite-media-element" height="128" alt="' + images[i].libelle + '"></button>');
  } 

  // Si aucune image alors notifier :
  if (!content) {
    $('#espace-entite-media-listing').append('<p style="margin: 12px; color: rgb(30,40,30) !important;">Aucune image ajouté pour le moment...</p>');
  }

  // Si media(s) trouvé(s), ajouter la fonctionnalité delete/suppression sur l'icone de suppression :
  $('.entite-media-element-delete-btn').on('mousedown', function() {

    var urlr_delete = $(this).attr('urlr');
    var pkent_delete = $(this).attr('pkent');
    var id_media_delete = $(this).attr('data');
    $('#cet-modal-alerte-titre').text("Veuillez confirmer la suppression de l'image");
    $('#cet-modal-alerte-paragraphe').text("La suppression de l'image est définitive. Vous pouvez cependant télécharger à nouveau une image supprimée par erreur. Veuillez confirmer la suppression de l'image " + urlr_delete);
    $('#cet-modal-alerte-btn-annuler').text("Annuler");
    $('#cet-modal-alerte-btn-primary').text("Je confirme");
    $('#cet-modal-alerte-btn-primary').on('mousedown', function() {
      $('#cet-modal-alerte').modal('hide');
      deleteMedia(id_media_delete, pkent_delete, urlr_delete);
    });
    $('#cet-modal-alerte-btn-annuler').on('mousedown', function() { 
      $('#cet-modal-alerte').modal('hide'); 
    });
    $('#cet-modal-alerte-btn').click(); 
  });

  // finallement, vider les zones dropzone :
  clearAllFiles(2000);
}

/**
 * Recharger les medias.
 */
function reloadMedia(pk, tbl) {
  $.ajax({
    url: '/src/app/controller/ajaxhandlers/cet.annuaire.controller.ajaxhandler.media.php'
      + '?pk=' + pk
      + '&tbl=' + tbl,
    success: function(json) { appendAllMedia(JSON.parse(json)); },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
}

function deleteMedia(id_media, pk_entite, urlr) {
  $.ajax({
    url: '/src/app/controller/media/cet.qstprod.controller.delete.media.php'
      + '?idm=' + id_media
      + '&pkent=' + pk_entite
      + '&urlr=' + urlr,
    success: function(json) { reloadMedia(pk_entite, 'entite'); },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
}

function notifierAdministrateur() {
  clearModalAdmin();
  const queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  if (urlParams.get('refresh') !== undefined && urlParams.get('refresh') === 'true') return;
  var text = 'Pour administrer en toute sérénité... :';
  var text2 = ' - garder ouvert l\'onglet d\'administration. Votre session admin sera perdue si vous quittez la page. Dans ce cas, il faudra vous reconnecter à l\'administration.';
  var text3 = ' - Gardez un onglet ouvert sur la page d\'acceuil de decidelabiolocale.org. Appliquer les modifications souhaitées depuis l\'onglet administration puis rechargez la page d\'acceuil à l\'aide du bouton de clavier F5 ou du bouton navigateur de rafraichissement de page.';
  var text4 = ' - En cas de bug constaté, contatctez le support technique.'; 
  $('#cet-modal-alerte-titre').text('Administration cetcal decidelabiolocale');
  $('#cet-modal-alerte-paragraphe').text(text);
  $('#cet-modal-alerte-paragraphe-bis').text(text2);
  $('#cet-modal-alerte-paragraphe-ter').text(text3);
  $('#cet-modal-alerte-paragraphe-quater').text(text4);
  $('#cet-modal-alerte-btn-primary').text("J'ai compris");
  $('#cet-modal-alerte-btn-annuler').hide();
  $('#cet-modal-alerte-btn').click();
}

function clearModalAdmin() {
  $('#cet-modal-alerte-btn-primary').off();
  $('#cet-modal-alerte-btn-annuler').off();
  var text = '';
  var text2 = '';
  var text3 = '';
  var text4 = ''; 
  $('#cet-modal-alerte-titre').text('');
  $('#cet-modal-alerte-paragraphe').text(text);
  $('#cet-modal-alerte-paragraphe-bis').text(text2);
  $('#cet-modal-alerte-paragraphe-ter').text(text3);
  $('#cet-modal-alerte-paragraphe-quater').text(text4);
  $('#cet-modal-alerte-btn-primary').text("J'ai compris");
  $('#commentaire-action-admin-container').hide();
  $('#commentaire-action-admin').val('');
}