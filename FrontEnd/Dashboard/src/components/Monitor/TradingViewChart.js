import React, { useEffect, useRef } from 'react';
import CustomDatafeed from '../../utils/datafeed';

const TradingViewChart = ({ symbol = "SOL", interval = "D" }) => {
    const chartContainerRef = useRef(null);
    const API_KEY = "bc77dfad32dc26633e172e918ce49f7380a3c7ba73c63bd521d4e419a501f147";

    useEffect(() => {
        const loadTradingViewScript = (onLoadCallback) => {
            if (!document.getElementById("tradingview-widget-script")) {
                const script = document.createElement("script");
                script.src = "https://s3.tradingview.com/tv.js";
                script.id = "tradingview-widget-script";
                script.onload = onLoadCallback;
                document.body.appendChild(script);
            } else {
                onLoadCallback();
            }
        };

        loadTradingViewScript(() => {
            const widget = new window.TradingView.widget({
                container_id: chartContainerRef.current.id,
                width: "100%",
                height: "100%",
                symbol: `CRYPTO:${symbol}USD`,
                interval: interval,
                timezone: "Etc/UTC",
                theme: "dark", // Change to dark theme
                style: "1", // 1 for candlestick
                locale: "en",
                datafeed: CustomDatafeed(API_KEY),
                library_path: "/charting_library/",
                allow_symbol_change: true,
                details: true,
                hotlist: true,
                calendar: true,
                studies: ["MACD@tv-basicstudies", "RSI@tv-basicstudies"],
            });

            return () => {
                if (widget) widget.remove();
            };
        });
    }, [symbol, interval]);

    return <div id="tv_chart_container" ref={chartContainerRef} style={{ height: '500px', width: '100%' }} />;
};

export default TradingViewChart;
