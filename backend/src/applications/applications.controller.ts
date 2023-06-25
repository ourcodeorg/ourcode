import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import {
  CreateApplicationDTO,
  DeleteApplicationDTO,
} from './dto/application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() deleteApplicationDto: DeleteApplicationDTO,
  ) {
    return this.applicationsService.remove(id, deleteApplicationDto.user);
  }
}
