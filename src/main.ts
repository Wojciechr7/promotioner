import {Scrapper} from "./scrapper/scrapper";
import {BiedronkaScrapper} from "./scrapper/markets/biedronka-scrapper";
import {LidlScrapper} from "./scrapper/markets/lidl-scrapper";
import {TescoScrapper} from "./scrapper/markets/tesco-scrapper";
import {MarketsData} from "./scrapper/markets-data";

export class Main {

    public scrappers: Array<Scrapper>;


    constructor() {
        this.scrappers = [
            new BiedronkaScrapper(),
            /*            new LidlScrapper(),
                        new TescoScrapper()*/
        ];


        /*this.scrappers[0].scrap().then(() => {
            console.log(this.scrappers[0].productList);
        })*/


    }


}