import { Injectable } from '@nestjs/common';
import { Issue, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IssueService {
  constructor(private prisma: PrismaService) {}

  async getIssues(): Promise<Issue[]> {
    return this.prisma.issue.findMany();
  }

  async createIssue(issue: Prisma.IssueCreateInput): Promise<Issue> {
    return this.prisma.issue.create({
      data: issue,
    });
  }
}
