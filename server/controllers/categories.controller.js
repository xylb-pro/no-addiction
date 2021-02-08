const services = require('../services');

class CategoriesController {
  async getCategoriesWithCurrent(req, res) {
    const userId = req.user.userId;
    const isOn = req.query.isOn;
    try {
      let result;
      if (isOn === 'true') {
        result = await services.getCategoriesWithCurrent(userId);
      } else {
        result = await services.getAllCategories();
      }

      res.json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Something wromg with get current categories' });
    }
  }

  async updateCurrentCategory(req, res) {
    const userId = req.user.userId;
    try {
      const updatingCurrentCategory = req.body.category;

      //TODO обработать ошибки
      if (!updatingCurrentCategory.isOn) {
        await services.addCurrentCategory(userId, updatingCurrentCategory.id);
      } else {
        await services.deleteCurrentCategory(
          userId,
          updatingCurrentCategory.id,
        );
      }

      res.json({ message: `Category ${updatingCurrentCategory} was updated` });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = new CategoriesController();
