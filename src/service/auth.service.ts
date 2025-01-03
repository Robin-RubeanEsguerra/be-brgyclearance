import { Repository } from "typeorm";
import { User } from "../entity/User";

export class AuthService {
  constructor(private readonly authRepository: Repository<User>) {}

  async signUpUser(newuser: User) {
    const user = this.authRepository.create(newuser);
    await this.authRepository.save(user);
    return user;
  }
}
