# P7_groupomania

![screenshot page d'accueil mobile](https://user.oc-static.com/upload/2022/05/25/1653474647318_icon-left-font.png)

## Description du projet 

Projet final de la formation OpenClassrooms, l'objectif est de reprendre l'ensemble des connaissances mobilisées sur les précédent projets et d'y ajouter l'utilisation d'un framework frontend. J'ai choisi d'utiliser React, couplé avec Redux.

Brief du projet :

"Pour résumer ta mission : à partir du brief, tu vas devoir produire une toute première version du projet, que nous pourrons faire tester à quelques employés de Groupomania pour valider la partie fonctionnelle. 


En ce qui concerne l’aspect graphique, nous allons pour le moment limiter les choses au minimum, c’est-à-dire :

respecter l’identité graphique fournie dans le brief ;

produire quelque chose de responsive qui s'adapte aux desktop, tablette et mobile ;

tout le reste est expliqué sur le brief. À part ça, tu as carte blanche, mais attention à ne pas te lancer dans quelque chose de trop compliqué.


Côté technique aussi, nous sommes assez libres sur ce projet ; néanmoins il y a quelques éléments qu’il faut avoir en tête avant de commencer le projet :

pour ce nouveau projet on part vraiment de zéro, tu vas donc devoir mettre en place le backend, le frontend et la base de données ;

le projet doit être codé en JavaScript et respecter les standards WCAG ;

il est obligatoire d’utiliser un framework front-end JavaScript. Comme on part de zéro, libre à toi d’utiliser celui que tu préfères (React, Vue, Angular…). Je te conseille d’utiliser React, mais ça reste à toi de décider ;

pour la base de données, tu peux utiliser les outils de ton choix. Tu peux utiliser soit une base de données non relationnelle, comme mongoDB par exemple, soit une base de données relationnelle (en t’aidant d’un ORM si tu le souhaites) ;

pense à bien fournir un README avec ton code, expliquant comment installer le site sur un nouveau poste."

![screenshot page d'accueil mobile](https://user.oc-static.com/upload/2022/05/25/1653474647318_icon-left-font.png)

## Stack technique : Projet MERN

- **Front-end :** REACT / REDUX Toolkit / SASS

- **Back-end :** Node.JS / Express / MongoDB

## Compétences clés 

Création d'un site SPA dynamique avec REACT

Création d'une base de donnée sécurisée et évolutive avec MongoDB

## Installation & lancement


Télécharger le repo :

```
git clone https://github.com/RomualdP/RomualdPiquet_3_18022022.git
```

Ouvrir le repo avec votre IDE

Dans le dossier backend : rajouter un fichier .env dans le dossier /backend/config avec les informations suivantes :

PORT = 8080

MongoDBLOGIN=romualdp:UzSWAUKZ0Ijo80Qv

TOKEN_SECRET=qflskdjfqodu908978JMLIHJè!§876

Lancer le back
```
cd backend
npm i 
npm start
```

Dans le dossier frontend : rajouter un fichier .env à la racine avec les informations suivantes :
REACT_APP_API_URL=http://localhost:8080/


Lancer le front
```
cd frontend
npm i 
npm start
```


## Notes 

Ceci est le MVP du projet selon les consignes fournies, d'autres fonctionnalitées veront le jour ultérieurement.
