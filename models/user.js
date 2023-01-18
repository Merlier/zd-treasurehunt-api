const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const User = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "The email is required"],
      unique: true, // index unique
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
    },
    permissions: [{
        type: String
    }]
  },
  {
    timestamps: true, // ajoute 2 champs au document createdAt et updatedAt
  }
);

// hook executé avant la sauvegarde d'un document. Hash le mot de passe quand il est modifié
User.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hashPassword = async () => {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    return bcrypt.hash(this.password, salt);
  };

  hashPassword().then((hashedPassword) => {
    this.password = hashedPassword;
    next();
  });
});

module.exports = mongoose.model("User", User);
