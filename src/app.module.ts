import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CommentsModule } from './modules/comments/comments.module';
import { MoviesModule } from './modules/movies/movies.module';
import { join } from 'path';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().default('localhost'),
        JWT_ACCESS_KEY: Joi.string().default('jwtAccessKey'),
        JWT_ACCESS_EXPIRE: Joi.string().default('expire'),
        JWT_REFRESH_KEY: Joi.string().default('jwtRefreshKey'),
        JWT_REFRESH_EXPIRE: Joi.string().default('expire'),
        GRAPHQL_PLAYGROUND: Joi.boolean().default(true),
      }),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/common/graphql/schema.gql'),
        playground: configService.get<boolean>('GRAPHQL_PLAYGROUND'),
        formatError: (error) => {
          const originalError: any = error.extensions.originalError;
          if (!originalError) {
            return {
              message: error.message,
              code: error.extensions.code,
            };
          }
          return {
            message: originalError.message,
            code: error.extensions.code,
          };
        },
        context: ({ req, res }) => ({ req, res }),
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CommentsModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
