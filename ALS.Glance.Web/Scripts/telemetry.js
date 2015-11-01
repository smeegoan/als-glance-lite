var analytics = analytics || {
    /**
 * Wrapper to send Events to Google Analytics
 * @param  {string} action   Action we are logging. lower-case
 * @param  {string} category standardized event categories
 * @param  {string} label    optional description
 */
    logUiEvent: function (action, category, label, value) {
        var lb = label || '';
        var v = value || 1;
        //check for google analytics
        if (window.ga) {
            //send the information
            ga('send', 'event', category, action, lb, v);
        }
    },
    logView: function () {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        if (window.ga) {
            ga('create', 'UA-64346393-1', 'auto');
            ga('send', 'pageview');
        }
    }
}