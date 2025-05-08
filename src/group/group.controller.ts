// src/group/group.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Req } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // Create a new group
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Req() req) {
    return this.groupService.create(createGroupDto, req.user.sub);
  }

  @UseGuards(JwtGuard , AdminGuard)
@Patch(':groupId/members/:userId/role')
updateRole(
  @Param('groupId') groupId: string,
  @Param('userId') userId: string,
  @Body('role') role: string
) {
  return this.groupService.updateRole(groupId, userId, role);
}
  // Get all groups
  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  // Get group by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  // Update a group
  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  // Delete a group
  @UseGuards(JwtGuard , AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }

  // Add member to a group
  @UseGuards(JwtGuard, AdminGuard)
  @Post(':groupId/members/:userId')
  addMember(
    @Param('groupId') groupId: string, 
    @Param('userId') userId: string, 
    @Body('role') role: string = 'member'
  ) {
    return this.groupService.addMember(groupId, userId, role);
  }

  // Remove a member from a group
  @UseGuards(JwtGuard, AdminGuard)
  @Delete(':groupId/members/:userId')
  removeMember(@Param('groupId') groupId: string, @Param('userId') userId: string) {
    return this.groupService.removeMember(groupId, userId);
  }
}
