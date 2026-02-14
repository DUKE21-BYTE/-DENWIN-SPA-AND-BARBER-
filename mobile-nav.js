/**
 * DENWIN SPA - Mobile Navigation Handler
 * Handles mobile menu toggle and responsive behavior
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileNav);
    } else {
        initMobileNav();
    }
    
    function initMobileNav() {
        // Create mobile menu toggle button if it doesn't exist
        const nav = document.querySelector('nav');
        if (!nav) return;
        
        // Check if mobile toggle already exists
        let mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (!mobileToggle && window.innerWidth <= 768) {
            // Create hamburger menu button
            mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle md:hidden fixed top-6 right-6 z-[100] p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20';
            mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
            mobileToggle.innerHTML = `
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path class="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    <path class="close-icon hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;
            
            // Find the desktop nav menu
            const desktopNav = nav.querySelector('.hidden.md\\:flex');
            
            if (desktopNav) {
                // Clone the navigation for mobile
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = `
                    <nav class="flex flex-col gap-6">
                        ${desktopNav.innerHTML}
                    </nav>
                `;
                
                // Create overlay
                const overlay = document.createElement('div');
                overlay.className = 'mobile-menu-overlay';
                
                // Add to DOM
                document.body.appendChild(mobileToggle);
                document.body.appendChild(mobileMenu);
                document.body.appendChild(overlay);
                
                // Add event listeners
                mobileToggle.addEventListener('click', toggleMobileMenu);
                overlay.addEventListener('click', closeMobileMenu);
                
                // Close menu when clicking a link
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', closeMobileMenu);
                });
                
                // Update menu items styling for mobile
                mobileLinks.forEach(link => {
                    link.className = 'text-white text-lg font-semibold hover:text-primary transition-colors py-3 border-b border-white/10';
                });
            }
        }
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768) {
                    closeMobileMenu();
                }
            }, 250);
        });
    }
    
    function toggleMobileMenu() {
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const menuIcon = document.querySelector('.menu-icon');
        const closeIcon = document.querySelector('.close-icon');
        
        if (menu && overlay) {
            const isActive = menu.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                menu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                if (menuIcon && closeIcon) {
                    menuIcon.classList.add('hidden');
                    closeIcon.classList.remove('hidden');
                }
            }
        }
    }
    
    function closeMobileMenu() {
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const menuIcon = document.querySelector('.menu-icon');
        const closeIcon = document.querySelector('.close-icon');
        
        if (menu && overlay) {
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            if (menuIcon && closeIcon) {
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        }
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        closeMobileMenu();
    });
    
    // Prevent body scroll when menu is open
    document.addEventListener('touchmove', function(e) {
        const menu = document.querySelector('.mobile-menu');
        if (menu && menu.classList.contains('active')) {
            if (!menu.contains(e.target)) {
                e.preventDefault();
            }
        }
    }, { passive: false });
    
})();
