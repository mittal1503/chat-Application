const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();

const verifyEmail = async (req, res) => {
  const { token, id } = req.query;
  try {
    const newtoken = await Prisma.token.findUnique({
      where: {
        token: token,
        userId: parseInt(id),
      },
    });
    if (newtoken) {
        await Prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          emailVerified: true,
        },
      });
      res.redirect(303, process.env.REDIRECT_URL);
    } else res.send({ error_message: "Not valid ID or Token" });
  } catch (error) {
    console.log("errr", error);
    res.send(error);
  }
};

module.exports = { verifyEmail };
