document.documentElement.classList.remove('no-js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
	menuButton.addEventListener('click', () => {
		const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
		menuButton.setAttribute('aria-expanded', String(!isOpen));
		navigation.classList.toggle('is-open', !isOpen);
	});

	navigation.addEventListener('click', (event) => {
		if (event.target.closest('a')) {
			menuButton.setAttribute('aria-expanded', 'false');
			navigation.classList.remove('is-open');
		}
	});
}

document.querySelectorAll('[data-year]').forEach((element) => {
	element.textContent = new Date().getFullYear();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealItems.length) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add('is-visible'));
}

const employeeSearch = document.querySelector('#employee-search');
const peopleCards = [...document.querySelectorAll('.person-card[data-name]')];
const teamCount = document.querySelector('#team-count');
const noResults = document.querySelector('#no-results');

function filterPeople() {
	const searchTerm = employeeSearch?.value.trim().toLowerCase() ?? '';
	let visibleCount = 0;

	peopleCards.forEach((card) => {
		const searchableText = `${card.dataset.name} ${card.dataset.role}`.toLowerCase();
		const isVisible = searchableText.includes(searchTerm);
		card.hidden = !isVisible;
		if (isVisible) visibleCount += 1;
	});

	if (teamCount) {
		teamCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'team member' : 'team members'}`;
	}
	if (noResults) noResults.hidden = visibleCount > 0;
}

employeeSearch?.addEventListener('input', filterPeople);

const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const pageSections = [...document.querySelectorAll('main section[id]')];

if ('IntersectionObserver' in window && sectionLinks.length && pageSections.length) {
	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				sectionLinks.forEach((link) => {
					if (link.getAttribute('href') === `#${entry.target.id}`) {
						link.setAttribute('aria-current', 'page');
					} else {
						link.removeAttribute('aria-current');
					}
				});
			}
		});
	}, { rootMargin: '-25% 0px -65% 0px' });

	pageSections.forEach((section) => sectionObserver.observe(section));
}
