import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
	@IsOptional()
	@IsIn([TaskStatus.OPEN, TaskStatus.DONE, TaskStatus.WIP])
	status: TaskStatus;

	@IsOptional()
	@IsNotEmpty()
	search: string;
}
