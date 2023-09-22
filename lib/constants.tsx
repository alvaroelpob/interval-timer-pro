interface APPTHEMEProps {
    PRIMARY: string;
    SECONDARY: string;
    ACCENTS: {
        ONE: string;
        TWO: string;
        THREE: string;
    };
    DEFAULT_COLORS: {
        prepTime: string;
        activeTime: string;
        restTime: string;
    };
    FOCUSED: string;
    HEADER: string;
    TABBAR: string;
}

const APPTHEME: APPTHEMEProps = {
    PRIMARY: "#05161A",
    SECONDARY: "#072E33",
    ACCENTS: {
        ONE: "#48BEFF",
        TWO: "#FE5F55", // D64933
        THREE: "#FF0000"
    },
    DEFAULT_COLORS: {
        prepTime: "#0076BE",
        activeTime: "#DE2B00",
        restTime: "#017A10",
    },
    FOCUSED: "#48BEFF",
    HEADER: "#05161A",
    TABBAR: "#05161A",
};

export { APPTHEME };