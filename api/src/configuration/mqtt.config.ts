import { ConfigService } from '@nestjs/config';
import { MqttModuleOptions } from 'nest-mqtt';

export function useMqttConfiguration(
  configService: ConfigService,
): MqttModuleOptions {
  const config: MqttModuleOptions = {
    host: configService.get<string>('MQTT_BROKER_URL', 'localhost'),
    port: configService.get<number>('MQTT_BROKER_PORT', 9001),
    username: configService.get<string>('MQTT_BROKER_USERNAME', ''),
    password: configService.get<string>('MQTT_BROKER_PASSWORD', ''),
    protocol: 'ws',
  };
  return config;
}
