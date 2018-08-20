
import {Options} from "../interfaces/options";
import Promise from "bluebird";
import cheerio from "cheerio";




export abstract class Scrapper {

    protected options: Options;

    public additionalUrls: any;

    public productList: any;


    protected constructor(protected product: any) {

        this.additionalUrls = [];
        this.productList = [];

        this.options = {
            uri: ``,
            transform: (body: string) => {
                return cheerio.load(body);
            }
        };



    }

    public abstract scrap(): Promise<any>;
    protected abstract createRequests(): Promise<any>;




}