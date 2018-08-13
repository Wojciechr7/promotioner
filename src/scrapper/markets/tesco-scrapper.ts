import {Scrapper} from "../scrapper";
import rp from 'request-promise';
import Promise from 'bluebird';
import {Product} from "../../interfaces/product";


export class TescoScrapper extends Scrapper {

    private menuUrls: Array<string>;


    constructor(protected product: Product) {
        super(product);

        this.menuUrls = [];

        this.options.uri = `https://tesco.pl/promocje/oferta-tygodnia`;

    }

    public scrap(): Promise<any> {

        return this.mainScrap().then(() => {
            const requests = this.createAdditionalRequests();

            return Promise.all(requests).then((responses: any) => {
                responses.forEach(($: CheerioSelector) => {

                    $('.a-productListing__productsGrid__element').each((i: number, el: CheerioElement) => {
                        let pln = $(el).find('.new-price').html()!, gr = $(el).find('.new-price sup').text();
                        this.product.list.push({
                            id: this.product.index++,
                            name: $(el).find('.name').text().replace(/\n/g, '').toLowerCase().replace( /\s\s/g, ''),
                            pln: parseInt(pln.substr(0, pln.indexOf('<'))),
                            gr: parseInt(gr),
                            promotion: $(el).find('.discount span').text(),
                            shop: 'tesco'
                        });
                    })
                });
            })
        });


    }

    private mainScrap(): Promise<any> {
        const requests = this.createRequests();

        return Promise.all(requests).then((responses: any) => {
            responses.forEach(($: CheerioSelector, i: number) => {

                let pagesCount: number = parseInt($('.ddl_plp_pagination .label').last().text().replace(/\s/g, ''));

                if (pagesCount) {
                    for (let j = 1; j <= pagesCount; j++) {
                        this.additionalUrls.push(`${this.menuUrls[i]}?page=${j}`);
                    }

                } else {
                    this.additionalUrls.push(this.menuUrls[i]);
                }
            });
        });

    }

    private createAdditionalRequests(): Promise<any> {
        return this.additionalUrls.map((url: string) => {
            this.options.uri = `https://tesco.pl${url}`;
            return rp(this.options);
        });

    }

    protected createRequests(): Promise<any> {
        return rp(this.options)
            .then(($: CheerioSelector) => {

                const urls: Array<string> = [];

                $('.m-categories li').each((i: number, el: CheerioElement) => {
                    if (i > 0 && i < 7) {
                        urls.push($(el).find('a').attr('href'));
                    }
                });
                this.menuUrls = urls;

                return urls.map((url: string) => {
                    this.options.uri = `https://tesco.pl${url}`;
                    return rp(this.options);
                });
            })
    }


}

