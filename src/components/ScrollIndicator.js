import { FaChevronDown } from "react-icons/fa";

export const ScrollIndicator = () => {
    const scrollToNext = () => {
        window.scrollTo({
            top: window.innerHeight - 80,
            behavior: "smooth"
        });
    };

    return (
        <div className="scroll-indicator" onClick={scrollToNext}>
            <FaChevronDown className="scroll-icon" />
            <span>Scroll Down</span>
        </div>
    );
};
