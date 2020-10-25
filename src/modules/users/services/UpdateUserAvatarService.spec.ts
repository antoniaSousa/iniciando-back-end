
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakesUsersRepository from '../repositories/Fakes/FakesUsersRepository';
import UpdateUserAvataService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
    it('should de  able to create a new user', async ()=>{
      const fakesUserRepository = new FakesUsersRepository();
      const fakeStorageProvider = new FakeStorageProvider();

      const updateUserAvatar = new UpdateUserAvataService(
          fakesUserRepository,
          fakeStorageProvider,
       );

    const user = await fakesUserRepository.create({
    name: 'John Doe',
    email: 'john@exemplo.com',
    password: '123456',

  });
  await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',

  });
  expect(user.avatar).toBe('avatar.jpg');

  it('should de  able to update avatar from non existing', async () => {
    const fakesUserRepository = new FakesUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvataService(
        fakesUserRepository,
        fakeStorageProvider,
        );

expect(updateUserAvatar.execute({
    user_id: 'non-existing-user',
    avatarFilename: 'avatar.jpg',

})).rejects.toBeInstanceOf(AppError);


    it('should delete old avatar when updating new one', async () => {
        const fakesUserRepository = new FakesUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(FakeStorageProvider, 'deleteFile');

        const user = await fakesUserRepository.create({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        });

        await updateUserAvatar.execute({
          user_id: user.id,
          avatarFilename: 'avatar.jpg',
        });

        await updateUserAvatar.execute({
          user_id: user.id,
          avatarFilename: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
});
    });
