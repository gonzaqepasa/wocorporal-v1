import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
    },

    description: {
      type: String,
      unique: [false],
      required: [false],
    },
    status: {
      type: String,
      enum: ["activo", "inactivo"], // Puedes ajustar los valores según tus necesidades
      default: "activo",
    },

    months: [{ type: Schema.Types.ObjectId, ref: "Month" }],

    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      // match: [
      //   /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      //   `Debe contener de 3 a 20 caracteres, no puede comenzar ni terminar con "_" o "."`,
      // ],
    },

    // username: {
    //   type: String,
    //   unique: { sparse: true, default: null },
    //   // match: [
    //   //   /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //   //   "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    //   // ],
    // },
    //   password: {
    //     type: String,
    //     required: [true, "La contraseña es requerida"],
    //   },
    phoneNumber: {
      type: String,
      match: [
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        "Please enter a valid phone number",
      ],
    },
    //   image: {
    //     type: String,
    //   },
  },
  {
    timestamps: { updatedAt: true, createdAt: true },
  }
);

const User = models.User || model("User", UserSchema);

export default User;
