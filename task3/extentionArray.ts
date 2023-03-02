import Product from "./product";

enum StringOperation {
    Contains,
    Starts,
    Ends
}

enum NumberOperation {
    "<",
    "=",
    ">",
    "<=",
    ">="
}

export default class MyArray {
    private readonly _arr: Product[];
    constructor(...arr: Product[]) {
        this._arr = arr;
    }

    public findOnRequest(request: string): Product[] {
        let response: Product[] = this._arr;
        const queries: string[] = request.split("&");

        for (let query of queries) {
            const currentQuery = query.split("-");
            const tempArrayResult: Product[] = [];

            for (let data of response) {
                if (currentQuery.length === 3) {
                    const operation: StringOperation | null = currentQuery[1] === "contains" ?
                        StringOperation.Contains : currentQuery[1] === "starts" ?
                            StringOperation.Starts : currentQuery[1] === "ends" ?
                                StringOperation.Ends : null;

                    if (this.isGoodString(data, currentQuery[0], operation, currentQuery[2])) {
                        tempArrayResult.push(data);
                    }
                } else if (currentQuery.length === 2) {
                    let value: number;
                    let operationStr: string;

                    if (currentQuery[1].slice(0, 2) in [">=", "<="]) {
                        value = Number(currentQuery[1].slice(2));
                        operationStr = currentQuery[1].slice(0, 2);
                    } else {
                        value = Number(currentQuery[1].slice(1));
                        operationStr = currentQuery[1].slice(0, 1);
                    }

                    const operation: NumberOperation | null = operationStr === "<" ?
                        NumberOperation["<"] : operationStr === "=" ?
                            NumberOperation["="] : operationStr === ">" ?
                                NumberOperation[">"] : operationStr === "<=" ?
                                    NumberOperation["<="] : operationStr === ">=" ?
                                        NumberOperation[">="] : null;

                    if (this.isGoodNumber(data, currentQuery[0], operation, value)) {
                        tempArrayResult.push(data);
                    }
                }
            }

            response = tempArrayResult;

        }
        return response;
    }

    private isGoodString(element: Product, field: string, operation: StringOperation | null, value: string): boolean {
        const fieldElement = element.getField(field);

        switch (operation) {
            case StringOperation.Starts:
                return fieldElement.toString().startsWith(value);
            case StringOperation.Ends:
                return fieldElement.toString().endsWith(value);
            case StringOperation.Contains:
                return fieldElement.toString().includes(value);
            default:
                throw "Не верная операция!";
        }
    }

    private isGoodNumber(element: Product, field: string, operation: NumberOperation | null, value: number): boolean {
        const fieldElement = element.getField(field);

        switch (operation) {
            case NumberOperation["<"]:
                return fieldElement.valueOf() < value;
            case NumberOperation["="]:
                return fieldElement.valueOf() == value;
            case NumberOperation[">"]:
                return fieldElement.valueOf() > value;
            case NumberOperation["<="]:
                return fieldElement.valueOf() <= value;
            case NumberOperation[">="]:
                return fieldElement.valueOf() >= value;
            default:
                throw "Не верная операция!";
        }
    }
}