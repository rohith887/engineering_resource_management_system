const Engineer = require('../models/Engineer');

/**
 * Get all engineers
 * @route GET /api/engineers
 */
exports.getAllEngineers = async (req, res) => {
  try {
    const engineers = await Engineer.find();
    res.status(200).json(engineers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch engineers' });
  }
};