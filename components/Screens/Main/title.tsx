import { Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function Title({ screen, openSearch }: { screen: string, openSearch?: boolean }) {
    const { t } = useTranslation();

    if (openSearch) return <></>;

    return (
        <Text
            style={{
                color: "#FFFFFF", fontSize: 20, fontWeight: '500',
            }}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
        >{t("bottomBar." + screen)}</Text>
    )
}