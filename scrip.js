
    // ========== CONFIGURACIÓN ==========
    const CONFIG = {
      // Número de WhatsApp (con código de país, sin + ni espacios)
      whatsappNumber: "5578755162",  // ← CÁMBIALO

      // Texto de la carta
      carta: `Desde que llegaste a mi vida, todo tiene más sentido.

Tus risas se volvieron mi canción favorita, y tus abrazos el refugio más cálido del universo.

Cada día contigo es un capítulo más de esta historia hermosa que estamos escribiendo juntos, una historia sin final, tejida con amor, paciencia, y millones de pequeños detalles.

Gracias por ser tú.
Gracias por elegirme cada día.

Te amo más allá de lo que las palabras pueden decir, más allá del tiempo, de la distancia y de cualquier obstáculo.

Contigo, siempre.`
    };

    // ========== PANTALLA DE HUELLA ==========
    const screenFp = document.getElementById('screen-fingerprint');
    const mainContent = document.getElementById('main-content');
    const fpArea = document.getElementById('fpArea');
    const progressArc = document.getElementById('progressArc');
    const scanLine = document.getElementById('scanLine');
    const fpStatus = document.getElementById('fpStatus');

    let isLoading = false;

    function startScan() {
      if (isLoading) return;
      isLoading = true;

      progressArc.classList.add('active');
      scanLine.classList.add('active');
      fpStatus.classList.add('loading');
      fpStatus.textContent = 'Escaneando...';

      const duration = 3200;
      const start = performance.now();

      function animate(now) {
        const p = Math.min((now - start) / duration, 1);
        progressArc.style.setProperty('--progress', (p * 360) + 'deg');

        if (p < 0.3) fpStatus.textContent = 'Escaneando...';
        else if (p < 0.6) fpStatus.textContent = 'Analizando...';
        else if (p < 0.9) fpStatus.textContent = 'Casi listo...';
        else fpStatus.textContent = '¡Listo!';

        if (p < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => {
            screenFp.classList.add('hide');
            mainContent.classList.add('show');
            createHearts();
          }, 500);
        }
      }
      requestAnimationFrame(animate);
    }

    fpArea.addEventListener('click', startScan);
    fpArea.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startScan();
    }, { passive: false });

    // ========== SOBRE Y CARTA ==========
    const envelope = document.getElementById('envelope');
    const btnAbrir = document.getElementById('btnAbrir');
    const letterModal = document.getElementById('letterModal');
    const letterText = document.getElementById('letterText');
    const btnCerrar = document.getElementById('btnCerrar');

    function openLetter() {
      envelope.classList.add('open');
      letterText.textContent = '';
      letterModal.classList.add('show');

      const text = CONFIG.carta;
      let i = 0;
      letterText.textContent = '';

      function type() {
        if (i < text.length) {
          letterText.textContent += text.charAt(i);
          i++;
          setTimeout(type, 18);
        }
      }
      setTimeout(type, 400);
    }

    btnAbrir.addEventListener('click', openLetter);
    envelope.addEventListener('click', openLetter);

    btnCerrar.addEventListener('click', () => {
      letterModal.classList.remove('show');
      envelope.classList.remove('open');
    });

    letterModal.addEventListener('click', (e) => {
      if (e.target === letterModal) {
        letterModal.classList.remove('show');
        envelope.classList.remove('open');
      }
    });

    // ========== WHATSAPP ==========
    document.getElementById('btnWhatsapp').addEventListener('click', () => {
      const mensaje = document.getElementById('mensaje').value.trim();
      if (!mensaje) {
        alert('Escribe un mensajito primero ❤️');
        return;
      }
      const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');
    });

    // ========== CORAZONES FLOTANTES ==========
    function createHearts() {
      const container = document.getElementById('hearts');
      setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = ['❤️', '💕', '💗', '💖'][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (4 + Math.random() * 4) + 's';
        heart.style.fontSize = (0.9 + Math.random() * 0.8) + 'rem';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
      }, 800);
    }
  