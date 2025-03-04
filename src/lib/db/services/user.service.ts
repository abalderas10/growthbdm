import { prisma } from '@/lib/db';
import { IUser } from '../models/user.model';

export class UserService {
  static async create(userData: Partial<IUser>) {
    return await prisma.user.create({
      data: userData as any,
    });
  }

  static async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  static async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async update(id: string, updateData: Partial<IUser>) {
    return await prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  static async updateBilling(id: string, billingData: Partial<IUser>) {
    return await prisma.user.update({
      where: { id },
      data: { billing: billingData },
    });
  }

  static async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
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
      billingStatus
    } = options;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (billingStatus) {
      query.billing = { status: billingStatus };
    }

    if (search) {
      query.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { project: { contains: search, mode: 'insensitive' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: query,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where: query })
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
    return await prisma.user.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  }

  static async getStats() {
    const [
      totalUsers,
      activeUsers,
      pendingBilling,
      recentLogins
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'active' } }),
      prisma.user.count({ where: { billing: { status: 'pending' } } }),
      prisma.user.count({
        where: { lastLoginAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
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
