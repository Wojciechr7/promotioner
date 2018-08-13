import express from 'express';

import main from '../src/index';


const router = express.Router();

router.get('/', (req: any, res: any, next: any) => {
    if (main.product.list.length === 0) {
        Promise.all(main.scrappers.map(el => el.scrap())).then(() => {
            res.json(main.product.list);
        });
    } else {
        res.json(main.product.list);
    }

});


export default router;