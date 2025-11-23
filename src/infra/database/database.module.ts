import { UserRepository } from '@/domain/aplication/repository/user-repository';
import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './prisma/repository/prisma-user-repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
