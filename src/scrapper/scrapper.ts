import cheerio from 'cheerio';
import rp from 'request-promise';
import {Product} from "../interfaces/product";
import {Options} from "../interfaces/options";
import {MarketsData} from "./markets-data";



export class Scrapper {

    private options: Options;

    private productList: Array<Product>;

    private marketsData: MarketsData;


    constructor() {

        this.productList = [];

        this.options = {
            uri: `http://www.biedronka.pl/pl/w-tym-tyg-26-07`,
            transform: (body: string) => {
                return cheerio.load(body);
            }
        };

        this.marketsData = new MarketsData();

        this.marketsData.Markets[0].urls().then(($: any) => {
            console.log($('.has-childs').text());
        })

        //this.scrap(this.productList);

    }



    private scrap(pl: Array<Product>): void {
        rp(this.options)
            .then(($: any) => {
                $('.productsimple-default').each((i: number, el: string) => {
                    pl.push({
                        id: i,
                        name: $(el).find('.tile-name').text().toLowerCase(),
                        pln: parseInt($(el).find('.pln').text()),
                        gr: parseInt($(el).find('.gr').text()),
                        promotion: $(el).find('.product-promo-text').text().toLowerCase(),
                        shop: 'biedronka'
                    });
                });

                //console.log(pl);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }




}