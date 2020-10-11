import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	getTasks(@Query() filterDto: GetTasksFilter): Task[] {
		return Object.keys(filterDto).length
			? this.tasksService.getFilteredTasks(filterDto)
			: this.tasksService.getAllTasks();
	}

	@Get('/:id')
	getTaskById(@Param('id') id: string): Task {
		return this.tasksService.getTaskById(id);
	}

	@Post()
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
		@Body('status') status: TaskStatus,
	) {
		return this.tasksService.updateStatusTask(id, status);
	}
}
