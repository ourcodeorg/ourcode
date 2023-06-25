import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import {
  ArchiveApplicationDTO,
  DeleteApplicationDTO,
} from './dto/application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id/archive')
  archive(
    @Param('id') id: string,
    @Body() archiveApplicationDto: ArchiveApplicationDTO,
  ) {
    return this.applicationsService.archive(id, archiveApplicationDto.user);
  }

  @Patch(':id/unarchive')
  unarchive(
    @Param('id') id: string,
    @Body() archiveApplicationDto: ArchiveApplicationDTO,
  ) {
    return this.applicationsService.unarchive(id, archiveApplicationDto.user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() deleteApplicationDto: DeleteApplicationDTO,
  ) {
    return this.applicationsService.remove(id, deleteApplicationDto.user);
  }
}
