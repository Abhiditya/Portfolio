function toggleMobileMenu(){
	document.getElementById("menu").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector('.intro p');
    const text = textElement.textContent;
    textElement.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            textElement.style.borderRight = '2px solid black';
        }
    }

    typeWriter();

    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const themeImage = document.getElementById('theme-image');

    const lightImage = './Img/Me(light).png';
    const darkImage = './Img/Me(dark).png';

    function toggleTheme() {
        body.classList.toggle('light-theme');
        if (body.classList.contains('light-theme')) {
            icon.textContent = 'dark_mode'; 
            themeImage.src = lightImage; 
            localStorage.setItem('theme', 'light');
        } else {
            icon.textContent = 'light_mode';
            themeImage.src = darkImage; 
            localStorage.setItem('theme', 'dark');
        }
    }

    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        icon.textContent = 'dark_mode'; 
        themeImage.src = lightImage; 
    } else {
        icon.textContent = 'light_mode'; 
        themeImage.src = darkImage; 
    }

    
    themeToggleButton.addEventListener('click', toggleTheme);

	const image = document.getElementById('theme-image');

	image.addEventListener('mousemove', (event) => {
		const rect = image.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top; 

		
		const rotateX = (y / rect.height - 0.5) * -30; 
		const rotateY = (x / rect.width - 0.5) * 30; 

		image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	});

	image.addEventListener('mouseleave', () => {
		
		image.style.transform = 'rotateX(0deg) rotateY(0deg)';
	});

});
