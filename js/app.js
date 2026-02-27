// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initTheme();
    initNavigation();
    initDashboard();
    initModules();
    initVideos();
    initListen();
    initReference();
    initAbout();
    
    // Load default section
    switchSection('home');
    
    // Handle responsive
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        if (!isMobile) {
            overlay.classList.remove('active');
            sidebar.classList.remove('mobile-open');
        }
    });
});

// Load section content from /content/ folder
async function loadSectionContent(sectionId) {
    const app = document.getElementById('app');
    
    try {
        const response = await fetch(`content/${sectionId}.html`);
        const content = await response.text();
        app.innerHTML = content;
        
        // Initialize section-specific functionality
        const initFunctions = {
            home: initDashboard,
            learn: initModules,
            videos: initVideos,
            listen: initListen,
            reference: initReference,
            about: initAbout
        };
        
        if (initFunctions[sectionId]) {
            initFunctions[sectionId]();
        }
    } catch (error) {
        console.error(`Error loading ${sectionId}:`, error);
        app.innerHTML = `<div class="text-center py-8 text-gray-500">Error loading content</div>`;
    }
}
