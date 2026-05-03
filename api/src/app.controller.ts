import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('reports')
export class AppController {
  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,
  ) {}

  // ✅ CREATE + UPLOAD
  @Post()
  @UseInterceptors(
    FileInterceptor('bukti', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async createReport(@Body() body: any, @UploadedFile() file: any) {
    const report = this.reportRepo.create({
      ...body,
      bukti: file?.filename || null,
    });

    await this.reportRepo.save(report);

    return report;
  }

  // ✅ GET ALL
  @Get()
  async getReports() {
    return this.reportRepo.find();
  }

  // ✅ DELETE
  @Delete(':id')
  async deleteReport(@Param('id') id: number) {
    await this.reportRepo.delete(id);
    return { message: 'Laporan dihapus' };
  }

  // ✅ UPDATE STATUS
  @Patch(':id')
  async updateStatus(@Param('id') id: number) {
    const report = await this.reportRepo.findOneBy({ id });

    if (!report) {
      return { message: 'Data tidak ditemukan' };
    }

    report.status = report.status === 'pending' ? 'selesai' : 'pending';

    await this.reportRepo.save(report);

    return report;
  }
}
