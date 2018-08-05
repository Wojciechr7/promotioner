import {Scrapper} from "../scrapper";
import rp from 'request-promise';
import cheerio from "cheerio";
import {MarketsData} from "../markets-data";
import {Product} from "../../interfaces/product";
import Promise from 'bluebird';


export class BiedronkaScrapper extends Scrapper {


    constructor() {
        super();

        this.options = {
            uri: `http://www.biedronka.pl/pl`,
            transform: (body: string) => {
                return cheerio.load(body);
            }
        };



    }


    public scrap(): Promise<any> {
        const requests = this.createRequests();

        return Promise.all(requests).then((responses: any) => {
            responses.forEach(($: CheerioSelector) => {
                $('.productsimple-default').each((i: number, el: CheerioElement) => {
                    this.productList.push({
                        id: this.productIndex++,
                        name: $(el).find('.tile-name').text().toLowerCase(),
                        pln: parseInt($(el).find('.pln').text()),
                        gr: parseInt($(el).find('.gr').text()),
                        promotion: $(el).find('.product-promo-text').text().toLowerCase(),
                        shop: 'biedronka'
                    });
                })
            });
        })
    }


    private createRequests(): Promise<any> {
        return rp(this.options)
            .then(($: CheerioSelector) => {
                const urls: Array<string> = [];
                $('.has-childs').first().find('li a').each((i: number, el: CheerioElement) => {
                    if (!$(el).attr('href').indexOf('/pl/')) {
                        urls.push($(el).attr('href'));
                    }
                });
                return urls.map((url: string) => {
                    this.options.uri = `http://www.biedronka.pl${url}`;
                    return rp(this.options);
                });

            });
    }


}