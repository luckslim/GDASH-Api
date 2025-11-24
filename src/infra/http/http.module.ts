import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account-controller';
import { DatabaseModule } from '../database/database.module';
import { CreateUserUseCase } from '@/domain/aplication/use-case/user/create-user-use-case';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateController } from './controllers/authenticate-controller';
import { AuthenticateUserUseCase } from '@/domain/aplication/use-case/user/authenticate-use-case';
import { DeleteAccountController } from './controllers/delete-account-controller';
import { DeleteUserUseCase } from '@/domain/aplication/use-case/user/delete-user-use-case';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    DeleteAccountController,
  ],
  providers: [CreateUserUseCase, AuthenticateUserUseCase, DeleteUserUseCase],
})
export class HttpModule {}
