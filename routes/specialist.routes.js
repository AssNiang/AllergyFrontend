const router = require('express').Router();
const specialistController = require('../controllers/specialist.controller');


router.get('/', specialistController.getAllPatients);
router.get('/:id', specialistController.getPatient);
router.get('/followed', specialistController.getFollowedPatients);
router.get('/unfollowed', specialistController.getUnFollowedPatients);
router.get('/historique-file/:id', specialistController.getPatientFile);
router.get('/historique-files', specialistController.getAllPatientsFiles);
router.post('/complete-infos', specialistController.completeInfos);
router.get('/follow/:id', specialistController.followPatient);
router.get('/unfollow/:id', specialistController.unFollowPatient);
router.put('/editfile', specialistController.editPatientFile);


module.exports = router;


