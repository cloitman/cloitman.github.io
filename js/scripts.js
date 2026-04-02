/*!
    Title: Charlie Loitman Portfolio
    Description: Tab switching, dark mode, and interactive features.
*/

(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // ==================== Tab Switching ====================

    var tabButtons = $('.tab-nav-btn');
    var tabContents = $('.tab-content');
    var tabMap = { 'home': 'tab-home', 'resume': 'tab-resume', 'projects': 'tab-projects', 'about': 'tab-about' };

    function switchTab(tabId) {
        // Hide all tab contents, show target
        tabContents.removeClass('active');
        $('#' + tabId).addClass('active');

        // Update nav buttons
        tabButtons.removeClass('active');
        tabButtons.filter('[data-tab="' + tabId + '"]').addClass('active');

        // Update URL hash
        var hashName = '';
        for (var key in tabMap) {
            if (tabMap[key] === tabId) { hashName = key; break; }
        }
        if (hashName) {
            history.replaceState(null, null, '#' + hashName);
        }

        // Scroll main content to top
        $('#main-content').scrollTop(0);
        window.scrollTo(0, 0);
    }

    // Tab nav button clicks
    tabButtons.on('click', function() {
        switchTab($(this).data('tab'));
    });

    // Mobile menu tab links
    $('header .tab-link').on('click', function(e) {
        e.preventDefault();
        switchTab($(this).data('tab'));
        // Close mobile menu
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Project preview cards on Home tab link to Projects tab
    $('.project-preview').on('click', function(e) {
        e.preventDefault();
        switchTab('tab-projects');
    });

    // Sidebar name click → Home tab
    $('#sidebar-name').on('click', function() {
        switchTab('tab-home');
    });

    // On load, check hash and show correct tab
    function initTabFromHash() {
        var hash = window.location.hash.replace('#', '');
        if (hash && tabMap[hash]) {
            switchTab(tabMap[hash]);
        }
    }
    initTabFromHash();

    // Handle browser back/forward
    $(window).on('hashchange', function() {
        initTabFromHash();
    });

    // ==================== Dark Mode ====================

    var darkToggle = $('#dark-toggle');
    var body = $('body');

    function setDarkMode(enabled) {
        if (enabled) {
            body.addClass('dark-mode');
        } else {
            body.removeClass('dark-mode');
        }
        try {
            localStorage.setItem('darkMode', enabled ? 'true' : 'false');
        } catch(e) {}
    }

    // On load, check localStorage
    try {
        var saved = localStorage.getItem('darkMode');
        if (saved === 'true') {
            body.addClass('dark-mode');
        }
    } catch(e) {}

    // Toggle click
    darkToggle.on('click', function() {
        setDarkMode(!body.hasClass('dark-mode'));
    });

    // ==================== Experience Timeline ====================

    $('#experience-timeline').each(function() {
        var $this = $(this);
        var $userContent = $this.children('div');

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) {
                $(this).parent().prepend('<span class="vtimeline-date">' + date + '</span>');
            }
        });
    });

    // ==================== Scroll & Mobile ====================

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // ==================== View More Projects ====================

    $('#view-more-projects').click(function(e) {
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

})(jQuery);
