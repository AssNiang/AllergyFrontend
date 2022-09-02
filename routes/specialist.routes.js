const router = require('express').Router();
const specialistController = require('../controllers/specialist.controller');


router.get('/all-patients', specialistController.getAllPatients);
router.get('/patient/:id', specialistController.getPatient);
router.get('/historique-file/:id', specialistController.getPatientFile);
router.get('/historique-files', specialistController.getAllPatientsFiles);
router.put('/editfile', specialistController.editPatientFile);
router.patch('/follow/:id', specialistController.follow);
router.patch('/unfollow/:id', specialistController.unfollow);

module.exports = router;


