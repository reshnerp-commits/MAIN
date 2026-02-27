// js/components/sidebar.js

let isSidebarOpen = true;
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const toggleBtn = document.querySelector('.toggle-btn');
const toggleIcon = toggleBtn.querySelector('i');
const overlay = document.getElementById('sidebarOverlay');

function updateToggleIcon() {
    // ☰ when closed, ✕ when open - NOT upside down
    if (isSidebarOpen) {
        toggleIcon.className = 'fas fa-times text-xl';  // X icon
    } else {
        toggleIcon.className = 'fas fa-bars text-xl';    // Hamburger icon
    }
}

function toggleSidebar() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
        // Update icon for mobile
        isSidebarOpen = sidebar.classList.contains('mobile-open');
        updateToggleIcon();
    } else {
        isSidebarOpen = !isSidebarOpen;
        
        if (isSidebarOpen) {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
        } else {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
        }
        updateToggleIcon();
    }
}

// Initialize icon on load
document.addEventListener('DOMContentLoaded', () => {
    updateToggleIcon();
    
    // Overlay click handler
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        isSidebarOpen = false;
        updateToggleIcon();
    });
});

// Export for use in main.js
window.toggleSidebar = toggleSidebar;
