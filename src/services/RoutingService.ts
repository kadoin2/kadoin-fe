import { injectable } from "inversify";
import CustomEventHandler from './../utils/CustomEventHandler';

@injectable()
export default class RoutingService
{
    public readonly routeUpdateCallbacks: CustomEventHandler<string> = new CustomEventHandler<string>();

    constructor()
    {

    }

    
    updateRoute = (url:string) => {
        console.debug("Route changed via call to navigate: " + url);
        this.routeUpdateCallbacks.invoke(url);
    }
}