import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// Validation => makes effective validation constraints
	// added to our DTO AuthCredentialsDto
	@Post('/signup')
	signUp(
		@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
	): Promise<void> {
		console.log('authCredentialsDto : ', authCredentialsDto);
		return this.authService.signUp(authCredentialsDto);
	}
}
