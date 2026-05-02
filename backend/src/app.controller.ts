import { Controller, Post, Body, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,
  ) {}

  @Post('reports')
  async createReport(@Body() body: any) {
    const report = this.reportRepo.create(body);
    await this.reportRepo.save(report);

    return {
      message: 'Laporan berhasil disimpan ke database',
      data: report,
    };
  }

  @Get('reports')
  async getReports() {
    return this.reportRepo.find();
  }
}
