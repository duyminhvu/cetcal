<div id="cet-admin-3-accordion">
  <div class="card cet-accordion-admin-critique">
  	<div class="card-header" id="cet-admin-3-heading">
  	  <label class="cet-formgroup-container-label"><small class="form-text">
  	  	Cette section permet de visualiser les administrateurs cetcal.site.
  	  </small></label>
      <h5 class="mb-0">
    	<a class="badge badge-success cet-accordion-badge" href="#" data-toggle="collapse" data-target="#cet-admin-3" aria-expanded="true" aria-controls="cet-admin-3">
          Visualiser les habilitations.
	    </a>
    	<a class="align-middle" href="#" data-toggle="collapse" 
      		data-target="#cet-admin-3" aria-expanded="true" 
      		aria-controls="cet-admin-3">
      		<i id="cet-accordion-icon-admin-main-3" class="fa fa-hand-o-down cet-accordion-icon"></i>
    	</a>
  	  </h5>
    </div>

    <div id="cet-admin-3" class="collapse" aria-labelledby="cet-admin-3-heading" data-parent="#cet-admin-3-accordion">
      <div class="card-body">
        <?php
          require_once($_SERVER['DOCUMENT_ROOT'].'/src/app/controller/admin/cet.annuaire.controlleur.administration.admins.php');
          $ctrl = new AdminController();
          $data_admins = $ctrl->selectAll();
        ?>

        <table class="table table-striped cetcal-admin-table cet-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Nom d'utilisateur</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($data_admins as $data): ?>
              <tr>
                <td class="cetcal-admin-table-td" scope="row">
                  <?=$data['adm_id'];?>
                </td>
                <td class="cetcal-admin-table-td">
                  <?=$data['adm_email'];?>
                </td>
                <td class="cetcal-admin-table-td">
                  <?=$data['adm_usr_name'];?>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</div>