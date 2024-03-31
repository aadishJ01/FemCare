const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

const questionDB = require("../models/Question");

router.post("/", async (req, res) => {
  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionUrl: req.body.questionUrl,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          staus: false,
          message: "Bad format",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding question",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await questionDB
      .aggregate([
        {
          $lookup: {
            from: "answers",
            localField: "_id", 
            foreignField: "questionId",
            as: "allAnswers",
          },
        },
      ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: "Unable to get the question details",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

router.put("/upvote", async (req, res) => {
	try {
		const question = await questionDB
      .findOne({
			_id: req.body.questionId,
		});
		var i = question.upvote.indexOf(req.body.userId);
		var j = question.downvote.indexOf(req.body.userId);
		var message = "";
		if (i === -1 && j === -1) {
			question.upvote.push(req.body.userId);
      message = "Up Voted";
		} else if (i === -1 && j !== -1) {
			question.downvote.splice(j, 1);
			question.upvote.push(req.body.userId);
      message = "Up Voted";
		} else if (i !== -1) {
			question.upvote.splice(i, 1);
			message = "Upvote Removed";
		} else {
			message = "Error";
		}
		
		question.save();
    var upvoteCount = question.upvote.length;
    var downvoteCount = question.downvote.length;
		res.status(200).send({
			message: message,
      upvoteCount: upvoteCount,
      downvoteCount: downvoteCount
		});
	} catch (err) {
		res.json(err);
	}
});

router.put("/downvote", async (req, res) => {
	try {
		const question = await questionDB
      .findOne({
			_id: req.body.questionId,
		});
		var i = question.upvote.indexOf(req.body.userId);
		var j = question.downvote.indexOf(req.body.userId);
		var message = "";
		if (j === -1 && i === -1) {
			question.downvote.push(req.body.userId);
      message = "Down Voted";
		} else if (j === -1 && i !== -1) {
			question.upvote.splice(j, 1);
			question.downvote.push(req.body.userId);
      message = "Down Voted";
		} else if (j !== -1) {
			question.downvote.splice(i, 1);
			message = "Downvote Removed";
		} else {
			message = "Error";
		}

		question.save();
    var upvoteCount = question.upvote.length;
    var downvoteCount = question.downvote.length;
		res.status(200).send({
			message: message,
      upvoteCount: upvoteCount,
      downvoteCount: downvoteCount
		});
	} catch (err) {
		res.json(err);
	}
});

router.get("/search/:text", async (req, res) => {
  try {
    let searchText = new RegExp(req.params.text, "i");
    let query = {
      questionName : { $regex : searchText},
    };

    let questionData = await questionDB.find(query);
    const questionIds = [];
    questionData.forEach(question => {
      questionIds.push(question._id);
    })

    await questionDB
      .aggregate([
        { $match: { _id: { $in: questionIds.map(id => mongoose.Types.ObjectId(id))}}},
        {
          $lookup: {
            from: "answers", 
            localField: "_id",
            foreignField: "questionId",
            as: "allAnswers",
          },
        },
      ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: "Unable to get the question details",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Unexpected error",
    });
  }
});

module.exports = router;
