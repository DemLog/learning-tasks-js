import MyArray from "./extentionArray";
import Product from "./product";

const arr: MyArray = new MyArray(
    new Product('Капуста', 58, 150, "Овощь"),
    new Product('Картофель', 80, 300, "Овощь"),
    new Product("Молоко", 75, 243, "Молочный продукт"),
);

const res = arr.findOnRequest("name-contains-Мол&price->58&quantity->100&description-ends-кт");
console.log(res);