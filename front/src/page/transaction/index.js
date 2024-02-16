import "./index.scss";
import Page from "../../component/page";
import Title from "../../component/title-balance";
import BackButton from "../../svg/back-button.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LOAD_STATUS } from "../../component/load";
import { getFormattedDate } from "../../util/getDate";

export default function Transaction() {
  const { id } = useParams();

  const [transactionData, setTransactionData] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setStatus(LOAD_STATUS.PROGRESS);
      try {
        const res = await fetch(`http://localhost:4000/transaction/${id}`);
        const data = await res.json();

        if (res.ok) {
          setStatus(null);
          const formattedTransaction = {
            ...data.transaction,
            date: getFormattedDate(data.transaction.date),
            type:
              data.transaction.type.toLowerCase() === "receipt"
                ? "Receive"
                : "Send",
          };

          console.log(data.transaction);

          setTransactionData(formattedTransaction);
        } else {
          setMessage(data.message);
          setStatus(LOAD_STATUS.ERROR);
        }
      } catch (error) {
        setMessage(error.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const sum = document.querySelector(".balance");

    if (
      sum &&
      transactionData &&
      transactionData.type.toLowerCase() === "send"
    ) {
      sum.classList.remove("balance--green");
      sum.classList.add("card__sum--sending");
    }

    const sign = document.querySelector(".sign");

    if (
      sign &&
      transactionData &&
      transactionData.type.toLowerCase() === "send"
    ) {
      sign.classList.add("send");
    } else if (
      sign &&
      transactionData &&
      transactionData.type.toLowerCase() === "receive"
    ) {
      sign.classList.add("receive");
    }
  }, [transactionData]);

  if (!transactionData) {
    return (
      <Page>
        <div className="back">
          <Title title="Transaction" buttonLeft={BackButton} hidden="hidden" />
          <p style={{ textAlign: "center" }}>Платіж за таким ID не знайдено</p>
        </div>
      </Page>
    );
  }

  return (
    <Page classname="grayPage">
      <div className="back">
        <Title title="Transaction" buttonLeft={BackButton} hidden="hidden" />

        <div className="balance balance--green">
          <span className="sign"></span>${transactionData.sum}
        </div>

        <div className="data-block">
          <div className="data-block__card">
            <div className="data-block__content">
              <span>Date</span>
              <span>{transactionData.date}</span>
            </div>
          </div>

          <div className="data-block__card">
            <div className="data-block__content">
              <span>Address</span>
              <span>{transactionData.name}</span>
            </div>
          </div>

          <div className="data-block__card">
            <div className="data-block__content">
              <span>Type</span>
              <span>{transactionData.type}</span>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
