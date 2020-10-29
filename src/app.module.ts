import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
	// forRoot => supports all the configuration ppties exposed by
	// createConnexion() fct form the TypeORM package
	imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule, AuthModule],
	// we also could create "ormconfig.json" instead of
	// our "typeorm.config.ts" and not to pass any param
})
export class AppModule {}
