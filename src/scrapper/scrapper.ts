import {Product} from "../interfaces/product";
import {Options} from "../interfaces/options";
import {MarketsData} from "./markets-data";



export abstract class Scrapper {

    protected options!: Options;

    public productList: Array<Product>;

    protected productIndex: number;


    constructor() {

        this.productList = [];
        this.productIndex = 0;

    }

    public abstract scrap(): any;




}