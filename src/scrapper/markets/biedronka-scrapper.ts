import {Scrapper} from "../scrapper";
import rp from 'request-promise';
import cheerio from "cheerio";
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

        return this.mainScrap().then(() => {
            const requests = this.createAdditionalRequests();

            return Promise.all(requests).then((responses: any) => {
                responses.forEach(($: CheerioSelector) => {
                    const price = $('.prod-cat-descryption .product-description').eq(1).text().replace( /\s/g, '');
                    if (price) {
                        let pln = price, gr = price;
                        this.productList.push({
                            id: this.productIndex++,
                            name: $('.prod-cat-descryption h3').text().toLowerCase(),
                            pln: parseInt(pln.substr(0, pln.indexOf(','))),
                            gr: parseInt(gr.substring(gr.indexOf(',') + 1, gr.indexOf('z'))),
                            promotion: '',
                            shop: 'biedronka'
                        });

                    }
                })
            })
        })
    }


    private mainScrap(): Promise<any> {
        const requests = this.createRequests();

        return Promise.all(requests).then((responses: any) => {
            responses.forEach(($: CheerioSelector) => {
                $('.productsimple-default').each((i: number, el: CheerioElement) => {
                    if ($(el).find('.pln').length) {
                        this.productList.push({
                            id: this.productIndex++,
                            name: $(el).find('.tile-name').text().toLowerCase(),
                            pln: parseInt($(el).find('.pln').text()),
                            gr: parseInt($(el).find('.gr').text()),
                            promotion: $(el).find('.product-promo-text').text().toLowerCase(),
                            shop: 'biedronka'
                        });
                    } else {
                        this.additionalUrls.push($(el).find('a').attr('href'));
                    }
                })
            });
        })
    }

    public createAdditionalRequests(): Promise<any> {
        return this.additionalUrls.map((url: string) => {
            this.options.uri = `http://www.biedronka.pl${url}`;
            return rp(this.options);
        });
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