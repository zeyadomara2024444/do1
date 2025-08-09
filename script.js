document.addEventListener('DOMContentLoaded', () => {
    // هذه وظيفة للتحقق مما إذا كانت الصفحة مفتوحة في متصفح مدمج داخل تطبيق
    function is_in_app_browser() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // أمثلة على سلاسل وكيل المستخدم (User-Agent) في المتصفحات المدمجة
        if (
            (userAgent.match(/Tiktok/i)) ||
            (userAgent.match(/FBAV/i) || userAgent.match(/FBIOS/i)) ||
            (userAgent.match(/Instagram/i)) ||
            (userAgent.match(/WebView/i))
        ) {
            return true;
        }
        return false;
    }

    // لو كانت الصفحة مفتوحة في متصفح مدمج، هينقل المستخدم للمتصفح العادي
    if (is_in_app_browser()) {
        window.open(window.location.href, '_blank');
        
        // هذا الجزء قد يساعد في إغلاق الصفحة القديمة، لكن قد لا يعمل في كل المتصفحات
        setTimeout(() => {
            window.close();
        }, 1000);
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