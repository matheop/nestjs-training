import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/update-status-validation.pipe';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
		return Object.keys(filterDto).length
			? this.tasksService.getFilteredTasks(filterDto)
			: this.tasksService.getAllTasks();
	}

	@Get('/:id')
	getTaskById(@Param('id') id: string): Task {
		return this.tasksService.getTaskById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.tasksService.createTask(createTaskDto);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id: string): Task {
		return this.tasksService.deleteTask(id);
	}

	@Patch('/:id/status')
	updateStatusTask(
		@Param('id') id: string,
		@Body('status', TaskStatusValidationPipe) status: TaskStatus,
	) {
		return this.tasksService.updateStatusTask(id, status);
	}
}
