import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
	constructor(
		// When the User Service is initialized,
		// we inject the instance of UserRepo as a private argument
		// in our Service, usable in our AuthService class as class member
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private jwtService: JwtService,
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		// this => refers to userRepository: UserRepo
		return this.userRepository.signUp(authCredentialsDto);
	}

	async signIn(
		authCredentialsDto: AuthCredentialsDto,
	): Promise<{ accessToken: string }> {
		const username = await this.userRepository.validateUserPassword(
			authCredentialsDto,
		);
		if (!username) throw new UnauthorizedException('Invalid Credentials');

		const payload: JwtPayload = { username };
		const accessToken = await this.jwtService.sign(payload);

		return { accessToken };
	}
}
