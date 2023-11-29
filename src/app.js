import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalShown, setIsModalShown] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onAddItem: useCallback(
      (code) => {
        //store.deleteItem(code);
        console.log("Go to Cart");
      },
      [store]
    ),

    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store]
    ),

    onAddToCart: useCallback(
      (code) => {
        store.addItemToCart(code);
      },
      [store]
    ),

    onRemoveItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        cartSummary={store.getCartSummary()}
        onOpenCart={() => setIsModalShown(true)}
      />
      <List
        list={list}
        onAction={callbacks.onAddToCart}
        onSelectItem={callbacks.onSelectItem}
      />
      {isModalShown && (
        <Modal
          cartItems={store.getCartInfo()}
          onClose={() => setIsModalShown(false)}
          onRemoveItemFromCart={callbacks.onRemoveItemFromCart}
        />
      )}
    </PageLayout>
  );
}

export default App;
