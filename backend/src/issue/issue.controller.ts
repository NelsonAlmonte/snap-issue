import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { IssueService } from './issue.service';
import { Issue, Prisma } from '@prisma/client';
import { writeFileSync } from 'fs';
import { generate } from 'randomstring';

@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Get()
  async issues(): Promise<Issue[]> {
    return await this.issueService.getIssues();
  }

  @Post()
  async create(
    @Body() createIssueDto: Prisma.IssueCreateInput,
  ): Promise<Issue | BadRequestException> {
    createIssueDto.image = this.saveImage(createIssueDto.image);
    const issue = await this.issueService.createIssue(createIssueDto);
    if (!issue)
      throw new BadRequestException(
        'Hubo un error al reportar esta incidencia',
      );
    return issue;
  }

  saveImage(base64: string): string {
    const base64Image = base64.split(';base64,').pop();
    const fileName = `${generate(16)}.jpg`;
    const buffer = Buffer.from(base64Image, 'base64');
    writeFileSync(`uploads/issues-images/${fileName}`, buffer);
    return fileName;
  }
}
