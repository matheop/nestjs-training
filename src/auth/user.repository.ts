import {
	ConflictException,
	InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

// Interact with the DB

// precise which entity repository is for, here User Entity
@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { username, password } = authCredentialsDto;
		const user = new User();
		user.username = username;
		user.salt = await bcrypt.genSalt();
		user.password = await this.hashPassword(password, user.salt);

		console.log('user.salt : ', user.salt);
		console.log('user.password : ', user.password);
		try {
			await user.save();
		} catch (error) {
			if (error.code === '23505')
				throw new ConflictException('Username already exists.');
			else throw new InternalServerErrorException();
		}
	}
	async hashPassword(pwd, salt) {
		return await bcrypt.hash(pwd, salt);
	}

	async validateUserPassword(
		authCredentialsDto: AuthCredentialsDto,
	): Promise<string> {
		const { username, password } = authCredentialsDto;
		const user = this.findOne({ username });
		await console.log(
			'(await user).validatePwd(pwd) : ',
			(await user).validatePassword(password),
		);
		// Check if user exists and password validity
		if (user && (await user).validatePassword(password))
			return (await user).username;
		else return null;
	}
}
