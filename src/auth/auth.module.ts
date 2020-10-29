import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
	// forFeature => define which repositories are registered in the current scope
	imports: [TypeOrmModule.forFeature([UserRepository])],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
