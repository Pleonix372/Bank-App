import Card from "../../component/card";
import Announcement from "../../svg/announcement.svg";
import Warning from "../../svg/warning.svg";

export default function Container({ id, name, type, date }) {
  const logo = () => {
    if (type === "announcement") {
      // return "/static/media/announcement.6340b876fb33f9907d8bbb4cb5c0b8ce.svg";
      return Announcement;
    } else if (type === "warning") {
      // return "/static/media/warning.324bd20d3115ce92cbae66a6c26d63fb.svg";
      return Warning;
    }
  };

  return (
    <Card logo={logo()} name={name} date={date} type={type} padding="padding" />
  );
}
