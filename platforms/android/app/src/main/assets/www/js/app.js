// RUthirsty - 喝水打卡应用
// 主应用逻辑

const app = {
    // 应用初始化
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        // 如果不在Cordova环境中，直接初始化（用于浏览器测试）
        if (!window.cordova) {
            setTimeout(() => this.onDeviceReady(), 100);
        }
    },

    // 设备就绪回调
    onDeviceReady: function() {
        console.log('设备已就绪');

        // 初始化状态栏
        if (window.StatusBar) {
            StatusBar.backgroundColorByHexString('#0a0e27');
            StatusBar.styleLightContent();
        }

        // 绑定事件
        this.bindEvents();

        // 加载数据
        this.loadData();

        console.log('应用初始化完成');
    },

    // 绑定事件监听器
    bindEvents: function() {
        const checkinBtn = document.getElementById('checkinBtn');
        const clearBtn = document.getElementById('clearBtn');

        checkinBtn.addEventListener('click', this.handleCheckIn.bind(this));
        clearBtn.addEventListener('click', this.handleClearHistory.bind(this));

        // 添加触摸反馈
        if (window.navigator && window.navigator.vibrate) {
            checkinBtn.addEventListener('touchstart', function() {
                navigator.vibrate(50);
            });
        }
    },

    // 加载数据
    loadData: function() {
        const records = this.getRecords();
        this.updateStats(records);
        this.renderHistory(records);
    },

    // 从本地存储获取记录
    getRecords: function() {
        try {
            const data = localStorage.getItem('waterRecords');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('读取记录失败:', e);
            return [];
        }
    },

    // 保存记录到本地存储
    saveRecords: function(records) {
        try {
            localStorage.setItem('waterRecords', JSON.stringify(records));
            return true;
        } catch (e) {
            console.error('保存记录失败:', e);
            this.showAlert('保存失败', '无法保存打卡记录，请检查存储空间。');
            return false;
        }
    },

    // 处理打卡
    handleCheckIn: function() {
        const now = new Date();
        const record = {
            id: Date.now(),
            timestamp: now.getTime(),
            date: now.toLocaleDateString('zh-CN'),
            time: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate()
        };

        // 获取现有记录
        const records = this.getRecords();
        records.unshift(record); // 添加到开头

        // 保存记录
        if (this.saveRecords(records)) {
            // 震动反馈
            if (window.navigator && window.navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }

            // 显示成功动画
            this.showSuccessAnimation();

            // 更新界面
            this.updateStats(records);
            this.renderHistory(records);
        }
    },

    // 显示成功动画
    showSuccessAnimation: function() {
        const btn = document.getElementById('checkinBtn');
        btn.classList.add('success');
        setTimeout(() => {
            btn.classList.remove('success');
        }, 600);
    },

    // 更新统计数据
    updateStats: function(records) {
        const today = new Date();
        const todayStr = today.toLocaleDateString('zh-CN');

        // 计算今日打卡次数
        const todayRecords = records.filter(r => r.date === todayStr);
        document.getElementById('todayCount').textContent = todayRecords.length;

        // 计算累计打卡天数（去重）
        const uniqueDays = new Set(records.map(r => r.date));
        document.getElementById('totalDays').textContent = uniqueDays.size;

        // 更新上次打卡时间
        if (records.length > 0) {
            const lastRecord = records[0];
            document.getElementById('lastCheckin').textContent =
                `上次打卡: ${lastRecord.date} ${lastRecord.time}`;
        } else {
            document.getElementById('lastCheckin').textContent = '上次打卡: --';
        }
    },

    // 渲染历史记录（只显示最近10次）
    renderHistory: function(records) {
        const historyList = document.getElementById('historyList');

        if (records.length === 0) {
            historyList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <div class="empty-text">暂无打卡记录</div>
                    <div class="empty-hint">点击上方按钮开始打卡吧！</div>
                </div>
            `;
            return;
        }

        // 只取最近10次记录
        const recentRecords = records.slice(0, 10);

        // 按日期分组
        const grouped = {};
        recentRecords.forEach(record => {
            if (!grouped[record.date]) {
                grouped[record.date] = [];
            }
            grouped[record.date].push(record);
        });

        // 生成HTML
        let html = '';

        // 如果有更多记录，显示提示
        if (records.length > 10) {
            html += `
                <div style="text-align: center; padding: 10px; color: var(--text-secondary); font-size: 12px; margin-bottom: 10px;">
                    仅显示最近 10 次打卡（共 ${records.length} 次）
                </div>
            `;
        }

        for (const date in grouped) {
            const dayRecords = grouped[date];
            const isToday = date === new Date().toLocaleDateString('zh-CN');
            const dateLabel = isToday ? `${date} (今天)` : date;

            html += `<div class="history-group">
                <div class="history-group-header">
                    <span class="group-date">${dateLabel}</span>
                    <span class="group-count">${dayRecords.length} 杯</span>
                </div>`;

            dayRecords.forEach(record => {
                const index = records.findIndex(r => r.id === record.id) + 1;
                html += `
                    <div class="history-item">
                        <div>
                            <div class="history-item-time">${record.time}</div>
                            <div class="history-item-date">第 ${index} 次</div>
                        </div>
                        <div class="history-item-count">
                            <span class="history-item-number">#${index}</span>
                        </div>
                    </div>
                `;
            });

            html += '</div>';
        }

        historyList.innerHTML = html;
    },

    // 清空历史记录
    handleClearHistory: function() {
        if (window.navigator && window.navigator.notification) {
            navigator.notification.confirm(
                '确定要清空所有打卡记录吗？此操作无法撤销。',
                (buttonIndex) => {
                    if (buttonIndex === 2) { // Android中2是"确定"
                        this.clearAllRecords();
                    }
                },
                '清空记录',
                ['取消', '确定']
            );
        } else {
            if (confirm('确定要清空所有打卡记录吗？此操作无法撤销。')) {
                this.clearAllRecords();
            }
        }
    },

    // 清空所有记录
    clearAllRecords: function() {
        localStorage.removeItem('waterRecords');
        this.updateStats([]);
        this.renderHistory([]);
        this.showToast('记录已清空');
    },

    // 显示提示消息
    showToast: function(message) {
        // 创建toast元素
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        document.body.appendChild(toast);

        // 2秒后移除
        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    },

    // 显示警告对话框
    showAlert: function(title, message) {
        if (window.navigator && window.navigator.notification) {
            navigator.notification.alert(message, null, title, '确定');
        } else {
            alert(`${title}\n\n${message}`);
        }
    }
};

// 初始化应用
app.initialize();
