//HEADER
const header = document.querySelector(".header-container");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 110) {
        header.style.transform = "translateY(-120%)";
        header.style.opacity = "1";
    } else {
        header.style.transform = "translateY(0)";
        header.style.opacity = "1";
    }

    lastScroll = currentScroll;
});

//SLIDE-OUT MENU
const btn = document.querySelector(".mobile-menu");
const menu = document.querySelector(".slideout-menu");
const overlay = document.querySelector(".overlay");
const links = document.querySelectorAll(".slideout-menu a");

btn.addEventListener("click", () => {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
});

links.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    });
});

//MESSAGEM ERRO FORM
const mensagens = {
    name: "Digite seu nome",
    email: "Digite um email válido",
    phone: "Informe seu telefone",
};

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("invalid", function () {
        const msg = mensagens[this.name] || "Por favor preencha este campo";
        this.setCustomValidity(msg);
    });

    input.addEventListener("input", function () {
        this.setCustomValidity(""); 
    });
});

//ENVIO FORMULARIO
const form = document.getElementById("form-orcamento");
const botao = document.getElementById("send");

form.addEventListener("submit", async function(e) {
  e.preventDefault(); 

  botao.disabled = true;
  botao.value = "Enviando...";
  botao.classList.remove("sucesso", "erro"); 

  try {
    let response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      botao.value = "Enviado!";
      botao.classList.add("sucesso");
      form.reset();

      setTimeout(() => {
        botao.disabled = false;
        botao.value = "Enviar";
        botao.classList.remove("sucesso");
      }, 3000);

    } else {
      botao.value = "Erro, tente de novo";
      botao.classList.add("erro");
      botao.disabled = false;

      setTimeout(() => {
        botao.value = "Enviar";
        botao.classList.remove("erro");
      }, 3000);
    }
  } catch (err) {
    botao.value = "Erro de conexão";
    botao.classList.add("erro");
    botao.disabled = false;

    setTimeout(() => {
      botao.value = "Enviar";
      botao.classList.remove("erro");
    }, 3000);
  }
});
