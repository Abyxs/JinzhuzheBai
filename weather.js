document.addEventListener('DOMContentLoaded', function() {
    // 获取位置和天气信息
    async function getWeatherInfo() {
        try {
            // 先通过 IP-API 获取位置信息
            const locationResponse = await fetch('https://ipapi.co/json/');
            const locationData = await locationResponse.json();
            
            if (locationData && locationData.city) {
                const city = locationData.city;
                
                // 使用 OpenWeatherMap 的免费 API 获取天气
                const apiKey = '8e2c44ddb2e0069f25c6c9036a0aa865';
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_cn`;
                
                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();
                
                if (weatherData.cod === 200) {
                    document.getElementById('location').innerHTML = 
                        `<i class="fas fa-map-marker-alt"></i> ${weatherData.name}`;
                    document.getElementById('temperature').textContent = 
                        `${Math.round(weatherData.main.temp)}℃`;
                    document.getElementById('weather-desc').textContent = 
                        weatherData.weather[0].description;
                } else {
                    throw new Error('天气获取失败');
                }
            } else {
                throw new Error('位置获取失败');
            }
        } catch (error) {
            console.error('获取天气信息失败:', error);
            // 如果获取失败，尝试使用浏览器的地理位置API
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async position => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const apiKey = '8e2c44ddb2e0069f25c6c9036a0aa865';
                        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=zh_cn`;
                        
                        const weatherResponse = await fetch(weatherUrl);
                        const weatherData = await weatherResponse.json();
                        
                        if (weatherData.cod === 200) {
                            document.getElementById('location').innerHTML = 
                                `<i class="fas fa-map-marker-alt"></i> ${weatherData.name}`;
                            document.getElementById('temperature').textContent = 
                                `${Math.round(weatherData.main.temp)}℃`;
                            document.getElementById('weather-desc').textContent = 
                                weatherData.weather[0].description;
                            return;
                        }
                    } catch (e) {
                        console.error('通过坐标获取天气失败:', e);
                    }
                    // 如果还是失败，显示默认信息
                    setDefaultWeather();
                });
            } else {
                // 如果不支持地理位置API，显示默认信息
                setDefaultWeather();
            }
        }
    }

    // 设置默认天气信息
    function setDefaultWeather() {
        document.getElementById('location').innerHTML = 
            `<i class="fas fa-map-marker-alt"></i> 定位中...`;
        document.getElementById('temperature').textContent = '--℃';
        document.getElementById('weather-desc').textContent = '获取天气信息失败';
    }

    // 初始化
    getWeatherInfo();
    // 每30分钟更新一次天气
    setInterval(getWeatherInfo, 30 * 60 * 1000);
});