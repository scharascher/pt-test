const selectedCart = [
        {price: 20},
        {price: 45},
        {price: 67},
        {price: 1305}
    ],
    currencies = ['EUR', 'RUB', 'GBP', 'JPY'],
    baseCurrency = 'USD';
const URL = getUrl('https://api.exchangeratesapi.io/latest', {
    base: baseCurrency,
    symbols: currencies
});

fetch(URL).then(response => response.json()).then(data => {
    const rates = getCurrenciesRates(data.rates, baseCurrency);
    const totalCartPrice = getTotalCartPrice(selectedCart, rates);
    document.writeln(getCartPriceString(totalCartPrice));
});

function getUrl(url, parameters) {
    return url + '?' + getEncodedQueryData(parameters);
}

function getCurrenciesRates(rates, baseCurrency) {
    return {
        [baseCurrency]: 1,
        ...rates
    };
}

function getTotalCartPrice(cart, rates) {
    return cart.reduce((acc, item) => {
        Object.keys(rates).forEach(currency => {
            acc[currency] = acc[currency] + item.price * rates[currency];
        });
        return acc;
    }, getCurrenciesObjectByRates(rates));
}

function getCartPriceString(totalCartPrice) {
    return Object.entries(totalCartPrice).map(item => item.join(': ')).join('<br>')
}

function getCurrenciesObjectByRates(rates) {
    return Object.keys(rates).reduce((acc, currency) => {
        acc[currency] = 0;
        return acc;
    }, {})
}

function getEncodedQueryData(data) {
    return Object.entries(data)
        .reduce(
            (acc, entry) => {
                acc.push(encodeURIComponent(entry[0]) + '=' + encodeURIComponent(entry[1]));
                return acc;
            }, []
        ).join('&');
}
