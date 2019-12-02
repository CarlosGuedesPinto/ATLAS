# <p align="center"><img src="https://i.imgur.com/ioaaQR9.png" alt="Vue logo" width="500"></p>
This project is a web application developed during the 2nd year in the [Web Information Systems and Technologies](https://www.esmad.ipp.pt/courses/degree/400001419) course for the Web Programming I subject at [ESMAD](https://www.esmad.ipp.pt/). The main objective is to develop an app that allows users to enroll in school events which were created by teachers or admins.

### Mockups
It was used [Adobe Xd](https://www.adobe.com/pt/products/xd.html) to develop the application's mockups, as it allows a better app prototype, because of the interactions that can be created, simulating the real app.
- [Mockups' link (armazenado na Adobe Cloud)](https://xd.adobe.com/view/655104f7-6885-4aa0-5154-1b50af8e35bd-1360/).

### Main features:
 - Three different authetication profiles (student, event proponent, admin).
 - Publish institutional news.
 - Workshops/events Publishing and Enrollment.
 - Idea discussion forum, open to students and event proponents.
 - Gamification elements to improve the User Experience.

### Technical requirements:
- Front-end Framework [Vue.js](https://vuejs.org/).
- CSS Framework [Bootstrap](https://getbootstrap.com/).

### Plugins and Main dependecies:
- [Vue CLI](https://cli.vuejs.org/).
- [Vue Router](https://router.vuejs.org/).
- [Vuex](https://vuex.vuejs.org/).
- [Bootstrap-vue](https://bootstrap-vue.js.org/).
- [Owl Caroulsel 2](https://owlcarousel2.github.io/OwlCarousel2/).

### Folder organization:
The Atlas folder as an padornized organization of an Vue Cli 3 project, were every code is in the folder
```src```.
```
public ———|
          |———— index.html (HTML main file )
          |———— favicon.ico (ATLAS favicon)
   
   src ———|
          |———— assets
          |———— components (Vue components)
          |———— views (Views that are loaded in each Route)
          |———— main.js (Vue main file)
          |———— router.js (Routes made with Vue Router)
          |———— store.js (State management with VueX)
```

## Project instalation:
- Version control system [git](https://git-scm.com/).
- [Node.js](https://nodejs.org/en/).

#### Repository cloning:
```
git clone https://github.com/gustavo-vasconcelos/ATLAS.git
```

#### Module installation (node):
```
npm install
```

#### Run the app (locally):
```
npm run serve
```

#### Run the app (link):
[ATLAS](http://atlas-vue.herokuapp.com/)

#### Authors

* **Carlos Guedes** - [CarlosGuedesPinto](https://github.com/CarlosGuedesPinto)

* **Gustavo Vasconcelos** - [gustavo-vasconcelos](https://github.com/gustavo-vasconcelos)
