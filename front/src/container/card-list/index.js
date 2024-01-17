// import { useState, Fragment } from "react";

// import Title from "../../component/title";
// import Grid from "../../component/grid";
// import Box from "../../component/box";
import Page from "../../component/page";

import CardCreate from "../card-create";

// import { Alert, Skeleton, LOAD_STATUS } from "../../component/load";

// import { getDate } from "../../util/getDate";
// import PostItem from "../post-item";

export default function Container() {
  const getData = () => {};

  return (
    <Page>
      <CardCreate
        onCreate={getData}
        // placeholder="What is happening?!"
        // button="Post"
        name="Stripe"
        time="12:25"
        type="Receipt"
        sign="+"
        sum="125.00"
        showSum="show"
      />

      {/* <Card
        logo={Stripe}
        name="Stripe"
        time="12:25"
        type="Receipt"
        sign="+"
        sum="125.00"
        showSum="show"
      /> */}
    </Page>
  );
}
