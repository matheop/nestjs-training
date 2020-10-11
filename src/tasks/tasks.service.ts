import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uudiv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
	private tasks: Task[] = [
		{
			id: '06785ee0-2e3c-4c6c-bd6d-94540a71868d',
			title: 'NestJs',
			description: 'Gotta dead this shit',
			status: TaskStatus.WIP,
		},
		{
			id: '54948d5e-8204-4d08-a3d3-a96fc75c81f0',
			title: 'Serverless',
			description: 'Finish it.',
			status: TaskStatus.OPEN,
		},
		{
			id: '71f82121-b357-4a6c-b05c-85940e5e7b3c',
			title: 'UX Design',
			description: 'Keepgoing man',
			status: TaskStatus.OPEN,
		},
	];

	getAllTasks(): Task[] {
		return this.tasks;
	}

	getFilteredTasks(filter: GetTasksFilterDto): Task[] {
		const { status, search } = filter;
		let tasks = this.getAllTasks();

		if (status) tasks = tasks.filter(t => t.status === status);
		if (search)
			tasks = tasks.filter(
				t => t.title.includes(search) || t.description.includes(search),
			);

		return tasks;
	}

	getTaskById(id: string): Task {
		const task = this.tasks.find(t => t.id === id);
		if (!task)
			throw new NotFoundException(
				`Task with id: "${id}" does not exist...`,
			);
		return task;
	}

	createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description } = createTaskDto;

		const task: Task = {
			id: uudiv4(),
			title,
			description,
			status: TaskStatus.OPEN,
		};

		this.tasks = [...this.tasks, task];
		return task;
	}

	deleteTask(id: string): Task {
		const deletedTask = this.getTaskById(id);
		this.tasks = this.tasks.filter(t => t.id !== deletedTask.id);
		return deletedTask;
	}

	updateStatusTask(id: string, status: TaskStatus): Task {
		const updatedTask = this.getTaskById(id);
		updatedTask.status = status;
		return updatedTask;
	}
}
