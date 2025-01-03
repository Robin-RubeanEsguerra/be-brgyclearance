import { Repository } from "typeorm";
import { User } from "../entity/User";

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(newuser: User) {
    const user = this.userRepository.create(newuser);
    await this.userRepository.save(user);
    return user;
  }

  async findByEmail(email: string) {
    const users = await this.userRepository.findOne({ where: { email } });
    return users;
  }

  async findOne(id: number) {
    const users = await this.userRepository.findOne({ where: { id } });
    return users;
  }

  async updateUser(id: number, data: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      this.userRepository.merge(user, data);
      await this.userRepository.save(user);
      return user;
    } else {
      return { message: "User not found" };
    }
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      this.userRepository.remove(user);
    } else {
      return { message: "User not found" };
    }
  }
}
