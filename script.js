document.addEventListener('DOMContentLoaded', () => {
    const isTikTok = /tiktok/i.test(navigator.userAgent);
    const currentUrl = window.location.href;

    if (isTikTok) {
        // إفراغ الصفحة
        document.body.innerHTML = '';

        // إنشاء الرسالة
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); color: white;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            text-align: center; padding: 20px; font-family: sans-serif;
        `;

        const title = document.createElement('h2');
        title.textContent = "⚠ افتح الموقع في المتصفح الخارجي";
        title.style.marginBottom = '15px';

        const btn = document.createElement('button');
        btn.textContent = "افتح في كروم / سفاري";
        btn.style.cssText = `
            background: #007bff; color: white; border: none; padding: 12px 25px;
            border-radius: 8px; font-size: 1rem; cursor: pointer;
        `;

        btn.onclick = () => {
            if (/Android/i.test(navigator.userAgent)) {
                // فتح كروم مباشرة
                window.location.href = `intent:${currentUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
            } else {
                // iOS يفتح في نافذة جديدة (سفاري)
                window.open(currentUrl, '_blank');
            }
        };

        overlay.appendChild(title);
        overlay.appendChild(btn);
        document.body.appendChild(overlay);
    }
});
