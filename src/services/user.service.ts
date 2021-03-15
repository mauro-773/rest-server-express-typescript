import User from '../models/user.model';
import bcrypt from 'bcryptjs';

import HttpException from '../exceptions/httpException';
import { CreateUserDto } from '../dtos/createUser.dto';
import { IUser } from '../interfaces/user.interface';

class UserService {
   private User = User;

   public async fetchAllUsers(): Promise<IUser[]> {
      const users: IUser[] = await this.User.find();
      return users;
   }

   public async createUser(userData: CreateUserDto): Promise<IUser> {
      const findUser: IUser | null = await this.User.findOne({
         email: userData.email,
      });

      if (findUser) {
         throw new HttpException(
            400,
            `El usuario ${userData.email} ya está registrado`
         );
      }

      const salt: string = bcrypt.genSaltSync();
      const hashedPassword: string = bcrypt.hashSync(userData.password, salt);
      const newUser = new User({ ...userData, password: hashedPassword });

      return await newUser.save();
   }
}

export default UserService;
