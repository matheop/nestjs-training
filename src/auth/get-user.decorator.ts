import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// allows us to get the User who sent the request
// very helpful when we need to assign
// a new created task to a user
export const GetUser = createParamDecorator(
	(data, ctx: ExecutionContext): User => {
		const req = ctx.switchToHttp().getRequest();
		return req.user;
	},
);
