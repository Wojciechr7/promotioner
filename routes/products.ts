import express from 'express';

import main from '../src/index';


const router = express.Router();

router.get('/', (req: any, res: any, next: any) => {
    if (main.scrappers[0].productList.length === 0) {
        main.scrappers[0].scrap().then(() => {
            res.json(main.scrappers[0].productList);
        });
    } else {
        res.json(main.scrappers[0].productList);
    }

});


export default router;