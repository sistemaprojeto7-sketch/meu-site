const steps = document.querySelectorAll(".flow-step");
const line = document.querySelector(".flow-line");
const section = document.querySelector(".ai-flow");
const stickyBtn = document.querySelector(".sticky-contact");
const contactSection = document.querySelector("#contact");
const meuForm = document.getElementById('form-contato');
const msgSucesso = document.getElementById('msg-sucesso');
const btnEnviar = document.getElementById('btn-enviar');

window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;

    if (line && section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        let startPoint = sectionTop - (windowHeight / 2);
        let progress = (scroll - startPoint) / sectionHeight;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        line.style.height = (progress * 100) + "%";

        steps.forEach(step => {
            const stepTop = step.getBoundingClientRect().top;
            if (stepTop < windowHeight - 150) {
                step.classList.add("show");
            } else {
                step.classList.remove("show");
            }
        });
    }

    if (stickyBtn && contactSection) {
        const contactTop = contactSection.getBoundingClientRect().top;
        if (contactTop < windowHeight - 100) {
            stickyBtn.style.opacity = "0";
            stickyBtn.style.pointerEvents = "none";
        } else {
            stickyBtn.style.opacity = "1";
            stickyBtn.style.pointerEvents = "all";
        }
    }
});

if (meuForm) {
    meuForm.addEventListener("submit", function(e) {
        e.preventDefault(); 
        e.stopPropagation(); // Trava qualquer outra ação do navegador
        
        btnEnviar.innerText = "ENVIANDO...";
        btnEnviar.disabled = true;

        const formData = new FormData(meuForm);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
        .then(() => { finalizarEnvio(); })
        .catch(() => { finalizarEnvio(); });
    });
}

function finalizarEnvio() {
    // 1. Pegamos a altura atual do card para ele não encolher
    const card = document.querySelector('.contact-glow-card');
    if (card) {
        card.style.minHeight = card.offsetHeight + 'px';
    }

    // 2. Esconde o formulário com opacidade primeiro para não dar tranco
    meuForm.style.opacity = '0';
    
    setTimeout(() => {
        // 3. Agora sim trocamos o display
        meuForm.style.display = 'none';
        msgSucesso.style.display = 'block';
        msgSucesso.style.opacity = '0';

        // 4. Mostra a mensagem suavemente
        setTimeout(() => {
            msgSucesso.style.opacity = '1';
            msgSucesso.style.transition = 'opacity 0.5s ease';
            
            // 5. Rola suavemente para garantir que o sucesso está no centro
            msgSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);

        meuForm.reset();
    }, 300);
}