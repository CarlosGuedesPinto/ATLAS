# <p align="center"><img src="https://i.imgur.com/ioaaQR9.png" alt="Vue logo" width="500"></p>
Este projeto é uma aplicação web desenvolvida ao longo do 1º semestre do 2º ano do curso de [Tecnologias e Sistemas de Informação para a Web](https://www.esmad.ipp.pt/cursos/licenciatura/400001419), na [ESMAD](https://www.esmad.ipp.pt/), para a unidade curricular de Programação Web I. A aplicação tem em foco a [Unidade de Apoio de Comunicação e Imagem da ESMAD](https://www.esmad.ipp.pt/esmad/unidades_apoio/comunicacao_desenvolvimento/cimagem), que é responsável por propor, manter e difundir a imagem institucional.

This project is a web application developed during the 2nd year in the [Web Information Systems and Technologies](https://www.esmad.ipp.pt/courses/degree/400001419) course for the Web Programming I subject at [ESMAD](https://www.esmad.ipp.pt/). The main objective is to develop an app that allows users to enroll in school events which were created by teachers or admins.

### Mockups
It was used [Adobe Xd](https://www.adobe.com/pt/products/xd.html) to develop the application's mockups, as it allows a better app prototype, because of the interactions that can be created, simulating the real app.
- [Mockups' link (armazenado na Adobe Cloud)](https://xd.adobe.com/view/655104f7-6885-4aa0-5154-1b50af8e35bd-1360/).

### Funcionalidades principais:
 - Autenticação com 3 diferentes perfis (aluno, proponente de eventos, administrador).
 - Publicação de notícias institucionais.
 - Divulgação de eventos/workshops.
 - Inscrição em eventos/workshops.
 - Fórum para discussão de ideias, aberto aos estudantes e proponentes dos eventos.
 - Elementos de gamificação para uma melhor UX.

### Main features:
 - Authentication with 3 differents profile types (student, teacher, administrator).
 - Publishing of institutional events.
 - Enrollment in institutional events.
 - 

### Requisitos técnicos:
- Framework de front-end [Vue.js](https://vuejs.org/).
- Framework CSS [Bootstrap](https://getbootstrap.com/).

### Plugins e dependências principais:
- [Vue CLI](https://cli.vuejs.org/).
- [Vue Router](https://router.vuejs.org/).
- [Vuex](https://vuex.vuejs.org/).
- [Bootstrap-vue](https://bootstrap-vue.js.org/).
- [Owl Caroulsel 2](https://owlcarousel2.github.io/OwlCarousel2/).

### Organização da pasta:
O ATLAS tem a organização padrão de um projeto de Vue CLI 3, onde todo o código que foi alterado encontra-se na pasta ```src```.
```
public ———|
          |———— index.html (principal ficheiro HTML)
          |———— favicon.ico (favicon do ATLAS)
   
   src ———|
          |———— assets
          |———— components (componentes Vue)
          |———— views (views que são carregadas em cada rota)
          |———— main.js (principal ficheiro Vue)
          |———— router.js (rotas feitas com o Vue Router)
          |———— store.js (gestão de estado feita com o Vuex)
```

## Instalação do projeto
Certifique-se que tem instalado:
- Sistema de controlo de versões [git](https://git-scm.com/).
- [Node.js](https://nodejs.org/en/).

#### Clonagem do repositório:
```
git clone https://github.com/gustavo-vasconcelos/ATLAS.git
```

#### Instalação dos módulos (node):
```
npm install
```

#### Correr a aplicação:
```
npm run serve
```
