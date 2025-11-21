import { FakeEncrypter } from '../../../../../test/cryptography/fake-encrypter';
import { FakeHasher } from '../../../../../test/cryptography/fake-hasher';
import { MakeUser } from '../../../../../test/factory/make-user-factory';
import { InMemoryUserRepository } from '../../../../../test/repository/in-memory-user-repository';
import { AuthenticateUserUseCase } from './authenticate-use-case';

let inMemoryUserRepository: InMemoryUserRepository;
let hashGenerator: FakeHasher;
let encrypter: FakeEncrypter;
let sut: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    hashGenerator = new FakeHasher();
    encrypter = new FakeEncrypter();
    sut = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      hashGenerator,
      encrypter,
    );
  });
  it('Should be able authenticate user', async () => {
    const user = MakeUser({
      password: await hashGenerator.hash('123123'),
    });

    inMemoryUserRepository.create(user);

    const result = await sut.execute({
      email: user.email,
      password: user.password,
    });

    expect(result.isRight()).toBe(true);
  });
});
