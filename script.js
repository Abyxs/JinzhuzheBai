document.addEventListener('DOMContentLoaded', function() {
    // 搜索相关代码
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

    // 雪花相关代码
    let snowInterval;
    let isSnowing = true;

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
            document.querySelectorAll('.snowflake').forEach(snowflake => {
                snowflake.remove();
            });
        }
    }

    const snowToggle = document.getElementById('snowToggle');
    if (snowToggle) {
        snowToggle.addEventListener('click', function() {
            if (isSnowing) {
                stopSnowfall();
            } else {
                startSnowfall();
            }
        });
    }

    // 页面加载时自动开启雪花效果
    document.addEventListener('DOMContentLoaded', function() {
        startSnowfall();
        document.querySelector('#snowToggle').classList.add('active');
    });

    // 收藏相关代码
    const favoriteHearts = document.querySelectorAll('.tool-item .favorite-heart');
    const favoriteToggle = document.getElementById('favoriteToggle');
    let favoriteList = null;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function updateFavoriteStatus() {
        favoriteHearts.forEach(heart => {
            const toolItem = heart.closest('.tool-item');
            const toolId = toolItem.getAttribute('data-id');
            heart.classList.remove('active'); // 先移除所有激活状态
            if (favorites.includes(toolId)) {
                heart.classList.add('active');
            }
        });
    }

    function showFavorites() {
        favoriteList = document.createElement('div');
        favoriteList.className = 'favorite-list modal';
        
        // 添加标题和关闭按钮
        const header = document.createElement('div');
        header.className = 'favorite-header';
        header.innerHTML = `
            <h3>我的收藏</h3>
            <button class="close-btn"><i class="fas fa-times"></i></button>
        `;
        favoriteList.appendChild(header);
        
        // 添加收藏内容容器
        const content = document.createElement('div');
        content.className = 'favorite-content';
        favoriteList.appendChild(content);
        
        updateFavoritesList();
        document.body.appendChild(favoriteList);

        // 添加关闭按钮事件
        const closeBtn = favoriteList.querySelector('.close-btn');
        closeBtn.addEventListener('click', hideFavorites);
    }

    function updateFavoritesList() {
        const content = favoriteList.querySelector('.favorite-content');
        content.innerHTML = '';
        
        if (favorites.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-favorites';
            emptyMessage.textContent = '还没有收藏任何工具';
            content.appendChild(emptyMessage);
            return;
        }
        
        favorites.forEach(id => {
            const originalTool = document.querySelector(`.tool-item[data-id="${id}"]`);
            if (originalTool) {
                const toolItem = document.createElement('div');
                toolItem.className = 'favorite-item';
                toolItem.innerHTML = `
                    <i class="${originalTool.querySelector('i:not(.favorite-heart)').className}"></i>
                    <span>${originalTool.querySelector('span').textContent}</span>
                `;
                
                toolItem.addEventListener('click', () => {
                    window.open(originalTool.href, '_blank');
                });
                
                content.appendChild(toolItem);
            }
        });
    }

    function hideFavorites() {
        if (favoriteList) {
            favoriteList.remove();
            favoriteList = null;
        }
    }

    // 初始化收藏状态
    favoriteHearts.forEach((heart, index) => {
        const toolItem = heart.closest('.tool-item');
        if (!toolItem.hasAttribute('data-id')) {
            toolItem.setAttribute('data-id', `tool-${index}`);
        }
        
        // 检查是否在收藏列表中，如果是则添加激活状态
        const toolId = toolItem.getAttribute('data-id');
        if (favorites.includes(toolId)) {
            heart.classList.add('active');
        }
    });

    // 收藏按钮点击事件
    favoriteToggle.addEventListener('click', function() {
        if (!favoriteList) {
            showFavorites();
        } else {
            hideFavorites();
        }
    });

    // 工具卡片收藏点击事件
    favoriteHearts.forEach(heart => {
        heart.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            const toolItem = this.closest('.tool-item');
            const toolId = toolItem.getAttribute('data-id');
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                favorites = favorites.filter(id => id !== toolId);
            } else {
                this.classList.add('active');
                favorites.push(toolId);
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
            
            if (favoriteList) {
                updateFavoritesList();
            }
        });
    });

    // 点击其他地方关闭收藏列表
    document.addEventListener('click', function(e) {
        if (favoriteList && !favoriteList.contains(e.target) && !favoriteToggle.contains(e.target)) {
            hideFavorites();
        }
    });

    // 添加滚动隐藏功能
    let lastScrollTop = 0;
    const sideButtons = document.querySelector('.side-buttons');
    
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 判断滚动方向
        if (currentScrollTop > lastScrollTop) {
            // 向下滚动
            sideButtons.classList.add('hide');
        } else {
            // 向上滚动
            sideButtons.classList.remove('hide');
        }
        
        lastScrollTop = currentScrollTop;
    }

    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);
});

class MusicPlayer {
    constructor() {
        this.player = document.getElementById('musicPlayer');
        this.icon = document.getElementById('radioIcon');
        this.isPlaying = false;

        // 添加点击事件监听
        this.icon.addEventListener('click', () => this.togglePlay());
    }

    togglePlay() {
        if (this.isPlaying) {
            this.player.pause();
            this.icon.classList.remove('playing');
        } else {
            this.player.play();
            this.icon.classList.add('playing');
        }
        this.isPlaying = !this.isPlaying;
    }
}

// 初始化音乐播放器
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});