let theme = localStorage.getItem('theme')

if(theme == null){
	setTheme('blue')
}else{
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dots')


for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
		let mode = this.dataset.mode
		setTheme(mode)
	})
}

function setTheme(mode){
	if(mode == 'light'){
		document.getElementById('theme-style').href = 'css/light.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'css/blue.css'
	}

	if(mode == 'green'){
		document.getElementById('theme-style').href = 'css/green.css'
	}

	if(mode == 'purple'){
		document.getElementById('theme-style').href = 'css/purple.css'
	}

	localStorage.setItem('theme', mode)
}

const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel_btn-right');
const prevBtn = document.querySelector('.carousel_btn-left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// =======================  Functions  ===============================

const setSlidePosition = (slide, index) => {
	slide.style.left = index * slideWidth + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
	track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
	currentSlide.classList.remove('current_slide');
	targetSlide.classList.add('current_slide');
}

const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove('current_slide')
	targetDot.classList.add('current_slide')
}

const updateArrows = (prevBtn, nextBtn, targetIndex, slides) => {
	if (targetIndex === 0)
	{
		prevBtn.classList.add('is_hidden')
		nextBtn.classList.remove('is_hidden')
	}
	else if( targetIndex === (slides.length -1))
	{
		prevBtn.classList.remove('is_hidden')
		nextBtn.classList.add('is_hidden')
	}
	else
	{
		prevBtn.classList.remove('is_hidden')
		nextBtn.classList.remove('is_hidden')
	}
}

// =======================  EventHandlers  ===============================

nextBtn.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current_slide');
	const nextSlide = currentSlide.nextElementSibling;
	const currentDot = dotsNav.querySelector('.current_slide');
	const nextDot = currentDot.nextElementSibling;
	const nextIndex = slides.findIndex(slide => slide === nextSlide)

	updateDots(currentDot, nextDot);
	moveToSlide(track, currentSlide, nextSlide);
	updateArrows(prevBtn, nextBtn, nextIndex, slides);
}) 

prevBtn.addEventListener('click', e => {
	const currentSlide = track.querySelector('.current_slide');
	const prevSlide = currentSlide.previousElementSibling;	
	const currentDot = dotsNav.querySelector('.current_slide');
	const prevDot = currentDot.previousElementSibling;
	const prevIndex = slides.findIndex(slide => slide === prevSlide)

	updateDots(currentDot, prevDot);
	moveToSlide(track, currentSlide, prevSlide);
	updateArrows(prevBtn, nextBtn, prevIndex, slides);
})

dotsNav.addEventListener('click', e => {
	const targetDot = e.target.closest('button');

	if(!targetDot) return

	const currentSlide = track.querySelector('.current_slide');
	const currentDot =  dotsNav.querySelector('.current_slide');
	const targetIndex = dots.findIndex(dot => dot === targetDot)
	console.log(targetIndex);

	const targetSlide = slides[targetIndex];
	moveToSlide(track, currentSlide, targetSlide);
	updateDots(currentDot, targetDot);

	updateArrows(prevBtn, nextBtn, targetIndex, slides);
})