import express from 'express';
import main from '../src/index';
import Product from '../db-models/product';



// probably need to move full array at once

const router = express.Router();

router.get('/', (req: any, res: any, next: any) => {
    Product.getAll((err: any, items: any) => {
        if (err) console.log(err);
        else res.json(items);
    });
});

router.post('/', (req: any, res: any, next: any) => {
    main.product.list = [];
    main.product.index = 1;
    main.scrapAll().then(() => {
        Product.addAll(main.product.list, (err: any) => {
            if (err) console.log(err);
            else res.json(main.product.list);
        });
    });
});


export default router;