import "./index.scss";

import Page from "../../component/page";
import Box from "../../component/box";
import Title from "../../component/title-balance";
import Settings from "../../svg/settings.svg";
import Notifications from "../../svg/notifications.svg";

import { Link } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";

import { Alert, Skeleton, LOAD_STATUS } from "../../component/load";

import { getDate } from "../../util/getDate";
import CardItem from "../../container/card-item";
import { getSession } from "../../script/session";

export default function Balance() {
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);

  // const [allTransactions, setAllTransactions] = useState(null);

  const session = getSession();
  const userId = session ? Number(session.user.id) : null;

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);
    try {
      const res = await fetch(`http://localhost:4000/balance?userId=${userId}`);
      const data = await res.json();
      if (res.ok) {
        setData(convertData(data));
        setBalance(data.balance);
        setStatus(LOAD_STATUS.SUCCESS);
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  // const getAllTransactions = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:4000/received?userId=${userId}`
  //     );
  //     const data = await res.json();

  //     if (res.ok) {
  //       setAllTransactions(convertData(data)); // Оновіть стейт всіх транзакцій
  //     } else {
  //       setMessage(data.message);
  //       setStatus(LOAD_STATUS.ERROR);
  //     }
  //   } catch (error) {
  //     setMessage(error.message);
  //     setStatus(LOAD_STATUS.ERROR);
  //   }
  // };

  const convertData = (raw) => ({
    list: raw.list.reverse().map(({ id, name, sum, type, date }) => ({
      id,
      name,
      sum,
      type,
      date: getDate(date),
    })),
    isEmpty: raw.list.length === 0,
  });
  if (status === null) {
    getData();
  }

  useEffect(() => {
    getData();
    // getAllTransactions(); // Викликайте функцію отримання всіх транзакцій при завантаженні компонента
  }, []);

  return (
    <Page>
      <div className="main-balance">
        <Title
          title="Main wallet"
          className="title-balance__balance"
          buttonLeft={Settings}
          hrefLeft="/settings"
          buttonRight={Notifications}
          hrefRight="/notifications"
        />

        <div className="balance">${balance}</div>

        <div className="button-operations">
          <div>
            <div className="button-operations__background--white">
              <div className="button-operations__background--blue">
                <a href="/receive">
                  <span className="icon__receive" />
                </a>
              </div>
            </div>
            <p className="button-operations__text">Receive</p>
          </div>

          <div>
            <div className="button-operations__background--white">
              <div className="button-operations__background--blue">
                <Link to="/send">
                  <span className="icon__send" />
                </Link>
              </div>
            </div>
            <p className="button-operations__text">Send</p>
          </div>
        </div>
      </div>

      <div className="card__block">
        {status === LOAD_STATUS.PROGRESS && (
          <Fragment>
            <Box>
              <Skeleton />
            </Box>
            <Box>
              <Skeleton />
            </Box>
          </Fragment>
        )}

        {status === LOAD_STATUS.ERROR && (
          <Alert status={status} message={message} />
        )}

        {status === LOAD_STATUS.SUCCESS && (
          <Fragment>
            {data.isEmpty ? (
              // <Alert message="Платежі відсутні" />
              <Box>Список платежів пустий</Box>
            ) : (
              data.list.map((item) => (
                <Fragment key={item.id}>
                  <Link
                    className="balance__link"
                    to={`/transaction/:${item.id}`}
                  >
                    <CardItem {...item} />
                  </Link>
                </Fragment>
              ))
            )}
          </Fragment>
        )}
      </div>
    </Page>
  );
}
