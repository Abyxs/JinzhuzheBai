document.addEventListener('DOMContentLoaded', function() {
    const toolSearch = document.getElementById('toolSearch');
    const searchResult = document.getElementById('searchResult');
    
    // 获取所有工具项
    const tools = Array.from(document.querySelectorAll('.tool-item')).map(item => ({
        element: item,
        name: item.querySelector('span').textContent.trim(),
        category: item.closest('.tool-category').querySelector('h3').textContent.trim()
    }));

    // 搜索功能
    function performSearch(keyword) {
        searchResult.innerHTML = '';
        
        if (!keyword) {
            searchResult.classList.remove('active');
            return;
        }

        const matches = tools.filter(tool => 
            tool.name.toLowerCase().includes(keyword.toLowerCase()) ||
            tool.category.toLowerCase().includes(keyword.toLowerCase())
        );

        if (matches.length > 0) {
            matches.forEach(tool => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = `
                    <span>${tool.name}</span>
                    <small style="color: #666; margin-left: 8px;">${tool.category}</small>
                `;
                
                div.addEventListener('click', () => {
                    tool.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    tool.element.classList.add('highlight');
                    setTimeout(() => tool.element.classList.remove('highlight'), 2000);
                    searchResult.classList.remove('active');
                    toolSearch.value = '';
                });
                
                searchResult.appendChild(div);
            });
            searchResult.classList.add('active');
        } else {
            const noResult = document.createElement('div');
            noResult.className = 'search-result-item no-result';
            noResult.textContent = '未找到相关工具';
            searchResult.appendChild(noResult);
            searchResult.classList.add('active');
        }
    }

    // 输入事件监听
    let debounceTimer;
    toolSearch.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(e.target.value.trim());
        }, 300);
    });

    // 点击空白处关闭搜索结果
    document.addEventListener('click', (e) => {
        if (!toolSearch.contains(e.target) && !searchResult.contains(e.target)) {
            searchResult.classList.remove('active');
        }
    });

    // 按下 ESC 键关闭搜索结果
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResult.classList.remove('active');
            toolSearch.value = '';
            toolSearch.blur();
        }
    });

    // 等待DOM加载完成
    let snowInterval;
    let isSnowing = false;

    // 创建雪花函数
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❅';
        
        // 随机位置和大小
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = (Math.random() * 15 + 8) + 'px';
        snowflake.style.opacity = Math.random() * 0.8 + 0.2;
        
        // 随机动画持续时间
        const duration = Math.random() * 5 + 8;
        snowflake.style.animationDuration = duration + 's';
        
        document.body.appendChild(snowflake);
        
        // 动画结束后移除
        setTimeout(() => {
            snowflake.remove();
        }, duration * 1000);
    }

    // 开始下雪
    function startSnowfall() {
        if (!isSnowing) {
            isSnowing = true;
            snowInterval = setInterval(createSnowflake, 300);
            document.querySelector('.snow-toggle').classList.add('active');
        }
    }

    // 停止下雪
    function stopSnowfall() {
        if (isSnowing) {
            isSnowing = false;
            clearInterval(snowInterval);
            document.querySelector('.snow-toggle').classList.remove('active');
            // 清除现有的雪花
            document.querySelectorAll('.snowflake').forEach(snowflake => {
                snowflake.remove();
            });
        }
    }

    // 绑定点击事件
    const snowToggle = document.querySelector('.snow-toggle');
    if (snowToggle) {
        snowToggle.addEventListener('click', function() {
            if (isSnowing) {
                stopSnowfall();
            } else {
                startSnowfall();
            }
        });
    }

    // 页面加载时自动开始下雪
    startSnowfall();
});

// 音乐播放器功能
class MusicPlayer {
    constructor() {
        this.audioPlayer = document.getElementById('musicPlayer');
        this.radioIcon = document.getElementById('radioIcon');
        this.isPlaying = false;
        this.setupEventListeners();
        
        // 添加音频加载状态检查
        this.audioPlayer.addEventListener('error', (e) => {
            console.error('Error loading audio:', e);
        });
        
        // 添加音频就绪状态检查
        this.audioPlayer.addEventListener('canplay', () => {
            console.log('Audio is ready to play');
        });
    }

    setupEventListeners() {
        this.radioIcon.addEventListener('click', async () => {
            try {
                await this.togglePlay();
            } catch (error) {
                console.error('Error toggling play state:', error);
            }
        });
    }

    async togglePlay() {
        if (this.isPlaying) {
            await this.pause();
        } else {
            await this.play();
        }
    }

    async play() {
        try {
            if (this.audioPlayer.readyState < 2) {
                await new Promise((resolve) => {
                    this.audioPlayer.addEventListener('canplay', resolve, { once: true });
                });
            }
            
            const playPromise = this.audioPlayer.play();
            if (playPromise !== undefined) {
                await playPromise;
                this.isPlaying = true;
                this.radioIcon.classList.add('playing');
                document.getElementById('mainTitle').classList.add('playing');
                console.log('Audio is now playing');
            }
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    async pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.radioIcon.classList.remove('playing');
        document.getElementById('mainTitle').classList.remove('playing');
        console.log('Audio is now paused');
    }
}

// 初始化音乐播放器
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});

let snowInterval;
let isSnowing = false;

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❅';
    
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.fontSize = (Math.random() * 15 + 8) + 'px';
    snowflake.style.opacity = Math.random() * 0.8 + 0.2;
    
    const duration = Math.random() * 5 + 8;
    snowflake.style.animationDuration = duration + 's';
    
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

function startSnowfall() {
    if (!isSnowing) {
        isSnowing = true;
        snowInterval = setInterval(createSnowflake, 300);
        document.querySelector('.snow-toggle').classList.add('active');
    }
}

function stopSnowfall() {
    if (isSnowing) {
        isSnowing = false;
        clearInterval(snowInterval);
        document.querySelector('.snow-toggle').classList.remove('active');
        // 清除现有的雪花
        const snowflakes = document.querySelectorAll('.snowflake');
        snowflakes.forEach(snowflake => {
            snowflake.remove();
        });
    }
}

// 添加开关控制
document.querySelector('.snow-toggle').addEventListener('click', function() {
    if (isSnowing) {
        stopSnowfall();
    } else {
        startSnowfall();
    }
});

// 页面加载时默认不开启下雪
// window.addEventListener('load', startSnowfall); 