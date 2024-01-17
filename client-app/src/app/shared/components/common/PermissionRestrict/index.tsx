/* eslint-disable @typescript-eslint/ban-types */
import { FC } from "react";
import { Typo, View } from "..";
import { Trans } from "react-i18next";

const PermissionRestrict: FC<Props> = () => {
  return (
    <View className="c-container" flexGrow={1} justify="center" align="center">
      <Typo variant="body1">
        {
          <Trans i18nKey={"dont_have_permission_view_page"}>
            Sorry! You don't have <b className="has-text-danger">permission</b>{" "}
            to view this page.
          </Trans>
        }
      </Typo>
    </View>
  );
};

type Props = {};

export default PermissionRestrict;
