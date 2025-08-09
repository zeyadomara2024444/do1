document.addEventListener('DOMContentLoaded', () => {
    function isInAppBrowser() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
        const isAndroid = /Android/.test(ua);
        return (
            (isIOS && /Tiktok|Instagram|FBAV|Messenger/i.test(ua)) ||
            (isAndroid && /Tiktok|Instagram|FBAV|Messenger/i.test(ua)) ||
            (isAndroid && ua.includes('WebView'))
        );
    }

    if (isInAppBrowser()) {
        const outsideURL = window.location.href;

        if (/Android/i.test(navigator.userAgent)) {
            // أندرويد → يفتح Chrome أو المتصفح الافتراضي
            window.location.href = `intent://${outsideURL.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        } 
        else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // iOS → محاولة فتح Safari تلقائيًا
            setTimeout(() => {
                window.open(outsideURL, '_blank');
                alert("لو ما فتح الرابط تلقائي، اضغط مشاركة > فتح في Safari");
            }, 500);
        }
    }

    // جعل الروابط تفتح في نافذة جديدة (لضمان الخروج من المتصفح المدمج)
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });
});
