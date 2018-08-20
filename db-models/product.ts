import db from '../database-login';
import {ProductList} from '../src/interfaces/product-list';



const Product = {
    getAll: (callback: any) => {
        return db.query("Select * from products", callback);
    },
    getById: (id: number, callback: any) => {
        return db.query("select * from products where Id=?", [id], callback);
    },
    add: (item: ProductList, callback: any) => {
        return db.query("Insert into products values(?,?,?,?,?,?)", [item.id, item.name, item.pln, item.gr, item.promotion, item.shop], callback);
    },
    delete: (id: number, callback: any) => {
        return db.query("delete from products where Id=?", [id], callback);
    },
    update: (id: number, item: ProductList, callback: any) => {
        return db.query("update products set name=?, pln=?, gr=?, promotion=?, shop=? where Id=?", [item.name, item.pln, item.gr, item.promotion, item.shop, id], callback);
    },
    addAll: (items: Array<ProductList>, callback: any) => {

        const itemsArr = items.map(item => {
            return Object.values(item);
        });

        db.query("truncate products", () => {
            return db.query("Insert into products (id, name, pln, gr, promotion, shop) values ?", [itemsArr], callback);
        });


    }
};

export default Product;