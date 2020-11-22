import { WeightsService } from '../weights/weightsTest.class';
import { MessageService } from '../message/message.class';

export const Services = {
  WeightsService: WeightsService.getInstance(),
  MessageService: MessageService.getInstance(),
};

export type IServices = typeof Services;
