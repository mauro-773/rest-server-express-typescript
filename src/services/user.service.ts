import bcrypt from 'bcryptjs';

import User from '../models/user.model';
import HttpException from '../exceptions/httpException';

import { CreateUserDto } from '../dtos';
import { IUser } from '../interfaces/user.interface';
import { GoogleSignIn } from '../interfaces/auth.interface';

class UserService {
   private User = User;
   private query = { state: true };

   public async fetchAllUsers(limit: number, skip: number): Promise<IUser[]> {
      const users: IUser[] = await this.User.find(this.query)
         .limit(limit)
         .skip(skip);
      return users;
   }

   public async countUsers(): Promise<number> {
      const totalUsers: number = await this.User.countDocuments(this.query);
      return totalUsers;
   }

   public async createUser(userData: CreateUserDto): Promise<IUser> {
      const findUser: IUser | null = await this.User.findOne({
         email: userData.email,
      });

      if (findUser)
         throw new HttpException(400, `El usuario ya está registrado`);

      const salt: string = bcrypt.genSaltSync();
      const hashedPassword: string = bcrypt.hashSync(userData.password, salt);
      const newUser = new User({ ...userData, password: hashedPassword });

      return await newUser.save();
   }

   public async updateUser(
      userId: string,
      userData: IUser
   ): Promise<IUser | null> {
      const findUser: IUser | null = await this.User.findById(userId);
      if (!findUser) throw new HttpException(404, `El usuario no existe`);

      if (userData.password) {
         const salt: string = bcrypt.genSaltSync();
         const hashedPassword: string = bcrypt.hashSync(
            userData.password,
            salt
         );
         userData.password = hashedPassword;
      }

      const userUpdated: IUser | null = await this.User.findByIdAndUpdate(
         userId,
         userData,
         { new: true }
      );

      return userUpdated;
   }

   public async deleteUser(userId: string): Promise<IUser | null> {
      const findUser: IUser | null = await this.User.findById(userId);
      if (!findUser) throw new HttpException(404, `El usuario no existe`);
      if (!findUser.state)
         throw new HttpException(401, 'El usuario ya fue borrado');

      const deletedUser: IUser | null = await this.User.findByIdAndUpdate(
         userId,
         { state: false }
      );
      return deletedUser;
   }

   public async createGoogleUser(userGoogleData: GoogleSignIn): Promise<IUser> {
      const { email, name, imageUrl } = userGoogleData;
      let user = (await User.findOne({ email })) as IUser;

      if (!user) {
         const userData: CreateUserDto = {
            email,
            name,
            imageUrl,
            password: ':)',
            google: true,
            role: 'USER_ROLE',
         };
         user = await this.createUser(userData);
      }

      if (!user.state)
         throw new HttpException(403, 'El usuario está bloqueado!');

      return user;
   }
}

export default UserService;
