import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uudiv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private taskRepository: TaskRepository,
	) {}

	async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.taskRepository.getTasks(filterDto);
	}
	// getAllTasks(): Task[] {
	// 	return this.tasks;
	// }
	// getFilteredTasks(filter: GetTasksFilterDto): Task[] {
	// 	const { status, search } = filter;
	// 	let tasks = this.getAllTasks();
	// 	if (status) tasks = tasks.filter(t => t.status === status);
	// 	if (search)
	// 		tasks = tasks.filter(
	// 			t => t.title.includes(search) || t.description.includes(search),
	// 		);
	// 	return tasks;
	// }

	async getTaskById(id: number): Promise<Task> {
		const found = await this.taskRepository.findOne(id);
		if (!found)
			throw new NotFoundException(
				`Task with id: "${id}" does not exist...`,
			);
		return found;
	}

	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		return this.taskRepository.createTask(createTaskDto);
	}

	async deleteTask(id: number): Promise<void> {
		// const found = await this.taskRepository.findOne(id);
		// if (!found)
		// 	throw new NotFoundException(
		// 		`Task with id: "${id}" does not exist...`,
		// 	);
		const result = await this.taskRepository.delete(id);
		if (!result.affected)
			throw new NotFoundException(
				`Task with id: "${id}" does not exist...`,
			);
	}

	async updateStatusTask(id: number, status: TaskStatus): Promise<Task> {
		const task = await this.getTaskById(id);
		task.status = status;
		await task.save();
		return task;
	}
}
