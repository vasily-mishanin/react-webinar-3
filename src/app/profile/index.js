import { memo, useMemo } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from "../../components/auth-header";
import useAuth from "../../hooks/use-auth";
import UserCard from "../../components/user-card";

/**
 * Главная страница - первичная загрузка каталога
 */

function Profile() {
  const { user } = useAuth();
  const { t } = useTranslate();
  const labels = useMemo(
    () => ({
      profile: t("auth.profile"),
      name: t("auth.name"),
      phone: t("auth.phone"),
    }),
    [t]
  );

  if (!user) {
    return null;
  }

  return (
    <PageLayout head={<AuthHeader />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <UserCard user={user} labels={labels} />
    </PageLayout>
  );
}

export default memo(Profile);
