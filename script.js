document.addEventListener('DOMContentLoaded', () => {
    // الكود ده بيتعرف على المتصفحات المدمجة في تطبيقات تانية (مثل TikTok أو Telegram)
    const isInAppBrowser = (
        (window.navigator.standalone === false) || // For iOS
        (window.matchMedia('(display-mode: standalone)').matches === false) // For other platforms
    );

    // لو الموقع مفتوح جوه متصفح مدمج، هينقله للمتصفح العادي
    if (isInAppBrowser) {
        // نفتح الرابط في نافذة جديدة
        window.open(window.location.href, '_blank');
        // ونقفل الصفحة الحالية عشان ما يبقاش فيه صفحتين مفتوحين
        window.close();
    }
    
    // الجزء ده عشان لو المستخدم ضغط على أي رابط، يفتح في المتصفح العادي
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = link.getAttribute('href');
            window.open(href, '_blank');
        });
    });
});