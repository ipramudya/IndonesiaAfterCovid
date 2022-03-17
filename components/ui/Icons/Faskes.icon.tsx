import { useMantineTheme } from "@mantine/core";
import { memo } from "react";
import { FaHospitalAlt } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { RiHospitalFill } from "react-icons/ri";
import { JenisFaskes } from "types/faskes-types";

type FaskesIconProps = ({ markerType }: { markerType: JenisFaskes }) => JSX.Element;

const FaskesIcon: FaskesIconProps = ({ markerType }) => {
    const theme = useMantineTheme();

    switch (markerType) {
        case JenisFaskes.RumahSakit: {
            return <FaHospitalAlt size={18} style={{ color: "#004643" }} />;
        }
        case JenisFaskes.Puskesmas || JenisFaskes.Klinik: {
            return <RiHospitalFill size={18} style={{ color: theme.colors.green[9] }} />;
        }
        default: {
            return <GiHealthNormal size={18} style={{ color: "#70c88e" }} />;
        }
    }
};

export default memo(FaskesIcon);
