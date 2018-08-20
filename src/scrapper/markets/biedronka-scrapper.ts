import {Scrapper} from "../scrapper";
import rp from 'request-promise';
import Promise from 'bluebird';
import {Product} from "../../interfaces/product";


export class BiedronkaScrapper extends Scrapper {


    constructor(protected product: Product) {
        super(product);

        this.options.uri = `http://www.biedronka.pl/pl`;

    }


    public scrap(): Promise<any> {
        return this.mainScrap().then(() => {
            const requests = this.createAdditionalRequests();

            return Promise.all(requests).then((responses: any) => {
                responses.forEach(($: CheerioSelector) => {
                    const price = $('.prod-cat-descryption .product-description').eq(1).text().replace(/\s/g, '');
                    if (price) {
                        let pln = price, gr = price;
                        this.product.list.push({
                            id: this.product.index++,
                            name: $('.prod-cat-descryption h3').text().toLowerCase(),
                            pln: parseInt(pln.substr(0, pln.indexOf(','))),
                            gr: parseInt(gr.substring(gr.indexOf(',') + 1, gr.indexOf('z'))),
                            promotion: '',
                            shop: 'biedronka'
                        });
                    }
                });
            })
        })

    }



    private mainScrap(): Promise<any> {
        const requests = this.createRequests();
        this.additionalUrls = [];
        return Promise.all(requests).then((responses: any) => {
            responses.forEach(($: CheerioSelector) => {
                $('.productsimple-default').each((i: number, el: CheerioElement) => {
                    if ($(el).find('.pln').length) {
                        this.product.list.push({
                            id: this.product.index++,
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

    private createAdditionalRequests(): Promise<any> {
        return this.additionalUrls.map((url: string) => {
            this.options.uri = `http://www.biedronka.pl${url}`;
            return rp(this.options);
        });
    }


    protected createRequests(): Promise<any> {
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