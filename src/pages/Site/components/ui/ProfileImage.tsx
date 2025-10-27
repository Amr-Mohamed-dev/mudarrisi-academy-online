import DefaultUser from "@/assets/images/default-user.png";

interface Props {
    src?: string;
    cursor?: string;
    onClick?: () => void;
    className?: string;
}

function ProfileImage({
    src,
    cursor = "pointer",
    onClick,
    className = "",
}: Props) {
    return (
        <div
            className={`relative w-12 h-12 flex justify-center items-center rounded-full p-0.5 cursor-${cursor} ${className}`}
            style={{
                background:
                    "linear-gradient(135deg, #017EA1 7.61%, #FFC562 52.46%, #B983FF 97.31%)",
            }}
            onClick={cursor === "pointer" ? onClick : undefined}
        >
            <div
                className={`w-[95%] h-[95%] flex justify-center items-center bg-white dark:bg-gray-900 rounded-full p-0.5`}
            >
                <img
                    src={src || DefaultUser}
                    alt="User avatar"
                    className="w-[95%] h-[95%] object-cover rounded-full"
                    loading="lazy"
                />
            </div>
        </div>
    );
}
export default ProfileImage;
