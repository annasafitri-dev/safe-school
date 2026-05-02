import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller()
export class AppController {
  private reports: any[] = [];

  @Post('reports')
  createReport(@Body() body: any) {
    this.reports.push(body);

    return {
      message: 'Laporan berhasil disimpan',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: body,
    };
  }

  @Get('reports')
  getReports() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.reports;
  }
}
