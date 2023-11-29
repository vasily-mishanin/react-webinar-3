import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalShown, setIsModalShown] = useState(false);

  const list = store.getState().list;

  const callbacks = {
    onAddToCart: useCallback(
      (code) => {
        store.addItemToCart(code);
      },
      [store]
    ),

    onRemoveItemFromCart: useCallback(
      (code) => {
        store.removeItemFromCart(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        cartSummary={store.getCartSummary()}
        onOpenCart={() => setIsModalShown(true)}
      />
      <List list={list} onAction={callbacks.onAddToCart} />
      {isModalShown && (
        <Modal onClose={() => setIsModalShown(false)}>
          <Cart
            cartItems={store.getCartInfo()}
            onClose={() => setIsModalShown(false)}
            onRemoveItemFromCart={callbacks.onRemoveItemFromCart}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
