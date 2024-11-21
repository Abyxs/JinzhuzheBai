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
}); 