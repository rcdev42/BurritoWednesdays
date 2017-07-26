import { Order } from './order';

export interface Participant {
    $key: string;
    
    defaultOrderKey?: string;
    defaultOrder?: Order;

    name: string;
    sequence: number;
    optInOut: boolean;
    purchaseTurn: boolean;
};