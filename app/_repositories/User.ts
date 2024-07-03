import { prisma } from '@/app/_utils/prismaSingleton';
import type { Prisma } from '@prisma/client';
import type { User as _User } from '@prisma/client';

export type User = _User;

export type UserWithRoleDepartment = Exclude<
  Prisma.PromiseReturnType<typeof UserRepository.findUniqueWithRoleDepartment>,
  null
>;

export namespace UserRepository {
  export async function findMany() {
    return await prisma.user.findMany({
      include: {
        role: true,
      },
    });
  }

  export async function findUnique(id: string) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  export async function findUniqueWithRoleDepartment(id: string) {
    return await prisma.user.findUnique({
      include: {
        role: true,
      },
      where: {
        id: id,
      },
    });
  }

  export async function create(user: User) {
    return await prisma.user.create({
      data: user,
    });
  }

  export async function update(id: string, user: User) {
    const { updatedAt, ...userWithoutUpdatedAt } = user;
    return await prisma.user.update({
      where: {
        id: id,
        updatedAt: updatedAt,
      },
      data: {
        ...userWithoutUpdatedAt,
      },
    });
  }

  export async function remove(id: string) {
    return await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
