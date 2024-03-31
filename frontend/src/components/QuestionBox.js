import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import "./css/QuestionBox.css";
import QuestionModal from "./QuestionModal";

function QuestionBox() {
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="questionBox">
      <div onClick={() => setIsModalOpen(true)}>
        <div className="questionBox_info">
          <Avatar src={user?.photo} />
        </div>
        <div className="questionBox_content">
          <h5>What is your question?</h5>
        </div>    
      </div>
      { isModalOpen && <QuestionModal isModalOpen = {isModalOpen} setIsModalOpen = {setIsModalOpen}/> }  
    </div>
  );
}

export default QuestionBox;
