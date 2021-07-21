import Category from "../Models/Category";
import Item from "../Models/Item";


export const CATEGORIES = [
    new Category('c1', 'Итальянская еда', require('../Images/Italia.jpg'))
]


export const ITEMS = [
    new Item('i1', 'c1', 'Карбонара', require('../Images/Carbonara.jpg'), 'Спагетти с беконом', 500),
    new Item('i2', 'c1', 'Пицца', require('../Images/Pizza.jpg'), 'Пицца с ветчиной и грибами', 600),
    new Item('i3', 'c1', 'Тирамису', require('../Images/Tiramisu.jpg'), 'Десерт с мягким привкусом кофе', 400)
]