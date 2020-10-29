import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
	constructor(
		// When the User Service is initialized,
		// we inject the instance of UserRepo as a private argument
		// in our Service, usable in our AuthService class as class member
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		// this => refers to userRepository: UserRepo
		return this.userRepository.signUp(authCredentialsDto);
	}
}
