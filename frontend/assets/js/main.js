// A calculadora será um objeto
const calculadora = {
	display: document.querySelector('.display'),

	// Método para iniciar a calculadora
	iniciaCalculadora() {
		this.cliqueBotoes();
		this.validaEsc();
		this.validaEnter();
		this.validaBackspace();
		this.protegeEval();
	},

	// Protegendo o usuário da função eval, impedindo o uso de letras
	protegeEval() {
		this.display.addEventListener('keypress', e => {
			if (e.keyCode > 64 && e.keyCode < 91) {
				this.limpaDisplay();
				alert('Não é possível usar letras... tente novamente.');
			} else if (e.keyCode > 96 && e.keyCode < 123) {
				this.limpaDisplay();
				alert('Não é possível usar letras... tente novamente.');
			}
		});
	},

	// Método para realizar a operação matemática desejada
	realizaConta() {
		let conta = this.display.value;

		try {
			conta = eval(conta)
			if (!conta)
				alert('Ops... conta inválida!');

			this.display.value = conta;
		} catch(e) {
			alert('Ops... conta inválida!');
		}
	},

	// Valida a tecla ENTER para realizar a operação
	validaEnter() {
		this.display.addEventListener('keypress', e => {
			if (e.keyCode === 13)
				this.realizaConta();
		});
	},

	// Valida a tecla ESC para limpar o display
	validaEsc() {
		this.display.addEventListener('keydown', e => {
			if (e.keyCode === 27)
				this.limpaDisplay();
		});
	},

	// Validando a tecla backspace para poder apagar um dígito
	validaBackspace() {
		this.display.addEventListener('keypress', e => {
			if (e.keyCode === 8)
				this.apagaUmDigito();
		});
	},

	// Método para limpar a tela
	limpaDisplay() {
		this.display.value = '';
		this.display.focus();
	},

	// Método para remover um dígito do display
	apagaUmDigito() {
		this.display.value = this.display.value.slice(0, -1);
	},

	// Monitoramento dos cliques nos botões
	cliqueBotoes() {
		document.addEventListener('click', e => {
			const elemento = e.target;

			if (elemento.classList.contains('botaoNum'))
				this.botaoParaDisplay(elemento.innerText);

			if (elemento.classList.contains('botaoClear'))
				this.limpaDisplay();

			if (elemento.classList.contains('botaoDel'))
				this.apagaUmDigito();

			if (elemento.classList.contains('botaoResultado'))
				this.realizaConta();
		});
	},

	// Coloca o texto que está no botão no display
	botaoParaDisplay(texto) {
		this.display.value += texto;
		this.display.focus();
	},
};

calculadora.iniciaCalculadora();
