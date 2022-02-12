import { Container } from 'inversify'
import 'reflect-metadata'
import DialogService from './services/DialogService';
import RoutingService from './services/RoutingService';
import AuthService from './services/AuthService';
import ProductService from './services/ProductService';
import MasterDataService from './services/MasterDataService';


let container:Container = new Container();

container.bind(DialogService).toSelf().inSingletonScope();
container.bind(AuthService).toSelf().inSingletonScope();
container.bind(ProductService).toSelf().inSingletonScope();
container.bind(MasterDataService).toSelf().inSingletonScope();
container.bind(RoutingService).toSelf().inSingletonScope();

export {container}
