import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from "../../components/auth-header";
import { useNavigate } from "react-router-dom";
/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),

    // Выход
    logOut: useCallback(async () => {
      await store.actions.auth.logOut();
      navigate("/login");
    }, [store]),
  };

  const user_header = { name: auth.username, token: auth.token };

  return (
    <PageLayout
      head={<AuthHeader t={t} user={user_header} logOut={callbacks.logOut} />}
    >
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
