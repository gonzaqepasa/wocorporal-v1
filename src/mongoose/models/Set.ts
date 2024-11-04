import { Schema, model, models } from "mongoose";

const SetSchema = new Schema(
  {

    name: { type: String, required: [true, "El nombre del set es requerido"] },
    description: { type: String },
    type: { type: String, enum: ['amrap', 'tabata', 'rounds', 'cluster', 'dropset', 'emom'] },  // Tipo de circuito
    exercises: [{
      exercise: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },  // Referencia al ejercicio
      reps: Number,                       // Número de repeticiones (opcional)
      duration: Number,                   // Duración en segundos, si aplica
      rest: Number                        // Descanso en segundos
    }],
    rounds: { type: Number, default: 1 }  // Número de vueltas al circuito
  },
  {
    timestamps: { updatedAt: true, createdAt: true },
  }
);

export default models.Set || model('Set', SetSchema);

