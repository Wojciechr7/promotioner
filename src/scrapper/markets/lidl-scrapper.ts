import {Scrapper} from "../scrapper";
import rp from 'request-promise';
import Promise from 'bluebird';
import {Product} from "../../interfaces/product";


export class LidlScrapper extends Scrapper {

    constructor(protected product: Product) {
        super(product);

        this.options.uri = `https://www.lidl.pl`;

    }

    public scrap(): Promise<any> {
        const requests = this.createRequests();

        return Promise.all(requests).then((responses: any) => {
            responses.forEach(($: CheerioSelector) => {
                $('ul.productgrid__list .product__body').each((i: number, el: CheerioElement) => {
                    let pln = $(el).find('.pricefield__price').text(), gr = $(el).find('.pricefield__price').text();

                    this.product.list.push({
                        id: this.product.index++,
                        name: $(el).find('.product__title').text().toLowerCase(),
                        pln: parseInt(pln.substr(0, pln.indexOf(','))),
                        gr: parseInt(gr.substring(gr.indexOf(',') + 1, gr.indexOf('z'))),
                        promotion: '',
                        shop: 'lidl'
                    });
                })

            });
        });


    }

    protected createRequests(): Promise<any> {
        return rp(this.options)
            .then(($: CheerioSelector) => {
                this.options.uri = `https://www.lidl.pl${$('.navigation--main .slick-slide a').first().attr('href')}`;
                return rp(this.options)
                    .then(($: CheerioSelector) => {
                        const urls: Array<string> = [];
                        $('.tabnavaccordion li').first().find('a.theme__item').each((i: number, el: CheerioElement) => {
                            urls.push($(el).attr('href'));
                        });
                        return urls.map((url: string) => {
                            this.options.uri = `https://www.lidl.pl${url}`;
                            return rp(this.options);
                        });
                    });

            })
    }


}