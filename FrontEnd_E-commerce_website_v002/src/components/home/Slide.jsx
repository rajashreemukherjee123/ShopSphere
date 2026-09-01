import React, { useEffect } from "react";
import CarouselLib from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Countdown from "react-countdown";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Box, Button, Divider, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProductSection } from "../../redux/slices/productSlice";

const Carousel = CarouselLib.default || CarouselLib;

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const Component = styled(Box)`
  margin-top: 10px;
  background: #ffffff;
`;

const Deal = styled(Box)`
  padding: 15px 20px;
  display: flex;
`;

const Timer = styled(Box)`
  display: flex;
  margin-left: 10px;
  align-items: center;
  color: #7f7f7f;
`;

const DealText = styled(Typography)`
  font-size: 22px;
  font-weight: 600;
  margin-right: 25px;
  line-height: 32px;
`;

const ViewAllButton = styled(Button)`
  margin-left: auto;
  background-color: #2874f0;
  font-size: 13px;
  font-weight: 600;
`;

const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
  // text-align: center;
`;

const Image = styled("img")({
  width: "auto",
  height: 150,
});

const Slide = ({ title, timer, section }) => {
  const dispatch = useDispatch();
  const navigat = useNavigate();

  const {
    section: sectionData,
    sectionLoading,
    sectionError,
  } = useSelector((state) => state.productsData);

  const products = sectionData[section] || [];

  useEffect(() => {
    if (section) {
      dispatch(getProductSection(section));
    }
  }, [dispatch, section]);

  if(sectionLoading){
      return <Typography>sectionLoading...</Typography>
  }

  if (sectionError) {
    return <Typography color="error">{sectionError}</Typography>;
  }

  if (!products || products.length === 0) {
    return null;
  }
  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <Box variant="span">
        {hours} : {minutes} : {seconds} left
      </Box>
    );
  };

  return (
    <Component>
      <Deal>
        <DealText>{title}</DealText>
        {timer && (
          <Timer>
            <img src={timerURL} alt="timer" style={{ width: 24 }} />
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
          </Timer>
        )}

        <ViewAllButton
          variant="contained"
          color="primary"
          onClick={() => navigat(`/sections/${section}`)}
        >
          View All
        </ViewAllButton>
      </Deal>
      <Divider />
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        centerMode={true}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {products.map((product, index) => (
          <NavLink
            key={product._id || index}
            to={`/product/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <Box  sx={{ padding: "25px 15px", textAlign:"center" }}>
              
                <Image  src={product.url} alt="product" />

                <Text style={{ fontWeight: 600, color: "#212121" }}>
                    {product.title.shortTitle}
                </Text>
                <Text style={{ color: "green" }}>{product.discount}</Text>
                <Text style={{ color: "#212121", opacity: ".6" }}>
                    {product.tagline}
                </Text>
            </Box>
          </NavLink>
        ))}
      </Carousel>
    </Component>
  );
};

export default Slide;
