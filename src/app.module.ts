import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { GroupModule } from './group/group.module';
import { CommunityModule } from './community/community.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule, AuthModule, PostModule, CommentModule, LikeModule, GroupModule, CommunityModule, ConversationModule, MessageModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ChatGateway],
})
export class AppModule {}




