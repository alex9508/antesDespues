document.addEventListener('DOMContentLoaded', () => {
    const verifyButton = document.getElementById('verify-button');
    const randomButton = document.getElementById('random-numbers');

    // Verificar que los botones existan
    if (!verifyButton || !randomButton) {
        console.error('No se encontraron los botones');
        return;
    }

    // Event Listeners para los botones
    verifyButton.addEventListener('click', verificarRespuestas);
    randomButton.addEventListener('click', cambiarNumeros);

    // Configurar inputs para aceptar solo números
    document.querySelectorAll('.input-box').forEach(input => {
        input.addEventListener('input', (e) => {
            // Permitir solo números y limitar a 2 dígitos
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length > 2) {
                value = value.slice(0, 2);
            }
            e.target.value = value;
        });

        // Manejar la tecla Enter
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur();
            }
        });
    });

    function verificarRespuestas() {
        const numberGroups = document.querySelectorAll('.number-group');
        let allCorrect = true;
        
        numberGroups.forEach(group => {
            const mainNumber = parseInt(group.querySelector('.main-number').textContent);
            const [beforeInput, afterInput] = group.querySelectorAll('.input-box');
            
            const beforeValue = parseInt(beforeInput.value);
            const afterValue = parseInt(afterInput.value);
            
            // Verificar número anterior
            if (!isNaN(beforeValue) && beforeValue === mainNumber - 1) {
                beforeInput.style.backgroundColor = '#90EE90'; // Verde claro
            } else {
                beforeInput.style.backgroundColor = '#FFB6C1'; // Rojo claro
                allCorrect = false;
            }
            
            // Verificar número posterior
            if (!isNaN(afterValue) && afterValue === mainNumber + 1) {
                afterInput.style.backgroundColor = '#90EE90';
            } else {
                afterInput.style.backgroundColor = '#FFB6C1';
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            showFireworks();
            setTimeout(() => {
                alert('¡Felicitaciones! ¡Todas las respuestas son correctas! 🎉');
            }, 500);
        } else {
            alert('Hay algunas respuestas incorrectas. ¡Sigue intentando!');
        }
    }

    function cambiarNumeros() {
        const mainNumbers = document.querySelectorAll('.main-number');
        const usedNumbers = new Set();

        mainNumbers.forEach(numberElement => {
            const newNumber = generateRandomNumber(11, 29, usedNumbers);
            numberElement.textContent = newNumber;
        });

        // Limpiar inputs y restaurar color original
        document.querySelectorAll('.input-box').forEach(input => {
            input.value = '';
            input.style.backgroundColor = '#4CAF50';
        });
    }

    function generateRandomNumber(min, max, usedNumbers) {
        let number;
        do {
            number = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (usedNumbers.has(number));
        usedNumbers.add(number);
        return number;
    }

    function createFirework(x, y) {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
        for (let i = 0; i < 30; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 50 + Math.random() * 50;
            firework.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px)`;
            
            document.querySelector('.fireworks-container').appendChild(firework);
            setTimeout(() => firework.remove(), 1000);
        }
    }

    function showFireworks() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createFirework(x, y);
            }, i * 200);
        }
    }
});
