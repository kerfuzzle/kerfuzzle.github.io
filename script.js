window.addEventListener('load', () => {
	document.querySelectorAll('a').forEach(element => {
		element.addEventListener('mouseenter', event => {
			animateCipher(event, true)
		})
		element.addEventListener('mouseleave', event => {
			animateCipher(event, false)
		})

		if(window.matchMedia("(hover: none)").matches) {
			setInterval(() => {
				element.dispatchEvent(new MouseEvent('mouseenter'))
				element.classList.toggle('animate')
				setTimeout(() => {
					element.classList.toggle('animate')
					element.dispatchEvent(new MouseEvent('mouseleave'))
				}, 5000)
			}, 10000)
		}
	})
})

window.addEventListener('mousemove', (event) => {
	document.body.style.setProperty('--mouse-x', event.clientX + 'px')
	document.body.style.setProperty('--mouse-y', event.clientY + 'px')
})

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function animateCipher(event, isRightward) {
	const element = event.target
	if (!element) return
	const isAnimating = element.getAttribute("is-animating")
	if (!element || isAnimating == "true") return
	element.setAttribute("is-animating", "true")
	const target = element.innerText
	let iterations = 0
	if(!isRightward) iterations = target.length
	const interval = setInterval(() => { 	
		element.innerText = element.innerText.split("").map((char, index) => {
			if(isRightward && index < iterations || !isRightward && index > iterations) return target[index]
			else return alphabet[Math.floor(Math.random() * 26)]
		}).join("");
		if(iterations >= target.length && isRightward || iterations < 0 && !isRightward) {
			clearInterval(interval)
			element.setAttribute("is-animating", "false")
		}
		if(isRightward) iterations += 1 / 2
		else iterations -= 1/2
	}, 500 / target.length / 2)
}