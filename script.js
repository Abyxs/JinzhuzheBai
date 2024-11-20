document.addEventListener('DOMContentLoaded', function() {
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 获取目标元素的id
            const targetId = this.getAttribute('href');
            if(targetId.startsWith('#')) {
                e.preventDefault();
                
                // 获取目标元素
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    // 平滑滚动到目标位置
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // 更新URL，但不进行实际跳转
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // 获取返回顶部按钮
    const backToTop = document.getElementById('backToTop');
    const homeLink = document.querySelector('.scroll-to-top');
    
    // 点击首页链接返回顶部
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        history.pushState(null, null, '#top');
    });

    // 显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // 点击返回顶部按钮
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 添加主题切换功能
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');
    
    // 检查本地存储中的主题设置
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = '亮色模式';
    }

    // 主题切换点击事件
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        
        // 更新图标和文本
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            themeText.textContent = '亮色模式';
            localStorage.setItem('darkMode', 'true');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            themeText.textContent = '暗色模式';
            localStorage.setItem('darkMode', 'false');
        }
    });
}); 