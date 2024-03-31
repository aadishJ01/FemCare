import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import { Input } from "@material-ui/core";
import {
  ExpandMore,
  PeopleAltOutlined,
} from "@material-ui/icons";
import { selectUser } from "../feature/userSlice";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { Avatar } from "@material-ui/core";
import "react-responsive-modal/styles.css";
import "./css/QuestionModal.css";

function QuestionModal( {isModalOpen, setIsModalOpen}) {
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const Close = <CloseIcon />;
  const user = useSelector(selectUser);

  const handleSubmit = async () => {
    if (question !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        questionName: question,
        questionUrl: inputUrl,
        user: user,
      };
      await axios
        .post("/api/questions", body, config)
        .then((res) => {
          setIsModalOpen(false);
          window.location.href = "/home";
        })
        .catch((e) => {
          console.log(e);
          alert("Error in adding question");
        });
    }
  };

  return (
    <Modal
    open={isModalOpen}
    closeIcon={Close}
    onClose={() => setIsModalOpen(false)}
    closeOnEsc
    center
    closeOnOverlayClick={false}
    styles={{
      overlay: {
        height: "auto",
      },
    }}
  >
    <div className="modal__title">
      <h5>Add Question</h5>
    </div>
    <div className="modal__info">
      <Avatar src={user?.photo} className="avatar" />
      <div className="modal__scope">
        <PeopleAltOutlined />
        <p>Public</p>
        <ExpandMore />
      </div>
    </div>
    <div className="modal__Field">
      <Input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        type=" text"
        placeholder="Start your question with 'What', 'How', 'Why', etc. "
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          style={{
            margin: "5px 0",
            border: "1px solid lightgray",
            padding: "10px",
            outline: "2px solid #000",
          }}
          placeholder="Optional: inclue a link that gives context"
        />
        {inputUrl !== "" && (
          <img
            style={{
              height: "40vh",
              objectFit: "contain",
            }}
            src={inputUrl}
            alt="displayimage"
          />
        )}
      </div>
    </div>
    <div className="modal__buttons">
      <button className="cancle" onClick={() => setIsModalOpen(false)}>
        Cancel
      </button>
      <button onClick={handleSubmit} type="submit" className="add">
        Add Question
      </button>
    </div>
  </Modal>
  )
}

export default QuestionModal