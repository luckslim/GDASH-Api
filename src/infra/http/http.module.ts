import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/user/create-account-controller';
import { DatabaseModule } from '../database/database.module';
import { CreateUserUseCase } from '@/domain/aplication/use-case/user/create-user-use-case';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateController } from './controllers/user/authenticate-controller';
import { AuthenticateUserUseCase } from '@/domain/aplication/use-case/user/authenticate-use-case';
import { DeleteAccountController } from './controllers/user/delete-account-controller';
import { DeleteUserUseCase } from '@/domain/aplication/use-case/user/delete-user-use-case';
import { EditAccountController } from './controllers/user/edit-account-controller';
import { EditUserUseCase } from '@/domain/aplication/use-case/user/edit-user-use-case';
import { CreateClimateController } from './controllers/climate/create-climate-controller';
import { CreateClimateUseCase } from '@/domain/aplication/use-case/climate/create-climate-use-case';
import { DeleteClimateController } from './controllers/climate/delete-climate-controller';
import { DeleteClimateUseCase } from '@/domain/aplication/use-case/climate/delete-climate-use-case';
import { GetClimateController } from './controllers/climate/get-climate-controller';
import { GetClimateUseCase } from '@/domain/aplication/use-case/climate/get-climate-use-case';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    DeleteAccountController,
    EditAccountController,
    CreateClimateController,
    DeleteClimateController,
    GetClimateController,
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    DeleteUserUseCase,
    EditUserUseCase,
    CreateClimateUseCase,
    DeleteClimateUseCase,
    GetClimateUseCase,
  ],
})
export class HttpModule {}
