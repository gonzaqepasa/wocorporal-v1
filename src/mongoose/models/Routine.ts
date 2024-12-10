import { Schema, model, models } from "mongoose";

const RoutineSchema = new Schema(
  {
    name: { type: String, required: true },               // Nombre de la rutina, ej. "Rutina de Fuerza"
    description: { type: String },                        // Descripción general de la rutina

    sets: [{ type: Schema.Types.ObjectId, ref: 'Set' }],  // Conjunto de sets para este día

    durationWeeks: Number,                                // Duración en semanas (opcional)
    level: { type: Number, enum: [1, 2, 3, 4, 5] }  // Nivel de la rutina
  },
  {
    timestamps: { updatedAt: true, createdAt: true },
  }
);

export default models.Routine || model('Routine', RoutineSchema);