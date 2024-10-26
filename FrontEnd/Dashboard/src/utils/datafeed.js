// datafeed.js
export default function CustomDatafeed(apiKey) {
    const API_URL = 'https://min-api.cryptocompare.com/data';
    const headers = { authorization: `Apikey ${apiKey}` };
  
    return {
      onReady: (callback) => {
        setTimeout(() => callback({ supports_search: true, supports_group_request: false, supports_marks: false, supports_timescale_marks: false, supports_time: true }), 0);
      },
      searchSymbols: async (userInput, exchange, symbolType, onResultReadyCallback) => {
        const response = await fetch(`${API_URL}/all/exchanges`);
        const data = await response.json();
        const symbols = Object.keys(data).map(symbol => ({
          symbol,
          full_name: symbol,
          description: `${symbol} Pair`,
          exchange: "CryptoCompare",
          ticker: symbol,
          type: "crypto",
        }));
        onResultReadyCallback(symbols);
      },
      resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        const symbolInfo = {
          ticker: symbolName,
          name: symbolName,
          description: `${symbolName} Pair`,
          type: "crypto",
          session: "24x7",
          timezone: "Etc/UTC",
          has_intraday: true,
          has_no_volume: false,
          has_daily: true,
          supported_resolutions: ["1", "5", "15", "30", "60", "D", "W", "M"],
          pricescale: 100,
          volume_precision: 8,
          data_status: "streaming",
        };
        onSymbolResolvedCallback(symbolInfo);
      },
      getBars: async (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback) => {
        const url = `${API_URL}/v2/histoday?fsym=${symbolInfo.name}&tsym=USD&limit=2000`;
        try {
          const response = await fetch(url, { headers });
          const data = await response.json();
          if (data.Response === "Error") return onErrorCallback("No data");
  
          const bars = data.Data.Data.map(bar => ({
            time: bar.time * 1000,
            low: bar.low,
            high: bar.high,
            open: bar.open,
            close: bar.close,
            volume: bar.volumefrom,
          }));
  
          onHistoryCallback(bars, { noData: bars.length === 0 });
        } catch (error) {
          onErrorCallback(error);
        }
      },
      subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
        // Implement if real-time updates are required
      },
      unsubscribeBars: (subscriberUID) => {
        // Implement if real-time updates are required
      },
    };
  }
  