import cheerio from 'cheerio';
import rp from 'request-promise';

export class MarketsData {

    public markets: any;

    constructor() {

        this.markets = [
            {
                name: 'biedronka',
                products: []
            }
        ]

    }




}