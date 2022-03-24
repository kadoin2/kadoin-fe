import { injectable } from "inversify";
import CustomEventHandler from './../utils/CustomEventHandler';

@injectable()
export default class EventService
{
    public readonly onProductSearchKeyUpdate: CustomEventHandler<string> = new CustomEventHandler<string>();
}