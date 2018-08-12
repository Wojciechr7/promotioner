import {Scrapper} from "../scrapper";
import rp from 'request-promise';
import cheerio from "cheerio";
import Promise from 'bluebird';


export class LidlScrapper extends Scrapper {

    constructor() {
        super();

        this.options = {
            uri: `https://www.lidl.pl`,
            transform: (body: string) => {
                return cheerio.load(body);
            }
        };

    }

    public scrap(): Promise<any> {
        const requests = this.createRequests();

        return Promise.all(requests).then((responses: any) => {
            responses.forEach(($: CheerioSelector) => {
                $('ul.productgrid__list .product__body').each((i: number, el: CheerioElement) => {
                    let pln = $(el).find('.pricefield__price').text(), gr = $(el).find('.pricefield__price').text();

                    this.productList.push({
                        id: this.productIndex++,
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

    private createRequests(): Promise<any> {
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