// js/navigation.js

let isSidebarOpen = true;

function initNavigation() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleIcon = toggleBtn.querySelector('i');
    const overlay = document.getElementById('sidebarOverlay');

    // Fixed toggle icon: ☰ when closed, ✕ when open
    function updateToggleIcon() {
        if (isSidebarOpen) {
            toggleIcon.className = 'fas fa-times text-xl';
        } else {
            toggleIcon.className = 'fas fa-bars text-xl';
        }
    }

    // Render sidebar content
    function renderSidebar() {
        sidebar.innerHTML = `
            <div class="p-6">
                <div class="flex items-center gap-3 mb-8">
                    <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-shield-halved text-white"></i>
                    </div>
                    <span class="logo-text text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">Awareness Hub</span>
                </div>
                <nav class="space-y-1">
                    <a href="#" onclick="switchSection('home'); return false;" class="sidebar-item active flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors" data-section="home">
                        <i class="fas fa-home w-5 flex-shrink-0 text-gray-700 dark:text-gray-300"></i>
                        <span class="sidebar-text text-gray-700 dark:text-gray-300">Home</span>
                    </a>
                    <a href="#" onclick="switchSection('learn'); return false;" class="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-section="learn">
                        <i class="fas fa-book-open w-5 flex-shrink-0 text-gray-700 dark:text-gray-300"></i>
                        <span class="sidebar-text text-gray-700 dark:text-gray-300">Learn</span>
                    </a>
                    <a href="#" onclick="switchSection('videos'); return false;" class="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-section="videos">
                        <i class="fas fa-video w-5 flex-shrink-0 text-gray-700 dark:text-gray-300"></i>
                        <span class="sidebar-text text-gray-700 dark:text-gray-300">Videos</span>
                    </a>
                    <a href="#" onclick="switchSection('listen'); return false;" class="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-section="listen">
                        <i class="fas fa-headphones w-5 flex-shrink-0 text-gray-700 dark:text-gray-300"></i>
                        <span class="sidebar-text text-gray-700 dark:text-gray-300">Listen</span>
                    </a>
                    <a href="#" onclick="switchSection('reference'); return false;" class="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-section="reference">
                        <i class="fas fa-book w-5 flex-shrink-0 text-gray-700 dark:text-gray-300"></i>
                        <span class="sidebar-text text-gray-700 dark:text-gray-300">Reference</span>
                    </a>
                    <a href="#" onclick="switchSection('about'); return false;" class="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-section="about">
                        <i class="fas fa-info-circle w-5 flex-shrink-0 text-gray-700 dark:text-gray-300"></i>
                        <span class="sidebar-text text-gray-700 dark:text-gray-300">About</span>
                    </a>
                </nav>
            </div>
            <div class="p-6 mt-auto">
                <div class="footer-text text-xs text-gray-400 text-center">
                    &copy; 2024 Digital Awareness Hub<br>Secure • Private • Safe
                </div>
            </div>
        `;
    }

    // Toggle sidebar
    window.toggleSidebar = function() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('active');
            isSidebarOpen = sidebar.classList.contains('mobile-open');
        } else {
            isSidebarOpen = !isSidebarOpen;
            if (isSidebarOpen) {
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
            } else {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
            }
        }
        updateToggleIcon();
    };

    // Switch sections
    window.switchSection = function(sectionId) {
        // Update sidebar active state
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            }
        });

        // Close mobile sidebar
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
            isSidebarOpen = false;
            updateToggleIcon();
        }

        // Load content
        loadSectionContent(sectionId);
    };

    // Overlay click
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        isSidebarOpen = false;
        updateToggleIcon();
    });

    // Initialize
    renderSidebar();
    updateToggleIcon();
}
