import { Divider, Navbar, ScrollArea } from "@mantine/core";
import Confirmed from "components/containers/cases/Confirmed";
import ExploredProvince from "components/containers/cases/ExploredProvince";
import Overview from "components/containers/cases/Overview";
import { useCases } from "context";
import { FunctionComponent } from "react";
import { Provinces } from "types/provinces.types";
import { Update } from "types/update.types";

interface SidebarExpandedProps {
    provinces: Provinces;
    update: Update;
}

const SidebarExpanded: FunctionComponent<SidebarExpandedProps> = ({ provinces, update }) => {
    const { state } = useCases();
    const { exploredProvince } = state;
    return (
        <Navbar
            width={{ base: exploredProvince.isEmpty ? 400 : 700 }}
            height="100%"
            sx={{ padding: "14px 0", flexDirection: "row" }}
        >
            <Navbar width={{ base: 400 }} height="100%" sx={{ padding: "0 25px" }}>
                <Navbar.Section>{<Confirmed update={update} />}</Navbar.Section>
                <Divider my="md" />
                <Navbar.Section grow component={ScrollArea} ml={-20} mr={-20} type="always">
                    {<ExploredProvince provinces={provinces} />}
                </Navbar.Section>
            </Navbar>

            {!exploredProvince.isEmpty && (
                <Navbar width={{ base: 300 }} height="100%" sx={{ borderRight: "unset" }}>
                    <Navbar.Section component={ScrollArea} grow>
                        {<Overview />}
                    </Navbar.Section>
                </Navbar>
            )}
        </Navbar>
    );
};

export default SidebarExpanded;