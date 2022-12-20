const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/userAPIController');

router.get('/', controller.allUsers);
router.get('/:id', controller.userDetail);

module.exports = router;