const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  number: Number,
  color: String,
  text: String,
});

const AnnotationSchema = new mongoose.Schema(
  {
    essay: { type: mongoose.Schema.Types.ObjectId, ref: 'Essay', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    annotations: { type: Object, required: true },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Annotation', AnnotationSchema);
