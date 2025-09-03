import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'your_username',
      password: 'your_password', //TODO: Change with your crendantials I am lazy for .env
      database: 'your_db',
      entities: [Posts],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Posts]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
