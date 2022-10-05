создать сервер, если используется react, то нужно 1Гб RAM (400руб)  
все работа происходит в терминале, желательно в git-bash.exe (находится в папке git)  
первоначальное подключение к серверу по ssh (пользователь root, используется пароль):

```
ssh root@server_ip
```

например,

```
ssh root@5.101.51.32
```

ввести пароль (пароль не отображается, нужно вводить вслепую).

создать нового пользователя (например, vit):

```
adduser vit
```

(задать пароль для нового пользователя, остальное можно не вводить)  
назначить права

```
usermod -aG sudo vit
```

отключиться

```
exit
```

для входа по ssh без пароля, нужно отправить на сервер публичный ssh ключ  
если на компьютере еще нет ssh ключа, то его нужно создать

```
ssh-keygen -t rsa
```

на задаваемые вопросы нужно отвечать yes, пароль задавать не нужно  
в папке `c:/Users/user/.ssh/` будут созданы два файла `id_rsa` `id_rsa.pub`  
если файлы созданы где-то в другом месте, то нужно их туда переместить  
id_rsa - никуда не отправляется и нигде не показывается, id_rsa.pub - отправляется на сервер.  
при отключенном соединении по ssh ввести

```
cat C:/Users/user/.ssh/id_rsa.pub | ssh vit@192.168.88.110 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

где user - это имя пользователя на локальном компьютере (как называется папка в папке Users)  
`vit` - имя созданного пользвателя на сервере, `192.168.88.110` - ip адрес сервера (подставить свои значения)
Нужно будет ввести пароль нового пользователя.  
Теперь подключиться (подставить свое имя и ip адрес)

```
ssh vit@192.168.88.110
```

должно произойти подключение без пароля.  
ssh ключ можно также загрузить на сервер на сайте, загружается содержимое файла `id_rsa.pub`

выполнить команду

```
sudo apt-get update
```

установка docker (ubuntu) (если строка заканчивается \ , то команда состоит из нескольких строк, нужно скопировать все)

```
sudo apt-get update && \
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common && \
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" && \
sudo apt-get update && \
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker unzip
```

```
sudo gpasswd -a $USER docker
```

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```
sudo chmod +x /usr/local/bin/docker-compose
```

проверить, что работает

```
docker ps
```

если не работает, а

```
sudo docker ps
```

работает, то выйти (exit) и зайти снова

установить git

```
sudo apt-get git
```

для удобства установить mc

```
sudo apt-get mc
```

чтобы на сервере работала команда git pull, нужно создать ssh ключ на сервере

```
ssh-keygen -t rsa
```

в папке `.ssh` появятся `id_rsa` `id_rsa.pub`, можно проверить командой `ls -la`  
выполнить

```
cat ./ssh/id_rsa.pub
```

скопировать ключ (выделить и нажать `Ctrl+Insert`), на github в настройках найти пункт ssh ключи, добавить новый ключ и добавить его туда под любыи именем

создать рабочую папку, например work

```
mkdir work
cd work
```

склонировать репозиторий с проектом с github-а (подставить свои данные своего проекта на github)

```
git clone git@github.com:vit499/mq2.git
```

посмотреть, что загрузилось `ls -la`

перейти в папку с проектом

```
cd mq2
```

запусть установку

```
docker-compose up --build -d
```

проверить, запустился ли контейнер

```
docker ps
```

проверить сайт `http://192.168.88.110:31002` (подставить ip адрес своего сервера)

После внесения изменений на комьютере делается

```
git add .
git commit
git push
```

на сервере делается

```
git pull
docker-compose up --build -d
```

если какие-то изменения в коде делаются на сервере, то тогда на сервере делается

```
git add .
git commit
git push
```

а на компьютере -

```
git pull
```

чтобы всегда изменения были синхронизированы

Если изменения сделаны и там и там, то `git pull` даст ошибку  
Потребуются более детальные знания `git merge`  
Как вариант - где-то изменения удалить, там где их надо удалить, выполнить

```
git reset --hard HEAD
```

затем сделать `git pull`

Локальный запуск в vs code  
Склонировать репозиторий mq2 на компьютер  
Открыть папку mq2 в vscode  
В терминале выполнить

```
cd front
npm install
npm run dev
```

открыть в браузере `localhost:5173`
