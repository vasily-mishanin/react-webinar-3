import { memo, useMemo } from "react";
import useAuth from "../../hooks/use-auth";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from "../../components/auth-header";
import FormLogin from "../../components/form-login";
import Spinner from "../../components/spinner";

/**
 * Главная страница - первичная загрузка каталога
 */
function Login() {
  const { waiting } = useAuth();
  const { t } = useTranslate();

  const labels = useMemo(
    () => ({
      enter: t("auth.enter"),
      username: t("auth.username"),
      login: t("auth.login"),
      password: t("auth.password"),
    }),
    [t]
  );

  return (
    <PageLayout head={<AuthHeader />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={waiting}>
        <FormLogin labels={labels} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
