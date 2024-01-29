import "./index.scss";

import ReceiveForm from "../../component/receive-form";

import { useState } from "react";

import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { loadSession, getTokenSession, getSession } from "../../script/session";
import { useNavigate } from "react-router-dom";

loadSession();

export default function Container({ onCreate, id = null }) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  const session = getSession();
  const userId = session ? Number(session.user.id) : null;

  const handleSubmit = (value, selectedCard) => {
    return sendData({ value, selectedCard });
  };

  const createNotification = async (operationType) => {
    try {
      const res = await fetch(
        `http://localhost:4000/notifications/${operationType}?userId=${userId}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error creating notification:", error.message);
    }
  };

  const sendData = async (dataToSend) => {
    setStatus(LOAD_STATUS.PROGRESS);
    try {
      const res = await fetch("http://localhost:4000/receive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: convertData(dataToSend),
        body: convertData({ ...dataToSend, userId }),
      });

      // alert("Response:", res);

      const data = await res.json();

      // alert("Data:", data);

      if (res.ok) {
        setStatus(null);

        if (onCreate) onCreate();
        navigate("/balance");
        createNotification("transaction-receive");
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const convertData = ({ value, selectedCard }) => {
    return JSON.stringify({
      sum: value,
      name: selectedCard,
      type: "receipt",
      cardId: id,
      userId: Number(userId),
      token: getTokenSession(),
    });
  };

  return (
    <>
      <ReceiveForm
        placeholder="Введіть суму"
        button="Submit payment"
        onSubmit={handleSubmit}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {status === LOAD_STATUS.PROGRESS && <Loader />}
    </>
  );
}
