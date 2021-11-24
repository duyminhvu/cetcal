<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/src/app/controller/cet.annuaire.annuaire.controller.php');

/**
 * 
 */
class AdminController extends AnnuaireController
{

  function __construct() { }

  public function selectAll()
  {
    try
    {
      require_once($_SERVER['DOCUMENT_ROOT'].'/src/app/model/cet.cetcal.administrateur.model.php');
      $adminModel = new CETCALAdminModel();
      return $adminModel->getAll();
    }
    catch (Exception $e) 
    {
      var_dump($e);
    }
    return false;
  }

}