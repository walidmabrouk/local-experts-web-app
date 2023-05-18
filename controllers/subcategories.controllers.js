const Subcategorie = require("../models/Subcategorie.model");

// Créer une nouvelle sous-catégorie
exports.createSubcategorie = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const subcategorie = new Subcategorie({
      name,
      category: categoryId,
    });

    await subcategorie.save();

    res.status(201).json(subcategorie);
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Une erreur s'est produite lors de la création de la sous-catégorie.",
      });
  }
};

// Récupérer toutes les sous-catégories d'une catégorie spécifique
exports.getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await Subcategorie.find({ category: categoryId });

    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des sous-catégories.' });
  }
};

// Mettre à jour une sous-catégorie
exports.updateSubcategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const subcategorie = await Subcategorie.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    res.json(subcategorie);
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Une erreur s'est produite lors de la mise à jour de la sous-catégorie.",
      });
  }
};

// Supprimer une sous-catégorie
exports.deleteSubcategorie = async (req, res) => {
  try {
    const { id } = req.params;

    await Subcategorie.findByIdAndDelete(id);

    res.json({ message: "La sous-catégorie a été supprimée avec succès." });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Une erreur s'est produite lors de la suppression de la sous-catégorie.",
      });
  }
};


// Récupérer toutes les sous-catégories
exports.getSubcategories = async (req, res) => {
  try {
     const subcategories = await Subcategorie.find().populate('category');
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des sous-catégories.' });
  }
};
