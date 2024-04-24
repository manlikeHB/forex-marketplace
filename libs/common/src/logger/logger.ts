import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService {
  constructor(private configService: ConfigService) {}

  // log data to console
  log(...data: any[]): void {
    if (this.configService.get<string>('NODE_ENV') == 'DEVELOPMENT')
      console.log(...data);
  }

  // log error to console
  error(...data: any[]): any {
    if (this.configService.get<string>('NODE_ENV') == 'DEVELOPMENT')
      console.error(...data);
  }
}
