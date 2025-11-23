import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account-controller';
import { DatabaseModule } from '../database/database.module';
import { CreateUserUseCase } from '@/domain/aplication/use-case/user/create-user-use-case';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
