## [The Latvian Museum of Natural History](https://www.dabasmuzejs.gov.lv/) - Solar System

Web application for 1280x800 touchscreen device. Complementing Solar system showcase with animated representation of our solar system and short description of each planet.

How to set up and build this project:

**Set up development environment**

1) Install docker, docker-compose, Node.js/npm
2) Clone repo
```
git clone https://github.com/houseofbits/solar-system-display
```

3) Install dependencies
```
npm install
```

4) Run dev server
```
npm run serve
```

**Build and test production version**
1) Run build
```
npm run build
```

2) Create hosts file entry
```
0.0.0.0 docker.local
```

3) Start docker container
```
docker-compose up -d
```

4) Enjoy some of the finest planets found in our solar system:  http://docker.local:81/

**Dependencies**
- Babylon.js
- React

[https://github.com/houseofbits/solar-system-display](https://github.com/houseofbits/solar-system-display)

Krists Pudzens©2020

kpudzens@gmail.com


**TODO:**

* [x] Planet rings shadows
* [x] Atmosphere shader
* [ ] Planet rotation axis and relative speeds
* [x] Animated asteroids
* [ ] Symbol font loading issue
* [ ] Texturing for rest of unfinished planets
* [ ] Optimize sun rays shader


Quick normal map tool: [https://cpetry.github.io/NormalMap-Online/](https://cpetry.github.io/NormalMap-Online/)

