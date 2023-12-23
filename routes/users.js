var express = require("express");
const { model, prisma } = require("../prisma/model");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const { page } = req.query;
  const offsite = getOffsetFromPagination(
    parseInt(page.number),
    parseInt(page.size)
  );
  const paginated = await model.user.findMany({
    take: parseInt(page.size),
    skip: offsite,
    orderBy: [{ name: "asc" }]
  });
  const total = await model.user.count();
  return res.json({
    data: paginated,
    meta: {
      page: {
        currentPage: page.number,
        from: offsite + 1,
        lastPage: Math.ceil(total / parseInt(page.size)),
        perPage: page.size,
        to: Math.min(offsite + parseInt(page.size), total),
        total
      }
    }
  });
});

function getOffsetFromPagination(pageNumber, size) {
  if (size < 1) {
    throw new Error("Size must be more than equals 1");
  }
  if (pageNumber < 1) {
    throw new Error("Page number must be more than equals 1");
  }
  return pageNumber * size - size;
}

router.get("/agregate", async (req, res, next) => {
  const [agrMale, agrFemale] = await model.$transaction([
    model.user.aggregate({
      _min: {
        age: true
      },
      _count: {
        gender: true
      },
      where: {
        gender: "male"
      }
    }),
    model.user.aggregate({
      _min: {
        age: true
      },
      _count: {
        gender: true
      },
      where: {
        gender: "female"
      }
    })
  ]);
  return res.json({ agrMale, agrFemale });
});

router.get("/group-by", async (req, res, next) => {
  const groupBy = await model.user.groupBy({
    by: "gender",
    _min: {
      age: true
    },
    _count: {
      gender: true
    }
  });
  return res.json({ groupBy });
});

module.exports = router;
