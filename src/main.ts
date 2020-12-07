import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerMiddleware, logger } from './middleware/logger.middleware';


const Logger = new LoggerMiddleware().use;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(Logger);
  app.setGlobalPrefix('base'); // 全局路由前缀，类似于某个具体的服务名

  const options = new DocumentBuilder()
    .setTitle('heros example')
    .setDescription('The heros API description')
    .setVersion('1.0')
    // .addTag('heros')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('base', app, document);

  
  // http://10.177.11.128:3001/base/#/
  await app.listen(3001);

  // 将服务注册到 eureka
  const Eureka = require('eureka-client').Eureka;
  const client = new Eureka({
      instance: {
          app: '3001-Node-Server',
          hostName: '10.177.11.128:3001',
          ipAddr: '10.177.11.128',
          statusPageUrl: 'http://10.177.11.128:3001/base/#/',
          port: {'$': 3001, '@enabled': 'true',},
          vipAddress: 'test.something.com',
          dataCenterInfo: {'@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo', name: 'MyOwn',},
      }, eureka: {serviceUrl: [
        'http://192.168.110.121:7891/eureka/apps/'
      ],},
  });
  client.start((error) => {
    console.log(error || 'Node server register completed');
  });

}
bootstrap();
