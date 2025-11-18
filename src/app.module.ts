
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaferRagModule } from './modules/safer-rag/safer-rag.module';

@Module({
  imports: [SaferRagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
