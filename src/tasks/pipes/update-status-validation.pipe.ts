import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
	readonly allowedStatuses = [
		TaskStatus.OPEN,
		TaskStatus.WIP,
		TaskStatus.DONE,
	];

	transform(value: any) {
		value = value.toUpperCase();

		if (!this.isStatusValid(value))
			throw new BadRequestException(
				`${value} is not a valid status. Please try with 'open', 'wip' or 'done'`,
			);

		return value;
	}

	private isStatusValid(status: any) {
		const stat = this.allowedStatuses.indexOf(status);
		return stat !== -1;
	}
}
