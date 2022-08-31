const router = require('express').Router();
const specialistController = require('../controllers/specialist.controller');


router.get('/', specialistController.getAllPatients);
router.get('/:id', specialistController.getPatient);
router.get('/historique-file/:id', specialistController.getPatientFile);
router.get('/historique-files', specialistController.getAllPatientsFiles);
router.put('/editfile', specialistController.editPatientFile);


module.exports = router;


