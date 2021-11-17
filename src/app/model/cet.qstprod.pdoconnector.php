<?php

/**
 * Connecteur pdo.
 */
class CETCALPDOConnector {

  private $DNS;
  private $LOG;
  private $PWD;
  private $DNS_prod;
  private $LOG_prod;
  private $PWD_prod;
  private $production = false;

  function __construct() 
  {
    $this->DNS = 'mysql:host=127.0.0.1;dbname=cetcal;charset=utf8';
    $this->LOG = '';
    $this->PWD = '';
    $this->DNS_prod = 'mysql:host=localhost;dbname=cetcal;charset=utf8';
    $this->LOG_prod = '';
    $this->PWD_prod = '';
  }

  function getPdoConnexion() 
  {
    $pdo = NULL;
    try
    {
      //!\ PDO with uft8 encoding is necessary.
      if ($this->production)
      {
        $pdo = new PDO(
          $this->DNS_prod,
          $this->LOG_prod,
          $this->PWD_prod
        );
      }
      else
      {
        $pdo = new PDO(
          $this->DNS,
          $this->LOG,
          $this->PWD
        );
      }

      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $pdo->setAttribute(PDO::ATTR_PERSISTENT, TRUE);
      
      return $pdo;
    }
    catch (PDOException $ex)
    { 
      die("CETCAL QSTPROD Connection failed : ".$ex -> getMessage()); 
    }
  }

}