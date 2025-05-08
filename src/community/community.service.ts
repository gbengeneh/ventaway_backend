import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommunityDto, userId: string) {
    return this.prisma.community.create({
      data: {
        name: dto.name,
        description: dto.description,
        members: {
          create: {
            userId,
            role: 'admin', // creator becomes admin
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.community.findMany({
      include: { members: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.community.findUnique({
      where: { id },
      include: { members: true },
    });
  }

  async update(id: string, dto: UpdateCommunityDto) {
    return this.prisma.community.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.community.delete({
      where: { id },
    });
  }

  async addMember(communityId: string, userId: string, role = 'member') {
    return this.prisma.communityMember.create({
      data: {
        communityId,
        userId,
        role,
      },
    });
  }

  async removeMember(communityId: string, userId: string) {
    return this.prisma.communityMember.deleteMany({
      where: {
        communityId,
        userId,
      },
    });
  }

  async updateMemberRole(communityId: string, userId: string, role: string) {
    return this.prisma.communityMember.updateMany({
      where: {
        communityId,
        userId,
      },
      data: { role },
    });
  }
}
