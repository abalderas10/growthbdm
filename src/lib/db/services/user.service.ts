import { User } from '../models/user.model';
import { connectDB } from '../mongoose';
import type { User as UserType, UserBilling } from '@/types/user';

export class UserService {
  static async create(userData: Omit<UserType, 'id' | 'createdAt' | 'updatedAt'>) {
    await connectDB();
    const user = new User(userData);
    await user.save();
    return user;
  }

  static async findById(id: string) {
    await connectDB();
    return User.findById(id);
  }

  static async findByEmail(email: string) {
    await connectDB();
    return User.findOne({ email });
  }

  static async update(id: string, updateData: Partial<UserType>) {
    await connectDB();
    return User.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async updateBilling(id: string, billingData: Partial<UserBilling>) {
    await connectDB();
    return User.findByIdAndUpdate(
      id,
      { $set: { 'billing': billingData } },
      { new: true }
    );
  }

  static async delete(id: string) {
    await connectDB();
    return User.findByIdAndDelete(id);
  }

  static async list(options: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    billingStatus?: string;
  }) {
    await connectDB();
    const {
      page = 1,
      limit = 10,
      status,
      search,
      billingStatus
    } = options;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (billingStatus) {
      query['billing.status'] = billingStatus;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { project: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(query)
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    };
  }

  static async updateLoginTime(id: string) {
    await connectDB();
    return User.findByIdAndUpdate(
      id,
      { $set: { lastLoginAt: new Date() } },
      { new: true }
    );
  }

  static async getStats() {
    await connectDB();
    const [
      totalUsers,
      activeUsers,
      pendingBilling,
      recentLogins
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ 'billing.status': 'pending' }),
      User.countDocuments({
        lastLoginAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      })
    ]);

    return {
      totalUsers,
      activeUsers,
      pendingBilling,
      recentLogins
    };
  }
}
