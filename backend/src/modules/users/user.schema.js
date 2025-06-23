import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
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
      street: String,
      apartment: String,
      city: String,
      postalCode: String,
      country: String,
    },
    shippingAddress: {
      street: String,
      apartment: String,
      city: String,
      postalCode: String,
      country: String,
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
