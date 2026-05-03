import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Controller('reports')
export class AppController {
  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,
  ) {}

  @Post()
  async createReport(@Body() body: any) {
    const report = this.reportRepo.create(body);
    await this.reportRepo.save(report);

    return {
      message: 'Laporan berhasil disimpan ke database',
      data: report,
    };
  }

  @Get()
  async getReports() {
    return this.reportRepo.find();
  }

  @Delete(':id')
  async deleteReport(@Param('id') id: number) {
    await this.reportRepo.delete(id);
    return { message: 'Laporan dihapus' };
  }
}
