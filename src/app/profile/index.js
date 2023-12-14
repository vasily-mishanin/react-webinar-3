import { memo, useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from "../../components/auth-header";
import useAuth from "../../hooks/use-auth";
import UserCard from "../../components/user-card";
import { useNavigate } from "react-router-dom";

/**
 * Главная страница - первичная загрузка каталога
 */
function Profile() {
  const { user } = useAuth();
  const { t } = useTranslate();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login", { replace: true });
  }

  return (
    <PageLayout head={<AuthHeader />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <UserCard user={user} />
    </PageLayout>
  );
}

export default memo(Profile);
