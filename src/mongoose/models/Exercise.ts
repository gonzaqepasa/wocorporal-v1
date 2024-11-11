import { Schema, model, models } from "mongoose";

const ExerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    description: { type: String, },
    muscle: { type: String, },
    equipment: { type: String },
    difficulty: { type: Number, enum: [0, 1, 2, 3, 4, 5] },
    videoUrl: { type: String },
  },
  {
    timestamps: { updatedAt: true, createdAt: true },
  }
);

export default models.Exercise || model('Exercise', ExerciseSchema);
