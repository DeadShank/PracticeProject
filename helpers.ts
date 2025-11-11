export async function loadHomepage(page: any) {
    await page.goto("http://www.example.com");
}
export async function loadHomepageCoinMarket(page: any){
    await page.goto("https://coinmarketcap.com")
}

export async function assertTitle(page: any) {
    await page.waitForSelector('h1');
}