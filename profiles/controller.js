const ProfileModel = require('./model');

// CREATE - Créer un nouveau profil
const createProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Validation des entrées
        if (!name || !email) {
            return res.status(400).json({ message: 'Les champs "name" et "email" sont obligatoires.' });
        }

        const newProfile = new ProfileModel({ name, email });
        const savedProfile = await newProfile.save();

        res.status(201).json(savedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du profil', error: error.message });
    }
};

// READ - Récupérer tous les profils
const getAllProfiles = async (req, res) => {
    try {
        const profiles = await ProfileModel.find({ isDeleted: { $ne: true } });
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des profils', error: error.message });
    }
};

// READ - Récupérer un profil par ID
const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await ProfileModel.findById(id);

        if (!profile || profile.isDeleted) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du profil', error: error.message });
    }
};

// UPDATE - Mettre à jour un profil par ID
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const existingProfile = await ProfileModel.findById(id);
        if (!existingProfile || existingProfile.isDeleted) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        const updatedProfile = await ProfileModel.findByIdAndUpdate(id, body, { new: true });
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil', error: error.message });
    }
};

// DELETE - Supprimer un profil (Soft Delete)
const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const existingProfile = await ProfileModel.findById(id);
        if (!existingProfile || existingProfile.isDeleted) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        const updatedProfile = await ProfileModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );

        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du profil', error: error.message });
    }
};

// Ajouter une expérience à un profil
const addExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, entreprise, dateDebut, dateFin } = req.body;

        const profile = await ProfileModel.findById(id);
        if (!profile || profile.isDeleted) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        profile.experiences.push({ titre, entreprise, dateDebut, dateFin });
        await profile.save();

        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'expérience', error: error.message });
    }
};

// Supprimer une expérience d'un profil
const deleteExperience = async (req, res) => {
    try {
        const { id, expId } = req.params;

        const profile = await ProfileModel.findById(id);
        if (!profile || profile.isDeleted) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        profile.experiences = profile.experiences.filter(exp => exp._id.toString() !== expId);
        await profile.save();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'expérience', error: error.message });
    }
};

// Ajouter une compétence à un profil
const addSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { skill } = req.body;

        const profile = await ProfileModel.findById(id);
        if (!profile || profile.isDeleted) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        profile.skills.push(skill);
        await profile.save();

        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la compétence', error: error.message });
    }
};

// Supprimer une compétence d'un profil
const deleteSkill = async (req, res) => {
    try {
        const { id, skill } = req.params;

        const profile = await ProfileModel.findById(id);
        if (!profile || profile.isDeleted) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        profile.skills = profile.skills.filter(s => s !== skill);
        await profile.save();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la compétence', error: error.message });
    }
};

// Mettre à jour les informations d'un profil
const updateInformation = async (req, res) => {
    try {
        const { id } = req.params;
        const { information } = req.body;

        const profile = await ProfileModel.findById(id);
        if (!profile || profile.isDeleted) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        profile.information = information;
        await profile.save();

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour des informations', error: error.message });
    }
};

module.exports = {
    createProfile,
    getAllProfiles,
    getProfileById,
    updateProfile,
    deleteProfile,
    addExperience,
    deleteExperience,
    addSkill,
    deleteSkill,
    updateInformation,
};