document.addEventListener('DOMContentLoaded', function() {
    // Create additional background circles
    const bgAnimation = document.querySelector('.bg-animation');
    for (let i = 0; i < 5; i++) {
        const circle = document.createElement('div');
        circle.classList.add('bg-circle');
        const size = Math.random() * 300 + 100;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${posX}%`;
        circle.style.top = `${posY}%`;
        circle.style.animationDelay = `${delay}s`;
        bgAnimation.appendChild(circle);
    }

    // Add scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.option-card, .benefit-card');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initialize


    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('backToTop');
        
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Current Year Update
    document.addEventListener('DOMContentLoaded', () => {
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

        // Sample profile data with experience levels
        /*const profiles = [
            {
                id: 1,
                name: "Alex Johnson",
                title: "Full Stack Developer",
                experience: "intermediate",
                bio: "Passionate about building scalable web applications with clean architecture.",
                skills: ["JavaScript", "React", "Node.js"],
                github: "https://github.com/alexjohnson",
                avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
            },
            {
                id: 2,
                name: "Sarah Chen",
                title: "Frontend Engineer",
                experience: "fresher",
                bio: "Recent graduate specializing in React and TypeScript. Looking for mentorship opportunities.",
                skills: ["React", "TypeScript", "Figma"],
                github: "https://github.com/sarahchen",
                avatar: "https://avatars.githubusercontent.com/u/2345678?v=4"
            },
            {
                id: 3,
                name: "Miguel Rodriguez",
                title: "Backend Developer",
                experience: "expert",
                bio: "API development expert with 8 years experience in database optimization.",
                skills: ["Python", "Django", "PostgreSQL"],
                github: "https://github.com/miguelrod",
                avatar: "https://avatars.githubusercontent.com/u/3456789?v=4"
            },
            {
                id: 4,
                name: "Priya Patel",
                title: "DevOps Engineer",
                experience: "intermediate",
                bio: "Cloud infrastructure specialist with CI/CD pipeline expertise.",
                skills: ["Docker", "Kubernetes", "AWS"],
                github: "https://github.com/priyadevops",
                avatar: "https://avatars.githubusercontent.com/u/4567890?v=4"
            },
            {
                id: 5,
                name: "James Wilson",
                title: "Mobile Developer",
                experience: "fresher",
                bio: "Recent bootcamp graduate with Flutter certification. Eager to contribute to open source.",
                skills: ["Flutter", "Dart", "Firebase"],
                github: "https://github.com/jamesmobile",
                avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
            },
            {
                id: 6,
                name: "Emma Davis",
                title: "Data Scientist",
                experience: "expert",
                bio: "Machine learning practitioner with 10 years experience and data visualization expert.",
                skills: ["Python", "Pandas", "TensorFlow"],
                github: "https://github.com/emmadatasci",
                avatar: "https://avatars.githubusercontent.com/u/6789012?v=4"
            },
            {
                id: 7,
                name: "David Kim",
                title: "Frontend Architect",
                experience: "expert",
                bio: "React expert with 7 years experience focused on performance optimization.",
                skills: ["React", "TypeScript", "Next.js"],
                github: "https://github.com/davidkim",
                avatar: "https://avatars.githubusercontent.com/u/7890123?v=4"
            },
            {
                id: 8,
                name: "Lisa Wong",
                title: "QA Engineer",
                experience: "intermediate",
                bio: "Building robust test suites for web applications with 3 years experience.",
                skills: ["Cypress", "Jest", "Testing"],
                github: "https://github.com/lisawong",
                avatar: "https://avatars.githubusercontent.com/u/8901234?v=4"
            }
        ];

        // Carousel state
        let currentSlide = 0;
        const profilesPerSlide = 3;
        let totalSlides = Math.ceil(profiles.length / profilesPerSlide);
        
        // DOM elements
        const carouselSlide = document.getElementById('carouselSlide');
        const carouselNav = document.getElementById('carouselNav');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        const profileSearch = document.getElementById('profileSearch');
        const skillFilter = document.getElementById('skillFilter');
        const experienceFilter = document.getElementById('experienceFilter');
        
        // Initialize carousel
        function initCarousel() {
            renderCarousel();
            renderNavDots();
            addEventListeners();
        }
        
        // Render carousel slides
        function renderCarousel(filteredProfiles = profiles) {
            carouselSlide.innerHTML = '';
            const filtered = filteredProfiles || profiles;
            totalSlides = Math.ceil(filtered.length / profilesPerSlide);
            
            // Create groups of profiles
            for (let i = 0; i < totalSlides; i++) {
                const slideProfiles = filtered.slice(i * profilesPerSlide, (i + 1) * profilesPerSlide);
                const slideGroup = document.createElement('div');
                slideGroup.className = 'slide-group';
                slideGroup.style.transform = translateX(`${i * 100}%`);
                
                slideProfiles.forEach(profile => {
                    const experienceClass = profile.experience || 'intermediate';
                    const experienceText = getExperienceText(profile.experience);
                    
                    slideGroup.innerHTML += `
                        <div class="profile-card">
                            <div class="profile-header">
                                <img src="${profile.avatar}" alt="${profile.name}" class="profile-avatar">
                            </div>
                            <div class="profile-info">
                                <h3 class="profile-name">${profile.name}</h3>
                                <div>
                                    <span class="profile-title ${experienceClass}">${experienceText} ${profile.title}</span>
                                </div>
                                <p class="profile-bio">${profile.bio}</p>
                                <div class="profile-skills">
                                    ${profile.skills.map(skill => <span class="skill-tag">${skill}</span>).join('')}
                                </div>
                                <div class="profile-actions">
                                    <button class="action-btn contact-btn" onclick="contactUser(${profile.id})">
                                        <i class="fas fa-envelope"></i> Contact
                                    </button>
                                    <button class="action-btn github-btn" onclick="window.open('${profile.github}', '_blank')">
                                        <i class="fab fa-github"></i> GitHub
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                carouselSlide.appendChild(slideGroup);
            }
            
            currentSlide = 0;
            updateCarousel();
            renderNavDots(filtered);
        }
        
        // Get experience level text
        function getExperienceText(level) {
            switch(level) {
                case 'fresher': return 'Fresher';
                case 'intermediate': return 'Intermediate';
                case 'expert': return 'Expert';
                default: return '';
            }
        }
        
        // Render navigation dots
        function renderNavDots(filteredProfiles = profiles) {
            carouselNav.innerHTML = '';
            const filtered = filteredProfiles || profiles;
            totalSlides = Math.ceil(filtered.length / profilesPerSlide);
            
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot';
                if (i === currentSlide) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                carouselNav.appendChild(dot);
            }
        }
        
        // Add event listeners
        function addEventListeners() {
            prevBtn.addEventListener('click', () => {
                const filtered = filterProfiles();
                totalSlides = Math.ceil(filtered.length / profilesPerSlide);
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            });
            
            nextBtn.addEventListener('click', () => {
                const filtered = filterProfiles();
                totalSlides = Math.ceil(filtered.length / profilesPerSlide);
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            });
            
            profileSearch.addEventListener('input', () => {
                renderCarousel(filterProfiles());
            });
            
            skillFilter.addEventListener('change', () => {
                renderCarousel(filterProfiles());
            });
            
            experienceFilter.addEventListener('change', () => {
                renderCarousel(filterProfiles());
            });
        }
        
        // Update carousel position
        function updateCarousel() {
            const slideGroups = document.querySelectorAll('.slide-group');
            slideGroups.forEach((group, index) => {
                group.style.transform = translateX(`${(index - currentSlide) * 100}%`);
            });
            
            // Update active dot
            const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Show/hide navigation buttons based on current slide
            prevBtn.style.display = currentSlide === 0 ? 'none' : 'flex';
            nextBtn.style.display = currentSlide === totalSlides - 1 ? 'none' : 'flex';
        }
        
        // Go to specific slide
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
        }
        
        // Contact user function
        function contactUser(userId) {
            const profile = profiles.find(p => p.id === userId);
            if (profile) {
                alert(`Contacting ${profile.name} through Collab-Sphere messaging system.`);
            }
        }
        
        // Filter profiles based on search, skill and experience filters
        function filterProfiles() {
            const searchTerm = profileSearch.value.toLowerCase();
            const selectedSkill = skillFilter.value;
            const selectedExperience = experienceFilter.value;
            
            return profiles.filter(profile => {
                const matchesSearch = 
                    profile.name.toLowerCase().includes(searchTerm) ||
                    profile.bio.toLowerCase().includes(searchTerm) ||
                    profile.skills.some(skill => skill.toLowerCase().includes(searchTerm));
                
                const matchesSkill = 
                    !selectedSkill || 
                    profile.skills.some(skill => skill === selectedSkill);
                
                const matchesExperience = 
                    !selectedExperience || 
                    profile.experience === selectedExperience;
                
                return matchesSearch && matchesSkill && matchesExperience;
            });
        }
        
        // Initialize on DOM load
        document.addEventListener('DOMContentLoaded', initCarousel);
    

         // Sample profile data
        const profiles = [
            {
                id: 1,
                name: "Alex Johnson",
                title: "Full Stack Developer",
                bio: "Passionate about building scalable web applications with clean architecture.",
                skills: ["JavaScript", "React", "Node.js"],
                github: "https://github.com/alexjohnson",
                avatar: "https://avatars.githubusercontent.com/u/1234567?v=4"
            },
            {
                id: 2,
                name: "Sarah Chen",
                title: "Frontend Engineer",
                bio: "UI/UX specialist focused on creating responsive and accessible interfaces.",
                skills: ["React", "TypeScript", "Figma"],
                github: "https://github.com/sarahchen",
                avatar: "https://avatars.githubusercontent.com/u/2345678?v=4"
            },
            {
                id: 3,
                name: "Miguel Rodriguez",
                title: "Backend Developer",
                bio: "API development expert with experience in database optimization.",
                skills: ["Python", "Django", "PostgreSQL"],
                github: "https://github.com/miguelrod",
                avatar: "https://avatars.githubusercontent.com/u/3456789?v=4"
            },
            {
                id: 4,
                name: "Priya Patel",
                title: "DevOps Engineer",
                bio: "Cloud infrastructure specialist with CI/CD pipeline expertise.",
                skills: ["Docker", "Kubernetes", "AWS"],
                github: "https://github.com/priyadevops",
                avatar: "https://avatars.githubusercontent.com/u/4567890?v=4"
            },
            {
                id: 5,
                name: "James Wilson",
                title: "Mobile Developer",
                bio: "Building cross-platform applications with Flutter and React Native.",
                skills: ["Flutter", "Dart", "Firebase"],
                github: "https://github.com/jamesmobile",
                avatar: "https://avatars.githubusercontent.com/u/5678901?v=4"
            },
            {
                id: 6,
                name: "Emma Davis",
                title: "Data Scientist",
                bio: "Machine learning practitioner and data visualization expert.",
                skills: ["Python", "Pandas", "TensorFlow"],
                github: "https://github.com/emmadatasci",
                avatar: "https://avatars.githubusercontent.com/u/6789012?v=4"
            },
            {
                id: 7,
                name: "David Kim",
                title: "Frontend Architect",
                bio: "React expert focused on performance optimization.",
                skills: ["React", "TypeScript", "Next.js"],
                github: "https://github.com/davidkim",
                avatar: "https://avatars.githubusercontent.com/u/7890123?v=4"
            },
            {
                id: 8,
                name: "Lisa Wong",
                title: "QA Engineer",
                bio: "Building robust test suites for web applications.",
                skills: ["Cypress", "Jest", "Testing"],
                github: "https://github.com/lisawong",
                avatar: "https://avatars.githubusercontent.com/u/8901234?v=4"
            }
        ];

        // Carousel state
        let currentSlide = 0;
        const profilesPerSlide = 3;
        const totalSlides = Math.ceil(profiles.length / profilesPerSlide);
        
        // DOM elements
        const carouselSlide = document.getElementById('carouselSlide');
        const carouselNav = document.getElementById('carouselNav');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        const profileSearch = document.getElementById('profileSearch');
        const skillFilter = document.getElementById('skillFilter');
        
        // Initialize carousel
        function initCarousel() {
            renderCarousel();
            renderNavDots();
            addEventListeners();
        }
        
        // Render carousel slides
        function renderCarousel(filteredProfiles = profiles) {
            carouselSlide.innerHTML = '';
            const filtered = filteredProfiles || profiles;
            const newTotalSlides = Math.ceil(filtered.length / profilesPerSlide);
            
            // Create groups of profiles
            for (let i = 0; i < newTotalSlides; i++) {
                const slideProfiles = filtered.slice(i * profilesPerSlide, (i + 1) * profilesPerSlide);
                const slideGroup = document.createElement('div');
                slideGroup.className = 'slide-group';
                slideGroup.style.transform = `translateX(${i * 100}%)`;
                
                slideProfiles.forEach(profile => {
                    slideGroup.innerHTML += `
                        <div class="profile-card">
                            <div class="profile-header">
                                <img src="${profile.avatar}" alt="${profile.name}" class="profile-avatar">
                            </div>
                            <div class="profile-info">
                                <h3 class="profile-name">${profile.name}</h3>
                                <p class="profile-title">${profile.title}</p>
                                <p class="profile-bio">${profile.bio}</p>
                                <div class="profile-skills">
                                    ${profile.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                                <div class="profile-actions">
                                    <button class="action-btn contact-btn" onclick="contactUser(${profile.id})">
                                        <i class="fas fa-envelope"></i> Contact
                                    </button>
                                    <button class="action-btn github-btn" onclick="window.open('${profile.github}', '_blank')">
                                        <i class="fab fa-github"></i> GitHub
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                carouselSlide.appendChild(slideGroup);
            }
            
            currentSlide = 0;
            updateCarousel();
            renderNavDots(filtered);
        }
        
        // Render navigation dots
        function renderNavDots(filteredProfiles = profiles) {
            carouselNav.innerHTML = '';
            const filtered = filteredProfiles || profiles;
            const newTotalSlides = Math.ceil(filtered.length / profilesPerSlide);
            
            for (let i = 0; i < newTotalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot';
                if (i === currentSlide) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                carouselNav.appendChild(dot);
            }
        }
        
        // Add event listeners
        function addEventListeners() {
            prevBtn.addEventListener('click', () => {
                const filtered = filterProfiles();
                const newTotalSlides = Math.ceil(filtered.length / profilesPerSlide);
                currentSlide = (currentSlide - 1 + newTotalSlides) % newTotalSlides;
                updateCarousel();
            });
            
            nextBtn.addEventListener('click', () => {
                const filtered = filterProfiles();
                const newTotalSlides = Math.ceil(filtered.length / profilesPerSlide);
                currentSlide = (currentSlide + 1) % newTotalSlides;
                updateCarousel();
            });
            
            profileSearch.addEventListener('input', () => {
                renderCarousel(filterProfiles());
            });
            
            skillFilter.addEventListener('change', () => {
                renderCarousel(filterProfiles());
            });
        }
        
        // Update carousel position
        function updateCarousel() {
            const slideGroups = document.querySelectorAll('.slide-group');
            slideGroups.forEach((group, index) => {
                group.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
            });
            
            // Update active dot
            const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Go to specific slide
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
        }
        
        // Contact user function
        function contactUser(userId) {
            const profile = profiles.find(p => p.id === userId);
            if (profile) {
                alert(`Contacting ${profile.name} through Collab-Sphere messaging system.`);
            }
        }
        
        // Filter profiles based on search and skill filter
        function filterProfiles() {
            const searchTerm = profileSearch.value.toLowerCase();
            const selectedSkill = skillFilter.value;
            
            return profiles.filter(profile => {
                const matchesSearch = 
                    profile.name.toLowerCase().includes(searchTerm) ||
                    profile.bio.toLowerCase().includes(searchTerm) ||
                    profile.skills.some(skill => skill.toLowerCase().includes(searchTerm));
                
                const matchesSkill = 
                    !selectedSkill || 
                    profile.skills.some(skill => skill === selectedSkill);
                
                return matchesSearch && matchesSkill;
            });
        }
        
        // Initialize on DOM load
        document.addEventListener('DOMContentLoaded', initCarousel);*/

});