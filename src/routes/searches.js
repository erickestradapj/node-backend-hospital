/**
 * Route: '/api/todo/:search'
 * Route: '/api/todo/collection/:table/:search'
 */

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getTodo, getDocumentCollection } = require('../controllers/searches');

const router = Router();

router.get('/:search', validateJWT, getTodo);

router.get('/collection/:table/:search', validateJWT, getDocumentCollection);

module.exports = router;
