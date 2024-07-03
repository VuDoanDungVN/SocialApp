import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Tạo vai trò
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
    },
  });

  // Tạo người dùng
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      password: 'password1', // Bạn nên mã hóa mật khẩu trong ứng dụng thực tế
      roleId: userRole.id,
      name: 'User One',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: 'password2', // Bạn nên mã hóa mật khẩu trong ứng dụng thực tế
      roleId: userRole.id,
      name: 'User Two',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'vudungit92@gmail.com' },
    update: {},
    create: {
      email: 'vudungit92@gmail.com',
      password: '123123', // Bạn nên mã hóa mật khẩu trong ứng dụng thực tế
      roleId: adminRole.id,
      name: 'Admin User',
    },
  });

  // Tạo tài khoản
  await prisma.account.upsert({
    where: {
      providerId_providerAccountId: { providerId: 'google', providerAccountId: 'user1_google' },
    },
    update: {},
    create: {
      userId: user1.id,
      providerType: 'oauth',
      providerId: 'google',
      providerAccountId: 'user1_google',
      accessToken: 'access_token_user1_google',
    },
  });

  await prisma.account.upsert({
    where: {
      providerId_providerAccountId: { providerId: 'google', providerAccountId: 'user2_google' },
    },
    update: {},
    create: {
      userId: user2.id,
      providerType: 'oauth',
      providerId: 'google',
      providerAccountId: 'user2_google',
      accessToken: 'access_token_user2_google',
    },
  });

  await prisma.account.upsert({
    where: {
      providerId_providerAccountId: { providerId: 'google', providerAccountId: 'admin_google' },
    },
    update: {},
    create: {
      userId: admin.id,
      providerType: 'oauth',
      providerId: 'google',
      providerAccountId: 'admin_google',
      accessToken: 'access_token_admin_google',
    },
  });

  // Tạo phiên đăng nhập
  await prisma.session.upsert({
    where: { sessionToken: 'session_token_user1' },
    update: {},
    create: {
      userId: user1.id,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 ngày từ bây giờ
      sessionToken: 'session_token_user1',
      accessToken: 'access_token_user1',
    },
  });

  await prisma.session.upsert({
    where: { sessionToken: 'session_token_user2' },
    update: {},
    create: {
      userId: user2.id,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 ngày từ bây giờ
      sessionToken: 'session_token_user2',
      accessToken: 'access_token_user2',
    },
  });

  await prisma.session.upsert({
    where: { sessionToken: 'session_token_admin' },
    update: {},
    create: {
      userId: admin.id,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 ngày từ bây giờ
      sessionToken: 'session_token_admin',
      accessToken: 'access_token_admin',
    },
  });

  // Tạo yêu cầu xác thực
  await prisma.verificationRequest.upsert({
    where: { token: 'verification_token_user1' },
    update: {},
    create: {
      identifier: 'user1@example.com',
      token: 'verification_token_user1',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 ngày từ bây giờ
    },
  });

  await prisma.verificationRequest.upsert({
    where: { token: 'verification_token_user2' },
    update: {},
    create: {
      identifier: 'user2@example.com',
      token: 'verification_token_user2',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 ngày từ bây giờ
    },
  });

  // Tạo dữ liệu Youtube
  await prisma.youtube.create({
    data: {
      category: 'Music',
      service: 'View',
      duration: '3:45',
      link: 'https://youtube.com/example1',
      quantity: 1000,
      description: 'Sample Youtube Video 1',
    },
  });

  // Tạo dữ liệu Facebook
  await prisma.facebook.create({
    data: {
      category: 'Ad',
      service: 'Impression',
      duration: '7 days',
      link: 'https://facebook.com/example1',
      quantity: 5000,
      description: 'Sample Facebook Ad 1',
    },
  });

  // Tạo dữ liệu Tiktok
  await prisma.tiktok.create({
    data: {
      category: 'Dance',
      service: 'View',
      duration: '0:30',
      link: 'https://tiktok.com/example1',
      quantity: 2000,
      description: 'Sample Tiktok Video 1',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
