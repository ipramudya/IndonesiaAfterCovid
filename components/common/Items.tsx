import { Box, Group, Text, ThemeIcon } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { typography } from "lib/mantine/styles";
import formatNum from "lib/numeral/formatNum";
import { forwardRef } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import formatTitle from "utils/formatTitle";

import { SelectIcon } from "./Icons";

import type { ReactNode } from "react";

interface ISelectItemWithIcon {
    icon: ReactNode;
    label: string;
    value: "tca" | "tcd" | "afba" | "afbd";
    sortedBy: "jumlah_kasus" | "key";
    order: "asc" | "dsc";
}

type TButtonItem = ({
    label,
    quantity,
    isSelected,
}: {
    label?: string;
    quantity?: number;
    isSelected?: boolean;
}) => JSX.Element;

const SelectItemWithIcon = forwardRef<HTMLDivElement | null, ISelectItemWithIcon>(
    ({ icon, label, value, ...others }, ref) => (
        <div ref={ref} {...others}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text sx={typography.textMain}>{label}</Text>
                <SelectIcon icon={icon} />
            </Box>
        </div>
    )
);
SelectItemWithIcon.displayName = "SelectItemWithIcon";

const ButtonItem: TButtonItem = ({ label, quantity, isSelected = false }) => {
    const { hovered, ref } = useHover();

    return (
        <Box
            ref={ref}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Group spacing={hovered ? 3 : 0} sx={{ transition: "all 0.3s ease" }}>
                {isSelected ? (
                    <ThemeIcon
                        sx={(theme) => ({
                            background: "transparent",
                            transition: "all 0.3s ease",
                            color: hovered ? theme.colors.red[6] : theme.colors.dark[7],
                        })}
                    >
                        <FaStar />
                    </ThemeIcon>
                ) : (
                    <SelectIcon icon={hovered ? <FaStar /> : <FaRegStar />} />
                )}
                <Text component="span" sx={typography.textMain}>
                    {formatTitle(label as string)}
                </Text>
            </Group>
            <Text component="span" sx={typography.textMain}>
                {formatNum(quantity)}
            </Text>
        </Box>
    );
};

export { SelectItemWithIcon, ButtonItem };
