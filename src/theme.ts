import { extendTheme, ThemeConfig} from "@chakra-ui/react"

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

export const theme = extendTheme({
    colors: {
        teal: {
            50: "#e6f7f7",
            100: "#bae9e9",
            200: "#7dd6d6",
            300: "#4dc2c2",
            400: "#26b3b3",
            500: "#00a3a3",
            600: "#008f8f",
            700: "#007a7a",
            800: "#006666",
            900: "#004d4d",
        },
    },
})