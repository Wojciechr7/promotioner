export interface Options {
    uri: string,
    transform(body: string): CheerioStatic
}