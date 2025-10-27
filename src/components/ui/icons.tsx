import { Icon } from "@/types";

// Home Icons
export const Administration = ({
    width = 51,
    height = 44,
    color = "white",
}: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 51 44"
        fill="none"
    >
        <path
            d="M31.4167 42.4168V38.771C31.4167 32.7306 25.8196 27.8335 18.9158 27.8335H14.7508C7.84708 27.8335 2.25 32.7306 2.25 38.771V42.4168M38.0842 27.8335H42.2492M37.25 2.07932C38.5695 1.6144 39.9813 1.47265 41.3669 1.66597C42.7525 1.8593 44.0716 2.38206 45.2135 3.1904C46.3553 3.99875 47.2867 5.06912 47.9295 6.31174C48.5723 7.55436 48.9078 8.933 48.9078 10.332C48.9078 11.7311 48.5723 13.1097 47.9295 14.3523C47.2867 15.5949 46.3553 16.6653 45.2135 17.4737C44.0716 18.282 42.7525 18.8048 41.3669 18.9981C39.9813 19.1914 38.5695 19.0497 37.25 18.5847M25.5833 10.3335C25.5833 12.6541 24.6615 14.8797 23.0205 16.5207C21.3796 18.1616 19.154 19.0835 16.8333 19.0835C14.5127 19.0835 12.2871 18.1616 10.6461 16.5207C9.00521 14.8797 8.08333 12.6541 8.08333 10.3335C8.08333 8.01285 9.00521 5.78725 10.6461 4.14631C12.2871 2.50536 14.5127 1.58349 16.8333 1.58349C19.154 1.58349 21.3796 2.50536 23.0205 4.14631C24.6615 5.78725 25.5833 8.01285 25.5833 10.3335Z"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const Ship = ({ width = 70, height = 70, color = "white" }: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 70 70"
        fill="none"
    >
        <path
            d="M55.4167 46.6667L61.25 35L49.5833 32.4071M49.5833 32.4071L35 29.1667M49.5833 32.4071L52.5 17.5H40.8333M35 29.1667V43.75M35 29.1667L20.4167 32.4071M20.4167 32.4071L8.75 35L14.5833 46.6667M20.4167 32.4071L17.5 17.5H29.1667M29.1667 17.5V8.75H40.8333V17.5M29.1667 17.5H40.8333M8.75 58.3333L12.3812 56.8808C13.5102 56.4294 14.7321 56.2593 15.9414 56.3853C17.1507 56.5113 18.3113 56.9296 19.3229 57.6042C20.8362 58.6132 22.6647 59.0376 24.4678 58.7983C26.2708 58.559 27.9253 57.6722 29.1229 56.3033L29.225 56.1867C29.945 55.3631 30.8328 54.7031 31.8288 54.2509C32.8249 53.7987 33.9061 53.5647 35 53.5647C36.0939 53.5647 37.1751 53.7987 38.1712 54.2509C39.1672 54.7031 40.055 55.3631 40.775 56.1867L40.88 56.3033C42.0776 57.6722 43.7321 58.559 45.5352 58.7983C47.3382 59.0376 49.1667 58.6132 50.68 57.6042C51.6916 56.9296 52.8522 56.5113 54.0615 56.3853C55.2709 56.2593 56.4927 56.4294 57.6217 56.8808L61.25 58.3333"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const Sales = ({ width = 71, height = 70, color = "white" }: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 71 70"
        fill="none"
    >
        <path
            d="M2.6875 67.8125H68.3125"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M18 47.3955H9.25C8.67218 47.4031 8.12017 47.6358 7.71155 48.0445C7.30295 48.4531 7.07005 49.0052 7.0625 49.583V67.8122H20.1875V49.583C20.1799 49.0052 19.9471 48.4531 19.5385 48.0445C19.1298 47.6358 18.5778 47.4031 18 47.3955Z"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M39.875 35.7295H31.125C30.5472 35.7371 29.9951 35.9698 29.5865 36.3785C29.178 36.7871 28.9451 37.3392 28.9375 37.917V67.8128H42.0625V37.917C42.0549 37.3392 41.8222 36.7871 41.4135 36.3785C41.0049 35.9698 40.4528 35.7371 39.875 35.7295Z"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M61.75 24.0625H53C52.4222 24.0701 51.8701 24.303 51.4615 24.7115C51.0528 25.1202 50.8201 25.6722 50.8125 26.25V67.8125H63.9375V26.25C63.9299 25.6722 63.6972 25.1202 63.2885 24.7115C62.8799 24.303 62.3278 24.0701 61.75 24.0625Z"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12.6918 26.9499L59.5628 5.6582"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M56.0914 14.9625L59.5622 5.65833L50.2872 2.1875"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const PartnersManagement = ({
    width = 70,
    height = 70,
    color = "white",
}: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 70 70"
        fill="none"
    >
        <path
            d="M6.23438 53.2383H11.457L25.1289 61.1133C28.1337 62.8319 31.5385 63.7279 35 63.7109"
            stroke={color}
            strokeWidth="5"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
        <path
            d="M54.6055 55.5078L58.543 53.2383H63.7656"
            stroke={color}
            strokeWidth="5"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
        <path
            d="M35 63.7107C38.4327 63.7058 41.8055 62.8107 44.7891 61.1131L50.2578 57.9412L40.1406 42.7927L32.8945 44.5974C32.1865 44.7632 31.4615 44.8458 30.7344 44.8435C29.3676 44.8425 28.0198 44.5242 26.7969 43.9138C26.1107 43.5777 25.5321 43.0565 25.1263 42.4091C24.7205 41.7617 24.5036 41.0138 24.5 40.2498C24.5065 39.4478 24.7448 38.6648 25.1863 37.9952C25.6279 37.3257 26.2537 36.7982 26.9883 36.4763L40.8789 30.5427C42.4541 29.8758 44.1699 29.6092 45.8732 29.7667C47.5765 29.9241 49.2144 30.5007 50.6406 31.4451L55.918 34.9998H63.7656"
            stroke={color}
            strokeWidth="5"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
        <path
            d="M6.23438 34.9998H14.082L19.332 31.4451C20.7583 30.5007 22.3961 29.9241 24.0994 29.7667C25.8028 29.6092 27.5185 29.8758 29.0937 30.5427L35 33.0857"
            stroke={color}
            strokeWidth="5"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
        <path
            d="M63.7656 29.7227V58.4883"
            stroke={color}
            strokeWidth="5"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
        <path
            d="M6.23438 29.7227V58.4883"
            stroke={color}
            strokeWidth="5"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
        <path
            d="M34.737 9.05755V7"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M34.737 27.5635V25.5098"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M40.1183 12.9604C40.1183 10.8488 38.3811 9.05371 34.737 9.05371C31.089 9.05371 29.3557 10.7445 29.3557 12.9604C29.3557 14.6859 31.0928 16.3459 34.737 16.867C38.385 17.3882 40.9405 18.5887 40.9405 21.1906C40.9405 23.5376 38.385 25.5026 34.737 25.5026C31.089 25.5026 28.5334 23.8272 28.5334 21.5959"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const Boarding = ({
    width = 70,
    height = 70,
    color = "white",
}: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 70 70"
        fill="none"
    >
        <path
            d="M27.1542 42.8747L31.5292 47.2497L43.1958 35.583"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M29.1667 17.4997H40.8333C46.6667 17.4997 46.6667 14.583 46.6667 11.6663C46.6667 5.83301 43.75 5.83301 40.8333 5.83301H29.1667C26.25 5.83301 23.3333 5.83301 23.3333 11.6663C23.3333 17.4997 26.25 17.4997 29.1667 17.4997Z"
            stroke={color}
            strokeWidth="5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M46.6667 11.7246C56.3792 12.2496 61.25 15.8371 61.25 29.1663V46.6663C61.25 58.3329 58.3333 64.1663 43.75 64.1663H26.25C11.6667 64.1663 8.75 58.3329 8.75 46.6663V29.1663C8.75 15.8663 13.6208 12.2496 23.3333 11.7246"
            stroke={color}
            strokeWidth="5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const PaymentProcessing = ({
    width = 106,
    height = 106,
    color = "white",
}: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="15 15 80 80"
        fill="none"
    >
        <path
            d="M31.7965 63.8741L63.8747 31.7959"
            stroke={color}
            strokeWidth="5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M51.0476 70.316L54.2689 67.0947"
            stroke={color}
            strokeWidth="5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M58.2732 63.0943L64.6888 56.6787"
            stroke={color}
            strokeWidth="5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M30.9149 48.7337L48.7391 30.9095C54.43 25.2186 57.2754 25.1918 62.9126 30.8289L76.0928 44.0092C81.73 49.6463 81.7031 52.4918 76.0123 58.1826L58.1881 76.0068C52.4972 81.6977 49.6518 81.7245 44.0146 76.0873L30.8344 62.9071C25.1972 57.2699 25.1972 54.4514 30.9149 48.7337Z"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M26.6165 80.2998H80.3039"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const Security = ({
    width = 71,
    height = 70,
    color = "white",
}: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 71 70"
        fill="none"
    >
        <path
            d="M35.5 10.3906C41.887 16.0414 50.2232 18.9836 58.7422 18.5938C59.9825 22.8129 60.362 27.2384 59.8581 31.6071C59.3543 35.9759 57.9774 40.1988 55.8093 44.0249C53.6412 47.851 50.7261 51.2022 47.2372 53.8794C43.7483 56.5567 39.7568 58.5052 35.5 59.6094C31.2431 58.5052 27.2517 56.5567 23.7628 53.8794C20.2739 51.2022 17.3588 47.851 15.1907 44.0249C13.0226 40.1988 11.6457 35.9759 11.1418 31.6071C10.638 27.2384 11.0175 22.8129 12.2578 18.5938C20.7768 18.9836 29.113 16.0414 35.5 10.3906Z"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M32.7656 32.2656C32.7656 32.9908 33.0537 33.6863 33.5665 34.1991C34.0793 34.7119 34.7748 35 35.5 35C36.2252 35 36.9207 34.7119 37.4335 34.1991C37.9463 33.6863 38.2344 32.9908 38.2344 32.2656C38.2344 31.5404 37.9463 30.8449 37.4335 30.3321C36.9207 29.8193 36.2252 29.5312 35.5 29.5312C34.7748 29.5312 34.0793 29.8193 33.5665 30.3321C33.0537 30.8449 32.7656 31.5404 32.7656 32.2656Z"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M35.5 35V41.8359"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export const Reporting = ({
    width = 81,
    height = 80,
    color = "white",
}: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 81 80"
        fill="none"
    >
        <path
            d="M49.4466 5.13392C50.942 5.59892 55.7416 7.5034 62.6743 14.2644C69.2088 20.6372 71.3191 25.1618 71.9391 26.8817C72.0786 30.6173 72.1663 34.9668 72.1663 40.0002C72.1663 53.4408 71.5415 62.0068 70.9717 67.024C70.555 70.6932 67.8005 73.4373 64.1326 73.8652C59.441 74.4127 51.778 75.0002 40.4998 75.0002C29.2216 75.0002 21.5586 74.4127 16.8669 73.8652C13.1991 73.4373 10.4446 70.6932 10.0279 67.024C9.45813 62.0068 8.83331 53.4408 8.83331 40.0002C8.83331 26.5593 9.45813 17.9933 10.0279 12.9761C10.4446 9.30705 13.1991 6.56285 16.8669 6.13495C21.5586 5.58758 29.2216 5 40.4998 5C43.7831 5 46.7603 5.0498 49.4466 5.13392Z"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M22.1666 61.6665H58.8333"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M22.1666 50H58.8333"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M22.1666 38.1135C26.4525 31.5631 30.0276 28.6868 31.9933 27.4793C32.9221 26.9086 34.0445 27.2825 34.5266 28.2601C35.6323 30.5016 36.6753 33.5823 37.4223 36.0253C37.8611 37.46 39.9548 37.7691 40.877 36.5858C44.587 31.8248 49.6666 27.5001 49.6666 27.5001"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M56.4456 30.5343C57.1796 26.6602 57.2059 23.262 57.1456 21.4622C57.1189 20.6685 56.498 20.0475 55.7043 20.0208C53.9045 19.9605 50.5064 19.9868 46.6321 20.7208C45.375 20.959 44.9588 22.4902 45.8636 23.395L53.7714 31.3028C54.6763 32.2077 56.2075 31.7915 56.4456 30.5343Z"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Table
export const FileExportIcon = ({ width = 28, height = 28 }: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 28 28"
        fill="none"
    >
        <path
            d="M21.5833 18.6667C22.1737 19.2395 24.5 20.7667 24.5 21.5833M24.5 21.5833C24.5 22.4 22.1737 23.9272 21.5833 24.5M24.5 21.5833H15.1667M12.8333 25.6667H12.5148C8.7115 25.6667 6.8075 25.6667 5.48683 24.7357C5.11099 24.4721 4.77505 24.1558 4.48933 23.7965C3.5 22.5528 3.5 20.7632 3.5 17.1815V14.2123C3.5 10.7555 3.5 9.02651 4.04717 7.64634C4.92683 5.42618 6.7865 3.67618 9.1455 2.84784C10.6108 2.33334 12.446 2.33334 16.121 2.33334C18.2187 2.33334 19.2687 2.33334 20.1063 2.62734C21.4538 3.10101 22.5167 4.10084 23.0195 5.36901C23.3333 6.15768 23.3333 7.14584 23.3333 9.12101V15.1667"
            stroke="#909599"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M3.5 14C3.5 12.9687 3.90968 11.9797 4.63892 11.2504C5.36815 10.5212 6.35721 10.1115 7.3885 10.1115C8.1655 10.1115 9.08133 10.2468 9.83617 10.045C10.166 9.95625 10.4667 9.78234 10.7081 9.54071C10.9495 9.29909 11.1232 8.99825 11.2117 8.66834C11.4135 7.91351 11.2782 6.99768 11.2782 6.22068C11.2785 5.18958 11.6883 4.20083 12.4175 3.47185C13.1467 2.74286 14.1356 2.33334 15.1667 2.33334"
            stroke="#909599"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const PDFIcon = ({ width = 28, height = 28 }: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 28 28"
        fill="none"
    >
        <path
            d="M9.09066 24.7917H18.9093C19.9923 24.7917 21.0309 24.3615 21.7967 23.5957C22.5625 22.8299 22.9927 21.7913 22.9927 20.7083V14.2567C22.993 13.1738 22.5633 12.1352 21.798 11.3692L14.8342 4.40418C14.455 4.02501 14.0048 3.72425 13.5093 3.51907C13.0139 3.31389 12.4829 3.2083 11.9467 3.20834H9.09066C8.00769 3.20834 6.96908 3.63855 6.20331 4.40432C5.43753 5.1701 5.00732 6.20871 5.00732 7.29168V20.7083C5.00732 21.7913 5.43753 22.8299 6.20331 23.5957C6.96908 24.3615 8.00769 24.7917 9.09066 24.7917Z"
            stroke="#909599"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M13.636 3.62836V10.2317C13.636 10.8505 13.8818 11.444 14.3194 11.8816C14.757 12.3192 15.3505 12.565 15.9693 12.565H22.575"
            stroke="#909599"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.45831 19.25V18.0833M8.45831 18.0833V15.75H9.62498C9.9344 15.75 10.2311 15.8729 10.4499 16.0917C10.6687 16.3105 10.7916 16.6072 10.7916 16.9167C10.7916 17.2261 10.6687 17.5228 10.4499 17.7416C10.2311 17.9604 9.9344 18.0833 9.62498 18.0833H8.45831ZM17.7916 19.25V17.7917M17.7916 17.7917V15.75H19.5416M17.7916 17.7917H19.5416M13.125 19.25V15.75H13.7083C14.1724 15.75 14.6176 15.9344 14.9457 16.2626C15.2739 16.5908 15.4583 17.0359 15.4583 17.5C15.4583 17.9641 15.2739 18.4092 14.9457 18.7374C14.6176 19.0656 14.1724 19.25 13.7083 19.25H13.125Z"
            stroke="#909599"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const XFile = ({ width = 28, height = 28 }: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 28 28"
        fill="none"
    >
        <path
            d="M9.09067 24.7917H18.9093C19.9923 24.7917 21.0309 24.3615 21.7967 23.5957C22.5625 22.8299 22.9927 21.7913 22.9927 20.7083V14.2567C22.9931 13.1738 22.5633 12.1352 21.798 11.3692L14.8342 4.40418C14.455 4.02501 14.0048 3.72425 13.5094 3.51907C13.0139 3.31389 12.4829 3.2083 11.9467 3.20834H9.09067C8.00771 3.20834 6.96909 3.63855 6.20332 4.40432C5.43755 5.1701 5.00734 6.20871 5.00734 7.29168V20.7083C5.00734 21.7913 5.43755 22.8299 6.20332 23.5957C6.96909 24.3615 8.00771 24.7917 9.09067 24.7917Z"
            stroke="#909599"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M13.636 3.62836V10.2317C13.636 10.8505 13.8818 11.444 14.3194 11.8816C14.757 12.3192 15.3505 12.565 15.9693 12.565H22.575"
            stroke="#909599"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17.1173 13.895C16.933 13.7542 16.7013 13.6901 16.4708 13.7162C16.2403 13.7423 16.0288 13.8565 15.8806 14.035L14.2356 16.1L12.5906 14C12.514 13.9096 12.4203 13.8352 12.315 13.781C12.2096 13.7268 12.0946 13.6939 11.9765 13.6842C11.8584 13.6744 11.7396 13.688 11.6268 13.7242C11.5139 13.7604 11.4093 13.8184 11.3189 13.895C11.2286 13.9716 11.1541 14.0653 11.0999 14.1707C11.0457 14.276 11.0128 14.391 11.0031 14.5091C10.9933 14.6272 11.0069 14.746 11.0431 14.8589C11.0793 14.9717 11.1373 15.0763 11.2139 15.1667L13.0689 17.5L11.2139 19.8334C11.0685 20.0159 11.0016 20.2488 11.0278 20.4807C11.0541 20.7126 11.1714 20.9246 11.3539 21.07C11.5365 21.2154 11.7694 21.2824 12.0013 21.2561C12.2332 21.2299 12.4452 21.1126 12.5906 20.93L14.2356 18.9L15.8806 21C15.9644 21.1016 16.0695 21.1835 16.1884 21.2399C16.3074 21.2964 16.4373 21.326 16.5689 21.3267C16.7479 21.3415 16.927 21.3009 17.0821 21.2105C17.2372 21.12 17.3607 20.984 17.4358 20.821C17.511 20.6579 17.5342 20.4757 17.5022 20.299C17.4703 20.1223 17.3848 19.9598 17.2573 19.8334L15.4023 17.5L17.3039 15.1667C17.3766 15.0715 17.4294 14.9627 17.4593 14.8467C17.4893 14.7308 17.4958 14.61 17.4784 14.4916C17.461 14.3731 17.4201 14.2593 17.3581 14.1568C17.2961 14.0544 17.2142 13.9654 17.1173 13.895Z"
            fill="#909599"
        />
    </svg>
);

export const VerticalFilter = ({ width = 28, height = 28 }: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 28 28"
        fill="none"
    >
        <path
            d="M8.16667 24.5V21M8.16667 21C7.07934 21 6.53567 21 6.10751 20.8227C5.82422 20.7054 5.56681 20.5335 5.35002 20.3167C5.13322 20.0999 4.96127 19.8425 4.84401 19.5592C4.66667 19.131 4.66667 18.5873 4.66667 17.5C4.66667 16.4127 4.66667 15.869 4.84401 15.4408C4.96127 15.1575 5.13322 14.9001 5.35002 14.6833C5.56681 14.4665 5.82422 14.2946 6.10751 14.1773C6.53567 14 7.07934 14 8.16667 14C9.254 14 9.79767 14 10.2258 14.1773C10.5091 14.2946 10.7665 14.4665 10.9833 14.6833C11.2001 14.9001 11.3721 15.1575 11.4893 15.4408C11.6667 15.869 11.6667 16.4127 11.6667 17.5C11.6667 18.5873 11.6667 19.131 11.4893 19.5592C11.3721 19.8425 11.2001 20.0999 10.9833 20.3167C10.7665 20.5335 10.5091 20.7054 10.2258 20.8227C9.79767 21 9.254 21 8.16667 21ZM19.8333 24.5V17.5M19.8333 7V3.5M19.8333 7C18.746 7 18.2023 7 17.7742 7.17733C17.4909 7.2946 17.2335 7.46654 17.0167 7.68334C16.7999 7.90014 16.6279 8.15754 16.5107 8.44083C16.3333 8.869 16.3333 9.41267 16.3333 10.5C16.3333 11.5873 16.3333 12.131 16.5107 12.5592C16.6279 12.8425 16.7999 13.0999 17.0167 13.3167C17.2335 13.5335 17.4909 13.7054 17.7742 13.8227C18.2023 14 18.746 14 19.8333 14C20.9207 14 21.4643 14 21.8925 13.8227C22.1758 13.7054 22.4332 13.5335 22.65 13.3167C22.8668 13.0999 23.0387 12.8425 23.156 12.5592C23.3333 12.131 23.3333 11.5873 23.3333 10.5C23.3333 9.41267 23.3333 8.869 23.156 8.44083C23.0387 8.15754 22.8668 7.90014 22.65 7.68334C22.4332 7.46654 22.1758 7.2946 21.8925 7.17733C21.4643 7 20.9207 7 19.8333 7ZM8.16667 10.5V3.5"
            stroke="#909599"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Toast
export const ErrorIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 119 121"
        fill="none"
    >
        <g filter="url(#filter0_d_77_1025)">
            <rect
                x="32"
                y="34"
                width="53"
                height="53"
                rx="26.5"
                fill="#FF3232"
            />
            <rect
                x="32"
                y="34"
                width="53"
                height="53"
                rx="26.5"
                stroke="white"
                strokeWidth="2"
            />
            <path
                d="M51 69L67 53M67 69L51 53"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </g>
        <defs>
            <filter
                id="filter0_d_77_1025"
                x="-2"
                y="0"
                width="121"
                height="121"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feMorphology
                    radius="3"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect1_dropShadow_77_1025"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="15" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 0.196078 0 0 0 0 0.196078 0 0 0 0.75 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_77_1025"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_77_1025"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);

export const WarningIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 130 129"
        fill="none"
    >
        <g filter="url(#filter0_d_82_1294)">
            <circle
                cx="58.5"
                cy="64.5"
                r="26.5"
                fill="#FFCA6D"
                stroke="white"
                strokeWidth="2"
            />
            <path
                d="M57.8667 51.779L58.6182 67.7504L59.3683 51.7855C59.3729 51.6835 59.3567 51.5815 59.3206 51.4859C59.2845 51.3904 59.2293 51.3032 59.1583 51.2296C59.0874 51.1561 59.0022 51.0978 58.908 51.0584C58.8138 51.0189 58.7125 50.999 58.6103 51C58.5099 51.001 58.4108 51.0221 58.3187 51.062C58.2266 51.102 58.1434 51.16 58.0741 51.2326C58.0048 51.3052 57.9507 51.3909 57.9151 51.4848C57.8795 51.5786 57.863 51.6787 57.8667 51.779Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M58.6183 78.205C58.1004 78.205 57.5942 78.0515 57.1636 77.7638C56.7331 77.4761 56.3975 77.0672 56.1993 76.5887C56.0011 76.1103 55.9493 75.5839 56.0503 75.076C56.1513 74.5681 56.4007 74.1015 56.7669 73.7354C57.133 73.3692 57.5996 73.1198 58.1075 73.0188C58.6154 72.9178 59.1418 72.9696 59.6202 73.1678C60.0987 73.366 60.5076 73.7016 60.7953 74.1321C61.083 74.5627 61.2365 75.0689 61.2365 75.5868C61.2365 76.2812 60.9607 76.9471 60.4697 77.4382C59.9786 77.9292 59.3127 78.205 58.6183 78.205Z"
                fill="white"
            />
        </g>
        <defs>
            <filter
                id="filter0_d_82_1294"
                x="-12.4"
                y="-6.4"
                width="141.8"
                height="141.8"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="21.7" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 0.695371 0 0 0 0 0.160833 0 0 0 1 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_82_1294"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_82_1294"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);

export const SuccessIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 129 129"
        fill="none"
    >
        <g filter="url(#filter0_d_74_3647)">
            <path
                d="M55.2072 39.1496C56.9629 37.8688 59.3449 37.8688 61.1006 39.1496L64.0558 41.3054C64.9141 41.9315 65.9494 42.2679 67.0118 42.266L70.671 42.2592C72.8442 42.2552 74.7711 43.6554 75.4386 45.7236L76.562 49.2046C76.8883 50.2159 77.5283 51.0968 78.3892 51.7197L81.3529 53.8643C83.1135 55.1383 83.8495 57.4036 83.1741 59.4692L82.0371 62.9459C81.7069 63.9556 81.7069 65.0444 82.0371 66.0541L83.1741 69.5308C83.8495 71.5964 83.1135 73.8617 81.3529 75.1357L78.3892 77.2803C77.5283 77.9032 76.8883 78.7842 76.562 79.7954L75.4386 83.2764C74.7711 85.3446 72.8442 86.7448 70.671 86.7408L67.0118 86.734C65.9494 86.7321 64.9141 87.0685 64.0558 87.6946L61.1006 89.8504C59.3449 91.1312 56.9629 91.1312 55.2072 89.8504L52.2519 87.6946C51.3937 87.0685 50.3583 86.7321 49.296 86.734L45.6367 86.7408C43.4636 86.7448 41.5366 85.3446 40.8692 83.2764L39.7458 79.7954C39.4194 78.7841 38.7794 77.9032 37.9186 77.2803L34.9549 75.1357C33.1943 73.8617 32.4582 71.5964 33.1337 69.5308L34.2706 66.0541C34.6009 65.0444 34.6009 63.9556 34.2706 62.9459L33.1337 59.4692C32.4582 57.4036 33.1943 55.1383 34.9549 53.8643L37.9186 51.7197C38.7794 51.0968 39.4194 50.2159 39.7458 49.2046L40.8692 45.7236C41.5366 43.6554 43.4636 42.2552 45.6367 42.2592L49.296 42.266C50.3583 42.2679 51.3937 41.9315 52.2519 41.3054L55.2072 39.1496Z"
                fill="#00A878"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M48.5289 64.5L55.4039 71.375L69.1539 57.625"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <filter
                id="filter0_d_74_3647"
                x="-12.6144"
                y="-7.31104"
                width="141.536"
                height="143.622"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feMorphology
                    radius="8"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect1_dropShadow_74_3647"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="18.25" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0.658824 0 0 0 0 0.470588 0 0 0 0.76 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_74_3647"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_74_3647"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);

export const InfoIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 114 119"
        fill="none"
    >
        <g filter="url(#filter0_d_77_1193)">
            <path
                d="M54.0833 81.5834C41.8867 81.5834 32 71.6967 32 59.5C32 47.3034 41.8867 37.4167 54.0833 37.4167C66.2799 37.4167 76.1666 47.3034 76.1666 59.5C76.1666 71.6967 66.2799 81.5834 54.0833 81.5834Z"
                fill="#4EA3E0"
            />
            <path
                d="M54.0833 50.6667L54.0656 50.6667L54.0833 50.6667ZM54.0833 68.3334L54.0833 57.2917L54.0833 68.3334ZM32 59.5C32 71.6967 41.8867 81.5834 54.0833 81.5834C66.2799 81.5834 76.1666 71.6967 76.1666 59.5C76.1666 47.3034 66.2799 37.4167 54.0833 37.4167C41.8867 37.4167 32 47.3034 32 59.5Z"
                fill="#4EA3E0"
            />
            <path
                d="M54.0833 50.6667L54.0656 50.6667M54.0833 68.3334L54.0833 57.2917M32 59.5C32 71.6967 41.8867 81.5834 54.0833 81.5834C66.2799 81.5834 76.1666 71.6967 76.1666 59.5C76.1666 47.3034 66.2799 37.4167 54.0833 37.4167C41.8867 37.4167 32 47.3034 32 59.5Z"
                stroke="white"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <filter
                id="filter0_d_77_1193"
                x="-5"
                y="0.416748"
                width="118.167"
                height="118.167"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="18" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.305882 0 0 0 0 0.639216 0 0 0 0 0.878431 0 0 0 0.73 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_77_1193"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_77_1193"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);

// View Card Icons
export const TrashIcon = ({
    width = 28,
    height = 28,
    color = "white",
}: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 28 28"
        fill="none"
    >
        <path
            d="M22.75 6.41732L22.0267 18.1132C21.8423 21.101 21.7502 22.5955 21 23.67C20.6297 24.201 20.1529 24.6492 19.6 24.986C18.4835 25.6673 16.9867 25.6673 13.993 25.6673C10.9947 25.6673 9.4955 25.6673 8.37667 24.9848C7.82354 24.6473 7.34675 24.1984 6.97667 23.6665C6.22767 22.5908 6.13667 21.094 5.957 18.1015L5.25 6.41732M10.5 13.6915H17.5M12.25 18.2637H15.75M3.5 6.41732H24.5M18.7308 6.41732L17.9352 4.77465C17.4055 3.68265 17.1418 3.13782 16.6857 2.79715C16.5843 2.72169 16.477 2.65458 16.3648 2.59648C15.8597 2.33398 15.253 2.33398 14.0397 2.33398C12.7972 2.33398 12.1753 2.33398 11.6608 2.60698C11.5471 2.6679 11.4386 2.73814 11.3365 2.81698C10.8745 3.17048 10.6167 3.73632 10.101 4.86682L9.39517 6.41732"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

//  QrCode Icon
export const QrCodeIcon = ({ width = 173, height = 173 }: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 173 173"
        fill="none"
    >
        <path
            d="M14.6787 65.1276V47.2109C14.6787 29.3659 29.0837 14.9609 46.9287 14.9609H64.8454"
            stroke="#00A878"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M107.846 14.9609H125.762C143.607 14.9609 158.012 29.3659 158.012 47.2109V65.1276"
            stroke="#00A878"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M158.013 115.289V126.039C158.013 143.884 143.608 158.289 125.763 158.289H115.013"
            stroke="#00A878"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M64.8454 158.292H46.9287C29.0837 158.292 14.6787 143.887 14.6787 126.042V108.125"
            stroke="#00A878"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M75.596 50.7891V65.1224C75.596 72.2891 72.0127 75.8724 64.846 75.8724H50.5127C43.346 75.8724 39.7627 72.2891 39.7627 65.1224V50.7891C39.7627 43.6224 43.346 40.0391 50.5127 40.0391H64.846C72.0127 40.0391 75.596 43.6224 75.596 50.7891Z"
            stroke="#00A878"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M132.929 50.7891V65.1224C132.929 72.2891 129.346 75.8724 122.179 75.8724H107.846C100.679 75.8724 97.0957 72.2891 97.0957 65.1224V50.7891C97.0957 43.6224 100.679 40.0391 107.846 40.0391H122.179C129.346 40.0391 132.929 43.6224 132.929 50.7891Z"
            stroke="#00A878"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M75.596 108.125V122.458C75.596 129.625 72.0127 133.208 64.846 133.208H50.5127C43.346 133.208 39.7627 129.625 39.7627 122.458V108.125C39.7627 100.958 43.346 97.375 50.5127 97.375H64.846C72.0127 97.375 75.596 100.958 75.596 108.125Z"
            stroke="#00A878"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M132.929 108.125V122.458C132.929 129.625 129.346 133.208 122.179 133.208H107.846C100.679 133.208 97.0957 129.625 97.0957 122.458V108.125C97.0957 100.958 100.679 97.375 107.846 97.375H122.179C129.346 97.375 132.929 100.958 132.929 108.125Z"
            stroke="#00A878"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const PenIcon = ({ width = 24, height = 24, color = "white" }: Icon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            d="M16.6875 3.56157C16.9263 3.27942 17.2216 3.04975 17.5547 2.88721C17.8878 2.72467 18.2513 2.63282 18.6222 2.61752C18.993 2.60222 19.363 2.6638 19.7085 2.79834C20.054 2.93288 20.3675 3.13742 20.629 3.39893C20.8906 3.66045 21.0943 3.97319 21.2274 4.31723C21.3604 4.66128 21.4198 5.02907 21.4018 5.39718C21.3838 5.76528 21.2887 6.12562 21.1227 6.45523C20.9567 6.78483 20.7233 7.07648 20.4375 7.31157L7.78125 19.9678L2.625 21.3741L4.03125 16.2178L16.6875 3.56157Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M14.8125 5.4375L18.5625 9.1875"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
