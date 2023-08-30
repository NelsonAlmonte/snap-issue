import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { IssueService } from './issue.service';
import { Issue, Prisma } from '@prisma/client';

@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Post()
  async create(
    @Body() createIssueDto: Prisma.IssueCreateInput,
  ): Promise<Issue | BadRequestException> {
    const issue = await this.issueService.createIssue(createIssueDto);
    if (!issue)
      throw new BadRequestException(
        'Hubo un error al reportar esta incidencia',
      );
    return issue;
  }
}
