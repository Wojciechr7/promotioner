import {Product} from "../interfaces/product";
import {Options} from "../interfaces/options";
import Promise from "bluebird";




export abstract class Scrapper {

    protected options!: Options;

    public productList: Array<Product>;

    protected productIndex: number;

    public additionalUrls: any;

    constructor() {

        this.productList = [];
        this.productIndex = 0;

        this.additionalUrls = [];



    }

    public abstract scrap(): Promise<any>;




}