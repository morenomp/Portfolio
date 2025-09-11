document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('introOverlay');
    const introVideo = document.getElementById('introVideo');
    const miniPlaceholder = document.getElementById('miniPlaceholder');
    const miniBot = document.getElementById('miniBot');
    const formPanel = document.getElementById('formPanel');
    const serviceSelect = document.getElementById('service');
    const dynamicFields = document.getElementById('dynamicFields');
    const priceOutput = document.getElementById('price');
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    introVideo.addEventListener('canplay', () => {
        setTimeout(animateIntroToMini, 700);
    });

    setTimeout(() => {
        if (!introOverlay.classList.contains('done')) animateIntroToMini();
    }, 3000);

    function animateIntroToMini() {
        if (introOverlay.classList.contains('done')) return;
        const introRect = introVideo.getBoundingClientRect();
        const targetRect = miniPlaceholder.getBoundingClientRect();

        const introCenterX = introRect.left + introRect.width / 2;
        const introCenterY = introRect.top + introRect.height / 2;
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        const dx = targetCenterX - introCenterX;
        const dy = targetCenterY - introCenterY;
        const scale = Math.max(0.12, (targetRect.width / introRect.width));

        introVideo.style.transition = 'transform 0.8s cubic-bezier(.2,.9,.2,1), opacity 0.5s ease';
        introVideo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
        introVideo.style.zIndex = 9999;
        introVideo.addEventListener('transitionend', onIntroTransitionEnd, { once: true });
        introOverlay.classList.add('animating');
    }

    function onIntroTransitionEnd() {
        introOverlay.classList.add('done');

        introOverlay.style.transition = 'opacity 0.25s ease';
        introOverlay.style.opacity = '0';
        setTimeout(() => {
            introOverlay.style.display = 'none';
        }, 180);

        miniBot.classList.add('visible');

        try {
            miniBot.currentTime = 0;
        } catch (err) {
        }

        miniBot.play()
            .then(() => {
            })
            .catch((err) => {
                console.warn('miniBot autoplay blocked — user interaction might be needed.', err);
            });
        formPanel.classList.remove('locked');
    }

    const PRICES = {
        web: { base: 600, urgent: 400, normal: 200, flexible: 0 },
        design: { base: 200, urgent: 150, normal: 70, flexible: 0 }
    };

    let currentBase = 0;

    serviceSelect.addEventListener('change', () => {
        renderFields(serviceSelect.value);
        updatePrice();
    });

    dynamicFields.addEventListener('change', updatePrice);
    dynamicFields.addEventListener('input', updatePrice);

    function renderFields(service) {
        dynamicFields.innerHTML = ''; // limpia
        if (service === 'web') {
            currentBase = PRICES.web.base;
            dynamicFields.innerHTML = `
    <hr/>
    <label class="serviceColor">Descripción de la idea</label>
    <small class="subtitle">Cuéntame tu idea o qué te gustaría incluir en la web.</small>
    <textarea name="idea" id="idea" placeholder="Escribe tu idea aquí..." required></textarea>
    <hr/>
    <label class="serviceColor">Plazo deseado</label>
    <small class="subtitle">Selecciona el tiempo aproximado en el que necesitas tu proyecto.</small>
    <select name="plazo" id="plazoWeb">
      <option value="urgente">Urgente (menos de 2 semanas)</option>
      <option value="normal">Normal (2–4 semanas)</option>
      <option value="flexible">Flexible (más de 1 mes)</option>
    </select>
    <hr/>
    <label class="serviceColor">Estilo visual preferido (opcional)</label>
    <small class="subtitle">Elige el estilo visual que mejor represente tu proyecto.</small>
    <select name="estilo" id="estiloWeb">
      <option value="">-- No especificar --</option>
      <option>Minimalista</option>
      <option>Moderno y colorido</option>
      <option>Corporativo</option>
      <option>Otro (especificar)</option>
    </select>
  `;
        } else if (service === 'design') {
            currentBase = PRICES.design.base;
            dynamicFields.innerHTML = `
    <hr/>
    <label class="serviceColor">Descripción de la idea</label>
    <small class="subtitle">Describe brevemente el diseño que necesitas.</small>
    <textarea name="idea" id="idea" placeholder="Escribe tu idea aquí..." required></textarea>
    <hr/>
    <label class="serviceColor">Plazo deseado</label>
    <small class="subtitle">Selecciona en cuánto tiempo necesitas tu diseño.</small>
    <select name="plazo" id="plazoDesign">
      <option value="urgente">Urgente (menos de 3 días)</option>
      <option value="normal">Normal (1 semana)</option>
      <option value="flexible">Flexible (más de 1 semana)</option>
    </select>
    <hr/>
    <label class="serviceColor">Estilo visual preferido (opcional)</label>
    <small class="subtitle">Indica el estilo visual que prefieras.</small>
    <select name="estilo" id="estiloDesign">
      <option value="">-- No especificar --</option>
      <option>Minimalista</option>
      <option>Moderno y colorido</option>
      <option>Corporativo</option>
      <option>Otro (especificar)</option>
    </select>
  `;
        } else {
            currentBase = 0;
        }
    }

    function updatePrice() {
        const service = serviceSelect.value;
        if (!service) {
            priceOutput.textContent = `Precio estimado: 0 €`;
            return;
        }
        let final = currentBase || 0;
        // plazo
        const plazo = dynamicFields.querySelector('select[name="plazo"], select#plazoWeb, select#plazoDesign');
        const val = plazo ? plazo.value : '';
        if (service === 'web') {
            if (val === 'urgente') final += PRICES.web.urgent;
            if (val === 'normal') final += PRICES.web.normal;
        }
        if (service === 'design') {
            if (val === 'urgente') final += PRICES.design.urgent;
            if (val === 'normal') final += PRICES.design.normal;
        }

        priceOutput.textContent = `Precio estimado: ${final} €`;
    }

    /* ---------- ENVÍO ---------- */
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        updatePrice();

        const email = document.getElementById('email').value.trim();
        const service = serviceSelect.value;
        const idea = (document.getElementById('idea') || { value: '' }).value.trim();
        const plazoEl = dynamicFields.querySelector('select[name="plazo"], select#plazoWeb, select#plazoDesign');
        const plazo = plazoEl ? plazoEl.value : '';
        const estiloEl = dynamicFields.querySelector('select[name="estilo"], select#estiloWeb, select#estiloDesign');
        const estilo = estiloEl ? estiloEl.value : '';
        const precio = priceOutput.textContent.replace('Precio estimado: ', '').trim();

        const templateParams = {
            from_email: email,
            servicio: service === 'web' ? 'Desarrollo Web' : 'Diseño Gráfico',
            plazo: plazo,
            estilo: estilo,
            idea: idea,
            precio: precio
        };

        try {
            const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    service_id: 'service_xh0qpe9',
                    template_id: 'template_pdb370u',
                    user_id: 'oFg2zsy7jgQ3nBjgZ',
                    template_params: templateParams
                })
            });

            if (res.ok) {
                alert("Formulario enviado correctamente!");
                contactForm.reset();
            } else {
                const errorText = await res.text();
                console.error("Error EmailJS:", errorText);
                alert("No se pudo enviar el formulario, intenta de nuevo.");
            }
        } catch (err) {
            console.error("Error EmailJS catch:", err);
            alert("No se pudo enviar el formulario, intenta de nuevo.");
        }
    });
});
