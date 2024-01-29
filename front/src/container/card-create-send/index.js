import "./index.scss";

import SendForm from "../../component/send-form";

import { useState } from "react";

import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { loadSession, getTokenSession, getSession } from "../../script/session";
import { useNavigate } from "react-router-dom";

loadSession();

export default function Container({ onCreate, id = null }) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  // const handleSubmit = (email, sum, recipientUserId) => {
  //   return sendData({ email, sum, recipientUserId });
  // };

  const handleSubmit = async (email, sum) => {
    try {
      const recipientUserId = await getRecipientUserId(email);
      await sendData({ email, sum, recipientUserId: recipientUserId });
    } catch (error) {
      console.error("Error getting recipientUserId:", error.message);
      setMessage("Помилка отримання ідентифікатора отримувача");
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const createNotification = async (operationType, recipientUserId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/notifications/${operationType}?userId=${recipientUserId}`,
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
      const balanceRes = await fetch(
        `http://localhost:4000/balance?userId=${userId}`
      );
      const balanceData = await balanceRes.json();

      if (!balanceRes.ok) {
        setMessage(balanceData.message);
        setStatus(LOAD_STATUS.ERROR);
        return;
      }

      const userBalance = parseFloat(balanceData.balance);

      if (userBalance < dataToSend.sum) {
        setMessage("Недостатньо коштів на балансі для відправлення цієї суми");
        setStatus(LOAD_STATUS.ERROR);
        return;
      }
      //===================
      const res = await fetch("http://localhost:4000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(dataToSend),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(null);
        navigate("/balance");

        if (onCreate) onCreate();

        createNotification("transaction-send", userId);

        if (dataToSend.recipientUserId) {
          createNotification("transaction-getting", dataToSend.recipientUserId);
        }
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const getRecipientUserId = async (recipientEmail) => {
    try {
      const res = await fetch(
        `http://localhost:4000/recipient-info?email=${recipientEmail}`,
        {
          headers: {
            Authorization: `Bearer ${getTokenSession()}`,
          },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.error("Error getting recipientUserId:", data.message);
        throw new Error(data.message);
      }

      return data.userId;
    } catch (error) {
      console.error("Error getting recipientUserId:", error.message);
      throw error;
    }
  };

  const session = getSession();
  const userId = session ? session.user.id : null;

  const convertData = ({ email, sum, recipientUserId }) => {
    return JSON.stringify({
      sum: sum,
      name: email,
      type: "sending",
      cardId: id,
      userId: userId,
      token: getTokenSession(),
      recipientUserId: recipientUserId,
    });
  };

  return (
    <>
      <SendForm
        placeholderEmail="Введіть e-mail"
        placeholderSum="Введіть суму"
        button="Send"
        onSubmit={handleSubmit}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {status === LOAD_STATUS.PROGRESS && <Loader />}
    </>
  );
}
