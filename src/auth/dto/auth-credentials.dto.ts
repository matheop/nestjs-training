import { IsDefined, IsString, Matches, MinLength } from 'class-validator';

export class AuthCredentialsDto {
	@IsDefined()
	@IsString()
	@MinLength(3)
	username: string;

	@IsDefined()
	@IsString()
	@MinLength(8)
	@Matches(
		/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
		{
			message: `Password too weak. Please verify that it contains at least one of each following:
        - Majuscule;
        - Minuscule;
        - Special character;
        - 8 length`,
		},
	)
	password: string;
}
