document.addEventListener('DOMContentLoaded', () => {

    // وظيفة للتحقق من المتصفح المدمج
    function isInAppBrowser() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        const isAndroid = /Android/.test(userAgent);
        const is_in_app = (
            (isIOS && userAgent.includes('Tiktok')) || // TikTok on iOS
            (isAndroid && userAgent.includes('Tiktok')) || // TikTok on Android
            (isIOS && (userAgent.includes('Instagram') || userAgent.includes('FBAV') || userAgent.includes('Messenger'))) ||
            (isAndroid && (userAgent.includes('Instagram') || userAgent.includes('FBAV') || userAgent.includes('Messenger'))) ||
            (isAndroid && userAgent.includes('WebView'))
        );
        return is_in_app;
    }

    // الكود ده هيجبر الصفحة تفتح في المتصفح العادي مباشرة
    if (isInAppBrowser()) {
        const url = window.location.href;
        window.location.href = url;
    }

    // هذا الكود يضمن أن كل الروابط تفتح في نافذة جديدة (المتصفح العادي)
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = link.getAttribute('href');
            window.open(href, '_blank');
        });
    });
});
