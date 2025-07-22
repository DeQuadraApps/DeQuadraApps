document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(element => revealObserver.observe(element));

    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        status.textContent = "Enviando...";
        status.style.color = 'var(--secondary-text)';
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: new FormData(event.target),
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                status.textContent = "Mensagem enviada com sucesso!";
                status.style.color = '#28a745';
                form.reset();
            } else {
                const responseData = await response.json();
                status.textContent = responseData.errors ? responseData.errors.map(e => e.message).join(", ") : "Erro ao enviar.";
                status.style.color = '#dc3545';
            }
        } catch (error) {
            status.textContent = "Erro de conexão.";
            status.style.color = '#dc3545';
        }
    });
});
