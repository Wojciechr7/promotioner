
import rp from 'request-promise';
import {Scrapper} from "../scrapper";
import cheerio from "cheerio";
import {MarketsData} from "../markets-data";
import {Product} from "../../interfaces/product";


export class LidlScrapper extends Scrapper {

    constructor() {
        super();

        this.options = {
            uri: `http://www.biedronka.pl/pl/w-tym-tyg-26-07`,
            transform: (body: string) => {
                return cheerio.load(body);
            }
        };


        /*this.marketsData = new MarketsData();

        this.marketsData.Markets[0].urls().then(($: any) => {
            console.log($('.has-childs').text());
        })*/

    }

    public scrap() {

        return rp(this.options)
            .then(($: any) => {
                $('.productsimple-default').each((i: number, el: string) => {
                    this.productList.push({
                        id: i,
                        name: $(el).find('.tile-name').text().toLowerCase(),
                        pln: parseInt($(el).find('.pln').text()),
                        gr: parseInt($(el).find('.gr').text()),
                        promotion: $(el).find('.product-promo-text').text().toLowerCase(),
                        shop: 'biedronka'
                    });
                });

                console.log('scrapping lidl...');
                //console.log(this.productList);
            })
            .catch((err: any) => {
                console.log(err);
            });

    }



}