import React, { useEffect, useState } from "react";

import { getDummyData } from "../../../api";

import { Content } from "./styled";

const Home = () => {
  const [dummyData, setDummyData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getDummyData();
      setDummyData({ message: response?.data?.message, data: response?.data?.data?.dummyData });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Content>
      <div>
        <span>Home page</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{dummyData?.message}</span>
        <span>{dummyData?.data}</span>
      </div>
    </Content>
  );
};

export default Home;
