Headout to Ingresso Bridge 🚀
Esta é uma extensão para Google Chrome desenvolvida em JavaScript (Manifest V3) projetada para automatizar o fluxo de trabalho entre o dashboard da Headout e a plataforma Ingresso com Desconto (ICD).

📋 Descrição do Projeto
- O objetivo principal desta ferramenta é eliminar a digitação manual de dados de reservas, reduzindo erros operacionais e aumentando a produtividade. A extensão adiciona botões de cópia inteligente na Headout e realiza o preenchimento automático por proximidade de labels na plataforma de destino.

✨ Funcionalidades
- Injeção Dinâmica: Adiciona um botão "COPIAR" diretamente na primeira coluna da tabela de reservas da Headout.

- Extração Inteligente: Captura o Booking ID, Guest Name e e-mail (após revelação manual dos detalhes).

- Preenchimento por Proximidade: No site da Ingresso com Desconto, o script localiza os campos de input baseando-se nos números de referência (2, 3, 4 e 15) presentes na página, garantindo precisão mesmo que os IDs do site mudem.

- Configuração de Operador: Popup dedicado para que o operador insira seu nome, que será concatenado ao campo de CV (Campo 15) automaticamente.

🛠️ Estrutura de Arquivos
- manifest.json: Configurações da extensão, permissões de storage e regras de injeção em frames.

- headout_content.js: Script de extração de dados e injeção de botões na Headout.

- ingresso_content.js: Script de preenchimento automático na Ingresso com Desconto.

- popup.html / popup.js: Interface para configuração do nome do operador.

- icon.png: Ícone visual da extensão.

🚀 Como Instalar
- Faça o download ou clone este repositório.

- Abra o Google Chrome e acesse chrome://extensions/.

- Ative o "Modo do desenvolvedor" no canto superior direito.

- Clique em "Carregar sem compactação".

- Selecione a pasta onde os arquivos do projeto estão salvos.

📖 Modo de Uso
- Clique no ícone da extensão e salve seu nome de operador no popup.

- Acesse o Dashboard da Headout.

- Na reserva desejada, clique em "View contact details" (necessário para que o e-mail fique visível para cópia).

- Clique no botão "COPIAR" injetado na linha da reserva.

- Abra a página de emissão da Ingresso com Desconto.

- O preenchimento ocorrerá de forma automática em até 2 segundos.

---

Nota: Esta extensão foi desenvolvida sob medida para a estrutura atual das plataformas Headout e Ingresso com Desconto.
