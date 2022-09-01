const router = require('express').Router();
const adminController = require('../controllers/admin.controller');


router.post('/create-specialist', adminController.createSpecialist);
router.get('/', adminController.getAllReportedPosts);
router.get('/retired-accounts', adminController.getAllRetiredAccounts);
router.get('/accounts', adminController.getAllAccounts);
router.delete('/delete-accounts/:id', adminController.deleteAccount);




module.exports = router;