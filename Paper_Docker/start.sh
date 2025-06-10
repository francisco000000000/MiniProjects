#!/usr/bin/fish
function log_message
    echo (date +'%Y-%m-%d %H:%M:%S') " - " $argv
end
function paper_usr
    su paper -c "$argv"
end

if test -d /opt/paper/
else
    echo "O volume Docker do contêiner não parece ter sido configurado corretamente. Certifique-se de que o caminho do host para o volume esteja correto que o volume esteja sendo montado em "/opt/paper" do contêiner."
    exit 1
end

if test -f /opt/paper/papermc.jar
    chown -R paper:paper /opt/paper
    paper_usr "cd /opt/paper/ && java -jar $arguments papermc.jar"
else
    echo "O arquivo 'papermc.jar' não existe, por favor coloque o arquivo que você baixou no diretório externo(seu computador/servidor) e renome-o para 'papermc.jar' e reinicie o contêiner"
    exit 1
end