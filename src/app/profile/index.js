import { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from "../../components/auth-header";
import ProfileCard from "../../components/profile-card";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";

/**
 *
 * Cтраница - профиль
 *
 */

function Profile() {
  const auth = useSelector((state) => state.auth);
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();
  const storage_token = localStorage.getItem("auth_token");

  useInit(() => {
    store.actions.profile.load(auth.token || storage_token);
  }, []);

  const select = useSelector((state) => ({
    profile: state.profile,
  }));

  const callbacks = {
    // Выход
    logOut: useCallback(() => {
      store.actions.auth.logOut();
      navigate("/login");
    }, [store]),
  };

  const labels = useMemo(
    () => ({
      profile: t("auth.profile"),
      name: t("auth.name"),
      phone: t("auth.phone"),
    }),
    [t]
  );

  if (!auth.token) {
    return null;
  }

  const user_header = { name: auth.username, token: auth.token };
  return (
    <PageLayout
      head={<AuthHeader t={t} user={user_header} logOut={callbacks.logOut} />}
    >
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />

      <Spinner active={select.profile.waiting}>
        <ProfileCard user={select.profile.data} labels={labels} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
