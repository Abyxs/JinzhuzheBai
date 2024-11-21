document.addEventListener('DOMContentLoaded', function() {
    // 获取位置和天气信息
    async function getWeatherInfo() {
        try {
            // 获取位置信息
            const locationUrl = `https://restapi.amap.com/v3/ip?key=YOUR_AMAP_KEY`;
            const locationResponse = await fetch(locationUrl);
            const locationData = await locationResponse.json();
            
            if (locationData.status === '1') {
                const city = locationData.city;
                const adcode = locationData.adcode; // 获取城市编码

                // 使用高德天气 API 获取天气信息
                const weatherUrl = `https://restapi.amap.com/v3/weather/weatherInfo?key=YOUR_AMAP_KEY&city=${adcode}`;
                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();
                
                if (weatherData.status === '1' && weatherData.lives.length > 0) {
                    const weather = weatherData.lives[0];
                    document.getElementById('location').innerHTML = 
                        `<i class="fas fa-map-marker-alt"></i> ${city}`;
                    document.getElementById('temperature').textContent = 
                        `${weather.temperature}℃`;
                    document.getElementById('weather-desc').textContent = 
                        weather.weather;
                } else {
                    document.getElementById('weather-desc').textContent = 
                        '无法获取天气信息';
                }
            } else {
                document.getElementById('location').innerHTML = 
                    `<i class="fas fa-map-marker-alt"></i> 无法获取位置`;
            }
        } catch (error) {
            console.error('获取天气信息失败:', error);
            document.getElementById('location').innerHTML = 
                `<i class="fas fa-map-marker-alt"></i> 无法获取位置`;
        }
    }

    // 初始化
    getWeatherInfo();
    // 每30分钟更新一次天气
    setInterval(getWeatherInfo, 30 * 60 * 1000);
}); 