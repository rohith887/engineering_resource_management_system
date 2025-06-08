const Assignment = require('../models/Assignment');
const Engineer = require('../models/Engineer');

/**
 * Create a new assignment
 * @route POST /api/assignments
 */
exports.createAssignment = async (req, res) => {
  try {
    const { engineerId, projectId, hours } = req.body;
    
    // Validate input
    if (!engineerId || !projectId || !hours || hours <= 0) {
      return res.status(400).json({ error: 'Invalid input: engineerId, projectId, and hours are required' });
    }

    // Verify engineer and project exist
    const engineer = await Engineer.findById(engineerId);
    const project = await Project.findById(projectId);
    if (!engineer || !project) {
      return res.status(404).json({ error: 'Engineer or project not found' });
    }

    // Check capacity
    if (engineer.assignedHours + hours > engineer.capacity) {
      return res.status(400).json({ error: 'Assignment exceeds engineer capacity' });
    }

    // Create assignment
    const assignment = new Assignment({ engineerId, projectId, hours });
    await assignment.save();

    // Update engineer's assigned hours
    await Engineer.findByIdAndUpdate(engineerId, {
      $inc: { assignedHours: hours }
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create assignment' });
  }
};

/**
 * Get all assignments
 * @route GET /api/assignments
 */
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('engineerId', 'name')
      .populate('projectId', 'name');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
};