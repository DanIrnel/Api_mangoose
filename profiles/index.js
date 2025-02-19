const { Router } = require('express');
const router = Router();
const ProfileModel = require('./model')
 
// CRUD
// CREATE
router.post('/', async (req, res) => {
    const createProfile = {
        name: req.body.name,
        email: req.body.email,
    }
    const ProfileToSave = new ProfileModel(createProfile);
    const createdProfile = await ProfileToSave.save();
    res.status(201).json(createdProfile);
})
 
// READ
router.get('/', async (req, res) => {
    const profiles = await ProfileModel.find({isDeleted: {$ne: true}});
    res.json(profiles);
})
 
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const profiles = await ProfileModel.findOne({
        _id: id, isDeleted: { $ne: true }
    });
    res.json(profiles);
})
 
 
// UPDATE
router.put('/:id', async (req, res) => {
    try {
 
        const { id } = req.params
        const { body } = req.body
        const profiles = await ProfileModel.findByIdAndUpdate(id, body, { new: true });
        res.json(profiles);
    } catch (err){
        res.json({message: "err"})
    }
})
 
// DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const updates = {
        isDeleted: true
    }
    const profiles = await ProfileModel.findByIdAndUpdate(id, updates, { new: true });
    res.json(profiles);    
})

router.post('/:id/experience', async (req, res) =>{
    const { id } = req.params
    const newExp = {
        title: req.body.title,
        company: req.body.company,
        dates: req.body.dates,
        description: req.body.description,
    }
   
    let profile = await ProfileModel.findOne({
        _id: id, isDeleted: { $ne: true }
    });
    profile.experience.push(newExp);
   
   await profile.save();
    res.json(profile);
})

// DELETE - Supprimer une expérience d'un profil
router.delete('/:id/experience/:exp', async (req, res) => {
    const { id, exp } = req.params;

    try {
        let profile = await ProfileModel.findOne({ _id: id, isDeleted: { $ne: true } });
        if (!profile) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        const experience = profile.experience.id(exp);
        if (!experience) {
            return res.status(404).json({ message: 'Expérience non trouvée' });
        }

        experience.isDeleted = true;
        await profile.save();
        res.json({ message: 'Expérience supprimée avec succès', profile });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'expérience', error: error.message });
    }
});

module.exports = router;
