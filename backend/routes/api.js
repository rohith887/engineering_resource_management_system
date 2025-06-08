const express = require('express');
const router = express.Router();
const engineerController = require('../controllers/engineerController');
const projectController = require('../controllers/projectController');
const assignmentController = require('../controllers/assignmentController');

// Engineer routes
router.get('/engineers', engineerController.getAllEngineers);

// Project routes
router.get('/projects', projectController.getAllProjects);

// Assignment routes
router.get('/assignments', assignmentController.getAllAssignments);
router.post('/assignments', assignmentController.createAssignment);

module.exports = router;