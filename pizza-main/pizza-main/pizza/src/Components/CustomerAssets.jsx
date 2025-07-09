import customer1 from "../assets/customer-1.jpg";
import customer2 from "../assets/customer-2.jpg";
import customer3 from "../assets/customer-3.png";
import topBg from "../assets/customer-top-bg.png";
import bottomBg from "../assets/customer-bottom-bg.png";

export const reviewDecor = {
  topBg,
  bottomBg,
};

export const testimonials = [customer1, customer2, customer3].map((img) => ({
  img,
  name: "john doe",
  role: "Designer",
  text:
    "The one day when the lady met this fellow and they knew it was much more than a hunch the first mate and his Skipper too will do their comforta The one day when the lady met this fellow and they knew it was much more than a hunch the first mate and his Skipper too will do their comforta The one day when the lady met this fellow and they knew it was much",
}));