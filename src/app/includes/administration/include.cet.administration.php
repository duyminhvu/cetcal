<?php
include $_SERVER['DOCUMENT_ROOT'].'/cet.qstprod.startup.php';
include $PHP_CONTROLLER_PATH.'cet.qstprod.controller.index.php';
$statut = (isset($_GET['statut']) && !empty($_GET['statut'])) ? 
  $dataProcessor->processHttpFormData($_GET['statut']) : 'bienvenu.form';
$admlog = $dataProcessor->processHttpFormData($_GET['admlog']);
$admlog_ready = isset($admlog) && !empty($admlog) && strlen($admlog) > 3;
$rechargement_update = $dataProcessor->processHttpFormData($_GET['refresh']);
$is_rechargement_update = isset($rechargement_update) && !empty($rechargement_update) && strcmp($rechargement_update, 'true') === 0;
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <title>Annuaire des producteurs bio de la région castillon</title>
    <meta name="description" content="............"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="-1">
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" href="/src/scripts/css/bootstrap.min.css">
    <link href="/src/scripts/css/font-awesome/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/src/scripts/css/cet/cet.qstprod.css">
    <link rel="stylesheet" href="/src/scripts/css/cet/cet.annuaire.administration.css">
    <!-- start : charte-g Fanny -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Courgette&family=Signika:wght@400;700&display=swap">
    <script src="/src/scripts/js/jquery/jquery-3.4.1.min.js"></script>
    <script src="/src/scripts/js/bootstrap.min.js"></script>
    <script src="/src/scripts/js/cetcal/cetcal.min.js"></script>
    <div id="fb-root"></div>
  </head>
  <body id="cet-annuaire-body" onload="notifierAdministrateur();">
  	
    <div style="margin-top: 30px;"></div>
  	<div class="row justify-content-lg-center">
  	  <div class="col-lg-12">
  	  	<div class="alert alert-dismissible" role="alert">
  	  	  <h4 class="alert-heading">Bien le bonjour chère Administrateur du site CETCAL !</h4>
          <hr>
            <p>Utilisateur en cour d'administration : <b><?= $admlog; ?></b></p>
          <hr>
            <a href="/">Se déconnecter et retourner à l'accueil cetcal.site</a>
    		  <hr>
    		  <p class="mb-0">En cas de doute sur une action, veuillez contacter votre support technique.</p>
    		  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    		    <span aria-hidden="true">&times;</span>
    		  </button>
  		  </div>
  	  </div>
  	</div>

  	<div id="container-modules-admind-cetcal" style="margin-bottom: 120px;">
  	  <div class="row justify-content-lg-center">
    		<div class="col-lg-12">	
          <?php if($admlog_ready): ?>
      			<?php 
      				// les modules d'administration ajoutés un par un :
      				include $PHP_INCLUDES_PATH.'administration/'.'include.cet.administration.producteurs.php';
              include $PHP_INCLUDES_PATH.'administration/'.'include.cet.administration.certification.producteurs.php';
              include $PHP_INCLUDES_PATH.'administration/'.'include.cet.administration.geoloc.php';
              include $PHP_INCLUDES_PATH.'administration/'.'include.cet.administration.entites.php'; 
              include $PHP_INCLUDES_PATH.'administration/'.'include.cet.administration.admins.php';
              include $PHP_INCLUDES_PATH.'modals/include.cet.annuaire.modal.alerte.administration.php';
            ?>
          <?php elseif(!$admlog): ?>
          <?php endif; ?>
  		  </div>
  	  </div>
  	</div>

	<!-- JS script -->
  <script src="/src/scripts/js/cetcal/cetcal.min.administration.hist.action.js"></script>  
	<script src="/src/scripts/js/cetcal/cetcal.min.administration.js"></script>

  </body>
</html>