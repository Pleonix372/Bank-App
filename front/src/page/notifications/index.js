import Box from "../../component/box";
import Page from "../../component/page";
import Title from "../../component/title-balance";

import BackButton from "../../svg/back-button.svg";

import { Alert, Skeleton, LOAD_STATUS } from "../../component/load";

import { getTimeAgo } from "../../util/getDate";
import NotificationsItem from "../../container/notifications-item";
import { Fragment, useEffect, useState } from "react";
import { getSession } from "../../script/session";

export default function Container() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);

  const session = getSession();
  const userId = session ? Number(session.user.id) : null;

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);
    try {
      const res = await fetch(
        `http://localhost:4000/notifications?userId=${userId}`
      );
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
    list: raw.list.reverse().map(({ id, name, type, date }) => ({
      id,
      name,
      type,
      date: getTimeAgo(date),
    })),
    isEmpty: raw.list.length === 0,
  });
  if (status === null) {
    getData();
  }

  useEffect(() => {
    getData();
  }, [userId]);

  return (
    <Page classname="grayPage">
      <div className="form ">
        <span>
          <Title
            title="Notifications"
            buttonLeft={BackButton}
            hidden="hidden"
          />
        </span>

        <div className="card-zone">
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
                // <Alert message="Список пустий" />
                <Box>Повідомлення відсутні</Box>
              ) : (
                data.list.map((item) => (
                  <Fragment key={item.id}>
                    <NotificationsItem {...item} />
                  </Fragment>
                ))
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Page>
  );
}
