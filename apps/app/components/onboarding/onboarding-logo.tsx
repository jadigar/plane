import React from "react";

type Props = {
  className?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
};

export const OnboardingLogo: React.FC<Props> = ({
  width = "378",
  height = "117",
  color = "#858E96",
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 378 117"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M125.91 92V19.18H158.69C166.463 19.18 172.587 21.3067 177.06 25.56C181.533 29.74 183.77 35.4233 183.77 42.61C183.77 49.7967 181.533 55.5167 177.06 59.77C172.587 63.95 166.463 66.04 158.69 66.04H134.16V92H125.91ZM134.16 58.34H158.14C163.86 58.34 168.187 56.9467 171.12 54.16C174.053 51.3733 175.52 47.5233 175.52 42.61C175.52 37.77 174.053 33.9567 171.12 31.17C168.187 28.3833 163.86 26.99 158.14 26.99H134.16V58.34ZM188.272 92V15H196.522V92H188.272ZM229.091 92.88C223.738 92.88 219.044 91.6333 215.011 89.14C211.051 86.5733 207.971 83.1267 205.771 78.8C203.571 74.4733 202.471 69.7067 202.471 64.5C202.471 59.22 203.571 54.4533 205.771 50.2C207.971 45.8733 211.051 42.4633 215.011 39.97C219.044 37.4033 223.738 36.12 229.091 36.12C233.638 36.12 237.524 37 240.751 38.76C244.051 40.52 246.728 42.9033 248.781 45.91V37H257.031V92H248.781V83.2C246.728 86.1333 244.051 88.48 240.751 90.24C237.524 92 233.638 92.88 229.091 92.88ZM230.191 85.4C234.298 85.4 237.744 84.4467 240.531 82.54C243.391 80.6333 245.554 78.1033 247.021 74.95C248.488 71.7233 249.221 68.24 249.221 64.5C249.221 60.6867 248.488 57.2033 247.021 54.05C245.554 50.8967 243.391 48.3667 240.531 46.46C237.744 44.5533 234.298 43.6 230.191 43.6C226.158 43.6 222.674 44.5533 219.741 46.46C216.808 48.3667 214.571 50.8967 213.031 54.05C211.491 57.2033 210.721 60.6867 210.721 64.5C210.721 68.24 211.491 71.7233 213.031 74.95C214.571 78.1033 216.808 80.6333 219.741 82.54C222.674 84.4467 226.158 85.4 230.191 85.4ZM266.351 92V37H274.601V45.58C276.581 42.94 279.001 40.7033 281.861 38.87C284.721 37.0367 288.387 36.12 292.861 36.12C296.674 36.12 300.231 37.0367 303.531 38.87C306.904 40.63 309.617 43.3067 311.671 46.9C313.797 50.42 314.861 54.7833 314.861 59.99V92H306.611V60.21C306.611 55.2233 305.181 51.2267 302.321 48.22C299.461 45.14 295.757 43.6 291.211 43.6C288.131 43.6 285.344 44.2967 282.851 45.69C280.357 47.0833 278.341 49.0633 276.801 51.63C275.334 54.1233 274.601 57.02 274.601 60.32V92H266.351ZM348.125 92.88C342.552 92.88 337.675 91.6333 333.495 89.14C329.315 86.5733 326.052 83.1267 323.705 78.8C321.432 74.4733 320.295 69.7067 320.295 64.5C320.295 59.22 321.395 54.4533 323.595 50.2C325.795 45.8733 328.949 42.4633 333.055 39.97C337.162 37.4033 342.002 36.12 347.575 36.12C353.222 36.12 358.062 37.4033 362.095 39.97C366.202 42.4633 369.355 45.8733 371.555 50.2C373.755 54.4533 374.855 59.22 374.855 64.5V67.8H328.765C329.205 71.0267 330.232 73.9967 331.845 76.71C333.532 79.35 335.769 81.4767 338.555 83.09C341.342 84.63 344.569 85.4 348.235 85.4C352.122 85.4 355.385 84.5567 358.025 82.87C360.665 81.11 362.719 78.8733 364.185 76.16H373.205C371.299 81.0733 368.255 85.1067 364.075 88.26C359.969 91.34 354.652 92.88 348.125 92.88ZM328.875 60.1H366.275C365.542 55.4067 363.562 51.4833 360.335 48.33C357.109 45.1767 352.855 43.6 347.575 43.6C342.295 43.6 338.042 45.1767 334.815 48.33C331.662 51.4833 329.682 55.4067 328.875 60.1Z" />
    <path d="M81 8H27V36H54V63H81V8Z" fill="#3F76FF" />
    <rect y="36" width="27" height="27" fill="#3F76FF" />
    <rect x="27" y="63" width="27" height="27" fill="#3F76FF" />
  </svg>
);