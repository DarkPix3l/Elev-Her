import mongoose from 'mongoose';

export default function validateObjectId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid ID');
  }
  next();
}
