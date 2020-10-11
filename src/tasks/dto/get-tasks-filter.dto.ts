import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
	@IsOptional()
	@IsIn([TaskStatus.OPEN, TaskStatus.DONE, TaskStatus.WIP])
	status: TaskStatus;

	@IsOptional()
	@IsNotEmpty()
	search: string;
}
