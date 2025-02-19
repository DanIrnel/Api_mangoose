const { Schema, model } = require('mongoose');

const ExperienceSchema = new Schema({
    titre: { type: String, required: true },
    entreprise: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: false }, // Optionnel si l'expérience est en cours
});

const ProfileSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: false }, // Ajout de la localisation
    skills: [{ type: String }], // Compétences
    isDeleted: { type: Boolean, default: false },
});

module.exports = model('Profile', ProfileSchema);