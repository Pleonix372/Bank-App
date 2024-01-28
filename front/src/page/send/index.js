import "./index.scss";

import Page from "../../component/page";
import Title from "../../component/title-balance";
import BackButton from "../../svg/back-button.svg";

import CardCreate from "../../container/card-create-send";
import { getDate } from "../../util/getDate";

import { LOAD_STATUS } from "../../component/load";

import { useState } from "react";
import { getSession } from "../../script/session";

export default function Container() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);

  const session = getSession();
  const userId = session ? session.user.id : null;

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);
    try {
      const res = await fetch(`http://localhost:4000/balance?userId=${userId}`);
      const data = await res.json();
      if (res.ok) {
        setData(convertData(data));
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

  return (
    <Page classname="grayPage">
      <div className="form ">
        <span>
          <Title title="Send" buttonLeft={BackButton} hidden="hidden" />
        </span>

        <CardCreate onCreate={getData} />
      </div>
    </Page>
  );
}
