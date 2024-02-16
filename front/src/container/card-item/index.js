import Card from "../../component/card";
import User from "../../svg/user.svg";
import Stripe from "../../svg/stripe.svg";
import Coinbase from "../../svg/coinbase.svg";

export default function Container({ id, name, sum, type, date }) {
  const logo = () => {
    if (name === "Stripe") {
      // return "/static/media/stripe.e72b9aed0a0e3aa8a94db41f163095b9.svg";
      return Stripe;
    } else if (name === "Coinbase") {
      // return "/static/media/coinbase.a723e7f133d454e7b6b01d00e39eb020.svg";
      return Coinbase;
    } else {
      // return "/static/media/user.930ddb9fc1b714270e29b66b2bae8c7a.svg";
      return User;
    }
  };

  return (
    <Card
      logo={logo()}
      name={name}
      sum={sum}
      showSum="show"
      type={type}
      date={date}
    />
  );
}
