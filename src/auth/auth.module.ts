import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
	// forFeature => define which repositories are registered in the current scope
	imports: [
		JwtModule.register({
			secret: 'topSecret51',
			signOptions: {
				expiresIn: 3600,
			},
		}),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		TypeOrmModule.forFeature([UserRepository]),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [JwtStrategy, PassportModule], // allows other modules to use this stategy / the passportModule
})
export class AuthModule {}
