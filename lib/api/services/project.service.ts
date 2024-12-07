import { prisma } from '@/lib/prisma';
import type { TrackProjectInput } from '../types/project';

export class ProjectService {
  static async getAllProjects() {
    return prisma.nFTProject.findMany({
      include: {
        socialMetrics: true,
      },
    });
  }

  static async getProjectMetrics(projectId: string) {
    return prisma.socialMetrics.findUnique({
      where: { projectId },
      include: {
        project: true,
      },
    });
  }

  static async trackProject(data: TrackProjectInput) {
    return prisma.nFTProject.create({
      data: {
        ...data,
        socialMetrics: {
          create: {},
        },
      },
      include: {
        socialMetrics: true,
      },
    });
  }
}