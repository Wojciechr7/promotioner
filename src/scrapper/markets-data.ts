import cheerio from 'cheerio';
import rp from 'request-promise';

export class MarketsData {

    private markets: any;

    constructor() {

        this.markets = [
            {
                name: 'biedronka',
                urls: () => {
                    let options = {
                        uri: `http://www.biedronka.pl/pl`,
                        transform: (body: string) => {
                            return cheerio.load(body);
                        }
                    };
                    return rp(options);


                    //return ['sdgsdg', 'dsgdsg']
                }
            }
        ]

    }

    get Markets() {
        return this.markets;
    }



}