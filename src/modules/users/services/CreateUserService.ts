import { getRepository } from 'typeorm';
import { hash }  from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface Request{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    public async execute({ name, email, password }: Request): Promise<User>{
        console.log(name, '_', email);
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: {email},
        });
        console.log(checkUserExists);
        if (checkUserExists){
            throw new AppError('Email addres already used', 401);
        }

        const hashedPassword = await hash(password, 8);
        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;
