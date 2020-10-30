import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username']) // ensure that username is unique
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	salt: string;

	async validatePassword(pwd: string): Promise<boolean> {
		const hash = await bcrypt.hash(pwd, this.salt);
		console.log('hash=pwd', hash === this.password);
		return hash === this.password;
	}
}
