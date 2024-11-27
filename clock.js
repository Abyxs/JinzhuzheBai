document.addEventListener('DOMContentLoaded', function() {
    // 农历数字转中文
    function numberToChinese(num) {
        const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        if (num <= 10) return chineseNums[num];
        if (num < 20) return '十' + (num > 10 ? chineseNums[num - 10] : '');
        return chineseNums[Math.floor(num / 10)] + '十' + (num % 10 ? chineseNums[num % 10] : '');
    }

    // 更新模拟时钟指针
    function updateAnalogClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // 计算指针角度
        const hourDeg = (hours % 12 + minutes / 60) * 30;
        const minuteDeg = minutes * 6;
        const secondDeg = seconds * 6;

        // 更新指针位置
        document.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
        document.querySelector('.minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
        document.querySelector('.second-hand').style.transform = `rotate(${secondDeg}deg)`;
        
        // 更新数字时间
        document.getElementById('digitalTime').textContent = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

   

    // 更新日期显示
    function updateDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        
        // 更新公历日期
        document.getElementById('gregorianDate').textContent = 
            `${year}年${month}月${date}日`;
        
     
            
        // 更新星期
        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        document.getElementById('weekDay').textContent = 
            `星期${weekDays[now.getDay()]}`;
    }

    // 初始化并定时更新
    function initClock() {
        updateAnalogClock();
        updateDate();
        
        // 每秒更新一次时钟和数字时间
        setInterval(updateAnalogClock, 1000);
        
        // 每分钟更新一次日期
        setInterval(updateDate, 60 * 1000);
    }

    initClock();
});