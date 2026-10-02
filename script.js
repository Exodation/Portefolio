document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    const worksData = [
        {
            title: "Tool Shop System",
            description: "A fully costumizable tool shop made for VoP, UI made by me. Supports any tool and multiple shops",
            category: "systems",
            videoUrl: "https://youtu.be/pTPqFqpoMl4",
            tags: ["Systems", "UI"]
        },
        {
            title: "Mining System Prototype",
            description: "Old video of a prototype of a mining system, before adding any effects, that supports using the pickaxes as melee weapons aswell.",
            category: "combat",
            videoUrl: "https://youtu.be/hOYvBadoauQ",
            tags: ["Systems", "Combat"]
        },
        {
            title: "Heatwave",
            description: "[OLD] A natural disaster made for VoP.",
            category: "systems",
            videoUrl: "https://youtu.be/2FD-kywQwF8",
            tags: ["Systems", "Old"]
        },
        {
            title: "Vault Robbery",
            description: "[OLD] A raidable vault with lasers, alarms, security drones, turrets and loot.",
            category: "systems",
            videoUrl: "https://youtu.be/3mXhSD_Le10",
            tags: ["Systems", "Old"]
        },
        {
            title: "Weapon System",
            description: "[OLD] First version of the gun system in VoP, aswell as the NPCs.",
            category: "combat",
            videoUrl: "https://youtu.be/zzLoh9Z508s",
            tags: ["Systems", "Combat", "Old"]
        },
        {
            title: "Facility elevator",
            description: "[OLD] A moving facility elevator with a teleportation phase to move players in between floors.",
            category: "systems",
            videoUrl: "https://youtu.be/gwqDEokK4Rc",
            tags: ["Systems", "Old"]
        },
        {
            title: "Tool Placement System",
            description: "[OLD] One of my first recorded commissions aswell. Simple placement system for tools (tables only).",
            category: "Commissions",
            videoUrl: "https://youtu.be/Ke2SDLAZiUM",
            tags: ["Systems", "Commissions", "Old"]
        },
        {
            title: "Camera System",
            description: "[OLD] One of my first commissions. A controllable camera system made for a roblox youtube show.",
            category: "Commissions",
            videoUrl: "https://youtu.be/xKcOgUEsrCU",
            tags: ["Systems", "Commissions", "Old"]
        }
    ];

    const worksGrid = document.getElementById('works-grid');
    if (worksGrid) {
        worksData.forEach(work => {
            const tagsHTML = work.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            const videoId = work.videoUrl.split('youtu.be/')[1] || work.videoUrl.split('v=')[1];

            const cardHTML = `
                <div class="work-card glow-card" data-category="${work.category}">
                    <div class="video-container">
                        ${videoId ? `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>` : `<div class="video-placeholder"></div>`}
                    </div>
                    <div class="work-content glow-content">
                        <h3>${work.title}</h3>
                        <p>${work.description}</p>
                        <div class="tags">${tagsHTML}</div>
                    </div>
                </div>
            `;
            worksGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const worksCards = document.querySelectorAll('.work-card');

            worksCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    document.addEventListener('mousemove', e => {
        const target = e.target.closest('.glow-card');
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
    });

    const timeElement = document.getElementById('local-time');
    if (timeElement) {
        function updateTime() {
            const now = new Date();
            const options = { timeZone: 'GMT', hour: '2-digit', minute: '2-digit', hour12: false };
            timeElement.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);
        }
        updateTime();
        setInterval(updateTime, 60000);
    }

    const typeElements = document.querySelectorAll('.typewrite');
    const typeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.getAttribute('data-text');
                el.textContent = '';
                el.classList.add('typing');
                let i = 0;
                const speed = 40; // ms per char
                function type() {
                    if (i < text.length) {
                        el.textContent += text.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    } else {
                        el.classList.remove('typing');
                    }
                }
                setTimeout(type, 300); // slight delay before starting
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    typeElements.forEach(el => {
        el.setAttribute('data-text', el.textContent);
        el.textContent = '\u00A0'; // invisible space to maintain height
        typeObserver.observe(el);
    });

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;

        const bgImages = document.querySelectorAll('.bg-image');
        if (bgImages.length <= 1) return; // No crossfade if only 1 image

        const segmentCount = bgImages.length - 1;
        const segmentSize = 1 / segmentCount;

        bgImages.forEach((img, index) => {
            const peak = index * segmentSize;
            const distance = Math.abs(scrollPercent - peak);

            let opacity = 1 - (distance / segmentSize);
            img.style.opacity = Math.max(0, Math.min(1, opacity));
        });
    });
});
