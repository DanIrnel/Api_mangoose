# Étape 1 : Utiliser une image Node.js officielle comme base
FROM node:22

# Étape 2 : Créer et définir le répertoire de travail
WORKDIR /usr/src/app

# Étape 3 : Copier le package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Étape 4 : Installer les dépendances de l'application
RUN npm install

# Étape 5 : Copier le reste du code de l'application
COPY . .

# Étape 6 : Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Étape 7 : Démarrer l'application avec la commande `npm start`
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]

