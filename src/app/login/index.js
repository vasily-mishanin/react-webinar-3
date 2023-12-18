import { memo, useMemo, useEffect, useCallback } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from "../../components/auth-header";
import FormLogin from "../../components/form-login";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

/**
 * Cтраница - логин
 */
function Login() {
  const { t } = useTranslate();
  const store = useStore();

  const auth = useSelector((state) => state.auth);
  const user = { name: auth.username, token: auth.token };

  useEffect(() => {
    return () => {
      store.actions.auth.resetError();
    };
  }, []);

  const labels = useMemo(
    () => ({
      enter: t("auth.enter"),
      username: t("auth.username"),
      login: t("auth.login"),
      password: t("auth.password"),
    }),
    [t]
  );

  const callbacks = {
    // Вход
    getUser: useCallback(
      (formData) => {
        store.actions.auth.logIn(formData);
      },
      [store]
    ),

    // Выход
    logOut: useCallback(async () => {
      await store.actions.auth.logOut();
    }, [store]),
  };

  return (
    <PageLayout
      head={<AuthHeader t={t} user={user} logOut={callbacks.logOut} />}
    >
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={auth.waiting}>
        <FormLogin
          labels={labels}
          error={auth.error?.data?.issues[0]?.message}
          getUser={callbacks.getUser}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
