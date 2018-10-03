import express from 'express';
import main from '../src/index';
import Product from '../db-models/product';
import Time from '../db-models/time';
import moment from 'moment';


// probably need to move full array at once

const router = express.Router();

router.get('/', (req: any, res: any, next: any) => {
    Product.getAll((err: any, items: any) => {
        if (err) console.log(err);
        else res.json(items);
    });


});


router.post('/', (req: any, res: any, next: any) => {
        Time.get((err: any, response: any) => {
            if (err) console.error(err);
            else if (response.length) {
                const duration = moment.duration(moment(new Date()).diff(moment(response[0].time)));
                if (duration.asMinutes() > 5) {
                    Time.update(new Date(), (err: any) => {
                        if (err) console.error(err);
                        else {
                            main.product.list = [];
                            main.product.index = 1;
                            main.scrapAll().then(() => {
                                Product.addAll(main.product.list, (err: any) => {
                                    if (err) console.log(err);
                                    else {
                                        res.json(0);
                                    }
                                });
                            });
                        }
                    });
                } else {
                    res.json((5 - duration.asMinutes()).toFixed(2));
                }
            }
            else {
                Time.add(new Date(), (err: any) => {
                    if (err) throw err;
                    main.product.list = [];
                    main.product.index = 1;
                    main.scrapAll().then(() => {
                        Product.addAll(main.product.list, (err: any) => {
                            if (err) console.log(err);
                            else {
                                res.json(0);
                            }
                        });
                    });
                });
            }

        });

});


export default router;