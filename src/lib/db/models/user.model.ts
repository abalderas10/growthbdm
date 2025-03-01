import { Schema, model, models } from 'mongoose';

const userBillingSchema = new Schema({
  plan: {
    type: String,
    enum: ['basic', 'premium', 'enterprise'],
    default: 'basic'
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'overdue'],
    default: 'pending'
  },
  nextBillingDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  project: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  billing: {
    type: userBillingSchema,
    required: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  lastLoginAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Índices para búsquedas eficientes
userSchema.index({ email: 1 });
userSchema.index({ company: 1 });
userSchema.index({ status: 1 });
userSchema.index({ 'billing.status': 1 });
userSchema.index({ createdAt: -1 });

export const User = models.User || model('User', userSchema);
