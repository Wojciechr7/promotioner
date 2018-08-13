
import {Options} from "../interfaces/options";
import Promise from "bluebird";
import cheerio from "cheerio";




export abstract class Scrapper {

    protected options: Options;

    protected additionalUrls: any;


    protected constructor(protected product: any) {

        this.additionalUrls = [];

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