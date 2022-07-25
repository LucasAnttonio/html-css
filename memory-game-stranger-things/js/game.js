const grid = document.querySelector('.grid')

const characters = [
    'dustin-henderson',
    'eleven',
    'jim-hopper',
    'jonathan-byers',
    'lucas-sinclair',
    'max-mayfield',
    'mike-wheeler',
    'nancy-wheeler',
    'steve-harrington',
    'will-byers'
]

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card')

    if (disabledCards.length === 20) {
        alert('Parabéns, você ganhou!!!')
    }
}

let firstCard = ''
let secondCard = ''

const checkCards = () => {
    const fistCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')
    
    if (fistCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')
        firstCard = ''
        secondCard = ''

        checkEndGame()
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')
            firstCard = ''
            secondCard = ''
        }, 500)
    }
}

const revealCard = ({target}) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode
        checkCards()
    }
}

const createCard = (character) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../img/${character}.jpg')`

    card.appendChild(front)
    card.appendChild(back)

    grid.appendChild(card)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)

    return card
}

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters ]

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

    shuffledArray.forEach((character) => {
        const card = createCard(character)
        grid.appendChild(card)
    }) 
}

loadGame()