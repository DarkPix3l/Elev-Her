import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    surname: { type: String, default: "" },
    username: { type: String, default: "", required: true },
    birthDate: { type: String, required: true},
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, default: "" },
      apartment: { type: String, default: "" },
      city: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    shippingAddress: {
      street: { type: String, default: "" },
      apartment: { type: String, default: "" },
      city: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    verified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
  },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  { timestamps: true }
);

// This virtual property provides a convenient 'id' field that's a string
// representation of the MongoDB '_id', which is typically an ObjectId.
// It's useful for frontends and APIs that prefer 'id' over '_id'.

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

export default mongoose.model("User", userSchema);
