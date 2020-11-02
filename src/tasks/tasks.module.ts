import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	// forFeature => define which repositories are registered in the current scope
	imports: [AuthModule, TypeOrmModule.forFeature([TaskRepository])],
	controllers: [TasksController],
	providers: [TasksService],
})
export class TasksModule {}
