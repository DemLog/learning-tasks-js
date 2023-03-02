export default class Product {
    private readonly _name: string;
    private readonly _price: number;
    private readonly _quantity: number;
    private readonly _description: string;
    constructor(name: string, price: number, quantity: number, description: string) {
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._description = description;
    }
    public get name(): string {
        return this._name;
    }
    public get price(): number {
        return this._price;
    }
    public get quantity(): number {
        return this._quantity;
    }
    public get description(): string {
        return this._description;
    }

    public getField(field: string): string | number {
        switch (field) {
            case "name":
                return this.name;
            case "price":
                return this.price;
            case "quantity":
                return this.quantity;
            case "description":
                return this.description;
            default:
                throw "Нет такого поля!";
        }
    }
}