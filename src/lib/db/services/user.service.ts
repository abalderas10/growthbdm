import { User } from '../models/user.model';
import type { User as IUser } from '@/types/user';
import { connectDB } from '../mongoose';

export class UserService {
  static async create(userData: Partial<IUser>) {
    await connectDB();
    return await User.create(userData);
  }

  static async findById(id: string) {
    await connectDB();
    return await User.findById(id);
  }

  static async findByEmail(email: string) {
    await connectDB();
    return await User.findOne({ email });
  }

  static async update(id: string, updateData: Partial<IUser>) {
    await connectDB();
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async updateBilling(id: string, billingData: Partial<IUser['billing']>) {
    await connectDB();
    return await User.findByIdAndUpdate(
      id, 
      { $set: { billing: billingData } }, 
      { new: true }
    );
  }

  static async delete(id: string) {
    await connectDB();
    return await User.findByIdAndDelete(id);
  }

  static async list(options: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    billingStatus?: string;
  }) {
    const {
      page = 1,
      limit = 10,
      status,
      search,
      billingStatus,
    } = options;

    await connectDB();

    // Construir el filtro
    const filter: any = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (billingStatus) {
      filter['billing.status'] = billingStatus;
    }
    
    if (search) {
      // Búsqueda por nombre, email o empresa
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    // Contar el total de documentos que coinciden con el filtro
    const total = await User.countDocuments(filter);
    
    // Calcular el número de páginas
    const totalPages = Math.ceil(total / limit);
    
    // Obtener los usuarios con paginación
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  static async updateLoginTime(id: string) {
    await connectDB();
    return await User.findByIdAndUpdate(id, { lastLoginAt: new Date() }, { new: true });
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
