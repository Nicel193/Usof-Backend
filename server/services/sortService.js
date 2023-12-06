import DbCategory from "../db/scheme/categories.js";
import DbLikes from "../db/scheme/likes.js";
import DbPost from "../db/scheme/post.js";
import { Op } from "sequelize";
import db from "../db/db.js";

const subQuery =
  '(SELECT COUNT(id) FROM Likes WHERE Likes.idPost = Post.id AND Likes.likeType = "like" AND Likes.likeGroup = "post")';

export function sortAndFilter(query, findRule) {
  const sortType = query.sort || "date";
  const sortOrder = query.order || "desc";
  const category = query.category;
  const startDate = query.startDate;
  const endDate = query.endDate;

  switch (sortType) {
    case "likes":
      findRule = {
        attributes: [
          'id',
          [db.fn('COUNT', db.col('likes.id')), 'likesCount']
        ],
        include: [{
          model: DbLikes,
          as: 'Likes',
          attributes: [],
          where: {
            likeType: 'like',
            likeGroup: 'post'
          },
          required: false
        }],
        group: ['posts.id'],
        order: [[db.literal('likesCount'), sortOrder.toUpperCase()]]
      };
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

  return findRule;
}
