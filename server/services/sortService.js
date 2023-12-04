import DbCategory from "../db/scheme/categories.js";
import { Op } from "sequelize";

export function sortAndFilter(query, findRule) {
  const sortType = query.sort || "date";
  const sortOrder = query.order || "desc";
  const category = query.category;
  const startDate = query.startDate;
  const endDate = query.endDate;

  switch (sortType) {
    case "likes":
      // findRule.order = [["likesCount", sortOrder.toUpperCase()]];
      break;
    case "date":
      findRule.order = [["publishDate", sortOrder.toUpperCase()]];
      break;
    default:
      findRule.order = [["publishDate", "DESC"]];
      break;
  }

  if (category) {
    findRule.include = [
      {
        model: DbCategory,
        where: { id: category },
      },
    ];
  }

  if (startDate && endDate) {
    findRule.where = {
      publishDate: {
        [Op.between]: [startDate, endDate],
      },
    };
  } else if (startDate) {
    findRule.where = {
      publishDate: {
        [Op.gte]: startDate,
      },
    };
  } else if (endDate) {
    findRule.where = {
      publishDate: {
        [Op.lte]: endDate,
      },
    };
  }
}
