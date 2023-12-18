import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from "../../components/auth-header";
import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  const auth = useSelector((state) => state.auth);
  const user = { name: auth.username, token: auth.token };

  useInit(() => {
    store.actions.category.load();
  }, []);

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true
  );

  const { t } = useTranslate();

  const callbacks = {
    // Выход
    logOut: useCallback(() => store.actions.auth.logOut(), [store]),
  };

  return (
    <PageLayout
      head={<AuthHeader t={t} user={user} logOut={callbacks.logOut} />}
    >
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
