---
# Paper Docker: Seu Servidor Paper no Docker!

Este é um contêiner Docker simples que executa o servidor Paper Minecraft com um usuário de baixo privilégio, garantindo mais segurança.

### **Atenção**: É crucial configurar corretamente o contêiner para evitar erros e garantir o bom funcionamento.

## Configuração Inicial
Atualmente, não há uma versão oficial disponível no DockerHub.

---
**Aviso Importante**: Ao ser inicializado, o contêiner irá **modificar todos os arquivos** no volume que você configurar. Certifique-se de que o diretório especificado para o volume esteja correto e que você tenha um backup, se necessário.

```yaml
services:
  minecrft-server:
    build: . # Constrói a imagem a partir do Dockerfile neste diretório
    ports:
      - "25565:25565"
      # Adicione outras portas conforme necessário, especificando se são TCP, UDP, etc.
    volumes:
      - "/seu/diretorio/do/servidor:/opt/paper" # Mapeia o diretório local para o contêiner
```
