import { ApiHideProperty } from '@nestjs/swagger';

export class CreateTodoDto {
    @ApiHideProperty()
    readonly _id: number;

    @ApiHideProperty()
    readonly text: string;

    @ApiHideProperty()
    readonly complete: boolean;

    @ApiHideProperty()
    readonly dueDate: Date;
}