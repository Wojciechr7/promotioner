import {Scrapper} from "./scrapper/scrapper";
import {BiedronkaScrapper} from "./scrapper/markets/biedronka-scrapper";
import {LidlScrapper} from "./scrapper/markets/lidl-scrapper";
import {TescoScrapper} from "./scrapper/markets/tesco-scrapper";
import {Product} from "./interfaces/product";


export class Main {

    public scrappers: Array<Scrapper>;

    public product: Product;

    constructor() {

        this.product = {
            index: 1,
            list: []
        };

        this.scrappers = [
            new BiedronkaScrapper(this.product),
            new LidlScrapper(this.product),
            new TescoScrapper(this.product)
        ];




    }


}