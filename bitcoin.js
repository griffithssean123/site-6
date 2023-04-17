let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
let stockPriceElement = document.getElementById('stock-price');
stockPriceElement.innerText = "Could not connect to binance.com";
    
ws.onmessage = (event) => {
    console.log(event.data);
    let stockObject = JSON.parse(event.data);
    let price = parseFloat(stockObject.c).toFixed(2);
    let percent = parseFloat(stockObject.P).toFixed(2);
    if (percent > 0) {
        var up_down = ' +';
    } else {
        var up_down = ' ';
    }
    stockPriceElement.innerText = price + "USD" + up_down + percent +"%";
    stockPriceElement.style.color = percent > 0 ? 'green' : 'red';
    // !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? 'green' : 'red';
}