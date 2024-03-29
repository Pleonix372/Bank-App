import "./index.scss";
import Mastercard from "../../svg/payment/mastercard.svg";
import Green from "../../svg/payment/green.svg";
import Bitcoin from "../../svg/payment/bitcoin.svg";
import Red from "../../svg/payment/red.svg";
import Eth from "../../svg/payment/eth.svg";
import Yellow from "../../svg/payment/yellow.svg";

export default function Component({
  logo,
  name,
  date,
  time,
  type,
  sum,
  padding,
  hiddenContent,
  showSum,
  showPayment,
  paymentReverse,
  choice,
  cursor,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`card card__${padding} card__${cursor} ${choice}`}
    >
      <div className="card__content">
        <div className="button-operations__background--logo">
          <img src={logo} alt="" className="card__logo" />
        </div>

        <div className="card__data">
          <div className="card__data--name">{name}</div>
          <div className={`card__data--content ${hiddenContent}`}>
            <div className="card__data--point">
              {time}
              {date}
            </div>
            <div className="card__data--point card__data--type">{type}</div>
          </div>
        </div>
      </div>

      <div className={`card__sum card__sum--${type} ${showSum}`}>
        <span className={type}></span>${sum}
      </div>

      <div className={`card__payment ${showPayment}`}>
        <div className={`card__payment--group ${paymentReverse}`}>
          <img src={Mastercard} alt="mastercard" />
          <img src={Green} alt="mastercard" />
        </div>
        <div className={`card__payment--group ${paymentReverse}`}>
          <img src={Bitcoin} alt="mastercard" />
          <img src={Red} alt="mastercard" />
        </div>
        <div className={`card__payment--group ${paymentReverse}`}>
          <img src={Eth} alt="mastercard" />
          <img src={Yellow} alt="mastercard" />
        </div>
      </div>
    </div>
  );
}
