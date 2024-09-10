export interface StockItem {
    _id: string;
    itemName: string;
    quantity: number;
    price: number;
    description: string;
}

export interface CreateItemPayload {
    itemName: string;
    quantity: number;
    price: number;
    description: string;
}

export interface UpdateItemPayload {
    price: number;
    description: string;
}



//<Alert severity="error">Item deleted. <Button onClick={()=>navigate(-1)}>go back</Button></Alert>

export interface AlertInterface {
    type: string,
    alert: string
}