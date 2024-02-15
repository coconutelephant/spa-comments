import { Controller, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller("coments")
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {}

    @Get()
    getHello(): string {
        return this.commentService.getHello();
    }
}
