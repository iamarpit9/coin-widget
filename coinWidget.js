const widgetContainer = document.getElementById("coinWidget");

const fetchToken = (tokenName) => {
  widgetContainer.innerHTML = `  <div class="loader"> 
      </div>`;

  const apiUrl = `https://api.coingecko.com/api/v3/coins/${tokenName}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const tokenData = {
        name: data.name,
        marketCap: data.market_data.market_cap.usd,
        currentPrice: data.market_data.current_price.usd,
        tradingVolume: data.market_data.total_volume.usd,
        logoUrl: data.image.large,
        symbol: data.symbol,
      };

      renderWidget(tokenData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const renderWidget = (tokenData) => {
    widgetContainer.innerHTML = `
    <div class="widgetContainer">
    <div class="header">
      <img src="${tokenData.logoUrl}" alt="${tokenData.name} ">
      <div class="title">
        <div class="tokenName">${
          tokenData.name
        } \n (${tokenData.symbol.toUpperCase()})</div>
        <div> <strong> ${Intl.NumberFormat("en-US", {
          maximumFractionDigits: 4,
        }).format(tokenData.currentPrice)}</strong> \n <span>USD</span></div>
      </div>
    </div>
    <div class="deatils">
      <p class="marCap" > <span class="pHead">MARKET CAP </span>
      <span>
       ${Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD",
         notation: "compact",
         maximumFractionDigits: 2,
       }).format(tokenData.marketCap)} \n USD </span></p>
      <p class="tradeVol"> <span class="pHead">VOLUME</span>  <span>${Intl.NumberFormat(
        "en-US",
        {
          style: "currency",
          currency: "USD",
          notation: "compact",
          maximumFractionDigits: 2,
        }
      ).format(tokenData.tradingVolume)} \n USD </span></p>
    </div>
        </div>

`;
  };
};

fetchToken("bitcoin");
